class Appointment {
    id:string
    appointmentType:string;
    appointmentInfo:string;
    day:string;
    hour:string;
    min:string;
    durationInMinutes:number;
    date:string;
    time:string;
    docId:string;
    pId:string
    
    constructor(id?:string, appointmentType?:string, appointmentInfo?:string, day?:string, hour?:string, min?:string, durationInMinutes?:number, date?:string, time?:string, docId?:string, pId?:string) {
        this.id = id ? id : '';
        this.appointmentType = appointmentType ? appointmentType : '';
        this.appointmentInfo = appointmentInfo ? appointmentInfo : '';
        this.day = day ? day : '';
        this.hour = hour ? hour : '00';
        this.min = min ? min : '00';
        this.durationInMinutes = durationInMinutes ? durationInMinutes : 0;
        this.date = date ? date : '';
        this.time = time ? time : '';
        this.docId = docId ? docId : ''; 
        this.pId = pId ? pId : '';
    }
}