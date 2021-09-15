class JsonResponse {
    message:string
    success:boolean
    totalPages:number
    constructor(message:string,success:boolean,totalPages:number) {
        this.message = message
        this.success = success
        this.totalPages = totalPages
    }
}