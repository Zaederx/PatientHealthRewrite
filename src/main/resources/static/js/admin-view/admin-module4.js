export function validateEmail(inputId, csrfToken, successFunction, errorFunction) {
    var email = $(inputId).val();
    var data = { email };
    $.ajax({
        url: "/rest/validate/email",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (res) => successFunction(res),
        error: () => errorFunction ? errorFunction() : null
    });
}
export function validateUsername(inputId, csrfToken, successFunction, errorFunction) {
    var username = $(inputId).val();
    var data = { username };
    $.ajax({
        url: "/rest/validate/username",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (res) => successFunction(res),
        error: () => errorFunction ? errorFunction() : null
    });
}
export function validatePassword(inputId1, inputId2, csrfToken, successFunction, errorFunction) {
    var password1 = $(inputId1).val();
    var password2 = $(inputId2).val();
    var data = { password1, password2 };
    $.ajax({
        url: "/rest/validate/password",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (res) => successFunction(res),
        error: () => errorFunction ? errorFunction() : null
    });
}
//(data) => handlePasswordSuccess(data,'#patient-password-error', "pPasswordValid", enablePatientRegBtn, disablePatientRegBtn)
