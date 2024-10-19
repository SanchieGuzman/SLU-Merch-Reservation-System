<?php
class user
{
    private $userID;
    private $username;
    private $email;
    private $firstName;
    private $lastName;
    private $contact;

    public function __construct($userID, $username, $email, $firstName, $lastName, $contact){
        $this->userID = $userID;
        $this->username = $username;
        $this->email = $email;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->contact = $contact;
    }

    // we can add additional constuctors if needed,or use the first construct and provide null values to other fields

    public function getUserID(){
        return $this->userID;
    }
    public function getUsername(){
        return $this->username;
    }
    public function getEmail(){
        return $this->email;
    }
    public function getFirstName(){
        return $this->firstName;
    }
    public function getLastName(){
        return $this->lastName;
    }
    public function getContact(){
        return $this->contact;
    }

    public function setUserID($userID){
        $this->userID = $userID;
    }
    public function setUsername($username){
        $this->username = $username;
    }
    public function setEmail($email){
        $this->email = $email;
    }
    public function setFirstName($firstName){
        $this->firstName = $firstName;
    }
    public function setLastName($lastName){
        $this->lastName = $lastName;
    }
    public function setContact($contact){
        $this->contact = $contact;
    }
}