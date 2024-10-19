<?php
class vendor
{
    private $vendorID;  
    private $userID;  
    
    public function __construct($vendorID, $userID)
    {
        $this->vendorID = $vendorID;
        $this->userID = $userID;
    }

    public function getVendorID(){
        return $this->vendorID;
    }
    public function getUSerID(){
        return $this->userID;
    }
    public function setVendorID($vendorID){
        $this->vendorID = $vendorID;
    }
    public function setUSerID($userID){
        $this->userID = $userID;
    }
}
?>