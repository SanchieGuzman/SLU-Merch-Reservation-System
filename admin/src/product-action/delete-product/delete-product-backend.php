<?php
    session_start();
    require('../../classes/Product.php');
    require('../../database/database.php');
    
    $productId = $_POST['ProductID'];

    $db = Database::getInstance();

    if($db->deleteProduct($productId)){
        $_SESSION['delete_success_message'] = "Product deleted";
        header("Location: ../../products/products.php");
        exit();
    }
    ;
?>