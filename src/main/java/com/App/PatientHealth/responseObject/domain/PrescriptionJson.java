package com.App.PatientHealth.responseObject.domain;

import com.App.PatientHealth.domain.Prescription;

public class PrescriptionJson {
    int id;
    String medicationName;
    String doctorsDirections;

    public PrescriptionJson(Prescription p) {
        this.id = p.getId();
        this.medicationName = p.getMedicationName();
        this.doctorsDirections = p.getDoctorsDirections();
    }
    public PrescriptionJson(int id, String medicationName, String doctorsDirections) {
        this.id = id;
        this.medicationName = medicationName;
        this.doctorsDirections = doctorsDirections;
    }


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMedicationName() {
        return this.medicationName;
    }

    public void setMedicationName(String medicationName) {
        this.medicationName = medicationName;
    }

    public String getDoctorsDirections() {
        return this.doctorsDirections;
    }

    public void setDoctorsDirections(String doctorsDirections) {
        this.doctorsDirections = doctorsDirections;
    }

}
