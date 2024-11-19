<?php
require_once('../database/database.php');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['order_id'])) {
        $orderId = $_POST['order_id'];

        $db = Database::getInstance();
        $updateResult = $db->updateProductStatus($orderId);

        if ($updateResult) {
            // Redirect back to the orders page
            header('Location: orders.php');
            exit();
        } else {
            echo "Failed to update the order status.";
        }
    }
}
?>