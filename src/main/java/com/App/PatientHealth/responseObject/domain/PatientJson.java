package com.App.PatientHealth.responseObject.domain;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.domain.AppointmentRequest;
import com.App.PatientHealth.domain.MedicalNote;
import com.App.PatientHealth.domain.Patient;
import com.App.PatientHealth.domain.Prescription;
import com.App.PatientHealth.domain.calendar.Appointment;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Class to represent Patient as JSON.
 * Converted by Jackson to JSON when
 * returned by REST controller to client.
 */
public class PatientJson extends UserJson {

    @JsonProperty("DOB")
    String DOB;
    String doctorName;
    String doctorEmail;
    List<PrescriptionJson> prescriptions;
    List<MedicalNoteJson> medicalNotes;
    List<AppointmentRequestJson> appointmentRequests;
    List<AppointmentJson> appointments;
    public PatientJson(){
        this.prescriptions = new ArrayList<PrescriptionJson>();
        this.medicalNotes = new ArrayList<MedicalNoteJson>();
        this.appointmentRequests = new ArrayList<AppointmentRequestJson>();
        this.appointments = new ArrayList<AppointmentJson>();
    }

    public PatientJson(Patient p){
        super(p);
        this.DOB = p.getDOB();
        if (p.getDoctor() != null) {
            this.doctorName = p.getDoctor().getName();
            this.doctorEmail = p.getDoctor().getEmail();
        }
        else {
            this.doctorName = "N/A";
            this.doctorEmail = "N/A";
        }
        this.prescriptions = toPrescriptionJsons(p.getPrescriptions());
        this.medicalNotes = toDoctorNoteJsons(p.getMedicalNotes());
        this.appointmentRequests = toAppointmentRequestJsons(p.getAppointmentRequests());
        this.appointments = toAppointmentJsons(p.getAppointments());
    }

/* *********** Helper Functions *********** */ 
    public List<PrescriptionJson> toPrescriptionJsons(List<Prescription> prescriptions) {
        List<PrescriptionJson> json = new ArrayList<PrescriptionJson>();
        if(prescriptions.size() > 0) {
            prescriptions.forEach(n -> {
                json.add(new PrescriptionJson(n));
            });
        }
        return json;
    }

    public List<MedicalNoteJson> toDoctorNoteJsons(List<MedicalNote> notes) {
        List<MedicalNoteJson> json = new ArrayList<MedicalNoteJson>();
        if (notes != null && notes.size() > 0) {
            notes.forEach(n -> {
                json.add(new MedicalNoteJson (n));
            });
        }
        return json;
    }

    public List<AppointmentRequestJson> toAppointmentRequestJsons(List<AppointmentRequest> requests) {
        List<AppointmentRequestJson> json = new ArrayList<AppointmentRequestJson>();
        if (requests != null && requests.size() > 0) {
            requests.forEach(req -> {
                json.add(new AppointmentRequestJson (req));
            });
        }
        return json;
    }

    public List<AppointmentJson> toAppointmentJsons(List<Appointment> appointments) {
        List<AppointmentJson> json = new ArrayList<AppointmentJson>();
        if(appointments != null && appointments.size() > 0) {
            appointments.forEach(a -> {
                json.add(new AppointmentJson (a));
            });
        }
        return json;
    }


/* *********** Getters and Setters *********** */  
    public String getDoctorName() {
        return this.doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getDoctorEmail() {
        return this.doctorEmail;
    }

    public void setDoctorEmail(String doctorEmail) {
        this.doctorEmail = doctorEmail;
    }

    @JsonProperty("DOB")
    public String getDOB() {
        return DOB;
    }

    @JsonProperty("DOB")
    public void setDOB(String DOB) {
        this.DOB = DOB;
    }

    public List<PrescriptionJson> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<PrescriptionJson> prescriptions) {
        this.prescriptions = prescriptions;
    }

    public List<MedicalNoteJson> getMedicalNotes() {
        return medicalNotes;
    }

    public void setMedicalNotes(List<MedicalNoteJson> doctorNotes) {
        this.medicalNotes = doctorNotes;
    }

    public List<AppointmentRequestJson> getAppointmentRequests() {
        return appointmentRequests;
    }

    public void setAppointmentRequests(List<AppointmentRequestJson> appointmentRequests) {
        this.appointmentRequests = appointmentRequests;
    }

    public List<AppointmentJson> getAppointments() {
        return this.appointments;
    }

    public void setAppointments(List<AppointmentJson> appointments) {
        this.appointments = appointments;
    }

    
}
