<?php
    //fetching dashboard data to be used in dashboard.php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    require_once('../database/database.php');
    $db = Database::getInstance();

    $pending_orders = $db->getTotalPendingOrders($_SESSION['ORG_ID']);
    $sales = $db->getSales($_SESSION['ORG_ID']);
    $most_ordered_products = $db->getMostOrderedProducts2($_SESSION['ORG_ID'], 5);

    foreach ($most_ordered_products as &$product) {
        if (!empty($product['product_image'])) {
            // Convert BLOB to Base64
            $product['product_image'] = 'data:image/jpeg;base64,' . base64_encode($product['product_image']);
        } else {
            // Provide a fallback if no image is available
            $product['product_image'] = 'data:image/png;base64,' . base64_encode(file_get_contents('path/to/default/image.png')); // Update with a default image path
        }
    }
?>