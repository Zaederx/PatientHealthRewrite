class Patient extends User {
    DOB:string;
    doctorName: string;
    doctorEmail:string;
    prescriptions:Prescription[];
    doctorNotes:DoctorNote[];
    appointmentRequests:AppointmentRequest[];

    constructor(id:number, name:string, username:string, email:string, doctorName:string, doctorEmail:string, DOB:string, prescriptions:Prescription[],doctorNotes:DoctorNote[], appointmentRequests:AppointmentRequest[]) {
        super(id, name, username, email,'patient');
        this.doctorName = doctorName;
        this.doctorEmail = doctorEmail;
        this.DOB = DOB;
        this.prescriptions = prescriptions;
        this.doctorNotes = doctorNotes;
        this.appointmentRequests = appointmentRequests;
    }
}