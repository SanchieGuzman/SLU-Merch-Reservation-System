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
            <?php echo  "<img src=\"$imageSource\" alt=\"\">" ?>
            <?php echo  "<h2>$orgName</h2>" ?>
        </div>
        <form action="../../src/sidenav/side-nav-route.php" method="POST" class="form">
            <div class="buttons-container">
                <button type='submit' name="action" value="dashboard" class="<?php echo $_SESSION['action'] === 'dashboard' ? 'active-button' : 'default-button'?>"><img class="<?php echo $_SESSION['action'] === 'dashboard' ? 'active-icon' : 'default-icon'?>" src="../../assets/images/sidenav-icons/DASHBOARD.svg" alt="Dashboard icon">Dashboard</button>
                <button type='submit' name="action" value="orders" class="<?php echo $_SESSION['action'] === 'orders' ? 'active-button' : 'default-button'?>"><img class="<?php echo $_SESSION['action'] === 'orders' ? 'active-icon' : 'default-icon'?>" src="../../assets/images/sidenav-icons/ORDERS.svg" alt="Orders icon">Orders</button>
                <button type='submit' name="action" value="products" class="<?php echo $_SESSION['action'] === 'products' ? 'active-button' : 'default-button'?>"><img class="<?php echo $_SESSION['action'] === 'products' ? 'active-icon' : 'default-icon'?>" src="../../assets/images/sidenav-icons/PRODUCTS.svg" alt="Products icon">Products</button>
                <button type='submit' name="action" value="schedules" class="<?php echo $_SESSION['action'] === 'schedules' ? 'active-button' : 'default-button'?>"><img class="<?php echo $_SESSION['action'] === 'schedules' ? 'active-icon' : 'default-icon'?>" src="../../assets/images/sidenav-icons/SCHEDULES.svg" alt="Schedules icon">Schedules</button>
                <button type='submit' name="action" value="order-history" class="<?php echo $_SESSION['action'] === 'order-history' ? 'active-button' : 'default-button'?>"><img class="<?php echo $_SESSION['action'] === 'order-history' ? 'active-icon' : 'default-icon'?>" src="../../assets/images/sidenav-icons/Order History.svg" alt="Order History icon">Order History</button>
                
                <div class="spacer">
                    <button type='submit' name="action" value="logout" class="<?php echo $_SESSION['action'] === 'logout' ? 'active-button' : 'default-button'?>"><img class="<?php echo $_SESSION['action'] === 'logout' ? 'active-button' : 'default-icon'?>" src="../../assets/images/sidenav-icons/LOG OUT.svg" alt="Log out icon">Log Out</button>
                    <button disabled type="submit" class="default-button"><img class="default-icon" src="../../assets/images/sidenav-icons/HELP.svg" alt="Help">Help</button>
                </div>
            </div>
        </form>
    </aside>
</body>
</html>