"use strict";
class PatientResponseList extends JsonResponse {
    constructor(message, success, totalPages, doctorJsons) {
        super(message, success, totalPages);
        this.patientJsons = doctorJsons;
    }
}
