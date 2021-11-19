class PatientAppointmentRequest {
    id:string;
    appointmentType:string;
    appointmentInfo:string;
    morningSession:boolean;
    
    constructor(id:string, topic: string,appointmentType:string, appointmentInfo:string, session:boolean) {
        this.id = id;
        this.appointmentType = appointmentType;
        this.appointmentInfo = appointmentInfo;
        this.morningSession = session;
    }

}