<?php

    if (session_start() === PHP_SESSION_NONE) {
        session_start();
    }

    require_once('../classes/Schedule.php');
    require_once('../database/database.php');
    $db = Database::getInstance();

    $date = $_POST['new_date'];
    $organizationID = $_SESSION['ORG_ID'];
    $startTime = $_POST['new_start_time'];
    $endTime = $_POST['new_end_time'];
    $location = $_POST['new_location'];

    $editedSchedule = new Schedule(null, $date, $organizationID, $startTime, $endTime, $location);
?>