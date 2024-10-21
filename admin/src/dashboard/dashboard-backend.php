<?php
    //fetching dashboard data to be used in dashboard.php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    require_once('../database/database.php');
    $db = Database::getInstance();

    // $pending_orders = $db->getTotalPendingOrders($_SESSION['USER_ID']);

    // $time = $db->getTime();

    // $sales = $db->getSales($_SESSION['USER_ID']);

    // $most_ordered_products = $db->getMostOrderedProducts($_SESSION['USER_ID']);
?>