async function getCartDetails() {
  try {
    const response = await fetch("/api/cart", {
      method: "GET",
    });

    const result = await response.json();

    // babalik sa login if unauthorized
    if (response.status === 401) {
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
    if (response.status === 401) {
      const originURL = window.location.origin;
      window.location.href = originURL;
    }

    return result;
  } catch (err) {
    console.log(err);
  }
}

window.onload = async function () {
  let carts = await getCartDetails();
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

  showCart(carts);
};

function showCart(carts) {
  const mainContainer = document.querySelector(".card-content-container");
  console.log(carts);

  mainContainer.innerHTML = "";

  const innerContainer = document.createElement("div");
  innerContainer.classList.add("inner-container");

  //Card Header
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");

  const cardTitle = document.createElement("h2");
  cardTitle.textContent = "Your Cart";
  cardHeader.appendChild(cardTitle);

  const cardHeaderImage = document.createElement("img");
  cardHeaderImage.src = "../resources/images/cart/cart-header-icon.png";
  cardHeader.appendChild(cardHeaderImage);
  innerContainer.appendChild(cardHeader);

  //Item Cards
  carts.orgArray.forEach((cart) => {
    const itemCardContainer = document.createElement("div");
    itemCardContainer.classList.add("item-card-container");

    const innerItemCardContainer = document.createElement("div");
    innerItemCardContainer.classList.add("inner-item-card-container");

    //product title
    const productTitle = document.createElement("div");
    productTitle.classList.add("product-title");

    //Left Header
    const leftHeader = document.createElement("h3");

    leftHeader.classList.add("booth-name");
    leftHeader.textContent = `Item's from ${cart.orgname}`;
    leftHeader.id = `${cart.orgid}`;

    productTitle.appendChild(leftHeader);

    //Right Header
    const rightHeader = document.createElement("div");
    rightHeader.classList.add("column-headers");

    const columnHeaderPrice = document.createElement("h3");
    columnHeaderPrice.classList.add("column-price-header");
    columnHeaderPrice.textContent = "Price";
    rightHeader.appendChild(columnHeaderPrice);

    const columnHeaderQuantity = document.createElement("h3");
    columnHeaderQuantity.classList.add("column-quantity-header");
    columnHeaderQuantity.textContent = "Quantity";
    rightHeader.appendChild(columnHeaderQuantity);

    const columnHeaderTotal = document.createElement("h3");
    columnHeaderTotal.classList.add("column-total-header");
    columnHeaderTotal.textContent = "Total";
    rightHeader.appendChild(columnHeaderTotal);

    productTitle.appendChild(rightHeader);

    innerItemCardContainer.appendChild(productTitle);

    itemCardContainer.appendChild(innerItemCardContainer);

    cart.products.forEach((product) => {
      const productContainer = document.createElement("div");
      productContainer.classList.add("product-container");

      //product info
      const productInfoContainer = document.createElement("div");
      productInfoContainer.classList.add("product-info-container");

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");

      // IMAGE ISSUES
      // Convert the product.product_image to a Uint8Array
      const byteArray = new Uint8Array(product.product_image.data);

      // Create a Blob from the byteArray
      const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust MIME type if necessary

      // Create a temporary object URL for the blob
      const imageUrl = URL.createObjectURL(blob);

      const productImage = document.createElement("img");
      productImage.src = imageUrl;
      imageContainer.appendChild(productImage);

      const productName = document.createElement("p");
      productName.textContent = product.product_name;

      productInfoContainer.appendChild(imageContainer);
      productInfoContainer.appendChild(productName);

      //product actions
      const productActionsContainer = document.createElement("div");
      productActionsContainer.classList.add("product-actions-container");

      //Product Price
      const productPrice = document.createElement("p");
      productPrice.classList.add("product-price");
      productPrice.textContent = `₱ ${product.product_price}`;
      productActionsContainer.appendChild(productPrice);

      //Product Quantity
      const productQuantity = document.createElement("div");
      productQuantity.classList.add("product-quantity");

      const minusButton = document.createElement("button");
      minusButton.classList.add("qty-count--minus");
      minusButton.textContent = "-";
      productQuantity.appendChild(minusButton);

      const quantityInput = document.createElement("input");
      quantityInput.disabled = true;
      quantityInput.classList.add("input-box");
      quantityInput.setAttribute("type", "number");
      quantityInput.setAttribute("min", "0");
      quantityInput.setAttribute("value", product.product_quantity);
      quantityInput.setAttribute("max", product.product_quantity);
      quantityInput.setAttribute("data-product-id", product.product_id);
      productQuantity.appendChild(quantityInput);

      const plusButton = document.createElement("button");
      plusButton.classList.add("qty-count--plus");
      plusButton.textContent = "+";
      productQuantity.appendChild(plusButton);

      productActionsContainer.appendChild(productQuantity);

      quantityInput.addEventListener("input", () => {
        let currentQuantity = parseInt(quantityInput.value);

        if (currentQuantity > product.total_stocks) {
          quantityInput.value = product.total_stocks;
          currentQuantity = product.total_stocks;
        }
        if (currentQuantity < 1 || isNaN(currentQuantity)) {
          quantityInput.value = 1;
          currentQuantity = 1;
        }
        updateTotal(currentQuantity, product.product_price);
      });

      plusButton.addEventListener("click", () => {
        let currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity < product.total_stocks) {
          currentQuantity++;
          quantityInput.value = currentQuantity;
          product.product_quantity = currentQuantity;
          // console.log(product.product_quantity);
          updateTotal(quantityInput.value, product.product_price);

          const subtotal = cart.products.reduce(
            (acc, product) => acc + parseFloat(product.total || 0),
            0
          );
          priceTotal.textContent = `₱ ${subtotal.toFixed(2)}`;
        } else {
          alert("Maximum Stock Reached");
        }
      });

      minusButton.addEventListener("click", async () => {
        // const outerContainer = document.querySelector(".item-card-container");
        const cardContainer = minusButton.closest(".inner-item-card-container");
        console.log(cardContainer);
        const count = cardContainer.childElementCount;

        let currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity > 1) {
          currentQuantity--;
          quantityInput.value = currentQuantity;
          product.product_quantity = currentQuantity;
          // console.log(product.product_quantity);
          updateTotal(quantityInput.value, product.product_price);

          const subtotal = cart.products.reduce(
            (acc, product) => acc + parseFloat(product.total || 0),
            0
          );
          priceTotal.textContent = `₱ ${subtotal.toFixed(2)}`;
        } else if (currentQuantity == 1) {
          console.log(cart.orgid);
          console.log(product.product_id);

          const payload = {
            org_id: cart.orgid,
            product_id: product.product_id,
          };

          await deleteItemsFromCart(payload);

          if (count == 3) {
            const outerContainer = minusButton.closest(".item-card-container");
            outerContainer.remove();
          }

          //Remove the product container if quantity is 0
          const productContainer = minusButton.closest(".product-container");
          productContainer.remove();
        }
      });

      function updateTotal(quantity, price) {
        //converted the readprice from string to number using parseFloat
        const numericPrice = parseFloat(price);
        let productPriceTotal = quantity * numericPrice;
        productTotal.textContent = `₱ ${productPriceTotal.toFixed(2)}`;
        product.total = productPriceTotal;
      }

      //Product Total
      const productTotal = document.createElement("p");
      productTotal.classList.add("product-total");
      productTotal.textContent = `₱${product.total}`;
      productActionsContainer.appendChild(productTotal);

      productContainer.appendChild(productInfoContainer);
      productContainer.appendChild(productActionsContainer);

      innerItemCardContainer.appendChild(productContainer);
      itemCardContainer.appendChild(innerItemCardContainer);
    });

    //Item Card Footer
    const itemCardFooter = document.createElement("div");
    itemCardFooter.classList.add("item-card-footer");

    const subtotalSection = document.createElement("div");
    subtotalSection.classList.add("subtotal-section");

    const priceTotalLabel = document.createElement("p");
    priceTotalLabel.textContent = "Subtotal";
    subtotalSection.appendChild(priceTotalLabel);

    //Computes for the subtotal
    //converted the readtotal from string to number using parseFloat
    const totalPrice = cart.products.reduce(
      (acc, product) => acc + parseFloat(product.total || 0),
      0
    );

    const priceTotal = document.createElement("p");
    priceTotal.classList.add("price-total");
    priceTotal.textContent = `₱ ${totalPrice.toFixed(2)}`;
    subtotalSection.appendChild(priceTotal);

    itemCardFooter.appendChild(subtotalSection);

    const checkoutButton = document.createElement("button");
    checkoutButton.classList.add("checkout-button");
    checkoutButton.textContent = "CHECKOUT";
    checkoutButton.addEventListener("click", async function () {
      const orgId = cart.orgid;
      let selectedOrgProducts = carts.orgArray.filter(
        (cart) => cart.orgid.toString() === orgId.toString()
      );

      selectedOrgProducts.forEach((cart) => {
        cart.products.forEach((product) => {
          const quantityInput = document.querySelector(
            `.input-box[data-product-id="${product.product_id}"]`
          );
          if (quantityInput) {
            product.product_quantity = parseInt(quantityInput.value);
          }
        });
      });
      let schedules = await getScheduleDetails(cart.orgid);

      loadCheckoutPage(selectedOrgProducts, priceTotal.textContent, schedules);
    });

    itemCardFooter.appendChild(checkoutButton);

    innerItemCardContainer.appendChild(itemCardFooter);
    itemCardContainer.appendChild(innerItemCardContainer);

    innerContainer.appendChild(itemCardContainer);
  });

  mainContainer.appendChild(innerContainer);
}

