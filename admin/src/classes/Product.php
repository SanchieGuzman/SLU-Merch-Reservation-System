<?php
class Product implements JsonSerializable
{
    private $productID;
    private $productName;
    private $productDescription;
    private $organizationID;
    private $price;
    private $quantity;
    private $productImage;
    private $status;

    public function __construct($productID, $productName, $productDescription, $organizationID, $price, $quantity, $productImage, $status){
        $this->productID = $productID;
        $this->productName = $productName;
        $this->productDescription = $productDescription;
        $this->organizationID = $organizationID;
        $this->price = $price;
        $this->quantity = $quantity;
        $this->productImage = $productImage;
        $this->status = $status;

    }

    // Implement jsonSerialize to control what is included in the JSON
    public function jsonSerialize(): mixed {
        return [
            'id' => $this->productID,
            'name' => $this->productName,
            'description' => $this->productDescription,
            'organizationID' => $this->organizationID,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'image' => $this->productImage,
            'status' => $this->status
        ];
    }

    public function getProductID(){
        return $this->productID;
    }
    public function getProductName(){
        return $this->productName;
    }
    public function getProductDescription(){
        return $this->productDescription;
    }
    public function getOrganizationID(){
        return $this->organizationID;
    }
    public function getPrice(){
        return $this->price;
    }
    public function getQuantity(){
        return $this->quantity;
    }
    public function getProductImage(){
        return $this->productImage;
    }
    public function getStatus(){
        return $this->status;
    }
    public function setProductID($productID){
        return $this->productID = $productID;
    }
    public function setProductName($productName){
        return $this->productName = $productName;
    }
    public function setProductDescription($productDescription){
        return $this->productDescription = $productDescription;
    }
    public function setOrganizationID($organizationID){
        return $this->organizationID = $organizationID;
    }
    public function setPrice($price){
        return $this->price = $price;
    }
    public function setQuantity($quantity){
        return $this->quantity = $quantity;
    }
    public function setProductImage($productImage){
        return $this->productImage = $productImage;
    }
    public function setStatus($status){
        return $this->status = $status;
    }
        
}