class AppointmentResponse  extends JsonResponse {
    appointment: Appointment
    constructor(message: string, success: boolean, totalPages: number, appointment:Appointment) {
        super(message, success, totalPages);
        this.appointment = appointment;
    }
}