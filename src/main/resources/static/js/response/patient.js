"use strict";
class Patient extends User {
    constructor(id, name, username, email, doctorName, doctorEmail, DOB, prescriptions, doctorNotes, appointmentRequests, appointments, messagesSent, messagesRecieved) {
        super(id, name, username, email, 'patient', messagesSent, messagesRecieved);
        this.doctorName = doctorName;
        this.doctorEmail = doctorEmail;
        this.DOB = DOB;
        this.prescriptions = prescriptions;
        this.medicalNotes = doctorNotes;
        this.appointmentRequests = appointmentRequests;
        this.appointments = appointments;
    }
}
