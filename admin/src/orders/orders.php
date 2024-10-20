<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="../../assets/css/globals.css">
    <link rel="stylesheet" href="../../assets/css/orders.css">
</head>
<body>
    <?php
        include('../orders/orders-backend.php');
        include('../sidenav/side-nav-backend.php');
        include('../sidenav/side-nav.php');
    ?>

    <section id="left-container">
        <?php
            include('../topbar/topbar.php')
        ?>

        <main id="orders-content">
            <div class="orders-container"></div>
        </main>
    </section>

    <script>

        <?php 
            $db = Database::getInstance();
            $orders = $db -> getPendingOrders($_SESSION['ORG_ID'])
        ?>

        const orders = <?php echo json_encode($orders)?>

        window.onload = function () {
            orders.forEach(order =>{
                addCard(order['first_name'],order['order_id'],order['created_at'], order['status'])
            })
        };

        array.forEach(element => {
            
        });

        function addCard(name, orderId, orderDateValue, statusValue) {
        const container = document.querySelector(".orders-container");

        const newDiv = document.createElement("div");
        newDiv.classList.add("card");

        const leftCont = document.createElement("div");
        leftCont.classList.add("left");

        const rightCont = document.createElement("div");
        rightCont.classList.add("right");

        const vName = document.createElement("h4");
        vName.classList.add("vendor-name");
        vName.textContent = name;
        leftCont.appendChild(vName);

        const orderDate = document.createElement("p");
        orderDate.classList.add("order-date");
        orderDate.textContent = orderDateValue;
        leftCont.appendChild(orderDate);

        const oID = document.createElement("p");
        oID.classList.add("order-id");
        oID.textContent = orderId;
        rightCont.appendChild(oID);

        const status = document.createElement("p");
        status.classList.add("status");
        status.textContent = statusValue;
        rightCont.appendChild(status);

        const button1 = document.createElement("button");
        button1.classList.add("view-button");
        button1.textContent = "View Order List";
        leftCont.appendChild(button1);

        const button2 = document.createElement("button");
        button2.classList.add("served-button");
        button2.textContent = "Served";
        rightCont.appendChild(button2);

        newDiv.appendChild(leftCont);
        newDiv.appendChild(rightCont);

        container.appendChild(newDiv);
        }
    </script>
</body>
</html>