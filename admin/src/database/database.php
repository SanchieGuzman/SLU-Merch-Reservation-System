<?php
class Database
{
    private $mysqli;
    private static $instance;

    public function __construct()
    {
        $config = require('../database/config.php'); // Adjust the path if necessary
        $this->mysqli = new mysqli(
            $config['HOST'],
            $config['USERNAME'],
            $config['PASSWORD'],
            $config['DB_NAME']
        );

        // Check for connection error
        if ($this->mysqli->connect_error) {
            die("Connection failed: " . $this->mysqli->connect_error);
        }
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    // todo: change the return type to userID, or 0 if wala
    public function login($username, $password)
    {
        $stmt = $this->mysqli->prepare("SELECT v.user_id, u.password 
                                    FROM vendors AS v 
                                    JOIN users AS u ON u.user_id = v.user_id 
                                    WHERE u.username = ?");

        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
    
        //Check if user exists
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $storedPassword = $row['password'];
            $storedUserId = $row['user_id'];
            if ($password === $storedPassword) {
                return $storedUserId; //Correct password
            } else {
                return 0; //Incorrect password
            }
        } else { //User does not exist/not a vendor
            return 0;
        }
    }

    //todo: create a function that fetches organization data based on the given userID
    public function getOrganizationData($userID){
        // make use of the Organization class, pero i null mo lang other fields. ang important lang is OrgID, OrgName, Org Logo, then return mo object na Organization
        $stmt = $this->mysqli->prepare("SELECT o.organization_id, o.organization_name, o.organization_description, o.logo FROM organizations AS o 
                                        JOIN organization_members om ON o.organization_id = om.organization_id 
                                        JOIN vendors v ON v.vendor_id = om.vendor_id WHERE user_id = ?");
        
        $stmt->bind_param('i', $userID);
        $stmt->execute();
        $result = $stmt->get_result();
        // Check if an organization was found
        if ($row = $result->fetch_assoc()) {
            
            return new Organization(
                $row['organization_id'],
                $row['organization_name'],
                $row['organization_description'],
                $row['logo'],
                null
            );
        } else {
            // If no organization is found, return null
            return null;
        }
    }

    //todo:create a fuction that fetches the orders that pending
    public function getPendingOrders($organizationID){
        $stmt = $this->mysqli->prepare("SELECT DISTINCT u.user_id, u.first_name, u.last_name, o.total AS order_total, o.status, o.order_id, o.created_at, o.claimed_at 
                                        FROM orders AS o JOIN order_products AS op ON o.order_id = op.order_id 
                                        JOIN products AS p ON op.product_id = p.product_id 
                                        JOIN users AS u ON o.customer_id = u.user_id 
                                        WHERE p.organization_id = ?
                                        AND o.status = 'pending'");

        $stmt->bind_param('i', $organizationID);
        $stmt->execute();
        $result = $stmt->get_result();
        $pendingOrders = [];

        // Fetch each row one by one
        while ($row = $result->fetch_assoc()) {
            $pendingOrders[] = $row;
        }

        // Return the pending orders array, even if theres no pending orders
        return $pendingOrders;
    }

    // todo: create a function that adds a product to the database. 
    public function addProduct($product){
        // this is product $product = new Product(null, $productName, $productDescription, $organizationID, $productPrice, $productQuantity, $productImage, $status );
        // null yung product ID kase auto increment na yan sa database
        // if successful return  true, else false
        $stmt = $this->mysqli->prepare("INSERT INTO products(product_name, product_description, organization_id, price, quantity, product_image, status)
                                        VALUES (?,?,?,?,?,?,?)");
     
        $productName = $product->getProductName(); 
        $productDescription = $product->getProductDescription();
        $productOrganizationID = $product->getOrganizationID();
        $productPrice = $product->getPrice();
        $productQuantity = $product->getQuantity();
        $productImage = $product->getProductImage();
        $productStatus = $product->getStatus();

        $stmt->bind_param('ssidibs', 
        $productName, 
        $productDescription,
        $productOrganizationID,
        $productPrice,
        $productQuantity,       
        $nullBlob,
        $productStatus);

         // Send binary data (BLOB) in chunks
        $stmt->send_long_data(5, $productImage);
        
        if ($stmt->execute()) {
            return true; 
        } else {
            return false;
        }
    }
}
?>
