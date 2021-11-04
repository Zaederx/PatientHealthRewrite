package com.App.PatientHealth.domain.calendar;

import java.util.ArrayList;
import java.util.List;

public class Day {
    int dayOfMonth;//day number of the month
    int dayOfWeek;
    List<Appointment> appointments;

    public Day(int dayOfMonth, int dayOfWeek) {
        this.dayOfMonth = dayOfMonth;
        this.dayOfWeek = dayOfWeek;
        this.appointments = new ArrayList<Appointment>(24);
        //add 24 appointment slots
        for(int i = 0; i < appointments.size(); i++) {
            appointments.add(new Appointment());
        }
        
    }

    public Day(int dayOfMonth, int dayOfWeek, List<Appointment> appointments) {
        this.dayOfMonth = dayOfMonth;
        this.dayOfWeek = dayOfWeek;
        this.appointments = appointments;
        //add 24 appointment slots
        for(int i = 0; i < appointments.size(); i++) {
            appointments.add(new Appointment());
        }
        
    }

    public Day(ArrayList<Appointment> appointmentSlot) {
        this.appointments = appointmentSlot;
    }
    
    public int getDayOfMonth() {
        return dayOfMonth;
    }

    public void setDayOfMonth(int dayOfMonth) {
        this.dayOfMonth = dayOfMonth;
    }

    public int getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(int dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointmentSlot) {
        this.appointments = appointmentSlot;
    }
}
