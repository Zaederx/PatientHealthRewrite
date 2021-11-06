class Appointment {
    appointmentType:string;
    appointmentInfo:string;
    day:string;
    hour:string;
    min:string;
    durationInMinutes:number;
    
    constructor(appointmentType:string, appointmentInfo:string, day:string, hour:string, min:string, durationInMinutes:number) {
        this.appointmentType = appointmentType;
        this.appointmentInfo = appointmentInfo;
        this.day = day;
        this.hour = hour;
        this.min = min;
        this.durationInMinutes = durationInMinutes;
    }
}