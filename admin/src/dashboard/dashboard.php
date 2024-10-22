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
        include('../sidenav/side-nav-backend.php');
        include('../sidenav/side-nav.php');
        include('../dashboard/dashboard-backend.php');
    ?>

    <section id="left-container">
        <?php
            include('../topbar/topbar.php')
        ?>

        <main id="dashboard-content">
            <div>
                <!-- PENDING ORDERS CONTAINER -->
                <div id="pending-orders-container">
                    <div class="headingDiv">
                        <!-- todo: use echo $pending_orders_img to display the image -->
                        <img></img>
                        <h1>Pending Orders</h1>
                    </div>
                    <strong><?php echo "$pending_orders"; ?></strong>
                    <!-- todo: use echo $pending_orders to display the value -->
                    <div id="time-div">
                        <script>
                        const container = document.getElementById("time-div");
                        const t = new Date();
                        const time = t.toLocaleTimeString();

                        const spanElement = document.createElement("span");
                        spanElement.textContent = `As of ${time}`;

                        container.appendChild(spanElement);
                        </script>
                    </div>
                </div>

                <!-- SALES CONTAINER -->
                <div id="sales-container">
                    <div class="headingDiv">
                        <!-- todo: use echo $sales_img to display the image -->
                        <img></img>
                        <h1>Sales</h1>
                    </div>
                    <strong><?php echo "P $sales"; ?></strong> <!-- todo: use echo $sales to display the image -->
                    <div></div>
                </div>
            </div>

            <!-- MOST ORDERED PRODCUTS CONTAINER -->
            <div id="most-ordered-products-container">
                <h1>Most Ordered</h1>
                <div id="products-list"></div>
            </div>

            <script>
                const products = <?php echo json_encode($most_ordered_products); ?>

                const productsContainer = document.getElementById("products-list");

                productsContainer.innerHTML = '';

                if (products.length === 0) {
                    const message = document.createElement("span");
                    message.textContent = "No products ordered yet.";
                    productsContainer.appendChild(message);
                } else {
                    products.forEach(product => {
                        const card = document.createElement("div");
                        card.classList.add("card");

                        const img = document.createElement("img");
                        img.src = product.product_image;
                        img.alt = product.product_name;
                        img.style.width = "clamp(150px, 4vw, 200px)";
                        img.style.height = "clamp(150px, 4vw, 200px)";

                        const productName = document.createElement("span");
                        productName.textContent = product.product_name;

                        const totalOrders = document.createElement("strong");
                        totalOrders.textContent = `${product.order_count}`;

                        card.appendChild(img);
                        card.appendChild(productName);
                        card.appendChild(totalOrders);
                        productsContainer.appendChild(card);
                    });
                }
            </script>
        </main>
    </section>
</body>
</html>