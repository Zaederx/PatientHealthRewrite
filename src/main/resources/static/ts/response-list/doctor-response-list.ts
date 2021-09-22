class DoctorResponseList extends JsonResponse {
    doctorJsons:Doctor[]
    constructor(message:string, success:boolean, totalPages:number, doctorJsons:Doctor[]) {
        super(message, success, totalPages)
        this.doctorJsons = doctorJsons
    }
}