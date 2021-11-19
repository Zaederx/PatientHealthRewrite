package com.App.PatientHealth.responseObject.lists;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.domain.PatientAppointmentRequest;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.PatientAppointmentRequestJson;

public class PatientAppointmentRequestListResponse extends JsonResponse {
    List<PatientAppointmentRequestJson> patientAppointmentRequests;

    public PatientAppointmentRequestListResponse(){}
    public PatientAppointmentRequestListResponse(List<PatientAppointmentRequest> appointments) {
        this.patientAppointmentRequests = toJson(appointments);
    }

    public List<PatientAppointmentRequestJson> toJson(List<PatientAppointmentRequest> appointments) {
        List<PatientAppointmentRequestJson> a = new ArrayList<PatientAppointmentRequestJson>();
        appointments.forEach(appointment -> 
        a.add(new PatientAppointmentRequestJson(appointment)));
        return a;
    }

    //** Getters amd Setters */
    public List<PatientAppointmentRequestJson> getPatientAppointmentRequests() {
        return this.patientAppointmentRequests;
    }

    public void setPatientAppointmentRequests(List<PatientAppointmentRequestJson> appointments) {
        this.patientAppointmentRequests = appointments;
    }

}
