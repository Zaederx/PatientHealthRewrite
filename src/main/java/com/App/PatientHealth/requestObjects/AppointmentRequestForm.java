package com.App.PatientHealth.requestObjects;

public class AppointmentRequestForm {
    Integer patientId;
    Integer doctorId;
    String appointmentType;
    String appointmentInfo;

    public AppointmentRequestForm() {}
    public AppointmentRequestForm(Integer patientId, Integer doctorId, String appointmentType, String appointmentInfo) {
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.appointmentType = appointmentType;
        this.appointmentInfo = appointmentInfo;
    }

    public Integer getPatientId() {
        return this.patientId;
    }

    public void setPatientId(Integer patientId) {
        this.patientId = patientId;
    }

    public Integer getDoctorId() {
        return this.doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
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
