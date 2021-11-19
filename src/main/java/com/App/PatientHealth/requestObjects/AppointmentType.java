package com.App.PatientHealth.requestObjects;

public enum AppointmentType {
    Check_Up(1),
    Medical_Question(2),
    Medical_Concern(3),
    Urgent(4),
    Travel_Related(5),
    Prescription_Review(6),
    Mental_Health(7),
    Other(8);
    
    private int value;
    
    AppointmentType(int value) {
        this.value = value;
    }
    
    public int getValue() {
        return value;
    }
    
}