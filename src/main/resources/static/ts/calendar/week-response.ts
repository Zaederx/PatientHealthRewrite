class WeekResponse extends JsonResponse {
    week:Week
    
    constructor(message: string, success: boolean, totalPages: number, week:Week) {
        super(message, success, totalPages);
        this.week = week;
    }

}