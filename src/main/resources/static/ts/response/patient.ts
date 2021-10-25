class Patient extends User {
    DOB:string;
    doctorName: string;
    doctorEmail:string;
    prescriptions:Prescription[];
    doctorNotes:DoctorNote[];

    constructor(id:number, name:string, username:string, email:string, doctorName:string, doctorEmail:string, DOB:string, prescriptions:Prescription[],doctorNotes:DoctorNote[]) {
        super(id, name, username, email,'patient');
        this.doctorName = doctorName;
        this.doctorEmail = doctorEmail;
        this.DOB = DOB;
        this.prescriptions = prescriptions;
        this.doctorNotes = doctorNotes;
    }
}