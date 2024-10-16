<?php

class Database
{
    private $mysqli;
    private static $instance;

    // not sure if this method is working already since there is no database yet
    public function __construct()
    {
        $config = require('../database/config.php');
        $this->mysqli = new mysqli(
            $config['HOST'],
            $config['USERNAME'],
            $config['PASSWORD'],
            $config['DB_NAME'],
        );
    }

    // we can now define static methods here to access database
}
?>