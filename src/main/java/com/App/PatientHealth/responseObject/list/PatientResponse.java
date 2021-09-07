package com.App.PatientHealth.responseObject.list;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.responseObject.single.PatientJson;

public class PatientResponse extends JsonResponse{
    List<PatientJson> patientJson;
    public PatientResponse() {
        this.patientJson = new ArrayList<PatientJson>();
    }
    public List<PatientJson> getPatientJson() {
        return patientJson;
    }

    public void setPatientJson(List<PatientJson> patientJson) {
        this.patientJson = patientJson;
    }
}
