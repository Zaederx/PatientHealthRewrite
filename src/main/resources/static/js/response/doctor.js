"use strict";
class Doctor extends User {
    constructor(id, name, username, email, specialisation, patients) {
        super(id, name, username, email, "doctor");
        this.patientJsons = patients;
        this.specialisation = specialisation;
    }
}
