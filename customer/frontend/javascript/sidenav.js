//PRODUCTS PAGE
var productsButton = document.getElementById('products')
productsButton.addEventListener('click', function(){
  const currentUrl = window.location.origin; // Get base URL (e.g., http://localhost:3000) // I made this dynamic for the purpose of docker
  const productsUrl = `${currentUrl}/pages/products.html`;
  // Redirect the user to the dashboard page
  window.location.href = productsUrl;
});

//MYCART PAGE
var cartButton = document.getElementById('cart')
cartButton.addEventListener('click', function(){
  const currentUrl = window.location.origin; // Get base URL (e.g., http://localhost:3000) // I made this dynamic for the purpose of docker
  const cartUrl = `${currentUrl}/pages/mycart.html`;
  // Redirect the user to the dashboard page
  window.location.href = cartUrl;
});