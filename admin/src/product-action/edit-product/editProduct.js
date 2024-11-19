function closeUIForEditEntry() {
    var popUpContainer = document.getElementById("edit-product-pop-up-container");
    popUpContainer.remove();
  }
  
function loadUIForEditEntry(productId, productName, productQuantity, productPrice) {
    var popUpContainer = document.createElement("div");
    popUpContainer.setAttribute("id", "edit-product-pop-up-container");

    let editProductTitle = document.createElement('h1');
    editProductTitle.setAttribute('id', 'edit-product-title');
    editProductTitle.textContent = 'Edit Product';

    // FORM
    var form = document.createElement("form");
    form.setAttribute("action", "../../src/product-action/edit-product/edit-product-backend.php");
    form.setAttribute("method", "POST");
    form.setAttribute("id", "edit-product-form");

    //hidden input for productID
    var hiddenProductID = document.createElement("input");
    hiddenProductID.setAttribute("type", "hidden");
    hiddenProductID.setAttribute("name", "product_id");
    hiddenProductID.setAttribute("value", `${productId}`);

    // labels and inputs
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
    nameField.setAttribute("placeholder", `${productName}`);
    
    //Price
    var labelPrice = document.createElement("label");
    labelPrice.setAttribute("for", "price-text-field");
    labelPrice.classList.add("label");
    labelPrice.textContent = "Product Price";
  
    var priceField = document.createElement("input");
    priceField.setAttribute("type", "number");
    priceField.setAttribute("name", "product_price");
    priceField.setAttribute("id", "price-text-field");
    priceField.setAttribute("min", "0");
    priceField.setAttribute("placeholder", `${productPrice}`);

    //Quantity
    var labelQuantity = document.createElement("label");
    labelQuantity.setAttribute("for", "quantity-text-field");
    labelQuantity.classList.add("label");
    labelQuantity.textContent = "Product Quantity";

    var quantityField = document.createElement("input");
    quantityField.setAttribute("type", "number");
    quantityField.setAttribute("name", "product_quantity");
    quantityField.setAttribute("id", "quantity-text-field");
    quantityField.setAttribute("min", "1");
    quantityField.setAttribute("placeholder", `${productQuantity}`);

    form.appendChild(hiddenProductID)
    form.append(labelName, nameField)
    form.append(labelPrice, priceField)
    form.append(labelQuantity, quantityField)

    // Cancel and Confirm  
    let buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('id', 'button-container-cancel-confirm');

    //cancel 
    var cancelButton = document.createElement("button");
    cancelButton.setAttribute("id", "cancel-button-edit-popup");
    cancelButton.addEventListener("click", closeUIForEditEntry);
    cancelButton.textContent = "Cancel";

    //confirm button
    var confirmButton = document.createElement("button");
    confirmButton.setAttribute("type", "submit");
    // confirmButton.setAttribute("name",  "ProductID"); //product ID to be edited
    // confirmButton.setAttribute("value",  `${productId}`); //product ID to be edited
    confirmButton.setAttribute("id", "confirm-button-confirm-popup");
    confirmButton.textContent = "Confirm";

    buttonContainer.append(cancelButton, confirmButton)
    form.appendChild(buttonContainer);

    // Message Element
    var message = document.createElement("div");
    message.setAttribute("id", "message-box-edit-popup");
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
        quantityField
        ];

        var atleastOneIsFilled = false;

        for (let i = 0; i < fields.length; i++) {
            const element = fields[i].value;       

            if(element){
                atleastOneIsFilled = true;
                break;
            }
        }

        // Display message if not all fields are filled
        if (!atleastOneIsFilled) {
        message.textContent =
            "No changes tracked";
            message.style.display = "block"; // Show the message
        } else {
            //filing empty data
            if(!fields[0].value){
                fields[0].value = fields[0].placeholder;

            }
            
            if(!fields[1].value){
                fields[1].value = fields[1].placeholder;
            }
            
            if(!fields[2].value){
                fields[2].value = fields[2].placeholder;
            }
            message.style.display = "none"; // Hide the message if all fields are filled
            form.submit(); // Proceed with form submission if all fields are filled
        }
    });


    //appending to main container
    popUpContainer.append(editProductTitle, form, message);


    var main = document.getElementById("products-content");
    main.appendChild(popUpContainer);
}  