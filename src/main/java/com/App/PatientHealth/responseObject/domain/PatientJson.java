package com.App.PatientHealth.responseObject.domain;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.domain.Patient;

/**
 * Class to represent Patient as JSON.
 * Converted by Jackson to JSON when
 * returned by REST controller to client.
 */
public class PatientJson extends UserJson {

    String doctorName;
    List<String> medicationNames;
    public PatientJson(){}

    public PatientJson(Patient p){
        super(p);
        this.doctorName = p.getDoctor().getName();
        this.medicationNames =  medicationNames(p);
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
}
