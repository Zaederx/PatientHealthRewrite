class Appointment {
    appointmentType:string;
    appointmentInfo:string;
    day:string;
    hour:string;
    min:string;
    
    constructor(appointmentType:string, appointmentInfo:string, day:string, hour:string, min:string) {
        this.appointmentType = appointmentType;
        this.appointmentInfo = appointmentInfo;
        this.day = day;
        this.hour = hour;
        this.min = min;
    }
}