function loadCheckoutPage(prod, total, schedules) {
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
    const mainContainer = document.querySelector(".card-content-container");
    mainContainer.innerHTML = "";
    let carts = await getCartDetails();
    showCart(carts);
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
  orderTotalPrice.textContent = `${total}`;
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

  prod.forEach((organization) => {
    organization.products.forEach((product) => {
      const checkoutProductContainer = document.createElement("div");
      checkoutProductContainer.classList.add("checkout-product-container");

      const detailsContainer = document.createElement("div");
      detailsContainer.classList.add("details-container");

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");

      // IMAGE ISSUES
      // Convert the product.product_image to a Uint8Array
      const byteArray = new Uint8Array(product.product_image.data);

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
      productName.textContent = product.product_name;
      productActionsContainer.appendChild(productName);

      const productQuantity = document.createElement("p");
      productQuantity.textContent = `x${product.product_quantity}`;
      productActionsContainer.appendChild(productQuantity);

      detailsContainer.appendChild(productActionsContainer);

      const productTotal = document.createElement("p");
      productTotal.textContent = `₱${
        product.product_price * product.product_quantity
      }`;

      checkoutProductContainer.appendChild(detailsContainer);
      checkoutProductContainer.appendChild(productTotal);

      scrollable.appendChild(checkoutProductContainer);

      rightDetailsContainer.appendChild(scrollable);
    });
  });

  const completeOrder = document.createElement("div");
  completeOrder.classList.add("complete-order-container");

  const totalSection = document.createElement("div");
  totalSection.classList.add("total-section");

  const totalLabel = document.createElement("p");
  totalLabel.textContent = "Total: ";
  totalSection.appendChild(totalLabel);

  const productTotal = document.createElement("p");
  productTotal.textContent = `${total}`;
  totalSection.appendChild(productTotal);

  const completeOrderButton = document.createElement("button");
  completeOrderButton.classList.add("complete-order-button");
  completeOrderButton.textContent = "Complete Order";
  completeOrder.addEventListener("click", async function () {
    const selectedOption = pickUpDropdown.options[pickUpDropdown.selectedIndex];
    console.log("schedule id selected: " + selectedOption.id);
    //populate array
    products_array = [];
    prod.forEach((organization) => {
      organization.products.forEach((product) => {
        let products = {
          product_id: product.product_id,
          quantity: product.product_quantity,
          total: product.total,
        };
        products_array.push(products);
      });
    });

    const payload = {
      schedule_id: selectedOption.id,
      products: products_array,
    };
    console.log(payload, prod[0].orgid);
    completeAndPlaceOrder(payload, prod[0].orgid);

    removeCart();

    let carts = await getCartDetails();

    showCart(carts);
  });

  completeOrder.appendChild(totalSection);
  completeOrder.appendChild(completeOrderButton);

  rightDetailsContainer.appendChild(completeOrder);

  checkoutDetailsContainer.appendChild(rightDetailsContainer);

  container.appendChild(checkoutCardContainer);
}

function removeCart() {
  const container = document.querySelector(".inner-container");

  container.innerHTML = " ";
}
async function completeAndPlaceOrder(payload, org_id) {
  console.log("sending to server: ");
  console.log(payload);

  try {
    const response = await fetch(`/api/${org_id}/checkout`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    if (response.status === 200) {
      console.log("success");
      // const currentUrl = window.location.origin; // Get base URL (e.g., http://localhost:3000/) // I made this dynamic for the purpose of docker
      // const ordersUrl = `${currentUrl}/pages/orders.html`;
      // window.location.href = ordersUrl;
    } else if (response.status === 400) {
      console.log("400 response");
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
}
async function deleteItemsFromCart(payload) {
  console.log("sending to server: ");
  console.log(payload);

  try {
    const response = await fetch(`/api/cart`, {
      method: "DELETE",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    if (response.status === 200) {
      console.log("success");
    } else if (response.status === 400) {
      console.log("400 response");
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
}
