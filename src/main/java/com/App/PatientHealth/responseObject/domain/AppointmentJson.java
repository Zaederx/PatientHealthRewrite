package com.App.PatientHealth.responseObject.domain;

import com.App.PatientHealth.domain.calendar.Appointment;

public class AppointmentJson {
    
    String appointmentType;
    String appointmentInfo;
    String day;
    String hour;
    String min;

    public AppointmentJson(Appointment a) {
        appointmentType = a.getAppointmentType();
        appointmentInfo = a.getAppointmentInfo();
        day = a.getDateTime().getDayOfWeek().name();
        hour = Integer.toString(a.getDateTime().getHour());
        min = Integer.toString(a.getDateTime().getMinute());
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


}
