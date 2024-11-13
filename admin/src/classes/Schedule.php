<?php
class Schedule{
    private $scheduleID;
    private $date;
    private $organizationID;
    private $startTime;
    private $endTime;
    private $location;

    public function __construct($scheduleID, $date, $organizationID, $startTime, $location){
        $this->scheduleID = $scheduleID;
        $this->date = $date;
        $this->organizationID = $organizationID;
        $this->startTime = $startTime;
        $this->endTime = $endTime;
        $this->location = $location;
    }
    public function getScheduleID(){
        return $this->scheduleID;
    }
    public function getDate(){
        return $this->date;
    }
    public function getOrganizationID(){
        return $this->organizationID;
    }
    public function getStartTime(){
        return $this->startTime;
    }
    public function getEndTime(){
        return $this->endTime;
    }
    public function getLocation(){
        return $this->location;
    }

    public function setScheduleID($scheduleID){
        $this->scheduleID = $scheduleID;
    }
    public function setDate($date){
        $this->date = $date;
    }
    public function setOrganizationID($organizationID){
        $this->organizationID=$organizationID;
    }
    public function setStartTime($startTime){
        $this->startTime = $startTime;
    }
    public function setEndTime($endTime){
        $this->endTime = $endTime;
    }
    public function setLocation($location){
        $this->location = $location;
    }

}
?>