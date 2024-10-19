<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="../../assets/css/globals.css">
    <link rel="stylesheet" href="../../assets/css/dashboard.css">
</head>
<body>
    <?php
        include('../dashboard/dashboard-backend.php');
        include('../sidenav/side-nav-backend.php');
        include('../sidenav/side-nav.php');
    ?>

    <section id="left-container">
        <?php
            include('../topbar/topbar.php')
        ?>

        <main id="dashboard-content">
            <h1>THIS IS WHERE THE DASHBOARD CONTENT GOES</h1>
            <!-- test your code by pasting this url: {localhost or depebde sa wamp nyo}/admin/src/dashboard/dashboard.php -->
        </main>
    </section>
</body>
</html>