var ordersButton = document.getElementById("orders");
ordersButton.addEventListener("click", function () {
  const currentUrl = window.location.origin; // Get base URL (e.g., http://localhost:3000/) // I made this dynamic for the purpose of docker
  const ordersUrl = `${currentUrl}/pages/orders.html`;
  // Redirect the user to the dashboard page
  window.location.href = ordersUrl;
});

var productsButton = document.getElementById("products");
productsButton.addEventListener("click", function () {
  const currentUrl = window.location.origin; // Get base URL (e.g., http://localhost:3000/) // I made this dynamic for the purpose of docker
  const productsUrl = `${currentUrl}/pages/products.html`;
  // Redirect the user to the dashboard page
  window.location.href = productsUrl;
});

var vendorssButton = document.getElementById("vendors");
vendorssButton.addEventListener("click", function () {
  const currentUrl = window.location.origin; // Get base URL (e.g., http://localhost:3000/) // I made this dynamic for the purpose of docker
  const vendorsUrl = `${currentUrl}/pages/vendors.html`;
  // Redirect the user to the dashboard page
  window.location.href = vendorsUrl;
});
