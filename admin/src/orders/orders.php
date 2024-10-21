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
        include('../order-details/order-details.php');
    ?>

    <section id="left-container">
        <?php
            include('../topbar/topbar.php')
        ?>

        <main id="orders-content">
            <div class="orders-container"></div>
        </main>
    </section>

    <script src="../order-details-popup/order-details.js"></script>

    <script type="module">
        <?php 
            $db = Database::getInstance();
            $orders = $db -> getPendingOrders($_SESSION['ORG_ID']);
            
        ?>
        const orders = <?php echo json_encode($orders)?> 

        window.onload = function () {
            orders.forEach(order =>{
                addCard(order['first_name'],"Order ID: "+order['order_id'],order['created_at'], "Status: "+ order['status'])
            })
        };

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

        const viewButton = document.createElement("button");
        viewButton.classList.add("view-button");
        viewButton.textContent = "View Order List";
        
        //get the card element
        const popUpCard = document.querySelector('.order-details');
        

        //THIS IS ONLY FOR DEMONSTRATION
       const data = [
    {
        order_id: 4,
        user_id: 101,
        first_name: 'Jerwin',
        last_name: 'Ramos',
        quantity: 2,
        total: 500.00,
        product_name: 'Product A',
        product_id: 201,
        status: 'Pending',
        product_image: '../../assets/images/johncena.jpeg'
    },
    {
        order_id: 4,
        user_id: 101,
        first_name: 'Jerwin',
        last_name: 'Ramos',
        quantity: 1,
        total: 250.00,
        product_name: 'Product B',
        product_id: 202,
        status: 'Pending',
        product_image: '../../assets/images/johncena.jpeg'
    },
    {
        order_id: 4,
        user_id: 101,
        first_name: 'Jerwin',
        last_name: 'Ramos',
        quantity: 1,
        total: 250.00,
        product_name: 'Product C',
        product_id: 202,
        status: 'Pending',
        product_image: '../../assets/images/johncena.jpeg'
    },];

        //show the card/ center the card
        viewButton.addEventListener('click', function(){ 
            popUpCard.classList.add('active');
            //query using javascript here 
            showOrderDetails(orderId, data[0].first_name,  data)
        })

        leftCont.appendChild(viewButton); 

        const serveButton = document.createElement("button");
        serveButton.classList.add("served-button");
        serveButton.textContent = "Served";
        serveButton.addEventListener('click', function() { 
            serveButton(this);
        });
        rightCont.appendChild(serveButton);

        newDiv.appendChild(leftCont);
        newDiv.appendChild(rightCont);

        container.appendChild(newDiv);
        }

        function serveButton(button){ 
            button.closest('.card').remove();
        }
    </script>
</body>
</html>