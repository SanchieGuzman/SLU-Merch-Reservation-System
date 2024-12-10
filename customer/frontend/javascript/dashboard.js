async function getData(userid) {
  try {
    const response = await fetch(`/api/dashboard`, {
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
  loadDashboard();

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

async function loadDashboard() {
  let data = await getData();
  let completedOrdersList = data.completedOrders;
  let latestOrdersList = data.latestOrders;
  let reservedProductsList = data.reservedProducts;

  // containers
  const mainContainer = document.querySelector(".content-container");

  const leftContainer = document.createElement("div");
  leftContainer.classList.add("container");

  const topLeftContainer = document.createElement("div");
  topLeftContainer.classList.add("completed-orders-container");

  const bottomLeftContainer = document.createElement("div");
  bottomLeftContainer.classList.add("latest-orders-container");

  const rightContainer = document.createElement("div");
  rightContainer.classList.add("reserved-products-container");

  // append div's to the main container
  leftContainer.appendChild(topLeftContainer);
  leftContainer.appendChild(bottomLeftContainer);
  mainContainer.appendChild(leftContainer);
  mainContainer.appendChild(rightContainer);

  // generate the content for each sections
  generateCompletedOrdersSection(completedOrdersList);

  generateLatestOrdersSection(latestOrdersList);

  generateReservedProductsSection(reservedProductsList);
}

function generateCompletedOrdersSection(data) {
  const container = document.querySelector(".completed-orders-container");

  // header
  const heading = document.createElement("span");
  heading.textContent = "Items Bought";
  heading.classList.add("completed-orders-heading");

  container.appendChild(heading);

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  // cards
  data.forEach((entry) => {
    const card = document.createElement("div");
    card.classList.add("complete-orders-card");

    const productName = document.createElement("span");
    productName.textContent = entry.product_name;

    const quantity = document.createElement("span");
    quantity.textContent = `${entry.quantity}x`;

    const total = document.createElement("span");
    total.textContent = `₱ ${entry.total}`;

    card.appendChild(productName);
    card.appendChild(quantity);
    card.appendChild(total);

    cardContainer.append(card);
  });

  container.append(cardContainer);
}

function generateLatestOrdersSection(data) {
  const container = document.querySelector(".latest-orders-container");

  // heading
  const headingDiv = document.createElement("div");
  headingDiv.classList.add("latest-orders-container-heading");

  const heading = document.createElement("span");
  heading.textContent = "Latest Order";

  headingDiv.appendChild(heading);

  container.appendChild(headingDiv);

  const latestCardsContainer = document.createElement("div");
  latestCardsContainer.classList.add("latest-cards-container");

  // cards
  data.forEach((entry) => {
    const card = document.createElement("div");
    card.classList.add("latest-orders-card");

    // image
    const image = document.createElement("img");
    image.src = imgToUrl(entry.product_image.data);
    image.alt = entry.product_name;
    image.style.height = "40px";
    image.style.width = "40px";
    image.classList.add("latest-orders-image");

    // product name
    const productName = document.createElement("span");
    productName.textContent = entry.product_name;
    productName.classList.add("latest-orders-product-name");

    // total and quantity div
    const totalAndQuantityDiv = document.createElement("div");
    totalAndQuantityDiv.classList.add("latest-orders-productsquantity");

    const total = document.createElement("span");
    total.textContent = `₱ ${entry.total}`;
    total.classList.add("latest-orders-price");

    const quantity = document.createElement("span");
    quantity.textContent =
      entry.quantity > 1 ? `${entry.quantity} items` : `${entry.quantity} item`;
    quantity.classList.add("latest-orders-quantity");

    totalAndQuantityDiv.appendChild(total);
    totalAndQuantityDiv.appendChild(quantity);

    // status div
    const statusDiv = document.createElement("div");
    statusDiv.classList.add("latest-orders-div-status");

    const deliveredText = document.createElement("span");
    deliveredText.textContent = "Status";
    deliveredText.classList.add("latest-orders-delivery-status");

    const status = document.createElement("span");
    status.textContent = entry.status;
    if (entry.status == "Claimed") {
      status.classList.add("claimed");
    } else {
      status.classList.add("pending");
    }
    // console.log(entry.status);
    
    

    statusDiv.appendChild(deliveredText);
    statusDiv.appendChild(status);

    card.appendChild(image);
    card.appendChild(productName);
    card.appendChild(totalAndQuantityDiv);
    card.appendChild(statusDiv);

    latestCardsContainer.appendChild(card);
    container.appendChild(latestCardsContainer);
  });
}

function generateReservedProductsSection(data) {
  const container = document.querySelector(".reserved-products-container");

  // heading
  const heading = document.createElement("span");
  heading.classList.add("reserved-products-heading");
  heading.textContent = "Reserved Products";

  // container.appendChild(heading);

  const orderCardsContainer = document.createElement("div");
  orderCardsContainer.classList.add("order-cards-container");
  container.appendChild(heading);

  // cards
  data.forEach((entry) => {
    const reservedCardContainer = document.createElement("div");
    reservedCardContainer.classList.add("reserved-card-container");

    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card-container");

    // div for order number and button image
    const orderNumberAndOrg = document.createElement("span");
    orderNumberAndOrg.textContent = `Order # ${entry.order_id}: ${entry.organization_name} Products`;

    reservedCardContainer.appendChild(orderNumberAndOrg);
    orderNumberAndOrg.classList.add("order-label");

    entry.products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      const productName = document.createElement("span");
      productName.textContent = product.product_name;
      productCard.appendChild(productName);

      const image = document.createElement("img");
      image.classList.add("reserved-product-image");
      image.src = imgToUrl(product.product_image.data);
      image.alt = product.product_name;
      // image.style.height = "40px";
      // image.style.width = "40px";

      productCard.appendChild(image);

      const quantity = document.createElement("span");
      quantity.classList.add("span-right");
      quantity.textContent =
        product.quantity > 1
          ? `${product.quantity} items`
          : `${product.quantity} item`;

      const total = document.createElement("span");
      total.classList.add("span-left");
      total.textContent = `₱ ${product.total}`;

      productCard.appendChild(total);

      const prodPriceAndQuantityDiv = document.createElement("div");
      prodPriceAndQuantityDiv.classList.add("price-and-quantity-container");
      prodPriceAndQuantityDiv.appendChild(total);
      prodPriceAndQuantityDiv.appendChild(quantity);

      productCard.appendChild(prodPriceAndQuantityDiv);

      orderCard.appendChild(productCard);
      reservedCardContainer.appendChild(orderCard);

      orderCardsContainer.appendChild(reservedCardContainer);
    });

    container.appendChild(orderCardsContainer);
  });
}

function imgToUrl(image) {
  const byteArray = new Uint8Array(image);

  const blob = new Blob([byteArray], { type: "image/jpeg" });

  return URL.createObjectURL(blob);
}
