package com.App.PatientHealth.responseObject.lists;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.PatientJson;

public class PatientListResponse extends JsonResponse{
    List<PatientJson> patientJson;
    public PatientListResponse() {
        this.patientJson = new ArrayList<PatientJson>();
    }
    public List<PatientJson> getPatientJson() {
        return patientJson;
    }

    public void setPatientJson(List<PatientJson> patientJson) {
        this.patientJson = patientJson;
    }
}
