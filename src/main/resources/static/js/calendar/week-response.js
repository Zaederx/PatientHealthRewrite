"use strict";
class WeekResponse extends JsonResponse {
    constructor(message, success, totalPages, week) {
        super(message, success, totalPages);
        this.week = week;
    }
}
