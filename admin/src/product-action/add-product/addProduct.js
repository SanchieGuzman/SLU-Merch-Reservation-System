function closeUIForAddEntry() {
  var popUpContainer = document.getElementById("add-product-pop-up-container");
  popUpContainer.remove();
}

function loadUIForAddEntry() {
  var popUpContainer = document.createElement("div");
  popUpContainer.setAttribute("id", "add-product-pop-up-container");

  // TOP TITLE AND BUTTON
  var top = document.createElement("div");
  top.setAttribute("id", "top");

  var title = document.createElement("h3");
  title.setAttribute("id", "title");
  title.textContent = "Add New Product";

  var closeButton = document.createElement("button");
  closeButton.setAttribute("id", "close-button");
  closeButton.addEventListener("click", closeUIForAddEntry);

  top.appendChild(title);
  top.appendChild(closeButton);

  // FORM
  var form = document.createElement("form");
  form.setAttribute("action", "../../src/product-action/add-product/add-product-backend.php");
  form.setAttribute("method", "POST");
  form.setAttribute("id", "add-product-form");
  form.setAttribute("enctype", "multipart/form-data");

  // Product Name
  var labelName = document.createElement("label");
  labelName.setAttribute("for", "name-text-field");
  labelName.classList.add("label");
  labelName.textContent = "Product Name";

  var nameField = document.createElement("input");
  nameField.setAttribute("type", "text");
  nameField.setAttribute("name", "product_name");
  nameField.setAttribute("id", "name-text-field");
  nameField.setAttribute("maxlength", "30");
  nameField.setAttribute("placeholder", "Enter Product Name");

  form.appendChild(labelName);
  form.appendChild(nameField);

  // Divider (Left and Right)
  var divider = document.createElement("div");
  divider.setAttribute("id", "divider");

  // Left Side
  var left = document.createElement("div");
  left.setAttribute("id", "left");

  var labelPrice = document.createElement("label");
  labelPrice.setAttribute("for", "price-text-field");
  labelPrice.classList.add("label");
  labelPrice.textContent = "Product Price";

  var priceField = document.createElement("input");
  priceField.setAttribute("type", "number");
  priceField.setAttribute("name", "product_price");
  priceField.setAttribute("id", "price-text-field");
  priceField.setAttribute("min", "0");
  priceField.setAttribute("placeholder", "Enter Product Price (eg.P1000)");

  var labelQuantity = document.createElement("label");
  labelQuantity.setAttribute("for", "quantity-text-field");
  labelQuantity.classList.add("label");
  labelQuantity.textContent = "Initial Quantity";

  var quantityField = document.createElement("input");
  quantityField.setAttribute("type", "number");
  quantityField.setAttribute("name", "product_quantity");
  quantityField.setAttribute("id", "quantity-text-field");
  quantityField.setAttribute("min", "1");
  quantityField.setAttribute("placeholder", "Enter Quantity (eg.10)");

  left.appendChild(labelPrice);
  left.appendChild(priceField);
  left.appendChild(labelQuantity);
  left.appendChild(quantityField);

  // Right Side
  var right = document.createElement("div");
  right.setAttribute("id", "right");

  var labelDescription = document.createElement("label");
  labelDescription.setAttribute("for", "description-text-field");
  labelDescription.classList.add("label");
  labelDescription.textContent = "Product Description";

  // var descriptionField = document.createElement('input');
  var descriptionField = document.createElement("textarea");
  // descriptionField.setAttribute('type', 'text');
  descriptionField.setAttribute("name", "product_description");
  descriptionField.setAttribute("id", "description-text-field");
  descriptionField.setAttribute("maxlength", "150");
  descriptionField.setAttribute("placeholder", "Enter Product Description");

  right.appendChild(labelDescription);
  right.appendChild(descriptionField);

  // Append Left and Right to Divider
  divider.appendChild(left);
  divider.appendChild(right);

  form.appendChild(divider);

  // Image Upload
  var labelImage = document.createElement("label");
  labelImage.setAttribute("for", "image-upload");
  labelImage.classList.add("label");
  labelImage.textContent = "Product Image";

  var imageUpload = document.createElement("input");
  imageUpload.setAttribute("type", "file");
  imageUpload.setAttribute("name", "product_image");
  imageUpload.setAttribute("id", "image-upload");
  imageUpload.setAttribute("accept", "image/*");

  form.appendChild(labelImage);
  form.appendChild(imageUpload);

  // Submit Button
  var addButton = document.createElement("button");
  addButton.setAttribute("type", "submit");
  addButton.setAttribute("name", "add");
  addButton.setAttribute("id", "add_button");
  addButton.textContent = "ADD";

  form.appendChild(addButton);

  // Message Element
  var message = document.createElement("div");
  message.setAttribute("id", "message");
  message.style.color = "red"; // Style the message (optional)
  message.style.display = "none"; // Hide the message by default
  form.appendChild(message);

  // Form Submit Event Listener
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Check for empty fields
    var fields = [
      nameField,
      priceField,
      quantityField,
      descriptionField,
      imageUpload,
    ];
    var allFilled = true;

    fields.forEach(function (field) {
      if (!field.value) {
        allFilled = false;
      }
    });

    // Display message if not all fields are filled
    if (!allFilled) {
      message.textContent =
        "Please fill out all fields before adding a product.";
      message.style.display = "block"; // Show the message
    } else {
      message.style.display = "none"; // Hide the message if all fields are filled
      form.submit(); // Proceed with form submission if all fields are filled
    }
  });

  // append top and form
  popUpContainer.appendChild(top);
  popUpContainer.appendChild(form);

  var main = document.getElementById("products-content");
  main.appendChild(popUpContainer);
}

var addProductButton = document.getElementById("add-product-button");
addProductButton.addEventListener("click", loadUIForAddEntry);
