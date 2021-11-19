class AppointmentResponseList extends JsonResponse {
    appointments:Appointment[]
    constructor(message: string, success: boolean, totalPages: number,appointments:Appointment[]) {
        super(message, success, totalPages)
        this.appointments = appointments;
    }
}