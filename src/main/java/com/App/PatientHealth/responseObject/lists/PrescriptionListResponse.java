package com.App.PatientHealth.responseObject.lists;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.domain.Prescription;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.PrescriptionJson;

public class PrescriptionListResponse extends JsonResponse {
    List<PrescriptionJson> prescriptions;


    public PrescriptionListResponse() {}
    
   
    public PrescriptionListResponse(List<Prescription> prescriptions) {
        this.prescriptions = toJson(prescriptions);
    }


    public List<PrescriptionJson> toJson(List<Prescription> prescriptions) {
        List<PrescriptionJson> pList = new ArrayList<PrescriptionJson>();
        prescriptions.forEach( p -> {
            pList.add(new PrescriptionJson(p));
        });
        return pList;
    }

    public List<PrescriptionJson> getPrescriptions() {
        return this.prescriptions;
    }

    public void setPrescriptions(List<PrescriptionJson> prescriptions) {
        this.prescriptions = prescriptions;
    }

}
