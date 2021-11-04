package com.App.PatientHealth.responseObject.domain;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.domain.calendar.Appointment;
import com.App.PatientHealth.domain.calendar.Day;

public class DayJson {

    int dayOfMonth;//day number of the month
    int dayOfWeek;
    List<AppointmentJson> appointments;
    
    public DayJson(Day day) {
        this.dayOfMonth = day.getDayOfMonth();
        this.dayOfWeek = day.getDayOfWeek();
        this.appointments = appointmentsToJson(day.getAppointments());
    }
    List<AppointmentJson> appointmentsToJson(List<Appointment> appointments) {
        List<AppointmentJson> appointmentJson = new ArrayList<AppointmentJson>();
        appointments.forEach( a -> {
            appointmentJson.add( new AppointmentJson(a));
        });
        return appointmentJson;
    }


    public int getDayOfMonth() {
        return this.dayOfMonth;
    }

    public void setDayOfMonth(int dayOfMonth) {
        this.dayOfMonth = dayOfMonth;
    }

    public int getDayOfWeek() {
        return this.dayOfWeek;
    }

    public void setDayOfWeek(int dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public List<AppointmentJson> getAppointments() {
        return this.appointments;
    }

    public void setAppointments(List<AppointmentJson> appointments) {
        this.appointments = appointments;
    }

}