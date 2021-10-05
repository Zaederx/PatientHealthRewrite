package com.App.PatientHealth.responseObject.lists;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.PatientJson;

public class PatientListResponse extends JsonResponse{
    List<PatientJson> patientJsons;
    public PatientListResponse() {
        this.patientJsons = new ArrayList<PatientJson>();
    }
    
    public List<PatientJson> getPatientJsons() {
        return patientJsons;
    }

    public void setPatientJsons(List<PatientJson> patientJson) {
        this.patientJsons = patientJson;
    }
}
