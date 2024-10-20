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
            <div>
                <!-- PENDING ORDERS CONTAINER -->
                <div id="pending-orders-container">
                    <div>
                        <!-- todo: use echo $pending_orders_img to display the image -->
                        <img></img>
                        <h1>Pending Orders</h1>
                    </div>
                    <span><?php echo "$pending_orders"; ?></span> <!-- todo: use echo $pending_orders to display the value -->
                    <div>
                        <span><?php echo "As of $time"; ?></span> <!-- todo: use echo $time to display the time -->
                    </div>
                </div>

                <!-- SALES CONTAINER -->
                <div id="sales-container">
                    <div>
                        <!-- todo: use echo $sales_img to display the image -->
                        <img></img>
                        <h1>Sales</h1>
                    </div>
                    <span><?php echo "P $sales"; ?></span> <!-- todo: use echo $sales to display the image -->
                    <div></div> <!-- an empty div for the bottom design box? -->
                </div>
            </div>

            <!-- MOST ORDERED PRODCUTS CONTAINER -->
            <div id="most-ordered-container">
                <!-- todo: display the most ordered products -->
            </div>
        </main>
    </section>
</body>

</html>