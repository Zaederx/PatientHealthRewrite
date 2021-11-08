package com.App.PatientHealth.responseObject.domain;

import com.App.PatientHealth.domain.calendar.Appointment;

public class AppointmentJson {
    
    String id;
    String appointmentType;
    String appointmentInfo;
    String day;
    String hour;
    String min;
    String durationInMinutes;
    String date;
    String time;
    String docId;
    String pId;

    public AppointmentJson() {}

    public AppointmentJson(Appointment a) {
        id = Integer.toString(a.getId());
        appointmentType = a.getAppointmentType();
        appointmentInfo = a.getAppointmentInfo();
        day = a.getDateTime().getDayOfWeek().name();
        hour = Integer.toString(a.getDateTime().getHour());
        min = Integer.toString(a.getDateTime().getMinute());
        durationInMinutes = Integer.toString(a.getDurationInMinutes());
        this.date = a.getDateTime().toLocalDate().toString();
        this.time = a.getDateTime().toLocalTime().toString();
        this.docId = Integer.toString(a.getDoctor().getId());
        this.pId = Integer.toString(a.getPatient().getId());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public String getDay() {
        return this.day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getHour() {
        return this.hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public String getMin() {
        return this.min;
    }

    public void setMin(String min) {
        this.min = min;
    }


    public String getDurationInMinutes() {
        return this.durationInMinutes;
    }

    public void setDurationInMinutes(String durationInMinutes) {
        this.durationInMinutes = durationInMinutes;
    }


    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }


    public String getTime() {
        return this.time;
    }

    public void setTime(String time) {
        this.time = time;
    }


    public String getDocId() {
        return this.docId;
    }

    public void setDocId(String docId) {
        this.docId = docId;
    }

    public String getPId() {
        return this.pId;
    }

    public void setPId(String pId) {
        this.pId = pId;
    }

}
