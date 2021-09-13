package com.App.PatientHealth.responseObject;

public class PasswordResponse extends JsonResponse {
    //Password Error messages
    String passwordsMatch;
    String passwordLength;
    String specialCharacters;
    String containsNumber;
    String containsUppercase;
    String containsLowercase;

    public PasswordResponse(){}


    public String getPasswordsMatch() {
        return this.passwordsMatch;
    }

    public void setPasswordsMatch(String passwordsMatch) {
        this.passwordsMatch = passwordsMatch;
    }

    public String getPasswordLength() {
        return this.passwordLength;
    }

    public void setPasswordLength(String passwordLength) {
        this.passwordLength = passwordLength;
    }

    public String getSpecialCharacters() {
        return this.specialCharacters;
    }

    public void setSpecialCharacters(String specialCharacters) {
        this.specialCharacters = specialCharacters;
    }

    public String getContainsNumber() {
        return this.containsNumber;
    }

    public void setContainsNumber(String containsNumber) {
        this.containsNumber = containsNumber;
    }

    public String getContainsUppercase() {
        return this.containsUppercase;
    }

    public void setContainsUppercase(String containsUppercase) {
        this.containsUppercase = containsUppercase;
    }

    public String getContainsLowercase() {
        return this.containsLowercase;
    }

    public void setContainsLowercase(String containsLowercase) {
        this.containsLowercase = containsLowercase;
    }

}
