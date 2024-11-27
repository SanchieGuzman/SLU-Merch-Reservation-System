document.addEventListener('DOMContentLoaded', function () {
  const currentPath = window.location.pathname;
  if (currentPath.includes('/pages/mycart.html')) {
    showCart(); 
  }
});

var cartButton = document.getElementById('cart')
cartButton.addEventListener('click', function(){
  const currentUrl = window.location.origin; // Get base URL (e.g., http://localhost:3000) // I made this dynamic for the purpose of docker
  const cartUrl = `${currentUrl}/pages/mycart.html`;
  // Redirect the user to the dashboard page
  window.location.href = cartUrl;
});

const data = {
  orgArray: [
    {
      organization_name: "ICON",
      organization_id: "1",
      products: [
        {
          product_id: 1,
          product_name: "Product 1", // Example name
          product_image: "../resources/images/products/hoodie.png", // Replace with actual blob URL or data
          product_price: 200,
          product_quantity: 10,
          total: 2000
        },
        {
          product_id: 2,
          product_name: "Product 2", // Example name
          product_image: "../resources/images/products/hoodie.png", // Replace with actual blob URL or data
          product_price: 150,
          product_quantity: 5,
          total: 750
        }
      ]
    },
    {
      organization_name: "KASAMA",
      organization_id: "3",
      products: [
        {
          product_id: 3,
          product_name: "Product 3", // Example name
          product_image: "../resources/images/products/hoodie.png", // Replace with actual blob URL or data
          product_price: 300,
          product_quantity: 2,
          total: 600
        },
        {
          product_id: 4,
          product_name: "Product 4", // Example name
          product_image: "../resources/images/products/hoodie.png", // Replace with actual blob URL or data
          product_price: 100,
          product_quantity: 20,
          total: 2000
        }
      ]
    }
  ]
};

function showCart(){
  const mainContainer =  document.querySelector('.cart-content-container');

  const innerContainer = document.createElement('div');
  innerContainer.classList.add("inner-container");

  //Card Header
  const cartHeader = document.createElement('div');
  cartHeader.classList.add('cart-header');

  const cartTitle = document.createElement('h1');
  cartTitle.textContent = "Your Cart";
  cartHeader.appendChild(cartTitle);

  const cartHeaderImage = document.createElement('img');
  cartHeaderImage.src = "../resources/images/cart/cart-header-icon.png";
  cartHeader.appendChild(cartHeaderImage);
  innerContainer.appendChild(cartHeader);

  //Item Cards
  data.orgArray.forEach((datum) => {
    const itemCardContainer = document.createElement('div');
    itemCardContainer.classList.add('item-card-container');

    //Item Card Header
    const itemCardHeader = document.createElement('div');
    itemCardHeader.classList.add('item-card-header');

    const leftHeader = document.createElement('h1');
    leftHeader.classList.add('booth-name')
    leftHeader.textContent = `Item's from ${datum.organization_name}`;

    itemCardHeader.appendChild(leftHeader);

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

    itemCardHeader.appendChild(rightHeader);
    itemCardContainer.appendChild(itemCardHeader);

    datum.products.forEach((product) => {
      const productContainer = document.createElement('div');
      productContainer.classList.add('product-container');

      const productDetailsContainer = document.createElement('div');
      productDetailsContainer.classList.add('product-details-container');

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

      const productImage = document.createElement('img');
      productImage.src = product.product_image;
      imageContainer.appendChild(productImage);
      productDetailsContainer.appendChild(imageContainer);

      productContainer.appendChild(productDetailsContainer);
      itemCardContainer.appendChild(productContainer);
      
    });

    //Item Card Footer
    const itemCardFooter  = document.createElement('div');
    itemCardFooter.classList.add('item-card-footer');

    const checkoutButton = document.createElement('button');
    checkoutButton.classList.add('checkout-button');
    checkoutButton.textContent = "Checkout";
    itemCardFooter.appendChild(checkoutButton);

    const priceTotalLabel = document.createElement('p');
    priceTotalLabel.textContent = "Total";
    itemCardFooter.appendChild(priceTotalLabel);

    const priceTotal = document.createElement('p');
    priceTotal.textContent = datum.products.total;
    itemCardFooter.appendChild(priceTotal);
    
    itemCardContainer.appendChild(itemCardFooter);
    
    innerContainer.appendChild(itemCardContainer);
  });

  mainContainer.appendChild(innerContainer);
}