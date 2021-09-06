package com.App.PatientHealth.javaJson.list;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.javaJson.single.DoctorJson;

public class DoctorResponse extends JsonResponse {
    List<DoctorJson> doctorJson;
    public DoctorResponse () {
        this.doctorJson = new ArrayList<DoctorJson>();
    }

    public List<DoctorJson> getDoctorJson() {
        return doctorJson;
    }

    public void setDoctorJson(List<DoctorJson> doctorJson) {
        this.doctorJson = doctorJson;
    }
    
}
