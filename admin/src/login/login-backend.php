<?php
    session_start();
    require('../database/database.php');

    $db = Database::getInstance();

    $username = $_POST['username'];
    $password = $_POST['password'];

    if ($db->login($username, $password)) {
        header("Location: ../dashboard/dashboard.php");
        exit();
    } else {
        $_SESSION['login-error'] = 'Invalid credentials'; 
        header("Location: login.php"); // Redirect back to the login page
        exit();
    }
?>
