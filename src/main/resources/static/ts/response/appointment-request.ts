class AppointmentRequest {
    id:number;
    patientName:string;
    doctorName:string;
    appointmentType:string;
    appointmentInfo:string;
    constructor(id:number, patientName:string, doctorName:string, appointmentType:string, appointmentInfo:string) {
        this.id = id;
        this.patientName = patientName;
        this.doctorName = doctorName;
        this.appointmentType = appointmentType;
        this.appointmentInfo = appointmentInfo;
    }
}