class MedicalNoteResponseList extends JsonResponse {
    medicalNotes:MedicalNote[]
    constructor(message: string, success: boolean, totalPages: number,medicalNotes:MedicalNote[]) {
        super(message, success, totalPages)
        this.medicalNotes = medicalNotes
    }
}