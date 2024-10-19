<?php
class OrderProduct{
    private $productID;
    private $quantity;
    private $total;

    public function __construct($productID, $quantity, $total){
        $this->productID = $productID;
        $this->quantity = $quantity;
        $this->total = $total;
    }

    public function getProductID(){
        return $this->productID;
    }
    public function getQuantity(){
        return $this->quantity;
    }
    public function getTotal(){
        return $this->total;
    }
    public function setProductID($productID){
        $this->productID = $productID;
    }
    public function setQuantity($quantity){
        $this->quantity = $quantity;
    }
    public function setTotal($total){
        $this->total = $total;
    }
}
?>