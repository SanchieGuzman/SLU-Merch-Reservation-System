function displayProducts(products) {
    const container = document.getElementById("most-ordered-products-container");

    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("most-ordered-product-card");

        const img = document.createElement("img");
        img.src = product.product_image;

        const productName = document.createElement("span");
        productName.textContent = product.product_name;

        const totalOrders = document.createElement("span");
        totalOrders.textContent = `${product.order_count}`;

        card.appendChild(img);
        card.appendChild(productName);
        card.appendChild(totalOrders);

        container.appendChild(card);
    });
}