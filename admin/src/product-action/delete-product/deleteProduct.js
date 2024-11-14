function closeUIForDeleteEntry() {
    var popUpContainer = document.getElementById("delete-product-pop-up-container");
    popUpContainer.remove();
  }
  
function loadUIForDeleteEntry(productId) {
    var popUpContainer = document.createElement("div");
    popUpContainer.setAttribute("id", "delete-product-pop-up-container");

    let confirmDeleteTitle = document.createElement('h1');
    confirmDeleteTitle.setAttribute('id', 'confirm-delete-title');
    confirmDeleteTitle.textContent = 'Confirm Delete';

    let deleteMessage = document.createElement('p');
    deleteMessage.setAttribute('id', 'delete-message');
    deleteMessage.textContent = 'Are you sure you want to delete this product? Customer won\t be able to buy it.'

    let buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('id', 'button-container-cancel-delete');

    // FORM
    let form = document.createElement("form");
    form.setAttribute("action", "../../src/product-action/delete-product/delete-product-backend.php");
    form.setAttribute("method", "POST");
    form.setAttribute("id", "delete-product-form");

    //cancel 
    var cancelButton = document.createElement("button");
    cancelButton.setAttribute("id", "cancel-button");
    cancelButton.addEventListener("click", closeUIForDeleteEntry);
    cancelButton.textContent = "Cancel";

    //delete button
    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "submit");
    deleteButton.setAttribute("name",  "ProductID"); //product ID to be deleted
    deleteButton.setAttribute("value",  `${productId}`); //product ID to be deleted
    deleteButton.setAttribute("id", "delete-button");
    deleteButton.textContent = "Delete";

    console.log(deleteButton.name);


    form.append(cancelButton);
    form.append(deleteButton);

    //appending to main container
    popUpContainer.append(confirmDeleteTitle, deleteMessage, form);


    var main = document.getElementById("products-content");
    main.appendChild(popUpContainer);
}  