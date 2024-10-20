<?php
    session_start();
    require('../database/database.php');

    $db = Database::getInstance();

    $username = $_POST['username'];
    $password = $_POST['password'];

    $userID = $db->login($username, $password);
    if ($userID > 0) {
        $_SESSION['USER_ID'] = $userID;
        $_SESSION['action'] = 'dashboard';
        header("Location: ../dashboard/dashboard.php");
        exit();
    } else {
        $_SESSION['login-error'] = 'Invalid credentials'; 
        header("Location: login.php"); // Redirect back to the login page
        exit();
    }
?>
