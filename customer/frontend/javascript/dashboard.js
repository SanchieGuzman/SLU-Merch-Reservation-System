// async function getData(userid) {
//     try {
//       const response = await fetch(`/api/dashboard`, {
//         method: "GET",
//       });
//       const result = await response.json();
//       return result;
//     } catch (err) {
//       console.log(err);
//     }
//   }

async function getData() {
  return {
    completedOrders: [
      { product_name: "White Mug", quantity: 2, total: 100 },
      { product_name: "Notebook", quantity: 1, total: 50 },
      { product_name: "Pen Set", quantity: 3, total: 150 },
    ],
    latestOrders: [
      {
        product_name: "White Mug",
        product_image: { data: "" }, 
        quantity: 5,
        total: 100,
        status: "Successfully",
      },
      {
        product_name: "Diving Mask",
        product_image: { data: "" },
        quantity: 2,
        total: 10,
        status: "Successfully",
      },
    ],
    reservedProducts: [
      {
        order_id: 1,
        organization_name: "SLU",
        products: [
          {
            product_name: "Hannah",
            product_image: { data: "" },
            quantity: 1,
            total: 100,
          },
          {
            product_name: "ID Lace",
            product_image: { data: "" },
            quantity: 5,
            total: 100,
          },
        ],
      },
      {
        order_id: 1,
        organization_name: "SLU",
        products: [
          {
            product_name: "Hannah",
            product_image: { data: "" },
            quantity: 4,
            total: 100,
          },
          {
            product_name: "ID Lace",
            product_image: { data: "" },
            quantity: 6,
            total: 100,
          },
        ],
      },
      {
        order_id: 1,
        organization_name: "SLU",
        products: [
          {
            product_name: "Hannah",
            product_image: { data: "" },
            quantity: 3,
            total: 100,
          },
          {
            product_name: "ID Lace",
            product_image: { data: "" },
            quantity: 6,
            total: 100,
          },
        ],
      },
      {
        order_id: 1,
        organization_name: "SLU",
        products: [
          {
            product_name: "Hannah",
            product_image: { data: "" },
            quantity: 6,
            total: 100,
          },
          {
            product_name: "ID Lace",
            product_image: { data: "" },
            quantity: 8,
            total: 100,
          },
        ],
      },
      {
        order_id: 1,
        organization_name: "SLU",
        products: [
          {
            product_name: "Hannah",
            product_image: { data: "" },
            quantity: 4,
            total: 100,
          },
          {
            product_name: "ID Lace",
            product_image: { data: "" },
            quantity: 3,
            total: 100,
          },
        ],
      },
    ],
  };
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
    heading.textContent = "Completed Orders";

    container.appendChild(heading);

    // cards
    data.forEach(entry => {
      const card = document.createElement("div");
      card.classList.add("complete-orders-card");

      const productName = document.createElement("span");
      productName.textContent = entry.product_name;

      const quantity = document.createElement("span");
      quantity.textContent = `${entry.quantity}x`;

      const total = document.createElement("span");
      total.textContent = `P ${entry.total}`;

      card.appendChild(productName);
      card.appendChild(quantity);
      card.appendChild(total);

      container.append(card);
    });
  }

  function generateLatestOrdersSection(data) {
    const container = document.querySelector(".latest-orders-container");

    // heading
    const headingDiv = document.createElement("div");

    const heading = document.createElement("span");
    heading.textContent = "Latest Orders";

    const btn1 = document.createElement("button");
    btn1.textContent = "This Week";
    btn1.id = "last-week-btn";

    const btn2 = document.createElement("button");
    btn2.textContent = "This Week";
    btn2.id = "this-week-btn";

    const imageBtn = document.createElement("button");

    headingDiv.appendChild(heading);
    headingDiv.appendChild(btn1);
    headingDiv.appendChild(btn2);
    headingDiv.appendChild(imageBtn);

    container.appendChild(headingDiv);

    // cards
    data.forEach(entry => {
      const card = document.createElement("div");

      // image
      const image = document.createElement("img");
      image.src = imgToUrl(entry.product_image.data);
      image.alt = entry.product_name;
      image.style.height = "40px";
      image.style.width = "40px";

      // product name
      const productName = document.createElement("span");
      productName.textContent = entry.product_name;

      // total and quantity div 
      const totalAndQuantityDiv = document.createElement("div");
      
      const total = document.createElement("span");
      total.textContent = `P ${entry.total}`;

      const quantity = document.createElement("span");
      quantity.textContent = entry.quantity > 1 ? `${entry.quantity} items` : `${entry.quantity} item`;

      totalAndQuantityDiv.appendChild(total);
      totalAndQuantityDiv.appendChild(quantity);

      // status div
      const statusDiv = document.createElement("div");

      const deliveredText = document.createElement("span");
      deliveredText.textContent = "Delivered";

      const status = document.createElement("span");
      status.textContent = entry.status;

      statusDiv.appendChild(deliveredText);
      statusDiv.appendChild(status);

      card.appendChild(image);
      card.appendChild(productName);
      card.appendChild(totalAndQuantityDiv);
      card.appendChild(statusDiv);

      container.appendChild(card);
    });
  }

  function generateReservedProductsSection(data) {
    const container = document.querySelector(".reserved-products-container");

    // heading
    const heading = document.createElement("span");
    heading.classList.add("reserved-products-heading");
    heading.textContent = "Reserved Products";

    container.appendChild(heading);

    const orderCardsContainer= document.createElement("div");
    orderCardsContainer.classList.add("order-cards-container");

    // cards
    data.forEach(entry => {
      const orderCard = document.createElement("div");
      orderCard.classList.add("order-card-container");

      // div for order number and button image
      const orderNumber = document.createElement("span");
      orderNumber.textContent = `Order # ${entry.order_id}`;

      const orgName = document.createElement("span");
      orgName.textContent = `${entry.organization_name} Merch`;

      orderCardsContainer.appendChild(orderNumber);

      entry.products.forEach(product => {
        const productCard = document.createElement("div");

        const productName = document.createElement("span");
        productName.textContent = product.product_name;

        const quantity = document.createElement("span");
        quantity.textContent = product.quantity > 1 ? `${product.quantity} items` : `${product.quantity} item`;

        const total = document.createElement("span");
        total.textContent = `₱ ${product.total}`;

        const image = document.createElement("img");
        image.src = imgToUrl(product.product_image.data);
        image.alt = product.product_name;
        image.style.height = "40px";
        image.style.width = "40px";
        
        productCard.appendChild(total);
        productCard.appendChild(image);

        const prodNameAndQuantityDiv = document.createElement("div");
        prodNameAndQuantityDiv.appendChild(productName);
        prodNameAndQuantityDiv.appendChild(quantity);

        productCard.appendChild(prodNameAndQuantityDiv);
        productCard.appendChild(orgName);

        orderCard.appendChild(productCard);
        orderCardsContainer.appendChild(orderCard);
      });

      container.appendChild(orderCardsContainer);
    });
  }

  function imgToUrl(image) {
    const byteArray = new Uint8Array(image);

    const blob = new Blob([byteArray], { type: "image/jpeg" });

    return URL.createObjectURL(blob);
  }