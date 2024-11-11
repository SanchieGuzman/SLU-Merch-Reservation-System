<?php
    session_start();
    if ($_POST['action'] === 'dashboard') {
        $_SESSION['action'] = 'dashboard';
        header("Location: ../dashboard/dashboard.php");
        exit();
    } elseif($_POST['action'] === 'orders') {
        $_SESSION['action'] = 'orders';
        header("Location: ../orders/orders.php");
        exit();
    } elseif ($_POST['action'] === 'products') {
        $_SESSION['action'] = 'products';
        header("Location: ../products/products.php");
        exit();
    } elseif ($_POST['action'] === 'schedule') {
        $_SESSION['action'] = 'schedule';
        header("Location: ../schedule/schedule.php");
        exit();
    } elseif($_POST['action'] === 'logout') {
        $_SESSION['action'] = null;
        header("Location: ../login/login.php");
        exit();
    }
?>