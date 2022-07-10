"use strict";
class PatientAppointmentRequestResponseList extends JsonResponse {
    constructor(message, success, totalPages, patientAppointmentsRequest) {
        super(message, success, totalPages);
        this.patientAppointmentRequests = patientAppointmentsRequest;
    }
}
