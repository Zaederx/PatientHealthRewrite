package com.App.PatientHealth.responseObject.lists;

import java.util.ArrayList;
import java.util.List;

import com.App.PatientHealth.domain.MedicalNote;
import com.App.PatientHealth.responseObject.JsonResponse;
import com.App.PatientHealth.responseObject.domain.MedicalNoteJson;

public class MedicalNotesListResponse extends JsonResponse {
    List<MedicalNoteJson> medicalNotes;


    public MedicalNotesListResponse() {}

    public MedicalNotesListResponse(List<MedicalNote> medicalNotes) {
        this.medicalNotes = toJson(medicalNotes);
    }
    
    List<MedicalNoteJson> toJson(List<MedicalNote> medicalNotes) {
        List<MedicalNoteJson> mList = new ArrayList<MedicalNoteJson>();
        
        medicalNotes.forEach( n -> {
            mList.add(new MedicalNoteJson(n));
        });
        return mList;
    }


    public List<MedicalNoteJson> getMedicalNotes() {
        return this.medicalNotes;
    }

    public void setMedicalNotes(List<MedicalNoteJson> medicalNotes) {
        this.medicalNotes = medicalNotes;
    }

}
