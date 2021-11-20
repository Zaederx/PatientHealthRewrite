"use strict";
class PasswordResponse extends JsonResponse {
    constructor(message, success, totalPages) {
        super(message, success, totalPages);
        this.passwordsMatch = "";
        this.passwordLength = "";
        this.specialCharacters = "";
        this.containsNumber = "";
        this.containsUppercase = "";
        this.containsLowercase = "";
    }
}
