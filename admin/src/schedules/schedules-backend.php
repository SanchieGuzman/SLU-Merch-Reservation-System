<?php

    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    require_once('../database/database.php');
    $db = Database::getInstance();

    $scheduleList;
    // $schedules = $db->getListOfSchedules($SESSION['ORG_ID']);
?>