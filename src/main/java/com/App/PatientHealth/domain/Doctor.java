package com.App.PatientHealth.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.App.PatientHealth.requestObjects.DoctorRegForm;

import java.util.List;

@Entity
public class Doctor extends User {
    @Column
    String specialisation;
    @OneToMany
    List<Patient> patients;
    @Column
    String gmcNum;

    public Doctor(){}


    public Doctor(DoctorRegForm d) {
        super(d.getName(),d.getUsername(),
        d.getPassword(),d.getEmail(), "DOCTOR");
        this.gmcNum = d.getGmcNum();
    }

    public Doctor(String name, String username, String password,String email,String specialisation) {
        super(name,username,password,email, "DOCTOR");
        this.specialisation = specialisation;
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


}