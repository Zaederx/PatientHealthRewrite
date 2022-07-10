"use strict";
class AdminResponseList extends JsonResponse {
    constructor(message, success, totalPages, adminJsons) {
        super(message, success, totalPages);
        this.adminJsons = adminJsons;
    }
}
