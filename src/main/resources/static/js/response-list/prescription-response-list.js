"use strict";
class PrescriptionResponseList extends JsonResponse {
    constructor(message, success, totalPages, prescriptions) {
        super(message, success, totalPages);
        this.prescriptions = prescriptions;
    }
}
