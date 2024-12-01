async function getBoothDetails() {
  try {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "GET",
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

window.onload = async function () {
  let booths = await getBoothDetails();
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
        //VIEW BUTTON
        let productDetails = await getProductDetails(
          product.organization_id,
          product.product_id
        );

        const ref1 = viewButton.closest(".booth-container");

        const reference = String(ref1);

        const orgName = boothName.textContent;
        viewProductDetails(orgName, productDetails, reference);
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
    const response = await fetch(
      `http://localhost:3000/api/${orgId}/products`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
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

      viewProductDetails(organizationName, productDetails, reference);
    });

    viewButtonContainer.appendChild(viewButton);
    itemCard.appendChild(viewButtonContainer);

    productGridContainer.appendChild(itemCard);
  });
  productsContainer.appendChild(productGridContainer);

  const bottomSpacer = document.createElement("div");
  bottomSpacer.classList.add("bottom-spacer");
  productsContainer.appendChild(bottomSpacer);

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
    const response = await fetch(
      `http://localhost:3000/api/${orgId}/products/${productId}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}
/* ==============Method for View======================== */
function viewProductDetails(orgName, product, reference) {
  const container = document.querySelector(".inner-container");

  container.innerHTML = "";

  //card header ====================================start================
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  // header naming
  const boothName = document.createElement("h2");
  boothName.textContent = orgName;
  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.src = "../resources/images/products/returnButton.png";
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
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("min", "1");
  quantityInput.setAttribute("value", "1");
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
  priceText.innerText = "Price: P " + product.product_price;

  const lineBreak = document.createElement("hr");

  priceContainer.appendChild(priceText);
  priceContainer.appendChild(lineBreak);

  // total price
  const totalInfo = document.createElement("h3");
  totalInfo.textContent = "Total: P " + product.product_price;
  totalInfo.id = "totalPrice";

  // append price container and total info
  rightContainer.appendChild(priceContainer);
  rightContainer.appendChild(totalInfo);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to Cart";

  const placeOrderButton = document.createElement("button");
  placeOrderButton.textContent = "Place Order";

  buttonsContainer.appendChild(addToCartButton);
  buttonsContainer.appendChild(placeOrderButton);

  rightContainer.appendChild(buttonsContainer);

  specificProductContainer.appendChild(rightContainer);
  container.appendChild(specificProductContainer);

  //EVENT LISTENERS FOR BUTTONS
  minusButton.addEventListener("click", () => {
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
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
    }): P ${totalPrice}`;
  }
}
