import { handlePasswordSuccess } from "./admin-register-users.js"

export function validateEmail(inputId:string,csrfToken:string,successFunction:Function,errorFunction?:Function) {
    var email = $(inputId).val() as string
    var data = {email}
    $.ajax({
        url: "/rest/validate/email",
        type: "POST",
        data: JSON.stringify(data),
        contentType:"application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (res) => successFunction(res),
        error: () => errorFunction ? errorFunction() : null
    })
}


export function validateUsername(inputId:string,csrfToken:string,successFunction:Function,errorFunction?:Function) {
    var username = $(inputId).val() as string
    var data = {username}
    $.ajax({
        url: "/rest/validate/username",
        type: "POST",
        data: JSON.stringify(data),
        contentType:"application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (res) => successFunction(res),
        error: () => errorFunction ? errorFunction() : null
    })
}


export function validatePassword(inputId1:string, inputId2:string, csrfToken:string,successFunction:Function,errorFunction?:Function) {
    var password1 = $(inputId1).val() as string
    var password2 = $(inputId2).val() as string
    var data = {password1, password2}
    $.ajax({
        url: "/rest/validate/password",
        type: "POST",
        data: JSON.stringify(data),
        contentType:"application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (res) => successFunction(res),
        error: () => errorFunction ? errorFunction() : null
    })
}

//(data) => handlePasswordSuccess(data,'#patient-password-error', "pPasswordValid", enablePatientRegBtn, disablePatientRegBtn)