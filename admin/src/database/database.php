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

    //todo: Create a function that fetches the number of pending orders of the organization a user is a part of
    public function getTotalPendingOrders($userID) {
        // kinukuha lng ung total pending orders
        $stmt = $this->mysqli->prepare( "SELECT COUNT(DISTINCT(o.order_id)) AS total_pending 
                                    FROM orders AS o 
                                    JOIN order_products AS op USING (order_id)
                                    JOIN products AS p USING (product_id)
                                    WHERE p.organization_id IN (
                                        SELECT om.organization_id 
                                        FROM organization_members AS om 
                                        JOIN vendors AS v USING (vendor_id)
                                        JOIN users AS u 
                                        USING(user_id) where u.user_id =1
                                    )
                                    AND o.status = 'pending'");
        $stmt->bind_param('i', $userID);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        return (int)$row['total_pending'];
    }

    //todo: Create a function that fetches the sales data of the organization a user is part of
    public function getSales($userID) {
        // kinukuha lng ung total sales ng org
            $stmt = $this->mysqli->prepare( "SELECT SUM(o.total) AS total_sales FROM orders AS o where o.order_id IN(
            Select DISTINCT(o.order_id) FROM orders AS o JOIN order_products AS op USING(order_id) 
            JOIN products AS p USING (product_id) 
            WHERE p.organization_id IN (
                SELECT organization_id 
                FROM organization_members AS om
                JOIN vendors AS v USING (vendor_id)
                JOIN users AS u USING (user_id)
                where u.user_id =1) 
            AND o.status = 'claimed'");

            $stmt->bind_param('i', $userID);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();

            return (int)$row['total_sales'];    
        
    }

    //todo: Create a function that fetches the top 5 or 10? most ordered product of an organization a user is a part of
    public function getMostOrderedProducts($userID) {
        // not sure kung up to 5 or up to 10 ba ang ididisplay sa most ordered 
        // products natin kaya for now ikaw bahala sa number.

        // pwede mo din ba ireturn dito ung parang hashmap na style? example <sold, product>
        // wala kasi sa products database kung ilan na ang nabenta sa isang product kaya di ko alam kung paano approach
        // natin dun. kung di mo sure pwede natin pag usapan tommorrow.

        // sorry din sa grammar, tinatamad na ako mag ayos, pero ang daming sinasabi 'no?
        // yapper talaga

        // anyways tank u :)
    }

}
?>
