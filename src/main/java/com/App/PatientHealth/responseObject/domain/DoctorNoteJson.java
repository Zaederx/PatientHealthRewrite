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
}
