class Doctor extends User {
    specialisation:string
    patientJsons:Patient[]
    constructor(id:number, name:string, username:string, email:string, specialisation:string, patients:Patient[]) {
        super(id,name,username,email);
        this.patientJsons = patients;
        this.specialisation = specialisation;
    }
}