package com.App.PatientHealth.requestObjects;

public class MedicalNoteForm {
    Integer id;
    int patientId;
    String noteHeading;
    String noteBody;

    public MedicalNoteForm() {
    }

    /**
     * 
     * @param patientId
     * @param noteHeading
     * @param noteBody
     */
    public MedicalNoteForm(int patientId, String noteHeading, String noteBody) {
        this.patientId = patientId;
        this.noteHeading = noteHeading;
        this.noteBody = noteBody;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getPatientId() {
        return patientId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }

    public String getNoteHeading() {
        return this.noteHeading;
    }

    public void setNoteHeading(String noteHeading) {
        this.noteHeading = noteHeading;
    }

    public String getNoteBody() {
        return this.noteBody;
    }

    public void setNoteBody(String noteBody) {
        this.noteBody = noteBody;
    }

}
