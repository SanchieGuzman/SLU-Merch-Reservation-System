<?php

    if (session_start() === PHP_SESSION_NONE) {
        session_start();
    }

    require_once('../database/database.php');
    $db = Database::getInstance();

    $scheduleID = $_POST['schedule_id'];
    $date = $_POST['new_date'];
    $startTime = $_POST['new_start_time'];
    $endTime = $_POST['new_end_time'];
    $location = $_POST['new_location'];

    if ($db->editSchedule($scheduleID, $date, $startTime, $endTime, $location)) {
        $_SESSION['schedule-status'] = "Schedule edited successfully";
        header("Location: ../schedules/schedules.php");
        exit();
    } else {
        $_SESSION['schedule-status'] = "Failed to make changes";
        header("Location: ../schedules/schedules.php");
        exit();
    }
?>