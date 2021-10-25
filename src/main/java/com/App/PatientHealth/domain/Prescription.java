package com.App.PatientHealth.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.App.PatientHealth.requestObjects.PrescriptionForm;

@Entity
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Column
    String medicationName;
    @Column
    String doctorsDirections;

    public Prescription(){}
    public Prescription(String medicationName, String doctorsDirections) {
        this.medicationName = medicationName;
        this.doctorsDirections = doctorsDirections;
    }

    public Prescription(PrescriptionForm form) {
        this.medicationName = form.getMedicationName();
        this.doctorsDirections = form.getDoctorsDirections();

    }


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    public String getMedicationName() {
        return medicationName;
    }

    public void setMedicationName(String medicationName) {
        this.medicationName = medicationName;
    }

    public String getDoctorsDirections() {
        return doctorsDirections;
    }

    public void setDoctorsDirections(String doctorsDirections) {
        this.doctorsDirections = doctorsDirections;
    }

}
