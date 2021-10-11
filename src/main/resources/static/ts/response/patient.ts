class Patient extends User {
    DOB:string;
    doctorName: string;
    doctorEmail:string;
    medicationNames:string[];
    constructor(id:number, name:string, username:string, email:string, doctorName:string, doctorEmail:string, medicationNames:string[], DOB:string) {
        super(id, name, username, email,'patient');
        this.doctorName = doctorName;
        this.doctorEmail = doctorEmail;
        this.medicationNames = medicationNames;
        this.DOB = DOB;
    }
}