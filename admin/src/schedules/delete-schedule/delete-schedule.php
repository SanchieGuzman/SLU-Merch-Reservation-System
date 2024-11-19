<?php
    include('../../session/session-handling.php');

    require_once('../../database/database.php');
    $db = Database::getInstance();

    $scheduleID = $_POST['schedule_id'];
    
    if ($db->deleteSchedule($scheduleID)) {
        $_SESSION['schedule-status'] = "Schedule deleted successfully";
        header("Location: ../../schedules/schedules.php");
        exit();
    } else {
        $_SESSION['schedule-status'] = "Failed to delete entry";
        header("Location: ../../schedules/schedules.php");
        exit();
    }
?>