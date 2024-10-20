<?php
    session_start();
    require('../classes/Product.php');
    require('../database/database.php');

    $productName = $_POST['product_name'];
    $productDescription = $_POST['product_description'];
    $organizationID = $_SESSION['ORG_ID'];
    $productPrice = $_POST['product_price'];
    $productQuantity = $_POST['product_quantity'];

    $productImage = file_get_contents($_FILES['product_image']['tmp_name']);

    $status = 'available';

    $product = new Product(null, $productName, $productDescription, $organizationID, $productPrice, $productQuantity, $productImage, $status );

    $db = Database::getInstance();

    if($db->addProduct($product)){
        
    }
    ;
?>