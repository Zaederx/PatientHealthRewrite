package com.App.PatientHealth.requestObjects;

public class PrescriptionForm {
    String medicationName;
    String doctorsDirections;
    int patientId;
    Integer prescriptionId;

    public PrescriptionForm(String medicationName, String doctorsDirections, int patientId, Integer prescriptionId) {
        this.medicationName = medicationName;
        this.doctorsDirections = doctorsDirections;
        this.patientId = patientId;
        this.prescriptionId = prescriptionId;
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

    public int getPatientId() {
        return patientId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }


    public Integer getPrescriptionId() {
        return this.prescriptionId;
    }

    public void setPrescriptionId(Integer prescriptionId) {
        this.prescriptionId = prescriptionId;
    }
    

}
