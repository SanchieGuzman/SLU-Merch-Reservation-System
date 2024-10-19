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
            <button class="dashboard-button"><img class="side-icons" src="../../assets/images/sidenav-icons/DASHBOARD.svg" alt="Dashboard icon">Dashboard</button>
            <button class="order-button"><img class="side-icons" src="../../assets/images/sidenav-icons/ORDERS.svg" alt="Orders icon">Orders</button>
            <button class="products-button"><img class="side-icons" src="../../assets/images/sidenav-icons/PRODUCTS.svg" alt="Products icon">Products</button>
            <section class="spacer"> </section>
            <button class="log-out-button"><img class="side-icons" src="../../assets/images/sidenav-icons/LOG OUT.svg" alt="Log out icon">Log Out</button>
            <button class="help-button"><img class="side-icons" src="../../assets/images/sidenav-icons/HELP.svg" alt="Help">Help</button>
        </div>
    </aside>
</body>
</html>