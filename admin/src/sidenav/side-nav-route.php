<?php
    session_start();
    if($_POST['action'] === 'dashboard'){
        $_SESSION['action'] = 'dashboard';
        header("Location: ../dashboard/dashboard.php");
        exit();
    }elseif($_POST['action'] === 'orders'){
        $_SESSION['action'] = 'orders';
        header("Location: ../orders/orders.php");
        exit();
    }elseif ($_POST['action'] === 'products'){
        $_SESSION['action'] = 'products';
        header("Location: ../products/products.php");
        exit();
    } elseif ($_POST['action'] === 'schedules') {
        $_SESSION['action'] = 'schedule';
        header("Location: ../schedules/schedules.php");
        exit();
    } elseif($_POST['action'] === 'logout') {
        session_unset();
        session_destroy();
        header("Location: ../login/login.php");
        exit();
    }
?>