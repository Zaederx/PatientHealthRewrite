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
    List<MedicalNote> medicalNotes;
    @ManyToOne(cascade = CascadeType.ALL)
    Doctor doctor;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "patient")
    List<AppointmentRequest> appointmentRequests;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "patient")
    List<Appointment> appointments;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "patient")
    List<PatientAppointmentRequest> patientAppointmentRequests;


    public Patient() {
        this.prescriptions = new ArrayList<Prescription>();
        this.medicalNotes = new ArrayList<MedicalNote>();
        this.appointmentRequests = new ArrayList<AppointmentRequest>();
        this.appointments = new ArrayList<Appointment>();
        this.patientAppointmentRequests = new ArrayList<PatientAppointmentRequest>();
    }

    public Patient(PatientRegForm p) {
        super(p.getName(),p.getUsername(),
        p.getPassword(), p.getEmail(), "PATIENT");
        this.prescriptions = new ArrayList<Prescription>();
        this.medicalNotes = new ArrayList<MedicalNote>();
        this.patientAppointmentRequests = new ArrayList<PatientAppointmentRequest>();
    }

    public Patient(String name, String username, String password, String email, String DOB) {
        super(name,username,password,email,"PATIENT");
        this.DOB = DOB;
        this.prescriptions = new ArrayList<Prescription>();
        this.medicalNotes = new ArrayList<MedicalNote>();
        this.patientAppointmentRequests = new ArrayList<PatientAppointmentRequest>();
    }

    public Patient(String fname, String lname, String username, String email,List<Prescription> medication, String DOB, Doctor doctor) {
        this.prescriptions = medication;
        this.DOB = DOB;
        this.doctor = doctor;
        this.prescriptions = new ArrayList<Prescription>();
        this.medicalNotes = new ArrayList<MedicalNote>();
        this.patientAppointmentRequests = new ArrayList<PatientAppointmentRequest>();
    }

    public List<Prescription> getPrescriptions() {
        return this.prescriptions;
    }

    public void setPrescriptions(List<Prescription> medication) {
        this.prescriptions = medication;
    }

    public List<MedicalNote> getMedicalNotes() {
        return medicalNotes;
    }

    public void setMedicalNotes(List<MedicalNote> doctorNotes) {
        this.medicalNotes = doctorNotes;
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


    public List<PatientAppointmentRequest> getPatientAppointmentRequests() {
        return this.patientAppointmentRequests;
    }

    public void setPatientAppointmentRequests(List<PatientAppointmentRequest> patientAppointmentRequests) {
        this.patientAppointmentRequests = patientAppointmentRequests;
    }

}
