package com.App.PatientHealth.javaJson.single;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.domain.Doctor;

public class DoctorJson {
    Integer id;
    String fname;
    String lname;
    List<PatientJson> patientJsons;

    public DoctorJson() {}
    public DoctorJson(Doctor d) {
        id = d.getId();
        fname = d.getFname();
        lname = d.getLname();
        patientJsons = patientJsons(d);
    }

    public List<PatientJson> patientJsons(Doctor d) {
        List<PatientJson> patients = new ArrayList<PatientJson>();
        d.getPatients().forEach(p -> patients.add(new PatientJson(p)));
        return patients;
    }
}
