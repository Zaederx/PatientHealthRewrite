package com.App.PatientHealth.domain;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
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

    public Patient(String fname, String mnames, String lname, String username, String password, String email) {
        super(fname,mnames,lname,username,password,email,"PATIENT");
    }

    public Patient(String fname, String lname, String username, String email,List<Medication> medication, Doctor doctor) {
        this.medication = medication;
        this.doctor = doctor;
    }

    public String getFname() {
        return this.fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return this.lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
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
