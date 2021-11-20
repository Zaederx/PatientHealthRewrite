"use strict";
class PatientAppointmentRequest {
    constructor(id, topic, appointmentType, appointmentInfo, session) {
        this.id = id;
        this.appointmentType = appointmentType;
        this.appointmentInfo = appointmentInfo;
        this.morningSession = session;
    }
}
