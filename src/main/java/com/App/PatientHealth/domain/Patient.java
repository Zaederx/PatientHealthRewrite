package com.App.PatientHealth.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.App.PatientHealth.domain.calendar.Appointment;
import com.App.PatientHealth.requestObjects.PatientRegForm;

import javax.persistence.ManyToOne;
/**
 * 
 */
@Entity
public class Patient extends User {
    
    @Column
    String DOB;
    @OneToMany(cascade = CascadeType.ALL, mappedBy="patient")
    List<Prescription> prescriptions;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "patient")
    List<MedicalNote> doctorNotes;
    @ManyToOne(cascade = CascadeType.ALL)
    Doctor doctor;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "patient")
    List<AppointmentRequest> appointmentRequests;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "patient")
    List<Appointment> appointments;


    public Patient() {
        this.prescriptions = new ArrayList<Prescription>();
        this.doctorNotes = new ArrayList<MedicalNote>();
        this.appointmentRequests = new ArrayList<AppointmentRequest>();
        this.appointments = new ArrayList<Appointment>();
    }

    public Patient(PatientRegForm p) {
        super(p.getName(),p.getUsername(),
        p.getPassword(), p.getEmail(), "PATIENT");
        this.prescriptions = new ArrayList<Prescription>();
        this.doctorNotes = new ArrayList<MedicalNote>();
    }

    public Patient(String name, String username, String password, String email, String DOB) {
        super(name,username,password,email,"PATIENT");
        this.DOB = DOB;
        this.prescriptions = new ArrayList<Prescription>();
        this.doctorNotes = new ArrayList<MedicalNote>();
    }

    public Patient(String fname, String lname, String username, String email,List<Prescription> medication, String DOB, Doctor doctor) {
        this.prescriptions = medication;
        this.DOB = DOB;
        this.doctor = doctor;
        this.prescriptions = new ArrayList<Prescription>();
        this.doctorNotes = new ArrayList<MedicalNote>();
    }

    public List<Prescription> getPrescriptions() {
        return this.prescriptions;
    }

    public void setPrescriptions(List<Prescription> medication) {
        this.prescriptions = medication;
    }

    public List<MedicalNote> getDoctorNotes() {
        return doctorNotes;
    }

    public void setDoctorNotes(List<MedicalNote> doctorNotes) {
        this.doctorNotes = doctorNotes;
    }

    public List<AppointmentRequest> getAppointmentRequests() {
        return appointmentRequests;
    }

    public void setAppointmentRequests(List<AppointmentRequest> appointmentRequests) {
        this.appointmentRequests = appointmentRequests;
    }

    public Doctor getDoctor() {
        return this.doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public String getDOB() {
        return DOB;
    }

    public void setDOB(String DOB) {
        this.DOB = DOB;
    }


    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }
}
