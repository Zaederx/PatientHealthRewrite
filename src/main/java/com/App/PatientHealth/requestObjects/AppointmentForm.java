package com.App.PatientHealth.requestObjects;


public class AppointmentForm {
    
    Integer aId;//appointment id
    String appointmentType;
    String appointmentInfo;
    String date;//recieved in 2021-11-05 format from json
    String time;
    Integer durationInMinutes;
    Integer weekNumber;
    Integer docId;
    Integer pId;
    
    public AppointmentForm(int aId, String appointmentType, String appointmentInfo, String date, String time, Integer durationInMinutes, Integer weekNumber, Integer docId, Integer pId) {
        this.aId = aId;
        this.appointmentType = appointmentType;
        this.appointmentInfo = appointmentInfo;
        this.date = date;
        this.time = time;
        this.durationInMinutes = durationInMinutes;
        this.weekNumber = weekNumber;
        this.docId = docId;
        this.pId = pId;
    }

    public Integer getAId() {
        return this.aId;
    }

    public void setAId(Integer id) {
        this.aId = id;
    }

    public String getAppointmentType() {
        return this.appointmentType;
    }

    public void setAppointmentType(String appointmentType) {
        this.appointmentType = appointmentType;
    }

    public String getAppointmentInfo() {
        return this.appointmentInfo;
    }

    public void setAppointmentInfo(String appointmentInfo) {
        this.appointmentInfo = appointmentInfo;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String dateTime) {
        this.date = dateTime;
    }

    public String getTime() {
        return this.time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Integer getDurationInMinutes() {
        return this.durationInMinutes;
    }

    public void setDurationInMinutes(Integer durationInMinutes) {
        this.durationInMinutes = durationInMinutes;
    }

    public Integer getWeekNumber() {
        return this.weekNumber;
    }

    public void setWeekNumber(Integer weekNumber) {
        this.weekNumber = weekNumber;
    }

    public Integer getDocId() {
        return this.docId;
    }

    public void setDocId(Integer docId) {
        this.docId = docId;
    }

    public Integer getPId() {
        return this.pId;
    }

    public void setPId(Integer pId) {
        this.pId = pId;
    }


    public String getDatTimeStr() {
        return this.date+" "+this.time;
    }

}
