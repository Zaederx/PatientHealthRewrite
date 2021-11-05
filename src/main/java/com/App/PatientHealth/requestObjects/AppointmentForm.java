package com.App.PatientHealth.requestObjects;

import java.time.LocalDateTime;

public class AppointmentForm {
    
    Integer id;
    String appointmentType;
    String appointmentInfo;
    LocalDateTime dateTime;
    Integer durationInMinutes;
    Integer weekNumber;
    Integer docId;
    Integer pId;
    
    public AppointmentForm(int id, String appointmentType, String appointmentInfo, LocalDateTime dateTime, Integer durationInMinutes, Integer weekNumber, Integer docId, Integer pId) {
        this.id = id;
        this.appointmentType = appointmentType;
        this.appointmentInfo = appointmentInfo;
        this.dateTime = dateTime;
        this.durationInMinutes = durationInMinutes;
        this.weekNumber = weekNumber;
        this.docId = docId;
        this.pId = pId;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public LocalDateTime getDateTime() {
        return this.dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
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

}
