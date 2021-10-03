class PatientResponseList extends JsonResponse {
    patientJsons:Patient[]
    constructor(message:string, success:boolean, totalPages:number, doctorJsons:Patient[]) {
        super(message, success, totalPages)
        this.patientJsons = doctorJsons
    }
}