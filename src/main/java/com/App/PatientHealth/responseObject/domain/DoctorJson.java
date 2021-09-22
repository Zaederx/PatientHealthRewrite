package com.App.PatientHealth.responseObject.domain;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.domain.Doctor;

public class DoctorJson extends UserJson {
    String specialisation;
    List<PatientJson> patientJsons;

    public DoctorJson() {}
    public DoctorJson(Doctor d) {
        super(d);
        patientJsons = patientJsons(d);
        this.specialisation = d.getSpecialisation();
    }

    public List<PatientJson> patientJsons(Doctor d) {
        List<PatientJson> patients = new ArrayList<PatientJson>();
          d.getPatients().forEach(p -> patients.add(new PatientJson(p)));
        return patients;
    }
}
