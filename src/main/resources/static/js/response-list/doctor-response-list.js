"use strict";
class DoctorResponseList extends JsonResponse {
    constructor(message, success, totalPages, doctorJsons) {
        super(message, success, totalPages);
        this.doctorJsons = doctorJsons;
    }
}
