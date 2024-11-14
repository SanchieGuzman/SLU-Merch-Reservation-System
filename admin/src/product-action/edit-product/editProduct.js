function closeUIForEditEntry() {
    var popUpContainer = document.getElementById("edit-product-pop-up-container");
    popUpContainer.remove();
  }
  
function loadUIForEditEntry(productId, productName, productQuantity, productPrice) {
    var popUpContainer = document.createElement("div");
    popUpContainer.setAttribute("id", "edit-product-pop-up-container");

    let editProductTitle = document.createElement('h1');
    editProductTitle.setAttribute('id', 'confirm-delete-title');
    editProductTitle.textContent = 'Edit Product';

    // FORM
    var form = document.createElement("form");
    form.setAttribute("action", "../../src/product-action/edit-product/edit-product-backend.php");
    form.setAttribute("method", "POST");
    form.setAttribute("id", "edit-product-form");

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
    labelQuantity.textContent = "Initial Quantity";

    var quantityField = document.createElement("input");
    quantityField.setAttribute("type", "number");
    quantityField.setAttribute("name", "product_quantity");
    quantityField.setAttribute("id", "quantity-text-field");
    quantityField.setAttribute("min", "1");
    quantityField.setAttribute("placeholder", `${productQuantity}`);


    form.append(labelName, nameField)
    form.append(labelPrice, priceField)
    form.append(labelQuantity, quantityField)

    // Cancel and Confirm  
    let buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('id', 'button-container-cancel-confirm');



    var addButton = document.createElement("button");
    addButton.setAttribute("type", "submit");
    addButton.setAttribute("name", "add");
    addButton.setAttribute("id", "add_button");
    addButton.textContent = "ADD";

    form.appendChild(addButton);


    //appending to main container
    popUpContainer.append(editProductTitle, form);


    var main = document.getElementById("products-content");
    main.appendChild(popUpContainer);
}  