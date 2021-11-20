export function validateEmail(inputId, csrfToken, successFunction, errorFunction) {
    var email = $(inputId).val();
    var data = { email: email };
    $.ajax({
        url: "/rest/validate/email",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: function (res) { return successFunction(res); },
        error: function () { return errorFunction ? errorFunction() : null; }
    });
}
export function validateUsername(inputId, csrfToken, successFunction, errorFunction) {
    var username = $(inputId).val();
    var data = { username: username };
    $.ajax({
        url: "/rest/validate/username",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: function (res) { return successFunction(res); },
        error: function () { return errorFunction ? errorFunction() : null; }
    });
}
export function validatePassword(inputId1, inputId2, csrfToken, successFunction, errorFunction) {
    var password1 = $(inputId1).val();
    var password2 = $(inputId2).val();
    var data = { password1: password1, password2: password2 };
    $.ajax({
        url: "/rest/validate/password",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: function (res) { return successFunction(res); },
        error: function () { return errorFunction ? errorFunction() : null; }
    });
}
//(data) => handlePasswordSuccess(data,'#patient-password-error', "pPasswordValid", enablePatientRegBtn, disablePatientRegBtn)
