class Patient extends User {
    DOB:string;
    doctorName:string;
    doctorEmail:string;
    prescriptions:Prescription[];
    medicalNotes:MedicalNote[];
    appointmentRequests:AppointmentRequest[];
    appointments:Appointment[];
    

    constructor(id:number, name:string, username:string, email:string, doctorName:string, doctorEmail:string, DOB:string, prescriptions:Prescription[],doctorNotes:MedicalNote[], appointmentRequests:AppointmentRequest[],appointments: Appointment[], messagesSent:MessageJson[], messagesRecieved:MessageJson[]) {
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