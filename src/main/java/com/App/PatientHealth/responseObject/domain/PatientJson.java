package com.App.PatientHealth.responseObject.domain;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.domain.Patient;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Class to represent Patient as JSON.
 * Converted by Jackson to JSON when
 * returned by REST controller to client.
 */
public class PatientJson extends UserJson {

    @JsonProperty("DOB")
    String DOB;
    String doctorName;
    String doctorEmail;
    List<String> medicationNames;
    public PatientJson(){}

    public PatientJson(Patient p){
        super(p);
        this.DOB = p.getDOB();
        if (p.getDoctor() != null) {
            this.doctorName = p.getDoctor().getName();
            this.doctorEmail = p.getDoctor().getEmail();
        }
        else {
            this.doctorName = "N/A";
            this.doctorEmail = "N/A";
        }
        if (p.getMedication() != null) {
            this.medicationNames =  medicationNames(p);
        }
    }

    /**
     * Take patient as argument and return patient's medication names.
     * @param p
     * @return
     */
    public static List<String> medicationNames(Patient p) {
        List<String> medicationNames = new ArrayList<String>();
        p.getMedication().forEach( (med) -> 
            medicationNames.add(med.getName())
        );
        return medicationNames;
    }


    public String getDoctorName() {
        return this.doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getDoctorEmail() {
        return this.doctorEmail;
    }

    public void setDoctorEmail(String doctorEmail) {
        this.doctorEmail = doctorEmail;
    }

    public List<String> getMedicationNames() {
        return this.medicationNames;
    }

    public void setMedicationNames(List<String> medicationNames) {
        this.medicationNames = medicationNames;
    }

    public String getDOB() {
        return DOB;
    }

    public void setDOB(String DOB) {
        this.DOB = DOB;
    }

}
