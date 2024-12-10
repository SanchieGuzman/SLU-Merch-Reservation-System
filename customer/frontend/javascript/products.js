async function getBoothDetails() {
  try {
    const response = await fetch("/api/products", {
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

window.onload = async function () {
  let booths = await getBoothDetails();
  // console.log(booths);
  showBooths(booths);

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

async function getCartDetails() {
  try {
    const response = await fetch("/api/cart", {
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

async function getScheduleDetails(orgid) {
  try {
    const response = await fetch(`/api/${orgid}/schedules`, {
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

function showBooths(booths) {
  const mainContainer = document.querySelector(".content-container");

  const innerContainer = document.createElement("div");
  innerContainer.classList.add("inner-container");
  //card header
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");

  const headerText = document.createElement("h2");
  headerText.classList.add("header-text");
  headerText.textContent = "See Products of Each SLU Organizations";
  cardHeader.appendChild(headerText);

  const headerIcon = document.createElement("img");
  headerIcon.classList.add("header-icon");
  headerIcon.src = "../resources/images/products/products-header-icon.png";
  cardHeader.appendChild(headerIcon);

  innerContainer.appendChild(cardHeader);

  // console.log(booths);

  booths.forEach((booth) => {
    const boothContainer = document.createElement("div");
    boothContainer.classList.add("booth-container");
    boothContainer.id = `${booth.organization_id}`;

    const boothNameContainer = document.createElement("div");
    boothNameContainer.classList.add("booth-name-container");

    const boothName = document.createElement("h2");
    boothName.classList.add("booth-name");
    boothName.textContent = booth.organization_name;
    boothName.id = `${booth.organization_name}`;
    boothNameContainer.appendChild(boothName);

    const seeAllButton = document.createElement("button");
    seeAllButton.classList.add("see-all-button");
    seeAllButton.textContent = "See All";
    seeAllButton.addEventListener("click", async function () {
      const boothId = seeAllButton.closest(".booth-container").id;

      let orgProducts = await getBoothProducts(boothId);

      const orgName = boothName.textContent;
      // const organizationName = seeAllButton.closest(".booth-name").id;
      showBoothProducts(orgName, orgProducts, booth.organization_id);
    });
    boothNameContainer.appendChild(seeAllButton);

    boothContainer.appendChild(boothNameContainer);
    innerContainer.appendChild(boothContainer);

    const productsGrid = document.createElement("div");
    productsGrid.classList.add("products-grid");

    booth.products.forEach((product) => {
      //item card
      const itemCard = document.createElement("div");
      itemCard.classList.add("item-card");

      //image container
      const itemCardImageContainer = document.createElement("section");
      itemCardImageContainer.classList.add("item-card-image-container");

      // IMMAGE ISSUES
      // Convert the product.product_image to a Uint8Array
      const byteArray = new Uint8Array(product.product_image.data);

      // Create a Blob from the byteArray
      const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust MIME type if necessary

      // Create a temporary object URL for the blob
      const imageUrl = URL.createObjectURL(blob);

      //image
      const itemImage = document.createElement("img");
      itemImage.classList.add("item-image");
      itemImage.src = imageUrl;
      itemImage.alt = product.product_name;
      itemCardImageContainer.appendChild(itemImage);

      itemCard.appendChild(itemCardImageContainer);

      //item name and price container
      const itemNameContainer = document.createElement("section");
      itemNameContainer.classList.add("item-name-container");

      //item name
      const itemName = document.createElement("p");
      itemName.classList.add("item-name");
      itemName.textContent = product.product_name;
      itemNameContainer.appendChild(itemName);

      //item price
      const itemPrice = document.createElement("p");
      itemPrice.classList.add("item-price");
      itemPrice.textContent = "P" + product.product_price;
      itemNameContainer.appendChild(itemPrice);

      itemCard.appendChild(itemNameContainer);

      //quantity
      const quantity = document.createElement("p");
      quantity.classList.add("quantity");
      quantity.textContent = "Stock: " + product.product_quantity;
      itemCard.appendChild(quantity);

      //view button container
      const viewButtonContainer = document.createElement("section");
      viewButtonContainer.classList.add("view-button-container");

      //view button
      const viewButton = document.createElement("button");
      viewButton.classList.add("view-button");
      viewButton.textContent = "View";
      viewButton.addEventListener("click", async function () {
        const organizationId = viewButton.closest(".booth-container").id;
        //VIEW BUTTON
        let productDetails = await getProductDetails(
          boothContainer.id,
          product.product_id
        );

        const ref1 = viewButton.closest(".booth-container");

        const reference = String(ref1);

        const orgName = boothName.textContent;
        viewProductDetails(orgName, productDetails, reference, organizationId);
      });

      viewButtonContainer.appendChild(viewButton);
      itemCard.appendChild(viewButtonContainer);

      productsGrid.appendChild(itemCard);
      boothContainer.appendChild(productsGrid);
    });

    const line = document.createElement("hr");
    line.classList.add("line-break");
    boothContainer.appendChild(line);
  });

  mainContainer.appendChild(innerContainer);
}

async function getBoothProducts(orgId) {
  try {
    const response = await fetch(`/api/${orgId}/products`, {
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

/* ==============Method for See All======================== */

function showBoothProducts(organizationName, products, organization_id) {
  const mainContainer = document.querySelector(".inner-container");
  const children = Array.from(mainContainer.children);

  //pass booth id to a method that will get all products of that booth

  children.slice(1).forEach((child) => {
    mainContainer.removeChild(child);
  });

  // Container for products
  const productsContainer = document.createElement("div");
  productsContainer.classList.add("products-container");

  // container for org name
  const orgNameContainer = document.createElement("div");
  orgNameContainer.classList.add("org-name-container");

  const selectedBoothName = document.createElement("h2");
  selectedBoothName.classList.add("selected-booth-name");
  selectedBoothName.textContent = organizationName;
  orgNameContainer.appendChild(selectedBoothName);

  const returnButton = document.createElement("button");
  returnButton.classList.add("return-button");
  returnButton.addEventListener("click", async function () {
    const wholeContainer = document.querySelector(".content-container");
    wholeContainer.innerHTML = "";
    let booths = await getBoothDetails();
    showBooths(booths);
  });

  orgNameContainer.appendChild(returnButton);

  productsContainer.appendChild(orgNameContainer);

  const productGridContainer = document.createElement("div");
  productGridContainer.classList.add("product-grid-container");

  products.forEach((product) => {
    //item card
    const itemCard = document.createElement("div");
    itemCard.classList.add("item-card");

    //image container
    const itemCardImageContainer = document.createElement("section");
    itemCardImageContainer.classList.add("item-card-image-container");

    // IMMAGE ISSUES
    // Convert the product.product_image to a Uint8Array
    const byteArray = new Uint8Array(product.product_image.data);

    // Create a Blob from the byteArray
    const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust MIME type if necessary

    // Create a temporary object URL for the blob
    const imageUrl = URL.createObjectURL(blob);

    //image
    const itemImage = document.createElement("img");
    itemImage.classList.add("item-image");
    itemImage.src = imageUrl;
    itemImage.alt = product.product_name;
    itemCardImageContainer.appendChild(itemImage);

    itemCard.appendChild(itemCardImageContainer);

    //item name and price container
    const itemNameContainer = document.createElement("section");
    itemNameContainer.classList.add("item-name-container");

    //item name
    const itemName = document.createElement("p");
    itemName.classList.add("item-name");
    itemName.textContent = product.product_name;
    itemNameContainer.appendChild(itemName);

    //item price
    const itemPrice = document.createElement("p");
    itemPrice.classList.add("item-price");
    itemPrice.textContent = "P" + product.price;
    itemNameContainer.appendChild(itemPrice);

    itemCard.appendChild(itemNameContainer);

    //quantity
    const quantity = document.createElement("p");
    quantity.classList.add("quantity");
    quantity.textContent = "Stock: " + product.quantity;
    itemCard.appendChild(quantity);

    //view button container
    const viewButtonContainer = document.createElement("section");
    viewButtonContainer.classList.add("view-button-container");

    //view button
    const viewButton = document.createElement("button");
    viewButton.classList.add("view-button");
    viewButton.textContent = "View";

    viewButton.addEventListener("click", async function () {
      //VIEW BUTTON
      let productDetails = await getProductDetails(
        organization_id,
        product.product_id
      );

      const reference = organization_id + " | " + organizationName;

      viewProductDetails(
        organizationName,
        productDetails,
        reference,
        organization_id
      );
    });

    viewButtonContainer.appendChild(viewButton);
    itemCard.appendChild(viewButtonContainer);

    productGridContainer.appendChild(itemCard);
  });
  productsContainer.appendChild(productGridContainer);

  mainContainer.appendChild(productsContainer);

  //this is for scrolling back to top when you're below
  const outerContainer = document.querySelector(".content-container");
  outerContainer.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

async function getProductDetails(orgId, productId) {
  try {
    const response = await fetch(`/api/${orgId}/products/${productId}`, {
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
/* ==============Method for View======================== */
function viewProductDetails(orgName, product, reference, org_id) {
  const container = document.querySelector(".inner-container");
  // console.log(product);
  
  container.innerHTML = "";

  //card header ====================================start================
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  // header naming
  const boothName = document.createElement("h2");
  boothName.textContent = orgName;
  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  // closeButton.src = "../resources/images/products/returnButton.png";
  closeButton.addEventListener("click", async function () {
    const mainContainer = document.querySelector(".content-container");
    mainContainer.innerHTML = "";

    if (isNaN(reference.charAt(0))) {
      let booths = await getBoothDetails();
      showBooths(booths);
    } else {
      const innerContainer = document.createElement("div");
      innerContainer.classList.add("inner-container");
      //card header
      const cardHeader = document.createElement("div");
      cardHeader.classList.add("card-header");

      const headerText = document.createElement("h2");
      headerText.classList.add("header-text");
      headerText.textContent = "See Products of Each SLU Organizations";
      cardHeader.appendChild(headerText);

      const headerIcon = document.createElement("img");
      headerIcon.classList.add("header-icon");
      headerIcon.src = "../resources/images/products/products-header-icon.png";
      cardHeader.appendChild(headerIcon);

      innerContainer.appendChild(cardHeader);

      mainContainer.appendChild(innerContainer);
      const [organizationId, organizationName] = reference.split("|");

      let orgProducts = await getBoothProducts(organizationId);
      showBoothProducts(organizationName, orgProducts, organizationId);
    }
  });
  cardHeader.appendChild(boothName);
  cardHeader.appendChild(closeButton);
  container.appendChild(cardHeader);

  //specific product container
  const specificProductContainer = document.createElement("div");
  specificProductContainer.classList.add("specific-product-container");

  //left container
  const leftContainer = document.createElement("div");
  leftContainer.classList.add("left-container-specific-product");

  const productImage = document.createElement("img");
  // IMMAGE ISSUES
  // Convert the product.product_image to a Uint8Array
  const byteArray = new Uint8Array(product.product_image.data);

  // Create a Blob from the byteArray
  const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust MIME type if necessary

  // Create a temporary object URL for the blob
  const imageUrl = URL.createObjectURL(blob);
  productImage.src = imageUrl;
  // productImage.src = product.product_image;
  productImage.alt = product.product_name;
  leftContainer.appendChild(productImage); //append image to left container

  specificProductContainer.appendChild(leftContainer); //append left container to specific product container

  //right  container
  const rightContainer = document.createElement("div");
  rightContainer.classList.add("right-container-specific-product");

  //product name RIGHT
  const prodName = document.createElement("h3");
  prodName.textContent =
    product.product_name.charAt(0).toUpperCase() +
    product.product_name.slice(1);
  rightContainer.appendChild(prodName);

  //product description RIGHT
  const prodDescription = document.createElement("p");
  prodDescription.textContent = product.product_description;
  rightContainer.appendChild(prodDescription);

  //product quantity RIGHT
  const stock = document.createElement("p");
  stock.textContent = "Stocks left: " + product.product_quantity;
  rightContainer.appendChild(stock);

  //quantity container  RIGHT (product quantity -1+)
  const quantityContainer = document.createElement("div");
  quantityContainer.classList.add("quantity-container");

  //quantity text
  const quantityText = document.createElement("span");
  quantityText.textContent = "Product Quantity: ";

  //quantity selector controls container Right
  const quantityControls = document.createElement("div");
  quantityControls.classList.add("quantity-controls");

  const minusButton = document.createElement("button");
  minusButton.classList.add("qty-count--minus");
  minusButton.textContent = "-";

  const quantityInput = document.createElement("input");
  quantityInput.classList.add("input-box");
  quantityInput.setAttribute("name", "input-box");
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("min", "0");
  quantityInput.setAttribute("value", "0");
  quantityInput.setAttribute("max", product.product_quantity);

  const plusButton = document.createElement("button");
  plusButton.classList.add("qty-count--plus");
  plusButton.textContent = "+";

  quantityControls.appendChild(minusButton);
  quantityControls.appendChild(quantityInput);
  quantityControls.appendChild(plusButton); //this is the controls (- 1 +)

  quantityContainer.appendChild(quantityText);
  quantityContainer.appendChild(quantityControls);
  rightContainer.appendChild(quantityContainer);

  //price container
  const priceContainer = document.createElement("div");
  priceContainer.classList.add("price-container");

  const priceText = document.createElement("h3");
  priceText.innerText = "Price: ₱ " + product.product_price;

  const lineBreak = document.createElement("hr");

  priceContainer.appendChild(priceText);
  priceContainer.appendChild(lineBreak);

  // total price
  const totalInfo = document.createElement("h3");
  totalInfo.textContent = "Total (0 item): ₱ 0"
  totalInfo.id = "totalPrice";

  // append price container and total info
  rightContainer.appendChild(priceContainer);
  rightContainer.appendChild(totalInfo);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to Cart";

  const placeOrderButton = document.createElement("button");
  placeOrderButton.classList.add("place-order-button");
  placeOrderButton.textContent = "Place Order";
  //EVENT LISTENER FOR PLACE BUTTON
  placeOrderButton.addEventListener("click", async () => {
    quantity = document.querySelector(".input-box").value;
    if(quantity ==0){
      alert("Invalid quantity input");
    }else{
      console.log(product);
      let schedules = await getScheduleDetails(org_id);
      console.log(schedules);
      //product id
      const prod_id = product.product_id;
      console.log("prodid after pressing place order " +prod_id);
    
      //product image
      const prodImage = product.product_image;
  
      // product Name
      const prodName = product.product_name;
  
      // product quantity
      const prodQuantity = container.querySelector(
        ".quantity-container input[name='input-box']"
      ).value;
      // console.log(prodQuantity);
  
      // product total
      const prodTotal = container
        .querySelector("#totalPrice")
        .textContent.split("₱")[1];
      // console.log(prodTotal);
  
      loadCheckoutPage(
        prodImage,
        prodName,
        prodQuantity,
        prodTotal,
        schedules,
        reference,
        org_id,
        prod_id
      );
    }
  });

  buttonsContainer.appendChild(addToCartButton);
  buttonsContainer.appendChild(placeOrderButton);

  rightContainer.appendChild(buttonsContainer);

  specificProductContainer.appendChild(rightContainer);
  container.appendChild(specificProductContainer);

  //EVENT LISTENERS FOR BUTTONS
  addToCartButton.addEventListener("click", async () => {
    product_id = product.product_id;
    org_id = product.org_id;
    quantity = document.querySelector(".input-box").value;
    if(quantity ==0){
      alert('Insufficient amount to add to cart');
    }else{
      await addProductsToCart(product_id,org_id,quantity);
    }
  });

  minusButton.addEventListener("click", () => {
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 0) {
      currentQuantity--;
      quantityInput.value = currentQuantity;
      updateTotalPrice(currentQuantity, product.product_price);
    }
  });

  plusButton.addEventListener("click", () => {
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity < product.product_quantity) {
      currentQuantity++;
      quantityInput.value = currentQuantity;
      updateTotalPrice(currentQuantity, product.product_price);
    }
  });

  quantityInput.addEventListener("input", () => {
    let currentQuantity = parseInt(quantityInput.value);

    if (currentQuantity > product.product_quantity) {
      quantityInput.value = product.product_quantity;
      currentQuantity = product.product_quantity;
    }
    if (currentQuantity < 1 || isNaN(currentQuantity)) {
      quantityInput.value = 1;
      currentQuantity = 1;
    }
    updateTotalPrice(currentQuantity, product.product_price);
  });
  function updateTotalPrice(quantity, price) {
    const totalPrice = quantity * price;
    totalInfo.textContent = `Total (${quantity} item${
      quantity > 1 ? "s" : ""
    }): ₱${totalPrice}`;
  }
}


async function addProductsToCart(product_id, organization_id, prodquantity) {
  const payload = {
    "product_id": product_id,
    "orgid": organization_id,
    "quantity": prodquantity
  }
  // console.log("sending to server: "+ payload)
  try {
      const response = await fetch('/api/cart', {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
        },
      });
      const result = await response.json();

      if(response.status === 201){
        alert('Product successfully added to your cart!')
        // const currentUrl = window.location.origin; // Get base URL (e.g., http://localhost:3000/) // I made this dynamic for the purpose of docker
        // const ordersUrl = `${currentUrl}/pages/mycart.html`;
        // window.location.href = ordersUrl;
        // console.log("success") 
      }else if(response.status === 401){
        // babalik sa login if unauthorized
          const originURL = window.location.origin; 
          window.location.href = originURL;
      }
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
}

function loadCheckoutPage(
  prodImage,
  prodName,
  prodQuantity,
  prodTotal,
  schedules,
  reference,
  org_id,
  product_id
) {
  const container = document.querySelector(".inner-container");
 

  container.innerHTML = "";

  //Main Container
  const checkoutCardContainer = document.createElement("div");
  checkoutCardContainer.classList.add("checkout-card-container");

  //Card Header
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");

  const cardTitle = document.createElement("h1");
  cardTitle.textContent = "Checkout";
  cardHeader.appendChild(cardTitle);

  const cardBackButton = document.createElement("button");
  cardBackButton.classList.add("back-button");
  cardBackButton.addEventListener("click", async function () {
    const mainContainer = document.querySelector(".content-container");
    mainContainer.innerHTML = "";
    if (isNaN(reference.charAt(0))) {
      let booths = await getBoothDetails();
      showBooths(booths);
    } else {
      const innerContainer = document.createElement("div");
      innerContainer.classList.add("inner-container");
      //card header
      const cardHeader = document.createElement("div");
      cardHeader.classList.add("card-header");

      const headerText = document.createElement("h2");
      headerText.classList.add("header-text");
      headerText.textContent = "See Products of Each SLU Organizations";
      cardHeader.appendChild(headerText);

      const headerIcon = document.createElement("img");
      headerIcon.classList.add("header-icon");
      headerIcon.src = "../resources/images/products/products-header-icon.png";
      cardHeader.appendChild(headerIcon);

      innerContainer.appendChild(cardHeader);

      mainContainer.appendChild(innerContainer);
      const [organizationId, organizationName] = reference.split("|");

      let orgProducts = await getBoothProducts(organizationId);
      showBoothProducts(organizationName, orgProducts, organizationId);
    }
  });
  cardHeader.appendChild(cardBackButton);

  checkoutCardContainer.appendChild(cardHeader);

  //Inner Container
  const checkoutDetailsContainer = document.createElement("div");
  checkoutDetailsContainer.classList.add("checkout-details-container");

  checkoutCardContainer.appendChild(checkoutDetailsContainer);

  //Left Container
  const leftDetailsContainer = document.createElement("div");
  leftDetailsContainer.classList.add("left-details-container");

  //Customer Details
  const cName = (() => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === "username") {
        return value;
      }
    }
    return null;
  })();


  const customerDetailsContainer = document.createElement("div");
  customerDetailsContainer.classList.add("customer-details-container");

  //Username
  const userNameContainer = document.createElement("div");
  userNameContainer.classList.add("username-container");

  const customerHeader = document.createElement("h1");
  customerHeader.textContent = "Customer Name";
  userNameContainer.appendChild(customerHeader);

  const customerName = document.createElement("p");
  customerName.textContent = cName;
  userNameContainer.appendChild(customerName);

  customerDetailsContainer.appendChild(userNameContainer);

  
  leftDetailsContainer.appendChild(customerDetailsContainer);

  //Orders Summary
  const orderSummaryContainer = document.createElement("div");
  orderSummaryContainer.classList.add("orders-summary-container");

  //Orders Header
  const orderSummaryTextContainer = document.createElement("div");
  orderSummaryTextContainer.classList.add("orders-summary-text-container");

  const orderSummaryHeader = document.createElement("h1");
  orderSummaryHeader.textContent = "Order Summary";
  orderSummaryTextContainer.appendChild(orderSummaryHeader);

  const totalText = document.createElement("p");
  totalText.textContent = "Total:";
  orderSummaryTextContainer.appendChild(totalText);

  orderSummaryContainer.appendChild(orderSummaryTextContainer);

  const orderTotalPrice = document.createElement("p");
  orderTotalPrice.textContent = `₱${prodTotal}`;
  orderSummaryContainer.appendChild(orderTotalPrice);

  leftDetailsContainer.appendChild(orderSummaryContainer);

  //pickup location/date/time
  const pickupContainer = document.createElement("div");
  pickupContainer.classList.add("pickup-container");

  //pickup header
  const pickupHeader = document.createElement("h1");
  pickupHeader.textContent = "Pickup Date, Time and Location";

  pickupContainer.appendChild(pickupHeader);

  //pickup dropdown
  const pickUpDropdown = document.createElement("select");
  pickUpDropdown.classList.add("pickup-dropdown");

  pickUpDropdown.innerHTML = ""; // Clear existing options

  schedules.schedules.forEach((schedule) => {
    const optionList = document.createElement("option");
    
    const dateFormat = new Date(schedule.date);
    const readableFormat = dateFormat.toLocaleString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Use the original ISO date for accurate time calculations
    const startDateTime = new Date(
      `${schedule.date.split("T")[0]}T${schedule.start_time}`
    );
    const formattedStartTime = startDateTime.toLocaleTimeString("en-us", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const endDateTime = new Date(
      `${schedule.date.split("T")[0]}T${schedule.end_time}`
    );
    const formattedEndTime = endDateTime.toLocaleTimeString("en-us", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    optionList.value = `${schedule.date} | ${schedule.start_time} - ${schedule.end_time} | ${schedule.location}`;
    optionList.textContent = `${readableFormat} | ${formattedStartTime} - ${formattedEndTime} | ${schedule.location}`;
    optionList.id = schedule.schedule_id;
    pickUpDropdown.appendChild(optionList);
  });

  pickupContainer.appendChild(pickUpDropdown);
  leftDetailsContainer.appendChild(pickupContainer);

  checkoutDetailsContainer.appendChild(leftDetailsContainer);

  //Right Container
  const rightDetailsContainer = document.createElement("div");
  rightDetailsContainer.classList.add("right-details-container");

  const scrollable = document.createElement("div");
  scrollable.classList.add("checkout-scrollable");

  const checkoutProductContainer = document.createElement("div");
  checkoutProductContainer.classList.add("checkout-product-container");

  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("details-container");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  // IMAGE ISSUES
  // Convert the product.product_image to a Uint8Array
  const byteArray = new Uint8Array(prodImage.data);

  // Create a Blob from the byteArray
  const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust MIME type if necessary

  // Create a temporary object URL for the blob
  const imageUrl = URL.createObjectURL(blob);

  const productImage = document.createElement("img");
  productImage.src = imageUrl;
  imageContainer.appendChild(productImage);

  detailsContainer.appendChild(imageContainer);

  const productActionsContainer = document.createElement("div");
  productActionsContainer.classList.add("product-actions-container");

  const productName = document.createElement("p");
  productName.textContent = prodName;
  productActionsContainer.appendChild(productName);

  const productQuantity = document.createElement("p");
  productQuantity.textContent = `x${prodQuantity}`;
  productActionsContainer.appendChild(productQuantity);

  detailsContainer.appendChild(productActionsContainer);

  const productTotal = document.createElement("p");
  productTotal.textContent = `₱${prodTotal}`;

  checkoutProductContainer.appendChild(detailsContainer);
  checkoutProductContainer.appendChild(productTotal);

  scrollable.appendChild(checkoutProductContainer);

  rightDetailsContainer.appendChild(scrollable);

  const completeOrder = document.createElement("div");
  completeOrder.classList.add("complete-order-container");

  const totalSection = document.createElement("div");
  totalSection.classList.add("total-section");

  const totalLabel = document.createElement("p");
  totalLabel.textContent = "Total: ";
  totalSection.appendChild(totalLabel);

  const productGrandTotal = document.createElement("p");
  productGrandTotal.textContent = `₱${prodTotal}`;
  totalSection.appendChild(productGrandTotal);

  const completeOrderButton = document.createElement("button");
  completeOrderButton.classList.add("complete-order-button");
  completeOrderButton.textContent = "Complete Order";

  completeOrder.appendChild(totalSection);
  completeOrder.appendChild(completeOrderButton);

  rightDetailsContainer.appendChild(completeOrder);

  checkoutDetailsContainer.appendChild(rightDetailsContainer);

  container.appendChild(checkoutCardContainer);
  console.log("product id before completing order:"+ product_id);
  completeOrderButton.addEventListener("click", async ()=>{
    const selectedOption = pickUpDropdown.options[pickUpDropdown.selectedIndex];
    console.log("schedule id selected: "+selectedOption.id);
    console.log("org id: "+ org_id);
    

    //order_products
    console.log("product quantity: "+ prodQuantity);
    console.log("product id before completing order:"+ product_id);

    //both orders and order_products
    console.log("total " + prodTotal);

    const payload = {
      schedule_id: selectedOption.id,
      products:[
        {
        product_id: product_id,
        quantity: prodQuantity,
        total: prodTotal,
        },
      ],
    };

    await completeAndPlaceOrder(payload, org_id);
  });
  
}

async function completeAndPlaceOrder(payload, org_id) {
  console.log("sending to server: ")
  console.log(payload);
  
  try {
      const response = await fetch(`/api/${org_id}/checkout`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
        },
      });
      const result = await response.json();
      console.log(result);
      if(response.status === 200){
        console.log("success")
        // const currentUrl = window.location.origin; // Get base URL (e.g., http://localhost:3000/) // I made this dynamic for the purpose of docker
        // const ordersUrl = `${currentUrl}/pages/orders.html`;
        // window.location.href = ordersUrl;
      }else if(response.status === 400){
        console.log("400 response");
      }else if(response.status === 406){
        alert('Insufficient product');
      }
  } catch (err) {
      console.error("Error adding to cart:", err);
    
  }
}

async function addProductsToCart(product_id, organization_id, prodquantity) {

  const payload = {
    "product_id": product_id,
    "orgid": organization_id,
    "quantity": prodquantity
  }
  console.log("sending to server: "+ payload)
  try {
      const response = await fetch('/api/cart', {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
        },
      });
      const result = await response.json();
        console.log(result);
      if(response.status === 201){
        // const currentUrl = window.location.origin; // Get base URL (e.g., http://localhost:3000/) // I made this dynamic for the purpose of docker
        // const ordersUrl = `${currentUrl}/pages/mycart.html`;
        // window.location.href = ordersUrl;
        console.log("success")
        
      }else if(response.status === 400){
        console.log("400 response");
      }
  } catch (err) {
      console.error("Error adding to cart:", err);
    
  }
}
