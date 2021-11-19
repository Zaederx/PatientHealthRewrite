class PrescriptionResponseList extends JsonResponse {
    prescriptions:Prescription[];
    constructor(message: string, success: boolean, totalPages: number,prescriptions:Prescription[]) {
        super(message, success, totalPages);
        this.prescriptions = prescriptions
    }
}