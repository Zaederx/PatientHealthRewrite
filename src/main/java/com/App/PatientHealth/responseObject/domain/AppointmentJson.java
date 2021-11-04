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

}
