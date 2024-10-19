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
        $stmt = $this->mysqli->prepare("SELECT user_id, password FROM users WHERE username = ?");
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
        } else { //User does not exist
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
}
?>
