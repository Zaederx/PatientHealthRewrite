"use strict";
class UserResponseList extends JsonResponse {
    constructor(message, success, totalPages, users) {
        super(message, success, totalPages);
        this.userJsons = users;
    }
}
