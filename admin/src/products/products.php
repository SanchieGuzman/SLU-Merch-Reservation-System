<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="../../assets/css/globals.css">
    <link rel="stylesheet" href="../../assets/css/products.css">
    <link rel="stylesheet" href="../../assets/css/add-product-popup.css">
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
            <button id="add-product-button">
                <img src="../../assets/images/add-logo.svg" alt="add logo">
                <h2>Add Product</h2>
            </button>
            <!-- test your code by pasting this url: {localhost or depebde sa wamp nyo}/admin/src/products/products.php -->
        </main>

        <div id="popup-success">
            <?php 
               if (isset($_SESSION['add_success_message'])) {
                    echo $_SESSION['add_success_message']; 
                    unset($_SESSION['add_success_message']);
                }
            ?>
        </div>
    </section>

    <script>
        // Show the pop-up if there's a success message
        window.onload = function() {
            var popup = document.getElementById('popup-success');
            if (popup.textContent.trim() !== '') {
                popup.style.display = 'block';
                setTimeout(function() {
                    popup.style.display = 'none';
                }, 5000); // Hide after 3 seconds
            }
        };
    </script>
    <script src="../add-product/addProduct.js"></script>
    
</body>
</html>