package com.App.PatientHealth.responseObject.domain;

import com.App.PatientHealth.domain.AppointmentRequest;

/**
 * Class to represent Appointment Request for 
 * Jackson JSON convertions
 * 
 * <pre>
 * {@code
 * String appointmentType;
 * String appointmentInfo;
 * }
 * </pre>
 * 
 * 
 */
public class AppointmentRequestJson {

    String appointmentType;
    String appointmentInfo;

    public AppointmentRequestJson() {}

    public AppointmentRequestJson(AppointmentRequest request) {
        this.appointmentType = request.getAppointmentType();
        this.appointmentInfo = request.getAppointmentInfo();
    }
    public AppointmentRequestJson(String appointmentType, String appointmentInfo) {
        this.appointmentType = appointmentType;
        this.appointmentInfo = appointmentInfo;
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
    
}
