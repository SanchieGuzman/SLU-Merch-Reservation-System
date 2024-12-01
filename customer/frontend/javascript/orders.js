async function getOrders() {
  try {
    const response = await fetch("http://localhost:3000/api/orders", {
      method: "GET",
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

window.onload = function () {
  showOrders();
};

async function showOrders() {
  const mainContainer = document.querySelector(".content-container");

  const innerContainer = document.createElement("div");
  innerContainer.classList.add("inner-container");

  const header = document.createElement("section");
  header.classList.add("orders-header");

  headerText = document.createElement("h2");
  headerText.textContent = "Your Orders";
  header.appendChild(headerText);
  innerContainer.appendChild(header);

  const cardsContainer = document.createElement("div");
  cardsContainer.classList.add("cards-container");

  let orders = await getOrders();

  console.log(orders);

  // const orders = [
  //   {
  //     order_id: 1,
  //     organization_id: 1,
  //     organization_name: "ICON",
  //     status: "claimed",
  //     total: 4000,
  //     created_at: "2024-11-17 17:15:00",
  //     claimed_at: null, // Assuming it's not claimed yet
  //     location: "Maryheights Lobby",
  //     products: [
  //       {
  //         product_id: 1,
  //         product_name: "Product 1", // Adjusted to reflect a product name
  //         product_image: "../resources/images/products/hoodie.png", // Assuming this is a placeholder for the actual image data
  //         product_price: 200,
  //         quantity: 10,
  //         total: 2000, // Added missing `total` field for consistency
  //       },
  //       {
  //         product_id: 2, // Changed product_id to differentiate products
  //         product_name: "Product 2",
  //         product_image: "../resources/images/products/hoodie.png",
  //         product_price: 200,
  //         quantity: 10,
  //         total: 2000,
  //       },
  //     ],
  //   },
  //   {
  //     order_id: 2,
  //     organization_id: 2,
  //     organization_name: "JPIA",
  //     status: "claimed",
  //     total: 4000,
  //     created_at: "2024-11-17 17:15:00",
  //     claimed_at: "2024-11-17 19:15:00",
  //     location: "Maryheights Amphi",
  //     products: [
  //       {
  //         product_id: 3, // Adjusted product_id for uniqueness
  //         product_name: "Product 3",
  //         product_image: "../resources/images/products/hoodie.png",
  //         product_price: 200,
  //         quantity: 10,
  //         total: 2000,
  //       },
  //       {
  //         product_id: 4,
  //         product_name: "Product 4",
  //         product_image: "../resources/images/products/hoodie.png",
  //         product_price: 200,
  //         quantity: 10,
  //         total: 2000,
  //       },
  //     ],
  //   },
  // ];

  orders.forEach((order) => {
    //order
    const orderCard = document.createElement("div");
    orderCard.setAttribute("id", `${order.order_id}`);
    orderCard.classList.add("order-card");

    const cardHeader = document.createElement("section");
    cardHeader.classList.add("card-header");

    const orgName = document.createElement("h3");
    orgName.textContent = order.organization_name;
    cardHeader.appendChild(orgName);

    const statusText = document.createElement("h3");
    statusText.textContent = order.status;
    cardHeader.appendChild(statusText);

    orderCard.appendChild(cardHeader);

    order.products.forEach((product) => {
      const productContainer = document.createElement("section");
      productContainer.classList.add("product-container");

      const productImage = document.createElement("img");
      productImage.src = product.product_image;
      productContainer.appendChild(productImage);

      const productName = document.createElement("h4");
      productName.textContent = product.product_name;
      productContainer.appendChild(productName);

      const productSpacer = document.createElement("section");
      productSpacer.classList.add("product-spacer");
      productContainer.appendChild(productSpacer);

      const quantityPriceContainer = document.createElement("section");
      quantityPriceContainer.classList.add("quantity-price-container");

      const productQuantity = document.createElement("p");
      productQuantity.classList.add("product-quantity");
      productQuantity.textContent = "Quantity: " + product.quantity;
      quantityPriceContainer.appendChild(productQuantity);

      const productPrice = document.createElement("h4");
      productPrice.classList.add("product-quantity");
      productPrice.textContent = "P " + product.total;
      quantityPriceContainer.appendChild(productPrice);

      productContainer.appendChild(quantityPriceContainer);

      orderCard.appendChild(productContainer);
    });

    const totalPriceContainer = document.createElement("section");
    totalPriceContainer.classList.add("total-price-container");

    const orderDate = document.createElement("p");
    orderDate.textContent = "Ordered at: " + order.created_at;
    totalPriceContainer.appendChild(orderDate);

    const orderTotal = document.createElement("h3");
    orderTotal.textContent = "Order Total: " + order.total;
    totalPriceContainer.appendChild(orderTotal);

    orderCard.appendChild(totalPriceContainer);

    cardsContainer.appendChild(orderCard);
  });

  innerContainer.appendChild(cardsContainer);

  mainContainer.appendChild(innerContainer);
}
