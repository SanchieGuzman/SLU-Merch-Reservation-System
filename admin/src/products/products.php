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
        <script src="../add-product/addProduct.js"></script>
    </section>
</body>
</html>