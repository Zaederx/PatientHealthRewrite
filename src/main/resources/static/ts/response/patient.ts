class Patient extends User {
    doctorName: string;
    medicationNames:string[];
    constructor(id:number, name:string, username:string, email:string, doctorName:string, medicationNames:string[]) {
        super(id, name, username, email);
        this.doctorName = doctorName;
        this.medicationNames = medicationNames;
    }
}