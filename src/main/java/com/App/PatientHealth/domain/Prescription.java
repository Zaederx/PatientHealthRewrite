package com.App.PatientHealth.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
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
    @ManyToOne
    Patient patient;

    public Prescription(){}
    public Prescription(String medicationName, String doctorsDirections) {
        this.medicationName = medicationName;
        this.doctorsDirections = doctorsDirections;
    }

    public Prescription(PrescriptionForm form) {
        this.medicationName = form.getMedicationName();
        this.doctorsDirections = form.getDoctorsDirections();
        //for editing existing prescriptions
        if (form.getPrescriptionId() != null) {
            this.id = form.getPrescriptionId();
        }

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

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public void updateFromForm(PrescriptionForm form) {
        this.setMedicationName(form.getMedicationName());
        this.setDoctorsDirections(form.getDoctorsDirections());
    }
}
