package com.App.PatientHealth.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.App.PatientHealth.domain.calendar.Appointment;
import com.App.PatientHealth.requestObjects.DoctorRegForm;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Doctor extends User {
    @Column
    String specialisation;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "doctor")
    List<Patient> patients;
    @Column
    String gmcNum;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "doctor")
    List<AppointmentRequest> appointmentRequests;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "doctor")
    List<Appointment> appointments;

    public Doctor(){
        this.patients = new ArrayList<Patient>();
        this.appointmentRequests = new ArrayList<AppointmentRequest>();
        this.appointments = new ArrayList<Appointment>();
    }


    public Doctor(DoctorRegForm d) {
        super(d.getName(),d.getUsername(),
        d.getPassword(),d.getEmail(), "DOCTOR");
        this.gmcNum = d.getGmcNum();
        this.patients = new ArrayList<Patient>();
    }

    public Doctor(String name, String username, String password,String email,String specialisation) {
        super(name,username,password,email, "DOCTOR");
        this.specialisation = specialisation;
        this.patients = new ArrayList<Patient>();
    }

    public Doctor(String name, String username, String password,String email,String specialisation, List<Patient> patients) {
        super(name,username,password,email, "DOCTOR");
        this.specialisation = specialisation;
        this.patients = patients;
    }

    public String getSpecialisation() {
        return this.specialisation;
    }

    public void setSpecialisation(String specialisation) {
        this.specialisation = specialisation;
    }

    public List<Patient> getPatients() {
        return this.patients;
    }

    public void setPatients(List<Patient> patients) {
        this.patients = patients;
    }

    public String getGmcNum() {
        return gmcNum;
    }

    public void setGmcNum(String gmcNum) {
        this.gmcNum = gmcNum;
    }

    public List<AppointmentRequest> getAppointmentRequests() {
        return appointmentRequests;
    }

    public void setAppointmentRequests(List<AppointmentRequest> appointmentRequests) {
        this.appointmentRequests = appointmentRequests;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

}