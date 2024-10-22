function displayProducts(products) {
    const container = document.getElementById("most-ordered-products-container");

    container.innerHTML = '';

    products.forEach(products => {
        const card = document.createElement("div");
        card.classList.add("most-ordered-product-card");

        const img = document.createElement("img");
        img.src = product.productImage;

        const detailsDiv = document.createElement("div");
        const productName = document.createElement("span");
        productName.textContent = product.productName;

        const productDesc = document.createElement("span");
        productDesc = product.productDescription;

        detailsDiv.appendChild(productName);
        detailsDiv.appendChild(productDesc);

        const totalOrders = document.createElement("span");
        // totalOrders.textContent = product. Still don't know how to get this

        card.appendChild(img);
        card.appendChild(detailsDiv);
        card.appendChild(totalOrders);

        container.appendChild(card);
    })
}