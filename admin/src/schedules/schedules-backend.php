<?php

    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    require_once('../database/database.php');
    $db = Database::getInstance();

    $scheduleList = $db->getSchedule($_SESSION['ORG_ID']);
?>