class PasswordResponse extends JsonResponse {
    passwordsMatch:string
    passwordLength:string
    specialCharacters:string
    containsNumber:string
    containsUppercase:string
    containsLowercase:string
    
    constructor(message:string, success:boolean, totalPages:number) {
        super(message,success,totalPages)
        this.passwordsMatch = ""
        this.passwordLength = ""
        this.specialCharacters = ""
        this.containsNumber = ""
        this.containsUppercase = ""
        this.containsLowercase = ""
    }
}