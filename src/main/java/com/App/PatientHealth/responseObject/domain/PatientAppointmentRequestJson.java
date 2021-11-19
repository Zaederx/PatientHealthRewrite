package com.App.PatientHealth.responseObject.domain;

import com.App.PatientHealth.domain.PatientAppointmentRequest;

public class PatientAppointmentRequestJson  {
    private int id;
    private String appointmentType;
	private String appointmentInfo;
	private Boolean morningSession;

    public PatientAppointmentRequestJson() {}

    public PatientAppointmentRequestJson(PatientAppointmentRequest request) {
        this.id = request.getId();
        this.appointmentType = request.getAppointmentType();
        this.appointmentInfo = request.getAppointmentInfo();
        this.morningSession = request.getMorningSession();
    }


    //SECTION GETTERS AND SETTERS


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Boolean isMorningSession() {
        return this.morningSession;
    }


    public String getAppointmentType() {
        return this.appointmentType;
    }

    public void setAppointmentType(String appointmentType) {
        this.appointmentType = appointmentType;
    }

    public String getAppointmentInfo() {
        return this.appointmentInfo;
    }

    public void setAppointmentInfo(String appointmentInfo) {
        this.appointmentInfo = appointmentInfo;
    }


    public Boolean getMorningSession() {
        return this.morningSession;
    }

    public void setMorningSession(Boolean session) {
        this.morningSession = session;
    }

}
