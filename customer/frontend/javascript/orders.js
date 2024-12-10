async function getOrders(userid) {
  try {
    const response = await fetch(`/api/orders`, {
      method: "GET",
    });
    const result = await response.json();

    // babalik sa login if unauthorized
    if(response.status === 401){
      const originURL = window.location.origin; 
      window.location.href = originURL;
    }

    return result;
  } catch (err) {
    console.log(err);
  }
}

window.onload = function () {
  showOrders();

  const userName = (() => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === "username") {
        return value;
      }
    }
    return null;
  })();

  const welcomUser = document.querySelector("#welcome-name");
  welcomUser.textContent = userName;

  const userNameTopBar = document.querySelector(".username");
  userNameTopBar.textContent = userName;
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

    if (order.status === "Pending") {
      statusText.textContent = "Claim Your Order at: " + order.location;
      statusText.classList.add("status-pending");
    } else if (order.status === "Claimed") {
      const newDate = new Date(order.claimed_at);
      const readableDate = newDate.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      statusText.textContent = "Order Claimed at: " + readableDate;
      statusText.classList.add("status-claimed");
    } else {
      statusText.textContent = "Cancelled";
      statusText.classList.add("status-cancelled");
    }

    cardHeader.appendChild(statusText);

    orderCard.appendChild(cardHeader);

    order.products.forEach((product) => {
      const productContainer = document.createElement("section");
      productContainer.classList.add("product-container");

      // IMMAGE ISSUES
      // Convert the product.product_image to a Uint8Array
      const byteArray = new Uint8Array(product.product_image.data);

      // Create a Blob from the byteArray
      const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust MIME type if necessary

      // Create a temporary object URL for the blob
      const imageUrl = URL.createObjectURL(blob);

      const productImage = document.createElement("img");
      productImage.src = imageUrl;
      productImage.alt = product.product_name;
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
      productPrice.textContent = "₱ " + product.product_price;
      quantityPriceContainer.appendChild(productPrice);

      productContainer.appendChild(quantityPriceContainer);

      orderCard.appendChild(productContainer);
    });

    const totalPriceContainer = document.createElement("section");
    totalPriceContainer.classList.add("total-price-container");

    const orderDate = document.createElement("p");
    const newDate = new Date(order.created_at);
    const creationDate = newDate.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    orderDate.textContent = "Ordered at: " + creationDate;
    totalPriceContainer.appendChild(orderDate);

    const orderTotal = document.createElement("h3");
    orderTotal.textContent = "Order Total: " + order.total;
    totalPriceContainer.appendChild(orderTotal);

    orderCard.appendChild(totalPriceContainer);

    cardsContainer.appendChild(orderCard);
  });

  innerContainer.appendChild(cardsContainer);

  const bottomSpacer = document.createElement("div");
  bottomSpacer.classList.add("bottom-spacer");
  // innerContainer.appendChild(bottomSpacer);

  mainContainer.appendChild(innerContainer);
}
