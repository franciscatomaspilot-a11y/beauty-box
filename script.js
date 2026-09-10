const cart = [];


const cartElement = document.getElementById("cart");

const cartOverlay = document.getElementById("cart-overlay");

const cartItems = document.getElementById("cart-items");

const cartTotal = document.getElementById("cart-total");

const cartCount = document.getElementById("cart-count");


const openCartButton = document.getElementById("open-cart");

const closeCartButton = document.getElementById("close-cart");

const continueShoppingButton =
    document.getElementById("continue-shopping");

const whatsappButton =
    document.getElementById("whatsapp-order");



/* ABRIR CARRITO */

function openCart() {

    cartElement.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}



/* CERRAR CARRITO */

function closeCart() {

    cartElement.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


openCartButton.addEventListener("click", openCart);

closeCartButton.addEventListener("click", closeCart);

continueShoppingButton.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);



/* AGREGAR PRODUCTOS */

document.querySelectorAll(".add-button").forEach(function(button) {


    button.addEventListener("click", function() {


        const id = button.dataset.id;

        const name = button.dataset.name;

        const price = Number(button.dataset.price);



        const productAlreadyInCart =
            cart.find(function(product) {

                return product.id === id;

            });



        if (productAlreadyInCart) {

            productAlreadyInCart.quantity++;

        }

        else {

            cart.push({

                id: id,

                name: name,

                price: price,

                quantity: 1

            });

        }



        updateCart();

        openCart();

    });

});



/* ACTUALIZAR CARRITO */

function updateCart() {


    cartItems.innerHTML = "";



    if (cart.length === 0) {


        cartItems.innerHTML = `

            <div class="empty-cart">

                <span>♡</span>

                <p>
                    Tu carrito está vacío.
                </p>

                <small>
                    Elegí una Beauty Box para empezar.
                </small>

            </div>

        `;

    }



    else {


        cart.forEach(function(product) {


            const item =
                document.createElement("div");


            item.className = "cart-item";



            item.innerHTML = `

                <div class="cart-item-top">

                    <h3>
                        ${product.name}
                    </h3>

                    <span class="cart-item-price">

                        ${formatPrice(
                            product.price *
                            product.quantity
                        )}

                    </span>

                </div>



                <div class="cart-item-bottom">


                    <div class="quantity">


                        <button
                            onclick="changeQuantity(
                                '${product.id}',
                                -1
                            )">

                            −

                        </button>



                        <span>
                            ${product.quantity}
                        </span>



                        <button
                            onclick="changeQuantity(
                                '${product.id}',
                                1
                            )">

                            +

                        </button>


                    </div>



                    <button
                        class="remove-item"
                        onclick="removeProduct(
                            '${product.id}'
                        )">

                        Eliminar

                    </button>


                </div>

            `;



            cartItems.appendChild(item);

        });

    }



    const total = getTotal();

    const quantity = getQuantity();



    cartTotal.textContent =
        formatPrice(total);


    cartCount.textContent =
        quantity;

}



/* CAMBIAR CANTIDAD */

function changeQuantity(id, amount) {


    const product =
        cart.find(function(item) {

            return item.id === id;

        });



    if (!product) {

        return;

    }



    product.quantity += amount;



    if (product.quantity <= 0) {

        removeProduct(id);

        return;

    }



    updateCart();

}



/* ELIMINAR */

function removeProduct(id) {


    const index =
        cart.findIndex(function(item) {

            return item.id === id;

        });



    if (index !== -1) {

        cart.splice(index, 1);

    }



    updateCart();

}



/* TOTAL */

function getTotal() {


    return cart.reduce(

        function(total, product) {

            return total +
                product.price *
                product.quantity;

        },

        0

    );

}



/* CANTIDAD TOTAL */

function getQuantity() {


    return cart.reduce(

        function(total, product) {

            return total +
                product.quantity;

        },

        0

    );

}



/* FORMATO DE PRECIO */

function formatPrice(price) {


    return "$" +
        price.toLocaleString("es-AR");

}



/* WHATSAPP */

whatsappButton.addEventListener(
    "click",
    function() {

        if (cart.length === 0) {

            alert(
                "Tu carrito está vacío."
            );

            return;

        }

        const phone = "5492612599251";

        window.open(
            "https://wa.me/" + phone,
            "_blank"
        );

    }

);

/* INICIAR */

updateCart();