<?php
$orgName = "INTEGRATED CONFIDERACY";
$welcomeText = "Welcome Back!";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Top Bar</title>
    <link rel="stylesheet" href="../../assets/css/topbar.css">
</head>
<body>
    <!-- Top bar section -->
    <header class="topbar">
        <div class="welcome-message">
            <h3><?php echo $welcomeText; ?></h3>
            <h2><?php echo $orgName; ?></h2>
        </div>
        <div class="notification-icon">
            <img src="../../assets/images/notifications.svg" alt="Notifications">
        </div>
    </header>
</body>
</html>
