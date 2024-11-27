async function login() {
  const loginDetails = {
    username: document.getElementById("usernameField").value,
    password: document.getElementById("passwordField").value,
  };

  try {
    const response = await fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    });

    if (response.status === 200) {
      const currentUrl = window.location.origin; // Get base URL (e.g., http://localhost:3000) // I made this dynamic for the purpose of docker
      const productsUrl = `${currentUrl}/pages/products.html`;

      // Redirect the user to the dashboard page
      window.location.href = productsUrl;
    } else if (response.status === 400) {
      var message = document.createElement("p");
      message.classList.add("error-message");
      const data = await response.json();
      message.innerHTML = "";
      message.textContent = data.message;
      const container = document.querySelector(".bottom-container");

      const existingMessage = container.querySelector(".error-message");
      if (existingMessage) {
        existingMessage.remove();
      }

      container.prepend(message);
    }
  } catch (err) {
    console.log(err);
  }
}

var loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", login);
