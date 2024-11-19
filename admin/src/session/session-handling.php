<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    if (!isset($_SESSION['USER_ID'])) {
        header("Location: ../login/login.php");
        exit();
    }
?>