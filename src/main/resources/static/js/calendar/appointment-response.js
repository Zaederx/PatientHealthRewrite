"use strict";
class AppointmentResponse extends JsonResponse {
    constructor(message, success, totalPages, appointment) {
        super(message, success, totalPages);
        this.appointment = appointment;
    }
}
