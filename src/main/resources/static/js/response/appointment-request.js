"use strict";
class AppointmentRequest {
    constructor(id, patientName, doctorName, appointmentType, appointmentInfo) {
        this.id = id;
        this.patientName = patientName;
        this.doctorName = doctorName;
        this.appointmentType = appointmentType;
        this.appointmentInfo = appointmentInfo;
    }
}
