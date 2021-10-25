package com.App.PatientHealth.responseObject.domain;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.domain.DoctorNote;
import com.App.PatientHealth.domain.Patient;
import com.App.PatientHealth.domain.Prescription;
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
    List<DoctorNoteJson> doctorNotes;
    public PatientJson(){
        this.prescriptions = new ArrayList<PrescriptionJson>();
        this.doctorNotes = new ArrayList<DoctorNoteJson>();
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
        this.doctorNotes = toDoctorNoteJsons(p.getDoctorNotes());
    }

 
    public List<PrescriptionJson> toPrescriptionJsons(List<Prescription> prescriptions) {
        List<PrescriptionJson> json = new ArrayList<PrescriptionJson>();
        prescriptions.forEach(n -> {
            json.add(new PrescriptionJson(n));
        });
        return json;
    }

    public List<DoctorNoteJson> toDoctorNoteJsons(List<DoctorNote> notes) {
        List<DoctorNoteJson> json = new ArrayList<DoctorNoteJson>();
        notes.forEach(n -> {
            json.add(new DoctorNoteJson (n));
        });
        return json;
    }

    


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

    public String getDOB() {
        return DOB;
    }

    public void setDOB(String DOB) {
        this.DOB = DOB;
    }

    public List<PrescriptionJson> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<PrescriptionJson> prescriptions) {
        this.prescriptions = prescriptions;
    }

    public List<DoctorNoteJson> getDoctorNotes() {
        return doctorNotes;
    }

    public void setDoctorNotes(List<DoctorNoteJson> doctorNotes) {
        this.doctorNotes = doctorNotes;
    }


}
