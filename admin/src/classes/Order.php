<?php
class Order
{
    private $orderID;
    private $customerID;
    private $createdAt;
    private $status;
    private $claimedAt;
    private $scheduleID;
    private $productsArray;

    public function __construct($orderID, $customerID, $createdAt, $status, $claimedAt, $scheduleID, $productsArray)
    {
        $this->orderID = $orderID;
        $this->customerID = $customerID;
        $this->createdAt = $createdAt;
        $this->status = $status;
        $this->claimedAt = $claimedAt;
        $this->scheduleID = $scheduleID;

        $this->productsArray = $productsArray;
    }

    public function getOrderID()
    {
        return $this->orderID;
    }

    public function getCustomerID()
    {
        return $this->customerID;
    }

    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function getClaimedAt()
    {
        return $this->claimedAt;
    }

    public function getScheduleID()
    {
        return $this->scheduleID;
    }
    public function getProductsArray()
    {
        return $this->productsArray;
    }

    public function setOrderID($orderID)
    {
        $this->orderID = $orderID;
    }

    public function setCustomerID($customerID)
    {
        $this->customerID = $customerID;
    }

    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    public function setStatus($status)
    {
        $this->status = $status;
    }

    public function setClaimedAt($claimedAt)
    {
        $this->claimedAt = $claimedAt;
    }

    public function setScheduleID($scheduleID)
    {
        $this->scheduleID = $scheduleID;
    }
    public function setProductArray($productsArray)
    {
        $this->productsArray = $productsArray;
    }
}