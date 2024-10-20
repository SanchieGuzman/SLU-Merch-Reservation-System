function closeUI(){
    var popUpContainer = document.getElementById('pop-up-container');
    popUpContainer.remove();
}

function loadUI(){
    var popUpContainer = document.createElement('div');
    popUpContainer.setAttribute('id', 'pop-up-container');

    // TOP TITLE AND BUTTON 
    var top = document.createElement('div');
    top.setAttribute('id', 'top');

    var title = document.createElement('h3');
    title.setAttribute('id', 'title');
    title.textContent = 'Add New Product'

    var closeButton = document.createElement('button');
    closeButton.setAttribute('id', 'close-button');
    closeButton.addEventListener('click', closeUI);

    top.appendChild(title);
    top.appendChild(closeButton)

    // FORM
    var form = document.createElement('form');
    form.setAttribute('action', '../../src/add-product/add-product-backend.php');
    form.setAttribute('method', 'POST')
    form.setAttribute('id', 'add-product-form');

    // Product Name
    var labelName = document.createElement('label');
    labelName.setAttribute('for', 'name-text-field');
    labelName.classList.add('label');
    labelName.textContent = 'Product Name';
    
    var nameField = document.createElement('input');
    nameField.setAttribute('type', 'text');
    nameField.setAttribute('id', 'name-text-field');
    
    form.appendChild(labelName);
    form.appendChild(nameField);

    // Divider (Left and Right)
    var divider = document.createElement('div');
    divider.setAttribute('id', 'divider');

    // Left Side
    var left = document.createElement('div');
    left.setAttribute('id', 'left');

    var labelPrice = document.createElement('label');
    labelPrice.setAttribute('for', 'price-text-field');
    labelPrice.classList.add('label');
    labelPrice.textContent = 'Product Price';

    var priceField = document.createElement('input');
    priceField.setAttribute('type', 'text');
    priceField.setAttribute('id', 'price-text-field');

    var labelQuantity = document.createElement('label');
    labelQuantity.setAttribute('for', 'quantity-text-field');
    labelQuantity.classList.add('label');
    labelQuantity.textContent = 'Initial Quantity';

    var quantityField = document.createElement('input');
    quantityField.setAttribute('type', 'text');
    quantityField.setAttribute('id', 'quantity-text-field');

    left.appendChild(labelPrice);
    left.appendChild(priceField);
    left.appendChild(labelQuantity);
    left.appendChild(quantityField);

    // Right Side
    var right = document.createElement('div');
    right.setAttribute('id', 'right');

    var labelDescription = document.createElement('label');
    labelDescription.setAttribute('for', 'description-text-field');
    labelDescription.classList.add('label');
    labelDescription.textContent = 'Product Description';

    var descriptionField = document.createElement('input');
    descriptionField.setAttribute('type', 'text');
    descriptionField.setAttribute('id', 'description-text-field');

    right.appendChild(labelDescription);
    right.appendChild(descriptionField);

    // Append Left and Right to Divider
    divider.appendChild(left);
    divider.appendChild(right);

    form.appendChild(divider);

    // Image Upload
    var labelImage = document.createElement('label');
    labelImage.setAttribute('for', 'image-upload');
    labelImage.classList.add('label');
    labelImage.textContent = 'Product Image';

    var imageUpload = document.createElement('input');
    imageUpload.setAttribute('type', 'file');
    imageUpload.setAttribute('id', 'image-upload');
    imageUpload.setAttribute('accept', 'image/*');

    form.appendChild(labelImage);
    form.appendChild(imageUpload);

    // Submit Button
    var addButton = document.createElement('button');
    addButton.setAttribute('type', 'submit');
    addButton.setAttribute('name', 'add');
    addButton.setAttribute('id', 'add_button');
    addButton.textContent = 'ADD';

    form.appendChild(addButton);

    // append top and form
    popUpContainer.appendChild(top);
    popUpContainer.appendChild(form);

    var main = document.getElementById('products-content');
    main.appendChild(popUpContainer);
}



var addProductButton = document.getElementById('add-product-button')
addProductButton.addEventListener('click', loadUI)