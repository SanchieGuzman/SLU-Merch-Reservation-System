async function getData(userid) {
    try {
      const response = await fetch(`/api/dashboard`, {
        method: "GET",
      });
      const result = await response.json();
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

      const viewMoreBtn = document.createElement("button");
      viewMoreBtn.textContent = "view more";
      viewMoreBtn.classList.add("view-more-button");

      card.appendChild(productName);
      card.appendChild(quantity);
      card.appendChild(total);
      card.appendChild(viewMoreBtn);

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
    heading.textContent = "Reserved Products";

    container.appendChild(heading);

    // cards
    data.forEach(entry => {
      const orderCard = document.createElement("div");

      // div for order number and button image
      const orderNumber = document.createElement("span");
      orderNumber.textContent = `Order # ${entry.order_id}`;

      const orgName = document.createElement("span");
      orgName.textContent = `${entry.organization_name} Merch`;

      entry.products.forEach(product => {
        const productCard = document.createElement("div");

        const total = document.createElement("span");
        total.textContent = product.total;

        const image = document.createElement("img");
        image.src = imgToUrl(product.product_image.data);
        image.alt = product.product_name;
        image.style.height = "40px";
        image.style.width = "40px";

        const productName = document.createElement("span");
        productName.textContent = product.product_name;

        productCard.appendChild(total);
        productCard.appendChild(image);
        productCard.appendChild(productName);
        productCard.appendChild(orgName);

        orderCard.appendChild(productCard);
      });

      container.appendChild(orderCard);
    });
  }

  function imgToUrl(image) {
    const byteArray = new Uint8Array(image);

    const blob = new Blob([byteArray], { type: "image/jpeg" });

    return URL.createObjectURL(blob);
  }