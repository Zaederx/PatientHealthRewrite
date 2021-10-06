class UserResponseList extends JsonResponse {
    userJsons: User[]
    constructor(message:string, success:boolean, totalPages:number, users: User[]) {
        super(message, success, totalPages)
        this.userJsons = users
    }
}