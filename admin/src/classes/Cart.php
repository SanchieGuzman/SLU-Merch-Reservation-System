<?php
class Cart
{
    private $userID;
    private $productID;
    private $organizationID;
    private $quantity;
    private $total;

    public function __construct($userID, $productID, $organizationID, $quantity, $total)
    {
        $this->userID = $userID;        
        $this->productID = $productID;        
        $this->organizationID = $organizationID;        
        $this->quantity = $quantity;        
        $this->total = $total;        
    }

    public function getUserID(){
        return $this->userID;
    }
    public function getProductID(){
        return $this->productID;
    }
    public function getOrganizationID(){
        return $this->organizationID;
    }
    public function getQuantity(){
        return $this->quantity;
    }
    public function getTotal(){
        return $this->total;
    }
    public function setUserID($userID){
        $this->userID = $userID;
    }
    public function setProductID($productID){
        $this->productID = $productID;
    }
    public function setOrganizationID($organizationID){
        $this->organizationID = $organizationID;
    }
    public function setQuantity($quantity){
        $this->quantity = $quantity;
    }
    public function setTotal($total){
        $this->total = $total;
    }
}
?>