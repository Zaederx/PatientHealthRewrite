package com.App.PatientHealth.domain.calendar;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.time.temporal.WeekFields;
import java.util.Locale;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.App.PatientHealth.domain.AppointmentRequest;
import com.App.PatientHealth.domain.Doctor;
import com.App.PatientHealth.domain.Patient;
import com.App.PatientHealth.requestObjects.AppointmentForm;

@Entity
public class Appointment {

    //IMPORTANT FIGURE OUT HOW BEST TO STORE AND RETRIEVE DATES
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
    @ManyToOne
    Doctor doctor;
    @ManyToOne
    Patient patient;

    public Appointment(){}

    public Appointment(AppointmentForm form) {
        if(form.getId() != null) {
            this.id = form.getId();
        }
        this.appointmentType = form.getAppointmentType();
        this.appointmentInfo = form.getAppointmentInfo();
        this.durationInMinutes = form.getDurationInMinutes();
        this.weekNumber = form.getWeekNumber();

        //set dateTime
        String dateTimeStr = form.getDatTimeStr();
        this.dateTime = strToLocalDateTime(dateTimeStr);
        //IMPORTANT remember to always assign doctor and patient in controller methods - requires userServices
    }

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

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getDurationInMinutes() {
        return this.durationInMinutes;
    }

    public void setDurationInMinutes(Integer durationInMinutes) {
        this.durationInMinutes = durationInMinutes;
    }

    public Doctor getDoctor() {
        return this.doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Patient getPatient() {
        return this.patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public void update(AppointmentForm form) {
        this.id = form.getId();
        this.appointmentType = form.getAppointmentType();
        this.appointmentInfo = form.getAppointmentInfo();
        
        String dateTimeStr = form.getDatTimeStr();
        this.dateTime = strToLocalDateTime(dateTimeStr);
        this.durationInMinutes = form.getDurationInMinutes();
        this.weekNumber = form.getWeekNumber();
    }

    /**
     * Converts string to LocalDateTime object
     * <br>
     * E.g. // String str = "2016-03-04 11:30";
     * 
     * @param date
     * @return
     */
    public LocalDateTime strToLocalDateTime(String dateStr) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(dateStr, formatter);
        return dateTime;
    }

}
