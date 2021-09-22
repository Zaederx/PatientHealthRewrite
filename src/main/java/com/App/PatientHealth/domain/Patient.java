package com.App.PatientHealth.domain;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.App.PatientHealth.requestObjects.PatientRegForm;

import javax.persistence.ManyToOne;
/**
 * 
 */
@Entity
public class Patient extends User {
    
    @OneToMany
    List<Medication> medication;
    @ManyToOne
    Doctor doctor;

    public Patient() {}

    public Patient(PatientRegForm p) {
        super(p.getName(),p.getUsername(),
        p.getPassword(), p.getEmail(), "PATIENT");
    }

    public Patient(String name, String username, String password, String email) {
        super(name,username,password,email,"PATIENT");
    }

    public Patient(String fname, String lname, String username, String email,List<Medication> medication, Doctor doctor) {
        this.medication = medication;
        this.doctor = doctor;
    }


    public List<Medication> getMedication() {
        return this.medication;
    }

    public void setMedication(List<Medication> medication) {
        this.medication = medication;
    }

    public Doctor getDoctor() {
        return this.doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

}
