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
            <div class="top-container">
                <h2>Orders</h2>
                <!-- INPUT FOR SEARCH -->
            </div>
            <div class="orders-container"></div>
        </main>
    </section>

    <script src="../order-details-popup/order-details.js"></script>

    <script type="module">
        
        <?php
            $db = Database::getInstance();
            $orders = $db -> getPendingOrders($_SESSION['ORG_ID']); 
            $data = $db -> getPendingProducts($_SESSION['ORG_ID']);     
        ?>        

        const orders = <?php echo json_encode($orders);?>;
        

        window.onload = function () {
            orders.forEach(order =>{
                addCard(order['first_name'],order['order_id'],order['created_at'], order['status'])
            })
        };

        function addCard(name, orderId, orderDateValue, statusValue) {
        const container = document.querySelector(".orders-container");

        const newDiv = document.createElement("div");
        newDiv.classList.add("card");

        const vName = document.createElement("h4");
        vName.classList.add("vendor-name");
        vName.textContent = name;
        newDiv.appendChild(vName);

        const oID = document.createElement("p");
        oID.classList.add("order-id");
        oID.textContent = "Order ID: "+orderId;
        newDiv.appendChild(oID);

        const gridContainer = document.createElement('div');    /* -------------------------------------------- */
        gridContainer.classList.add("details-grid");
            
        const locationLabel = document.createElement('p');
        locationLabel.textContent = "Pick up Location";
        gridContainer.appendChild(locationLabel);

        /* for location */
        const location = document.createElement('p');
        location.textContent="Sample location mahaba"
        gridContainer.appendChild(location);

        const dateLabel = document.createElement('p');
        dateLabel.textContent = "Ordered at";
        gridContainer.appendChild(dateLabel);

        const orderDate = document.createElement("p");
        orderDate.classList.add("order-date");
        orderDate.textContent = orderDateValue;
        gridContainer.appendChild(orderDate);

        const statusLabel = document.createElement('p');
        statusLabel.textContent = "Status";
        gridContainer.appendChild(statusLabel);

        const status = document.createElement("p");
        status.classList.add("status");
        status.textContent = statusValue;
        gridContainer.appendChild(status);

        newDiv.appendChild(gridContainer)/* -------------------------------------------- */

        const viewButton = document.createElement("button");
        viewButton.classList.add("view-button");
        viewButton.textContent = "View Order List";
       
        const popUpCard = document.querySelector('.order-details');
       
        viewButton.addEventListener('click', function(){  
            popUpCard.classList.add('active');
            
            const data = <?php echo json_encode($data);?>
            
            console.log(data);

            productsCard(data, orderId);
           
        })

        newDiv.appendChild(viewButton);

        const serveButton = document.createElement("button");
        serveButton.classList.add("served-button");
        serveButton.textContent = "Served";

        serveButton.addEventListener('click', function() {
            removeCard(this);
        });

        newDiv.appendChild(serveButton);

        container.appendChild(newDiv);
        }

        //
        function removeCard(button){
            button.closest('.card').remove();
        }

        //add card 
        function productsCard(data, orderIden){
            const filtered = data.filter(data => data['order_id'] === orderIden);
            console.log(filtered)
            showOrderDetails(filtered[0].order_id, filtered[0].first_name, filtered)
            
        }
    </script>
</body>
</html>
