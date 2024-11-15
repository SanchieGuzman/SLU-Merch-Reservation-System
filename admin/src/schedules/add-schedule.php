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
    
    
    // Create a new schedule object
    $newSchedule = new Schedule(null, $date, $organizationID, $startTime, $endTime, $location);
    
    // Try to add the schedule and provide feedback
    if ($db->addSchedule($newSchedule)) {
        echo "<script>console.log('entry added');</script>";
        echo "<script>alert('Entry added to the database'); window.location.href = 'schedules.php';</script>";
    } else {
        echo "<script>console.log('entry not added');</script>";
        echo "<script>alert('Failed to add entry.'); window.history.back();</script>";
    }
?>