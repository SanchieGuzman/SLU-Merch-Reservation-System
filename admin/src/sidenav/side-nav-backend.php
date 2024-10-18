<?php
    require('../database/database.php');

    $db = Database::getInstance();

    //todo: create a method that fetches data to the database for side bar content
    //todo: create classes to encapsulate data for better readability

    //fetching user data for the nav bar and top bar
    $imageLocation = '../../assets/images/profile-user.png';
    $orgName = 'Integrated Confideracy';
?>