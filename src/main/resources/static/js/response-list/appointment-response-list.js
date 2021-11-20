"use strict";
class AppointmentResponseList extends JsonResponse {
    constructor(message, success, totalPages, appointments) {
        super(message, success, totalPages);
        this.appointments = appointments;
    }
}
