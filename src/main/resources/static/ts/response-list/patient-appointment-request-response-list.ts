class PatientAppointmentRequestResponseList extends JsonResponse {
    patientAppointmentRequests:PatientAppointmentRequest[]
    constructor(message:string,success:boolean,totalPages:number,patientAppointmentsRequest:PatientAppointmentRequest[]) {
        super(message,success,totalPages);
        this.patientAppointmentRequests = patientAppointmentsRequest;
    }
}