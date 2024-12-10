document.addEventListener("DOMContentLoaded", function () {
    const cart = [];
    const cartCount = document.getElementById("cartCount");
    const cartBody = document.getElementById("cart-body");
    const totalElement = document.getElementById("total");
    const clearCartBtn = document.getElementById("clearCart");
    const checkoutBtn = document.getElementById("checkout");

    // Agregar productos al carrito
    document.querySelectorAll(".btn-primary").forEach(button => {
        button.addEventListener("click", function () {
            const product = this.getAttribute("data-product");
            const price = parseFloat(this.getAttribute("data-price"));

            const existingProduct = cart.find(item => item.product === product);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ product, price, quantity: 1 });
            }

            updateCart();
        });
    });

    // Vaciar carrito
    clearCartBtn.addEventListener("click", function () {
        cart.length = 0;
        updateCart();
    });

    // Concretar compra
    checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Tu carrito está vacío.");
        } else {
            alert("Compra concretada. ¡Gracias por tu compra!");
            cart.length = 0; // Vaciar carrito tras compra
            updateCart();
        }
    });

    // Actualizar el carrito
    function updateCart() {
        cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);

        cartBody.innerHTML = ""; // Limpiar tabla
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const row = document.createElement("tr");

            // Producto
            const productCell = document.createElement("td");
            productCell.textContent = item.product;
            row.appendChild(productCell);

            // Precio
            const priceCell = document.createElement("td");
            priceCell.textContent = `$${item.price.toFixed(2)}`;
            row.appendChild(priceCell);

            // Cantidad
            const quantityCell = document.createElement("td");
            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.classList.add("form-control", "form-control-sm");
            quantityInput.value = item.quantity;
            quantityInput.min = 1;
            quantityInput.addEventListener("change", () => {
                const newQuantity = parseInt(quantityInput.value);
                if (newQuantity > 0) {
                    item.quantity = newQuantity;
                    updateCart();
                }
            });
            quantityCell.appendChild(quantityInput);
            row.appendChild(quantityCell);

            // Eliminar
            const removeCell = document.createElement("td");
            const removeBtn = document.createElement("button");
            removeBtn.classList.add("btn", "btn-danger", "btn-sm");
            removeBtn.textContent = "Eliminar";
            removeBtn.addEventListener("click", () => {
                cart.splice(index, 1);
                updateCart();
            });
            removeCell.appendChild(removeBtn);
            row.appendChild(removeCell);

            cartBody.appendChild(row);
        });

        totalElement.textContent = `$${total.toFixed(2)}`;
    }
});
