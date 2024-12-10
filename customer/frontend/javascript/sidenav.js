//ORDERS PAGE
var ordersButton = document.getElementById("orders");
ordersButton.addEventListener("click", function () {
  const currentUrl = window.location.origin; 
  const ordersUrl = `${currentUrl}/pages/orders.html`;
  // Redirect the user to the dashboard page
  window.location.href = ordersUrl;
});


// PRODUCTS PAGE
var productsButton = document.getElementById("products");
productsButton.addEventListener("click", function () {
  const currentUrl = window.location.origin; 
  const productsUrl = `${currentUrl}/pages/products.html`;
  // Redirect the user to the dashboard page
  window.location.href = productsUrl;
});

//MYCART PAGE
var cartButton = document.getElementById('cart');
cartButton.addEventListener('click', function(){
  const currentUrl = window.location.origin; 
  const cartUrl = `${currentUrl}/pages/mycart.html`;
  // Redirect the user to the dashboard page
  window.location.href = cartUrl;
});

//VENDORS PAGE
var vendorssButton = document.getElementById("vendors");
vendorssButton.addEventListener("click", function () {
  const currentUrl = window.location.origin; 
  const vendorsUrl = `${currentUrl}/pages/vendors.html`;
  // Redirect the user to the dashboard page
  window.location.href = vendorsUrl;
});

//LOGOUT PAGE
var logoutButton = document.getElementById("log-out");
logoutButton.addEventListener("click", async function () {
  try {
    const response = await fetch("/api/logout", {
      method: "POST",
    });
      if (response.status === 200) {
        const originURL = window.location.origin; 
                
        // Redirect the user to the login page
        window.location.href = originURL;
      }
  } catch (err) {
    console.log(err);
  }
});