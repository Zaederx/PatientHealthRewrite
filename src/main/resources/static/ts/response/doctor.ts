class Doctor extends User {
    specialisation:string
    patientsJsons:Patient[]
    constructor(id:number, name:string, username:string, email:string, specialisation:string, patients:Patient[]) {
        super(id,name,username,email);
        this.patientsJsons = patients;
        this.specialisation = specialisation;
    }
}