"use strict";
var JsonResponse = /** @class */ (function () {
    function JsonResponse(message, success, totalPages) {
        this.message = message;
        this.success = success;
        this.totalPages = totalPages;
    }
    return JsonResponse;
}());
