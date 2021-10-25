package com.App.PatientHealth.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.App.PatientHealth.requestObjects.AppointmentRequestForm;
import com.App.PatientHealth.services.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;

@Entity
public class AppointmentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected int id;
    @ManyToOne
    Patient patient;
    @ManyToOne(cascade = CascadeType.ALL)
    Doctor doctor;
    @Column
    String appointmentType;
    @Column
    String appointmentInfo;

    public AppointmentRequest() {}
    public AppointmentRequest(AppointmentRequestForm form) {
        this.appointmentType = form.getAppointmentType();
        this.appointmentInfo = form.getAppointmentInfo();
    }
    public AppointmentRequest(String appointmentType, String appointmentInfo) {
        this.appointmentType = appointmentType;
        this.appointmentInfo = appointmentInfo;
    }


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Patient getPatient() {
        return this.patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Doctor getDoctor() {
        return this.doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
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


    
}
