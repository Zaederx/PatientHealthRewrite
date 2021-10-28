package com.App.PatientHealth.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.App.PatientHealth.requestObjects.MedicalNoteForm;

@Entity
public class MedicalNote {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    @Column
    String noteHeading;
    @Column
    String noteBody;
    @ManyToOne
    Patient patient;

    public MedicalNote() {}
    public MedicalNote(String noteHeading, String noteBody) {
        this.noteHeading = noteHeading;
        this.noteBody = noteBody;
    }

    public MedicalNote(MedicalNoteForm form) {
        //just in case you want to update existing form
        //you need to add the note id before saving to repository
        if(form.getId() != null) {
            this.id = form.getId();
        }
        this.noteHeading = form.getNoteHeading();
        this.noteBody = form.getNoteBody();
    }


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
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

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
    public void updateFromForm(MedicalNoteForm form) {
        this.noteHeading = form.getNoteHeading();
        this.noteBody = form.getNoteBody();
    }

}
