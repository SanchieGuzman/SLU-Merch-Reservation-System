<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="../../assets/css/globals.css">
    <link rel="stylesheet" href="../../assets/css/products.css">
    <link rel="stylesheet" href="../../assets/css/add-product-popup.css">
    <link rel="stylesheet" href="../../assets/css/delete-product-popup.css">
    <link rel="stylesheet" href="../../assets/css/edit-product-popup.css">
</head>
<body>
    <?php
        include('../products/products-backend.php');
        include('../sidenav/side-nav-backend.php');
        include('../sidenav/side-nav.php');
    ?>

    <section id="left-container">
        <?php
            include('../topbar/topbar.php')
        ?>

        <main id="products-content">
            <div id="overview-container">
                <div id="top-title">
                    <h1>Product Overview</h1>
                    <button id="add-product-button">
                        <img class="add-button-icon" src="../../assets/images/add-logo.svg" alt="add logo">
                        <h2>Add Product</h2>
                    </button>
                </div>
                
                <?php 
                    require_once('../classes/Product.php');
                    $db = Database::getInstance();
                    $productList = $db->getAllProducts($_SESSION['ORG_ID']);
                ?>
            </div>
        </main>

        <div id="popup-success">
            <?php 
               if (isset($_SESSION['add_success_message'])) {
                    echo $_SESSION['add_success_message']; 
                    unset($_SESSION['add_success_message']);
                }elseif(isset($_SESSION['edit_success_message'])){
                    echo $_SESSION['edit_success_message']; 
                    unset($_SESSION['edit_success_message']);
                }elseif(isset($_SESSION['delete_success_message'])){
                    echo $_SESSION['delete_success_message']; 
                    unset($_SESSION['delete_success_message']);
                }
        
            ?>
        </div>
    </section>

    <script src="../product-action/add-product/addProduct.js"></script>
    <script src="../product-action/edit-product/editProduct.js"></script>
    <script src="../product-action/delete-product/deleteProduct.js"></script>
    
    <script>
        // load na natin yung table
        const products = <?php echo json_encode($productList); ?>;

        // Create the table element
        const table = document.createElement('table');

        // Create table header row
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['Product ID', 'Product Name', 'Qty', 'Price', 'Status', 'Edit', 'Delete'];

        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body with product data from PHP
        const tbody = document.createElement('tbody');

        products.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td>${product.status}</td>
                <td><button class="edit-btn" id="edit-${product.id}">Edit</button></td>
                <td><button class="delete-btn" id="delete-${product.id}">Delete</button></td>
            `;
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);

        // Append the table to the div with id "overview-container"
        document.getElementById('overview-container').appendChild(table);

        // Add a single event listener to the tbody
        tbody.addEventListener('click', (event) => {
            if (event.target.classList.contains('edit-btn')) {
                const productId = event.target.id.split('-')[1]; // Get the ID from the button ID

                // Get the parent row of the clicked button
                 const row = event.target.closest('tr');

                // Extract product details from the table cells
                const productName = row.cells[1].textContent;
                const productQuantity = row.cells[2].textContent;
                const productPrice = row.cells[3].textContent;

                loadUIForEditEntry(productId, productName, productQuantity, productPrice)
            } else if (event.target.classList.contains('delete-btn')) {
                const productId = event.target.id.split('-')[1]; // Get the ID from the button ID
                loadUIForDeleteEntry(productId); // Call the delete function
            }
        });
    </script>
    <script>
        // Show the pop-up if there's a success message
        window.onload = function() {
            var popup = document.getElementById('popup-success');
            if (popup.textContent.trim() !== '') {
                popup.style.display = 'block';
                setTimeout(function() {
                    popup.style.display = 'none';
                }, 5000); // Hide after 5 seconds
            }
        };

    </script>   
</body>
</html>