async function getCartDetails() {
  try {
    const response = await fetch("/api/cart", {
      method: "GET",
    });
    
    const result = await response.json();
    console.log("hello");
    console.log(result);
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

let currentSubtotal = 0;

function showCart(carts){
  const mainContainer =  document.querySelector('.card-content-container');

  mainContainer.innerHTML = "";

  const innerContainer = document.createElement('div');
  innerContainer.classList.add("inner-container");

  //Card Header
  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card-header');

  const cardTitle = document.createElement('h1');
  cardTitle.textContent = "Your Cart";
  cardHeader.appendChild(cardTitle);

  const cardHeaderImage = document.createElement('img');
  cardHeaderImage.src = "../resources/images/cart/cart-header-icon.png";
  cardHeader.appendChild(cardHeaderImage);
  innerContainer.appendChild(cardHeader);

  //Item Cards
  carts.orgArray.forEach((cart) => {
    const itemCardContainer = document.createElement('div');
    itemCardContainer.classList.add('item-card-container');

    const innerItemCardContainer = document.createElement('div');
    innerItemCardContainer.classList.add('inner-item-card-container');

    //product title
    const productTitle = document.createElement('div');
    productTitle.classList.add('product-title'); 

    //Left Header
    const leftHeader = document.createElement('h1');
    leftHeader.classList.add('booth-name')
    leftHeader.textContent = `Item's from ${cart.organization_name}`;
    leftHeader.id = `${cart.organization_name}`;

    productTitle.appendChild(leftHeader);

    //Right Header
    const rightHeader = document.createElement('div');
    rightHeader.classList.add('column-headers');

    const columnHeaderPrice = document.createElement('h1');
    columnHeaderPrice.classList.add("column-price-header");
    columnHeaderPrice.textContent = "Price";
    rightHeader.appendChild(columnHeaderPrice);

    const columnHeaderQuantity = document.createElement('h1');
    columnHeaderQuantity.classList.add("column-quantity-header");
    columnHeaderQuantity.textContent = "Quantity";
    rightHeader.appendChild(columnHeaderQuantity);

    const columnHeaderTotal = document.createElement('h1');
    columnHeaderTotal.classList.add("column-total-header");
    columnHeaderTotal.textContent = "Total";
    rightHeader.appendChild(columnHeaderTotal);

    productTitle.appendChild(rightHeader);

    innerItemCardContainer.appendChild(productTitle);

    itemCardContainer.appendChild(innerItemCardContainer);

    cart.products.forEach((product) => {
      const productContainer = document.createElement('div');
      productContainer.classList.add('product-container');

      //product info
      const productInfoContainer = document.createElement('div');
      productInfoContainer.classList.add('product-info-container');

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      
      // IMAGE ISSUES
      // Convert the product.product_image to a Uint8Array
      const byteArray = new Uint8Array(product.product_image.data);

      // Create a Blob from the byteArray
      const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust MIME type if necessary

      // Create a temporary object URL for the blob
      const imageUrl = URL.createObjectURL(blob);
      
      const productImage = document.createElement('img');
      productImage.src = imageUrl;
      imageContainer.appendChild(productImage);

      const productName = document.createElement('p');
      productName.textContent = product.product_name;

      productInfoContainer.appendChild(imageContainer);
      productInfoContainer.appendChild(productName);

      //product actions
      const productActionsContainer = document.createElement('div');
      productActionsContainer.classList.add('product-actions-container');

      //Product Price
      const productPrice = document.createElement('p');
      productPrice.classList.add('product-price');
      productPrice.textContent = `P ${product.product_price}`;
      productActionsContainer.appendChild(productPrice);

      //Product Quantity
      const productQuantity = document.createElement('div');
      productQuantity.classList.add('product-quantity');

      const minusButton = document.createElement("button");
      minusButton.classList.add("qty-count--minus");
      minusButton.textContent = "-";
      productQuantity.appendChild(minusButton);

      const quantityInput = document.createElement("input");
      quantityInput.classList.add("input-box");
      quantityInput.setAttribute("type", "number");
      quantityInput.setAttribute("min", "1");
      quantityInput.setAttribute("value", product.product_quantity);
      quantityInput.setAttribute("max", product.product_quantity);
      productQuantity.appendChild(quantityInput);

      const plusButton = document.createElement("button");
      plusButton.classList.add("qty-count--plus");
      plusButton.textContent = "+";
      productQuantity.appendChild(plusButton);

      productActionsContainer.appendChild(productQuantity);
       
      plusButton.addEventListener("click", () => {
        let currentQuantity = parseInt(quantityInput.value);
        if(currentQuantity < product.product_quantity){
          currentQuantity++;
          quantityInput.value = currentQuantity;
          updateTotal(quantityInput.value, product.product_price);
          const subtotal = cart.products.reduce((acc, product) => acc + parseFloat(product.total || 0), 0);
          priceTotal.textContent = `P${subtotal.toFixed(2)}`;
        }
      });

      minusButton.addEventListener("click", () => {
        let currentQuantity = parseInt(quantityInput.value);
        if(currentQuantity > 1){
          currentQuantity--;
          quantityInput.value = currentQuantity;
          updateTotal(quantityInput.value, product.product_price);
          const subtotal = cart.products.reduce((acc, product) => acc + parseFloat(product.total || 0), 0);
          priceTotal.textContent = `P${subtotal.toFixed(2)}`;
        }
      });

      function updateTotal(quantity,price){
        //converted the readprice from string to number using parseFloat
        const numericPrice = parseFloat(price);
        let productPriceTotal = quantity * numericPrice;
        productTotal.textContent =`P${productPriceTotal.toFixed(2)}`;
        product.total = productPriceTotal;
      }

      //Product Total
      const productTotal = document.createElement('p')
      productTotal.classList.add('product-total');
      productTotal.textContent = `P${product.total}`;
      productActionsContainer.appendChild(productTotal);

      productContainer.appendChild(productInfoContainer);
      productContainer.appendChild(productActionsContainer);

      innerItemCardContainer.appendChild(productContainer);
      itemCardContainer.appendChild(innerItemCardContainer);
    });

    //Item Card Footer
    const itemCardFooter  = document.createElement('div');
    itemCardFooter.classList.add('item-card-footer');

    const subtotalSection = document.createElement('div')
    subtotalSection.classList.add('subtotal-section');

    const priceTotalLabel = document.createElement('p');
    priceTotalLabel.textContent = "Subtotal";
    subtotalSection.appendChild(priceTotalLabel);

    //Computes for the subtotal
    //converted the readtotal from string to number using parseFloat
    const totalPrice = cart.products.reduce((acc, product) => acc + parseFloat(product.total || 0), 0);

    const priceTotal = document.createElement('p');
    priceTotal.textContent = `P${totalPrice.toFixed(2)}`;
    subtotalSection.appendChild(priceTotal);

    itemCardFooter.appendChild(subtotalSection);

    const checkoutButton = document.createElement('button');
    checkoutButton.classList.add('checkout-button');
    checkoutButton.textContent = "CHECKOUT";
    checkoutButton.addEventListener("click", async function () {
      let prodDescription = await getCartDetails();
      loadCheckoutPage(prodDescription);
    });

    itemCardFooter.appendChild(checkoutButton);

    innerItemCardContainer.appendChild(itemCardFooter);
    itemCardContainer.appendChild(innerItemCardContainer);

    innerContainer.appendChild(itemCardContainer);
  });

  mainContainer.appendChild(innerContainer);
}

async function getCheckoutDetails(orgID) {
  try {
    const response = await fetch(`/api/${orgID}/checkout`, {
      method: "POST",
    });
    
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

function loadCheckoutPage(prod){
  const container = document.querySelector(".inner-container");
  
  container.innerHTML = "";

  //Main Container
  const checkoutCardContainer = document.createElement('div');
  checkoutCardContainer.classList.add('checkout-card-container');

  //Card Header
  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card-header');

  const cardTitle = document.createElement('h1');
  cardTitle.textContent = "Checkout";
  cardHeader.appendChild(cardTitle);

  const cardBackButton = document.createElement('button');
  cardBackButton.classList.add('back-button'); 
  cardBackButton.src = "../resources/images/cart/cart-header-icon.png";
  cardBackButton.addEventListener("click", async function () {
    const mainContainer = document.querySelector(".card-content-container");
    mainContainer.innerHTML = "";
    let carts = await getCartDetails();
    showCart(carts);
  });
  cardHeader.appendChild(cardBackButton);

  checkoutCardContainer.appendChild(cardHeader);

  //Inner Container
  const checkoutDetailsContainer = document.createElement('div');
  checkoutDetailsContainer.classList.add('checkout-details-container');

  checkoutCardContainer.appendChild(checkoutDetailsContainer);
  
  //Left Container
  const leftDetailsContainer = document.createElement('div');
  leftDetailsContainer.classList.add('left-details-container');

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

  const customerDetailsContainer =  document.createElement('div');
  customerDetailsContainer.classList.add('customer-details-container');

  const customerHeader = document.createElement('h1');
  customerHeader.textContent = "Customer Name";
  customerDetailsContainer.appendChild(customerHeader);

  const customerName = document.createElement('p');
  customerName.textContent = cName;
  customerDetailsContainer.appendChild(customerName);

  const customerID = document.createElement('p');
  customerID.textContent = `customer ID : ${prod.user_id}`;
  customerDetailsContainer.appendChild(customerID);
  
  leftDetailsContainer.appendChild(customerDetailsContainer);

  //Orders Summary
  const orderSummaryContainer =  document.createElement('div');
  orderSummaryContainer.classList.add('orders-summary-container');
  
  const orderSummaryHeader = document.createElement('h1');
  orderSummaryHeader.textContent = "Order Summary";
  orderSummaryContainer.appendChild(orderSummaryHeader);
  
  // const orderTotalPrice = document.createElement('p');
  // orderTotalPrice.textContent = `P${total.toFixed(2)}`;
  // console.log(orderTotalPrice);
  // orderSummaryContainer.appendChild(orderTotalPrice);

  leftDetailsContainer.appendChild(orderSummaryContainer);

  checkoutDetailsContainer.appendChild(leftDetailsContainer);
  container.appendChild(checkoutCardContainer);
}