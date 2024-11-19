<?php

    require_once('../database/database.php');
    $db = Database::getInstance();

    $scheduleList = $db->getSchedule($_SESSION['ORG_ID']);
?>