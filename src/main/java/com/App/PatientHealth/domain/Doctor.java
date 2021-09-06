package com.App.PatientHealth.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import java.util.List;

@Entity
public class Doctor extends User {
    @Column
    String specialisation;
    @OneToMany
    List<Patient> patients;

    public Doctor(){}
    public Doctor(String fname, String lname, String username,String email,String specialisation, List<Patient> patients) {
        super(fname,lname,username,email, "DOCTOR");
        this.specialisation = specialisation;
        this.patients = patients;
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


}