<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="../../assets/css/sidenav.css">
    <link rel="stylesheet" href="../../assets/css/globals.css">
</head>
<body>
    <aside class="sidebar">
        <div class="profile">
            <?php echo  "<img src=\"$imageLocation\" alt=\"\">" ?>
            <?php echo  "<h2>$orgName</h2>" ?>
        </div>
        <div class="buttons-container">
            <button class="dashboard-button active">Dashboard</button>
            <button class="order-button">Orders</button>
            <button class="products-button">Products</button>
            <section class="spacer"> </section>
            <button class="log-out-button">Log Out</button>
            <button class="help-button">Help</button>
        </div>
    </aside>
</body>
</html>