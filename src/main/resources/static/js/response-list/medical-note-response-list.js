"use strict";
class MedicalNoteResponseList extends JsonResponse {
    constructor(message, success, totalPages, medicalNotes) {
        super(message, success, totalPages);
        this.medicalNotes = medicalNotes;
    }
}
