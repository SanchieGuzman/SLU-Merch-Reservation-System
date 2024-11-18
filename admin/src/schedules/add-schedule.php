<?php

    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    require_once('../classes/Schedule.php');
    require_once('../database/database.php');
    $db = Database::getInstance();

    $date = $_POST['date'];
    $organizationID = $_SESSION['ORG_ID'];
    $startTime = $_POST['start_time'];
    $endTime = $_POST['end_time'];
    $location = $_POST['location'];
    
    $newSchedule = new Schedule(null, $date, $organizationID, $startTime, $endTime, $location);
    
    if ($db->addSchedule($newSchedule)) {
        $_SESSION['schedule-status'] = "Entry added to the database";
        header("Location: ../schedules/schedules.php");
        exit();
    } else {
        $_SESSION['schedule-status'] = "Failed to add entry";
        header("Location: ../schedules/schedules.php");
        exit();
    }
?>