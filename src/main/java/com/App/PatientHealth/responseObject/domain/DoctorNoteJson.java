package com.App.PatientHealth.responseObject.domain;

import com.App.PatientHealth.domain.DoctorNote;

public class DoctorNoteJson {
    int id;
    String noteHeading;
    String noteBody;

    public DoctorNoteJson(DoctorNote note) {
        this.id = note.getId();
        this.noteHeading = note.getNoteHeading();
        this.noteBody = note.getNoteBody();
    }
    public DoctorNoteJson(int id,String noteHeading, String noteBody) {
        this.id = id;
        this.noteHeading = noteHeading;
        this.noteBody = noteBody;
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
    
}
