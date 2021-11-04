package com.App.PatientHealth.domain.calendar;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.time.temporal.WeekFields;
import java.util.Locale;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.App.PatientHealth.domain.AppointmentRequest;

@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    @Column
    String appointmentType;
    @Column
    String appointmentInfo;
    @Column
    LocalDateTime dateTime;
    @Column
    Integer durationInMinutes;
    @Column
    Integer weekNumber;

    public Appointment(){}

    public Appointment(AppointmentRequest r, int year, Month month, int dayOfMonth, int hour, int minute, int durationInMinutes) {
        //set appointment details
        this.appointmentType = r.getAppointmentType();
        this.appointmentInfo = r.getAppointmentInfo();
        //set date
        LocalDate date = LocalDate.of(year, month, dayOfMonth);
        LocalTime time = LocalTime.of(hour, minute); 
        this.dateTime = LocalDateTime.of(date, time);
        this.durationInMinutes = durationInMinutes;
        //set week number
        WeekFields weekFields = WeekFields.of(Locale.getDefault()); 
        this.weekNumber = this.dateTime.get(weekFields.weekOfWeekBasedYear());
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
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
    
    public int getWeekNumber() {
        return weekNumber;
    }

    public void setWeekNumber(int weekNumber) {
        this.weekNumber = weekNumber;
    }

}
