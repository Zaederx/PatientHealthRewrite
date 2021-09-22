class Doctor extends User {
    specialisation:string
    patients:Patient[]
    constructor(id:number, name:string, username:string, email:string, specialisation:string, patients:Patient[]) {
        super(id,name,username,email);
        this.patients = patients;
        this.specialisation = specialisation;
    }
}