<?php
class Organization
{
    private $organizationID;
    private $organizationName;
    private $organizationDesc;
    private $logo;
    private $membersArray;


    public function __construct($organizationID, $organizationName, $organizationDesc, $logo, $membersArray)
    {
        $this->organizationID = $organizationID;
        $this->organizationName = $organizationName;
        $this->organizationDesc = $organizationDesc;
        $this->logo = $logo;

        //list of vendor objects only
        $this->membersArray = $membersArray;
    }

    public function getOrganizationID()
    {
        return $this->organizationID;
    }

    public function getOrganizationName()
    {
        return $this->organizationName;
    }

    public function getOrganizationDesc()
    {
        return $this->organizationDesc;
    }

    public function getLogo()
    {
        return $this->logo;
    }
    public function getMembersArray()
    {
        return $this->membersArray;
    }

    public function setOrganizationID($organizationID)
    {
        $this->organizationID = $organizationID;
    }

    public function setOrganizationName($organizationName)
    {
        $this->organizationName = $organizationName;
    }

    public function setOrganizationDesc($organizationDesc)
    {
        $this->organizationDesc = $organizationDesc;
    }

    public function setLogo($logo)
    {
        $this->logo = $logo;
    }
    public function setMembersArray($membersArray)
    {
        $this->membersArray = $membersArray;
    }
} 