package com.App.PatientHealth.responseObject.lists;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.DoctorJson;

public class DoctorListResponse extends JsonResponse {
    List<DoctorJson> doctorJson;
    public DoctorListResponse () {
        this.doctorJson = new ArrayList<DoctorJson>();
    }

    public List<DoctorJson> getDoctorJson() {
        return doctorJson;
    }

    public void setDoctorJson(List<DoctorJson> doctorJson) {
        this.doctorJson = doctorJson;
    }
    
}
