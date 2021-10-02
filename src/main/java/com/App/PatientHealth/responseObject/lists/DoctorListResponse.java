package com.App.PatientHealth.responseObject.lists;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.DoctorJson;

public class DoctorListResponse extends JsonResponse {
    List<DoctorJson> doctorJsons;
    public DoctorListResponse () {
        this.doctorJsons = new ArrayList<DoctorJson>();
    }

    public List<DoctorJson> getDoctorJsons() {
        return doctorJsons;
    }

    public void setDoctorJsons(List<DoctorJson> doctorJson) {
        this.doctorJsons = doctorJson;
    }
    
}
