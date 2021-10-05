class AdminResponseList extends JsonResponse{
    adminJsons:Admin[]
    constructor(message: string, success: boolean, totalPages: number,adminJsons:Admin[]) {
        super(message, success, totalPages)
        this.adminJsons = adminJsons;
    }
}