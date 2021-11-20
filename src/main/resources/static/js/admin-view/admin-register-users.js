import { validateEmail } from "./admin-module4.js";
var csrfToken = $("meta[name='_csrf']").attr("content"); //needed for post requests
//global boolean window variables - to identify which fields have passed as valid
var pNameValid = { val: false };
var pUsernameValid = { val: false };
var pEmailValid = { val: false };
var pPasswordValid = { val: false };
function showPassword(id) {
    //show both passwords as plain text
    $(id + '1').attr('type', 'text');
    $(id + '2').attr('type', 'text');
}
function hidePassword(id) {
    //show both password fields as dots / hidden text
    $(id + '1').attr('type', 'password');
    $(id + '2').attr('type', 'password');
}
function message(message) {
    return '<p class="alert alert-info">' + message + '</p>';
}
/**
 * Retrieve password response messages as html to be displayed.
 * @param data
 * @returns
 */
function passwordMessages(data) {
    var m = '';
    data.passwordsMatch != undefined ? m += message(data.passwordsMatch) : null;
    data.passwordLength != undefined ? m += message(data.passwordLength) : null;
    data.specialCharacters != undefined ? m += message(data.specialCharacters) : null;
    data.containsNumber != undefined ? m += message(data.containsNumber) : null;
    data.containsUppercase != undefined ? m += message(data.containsUppercase) : null;
    data.containsLowercase != undefined ? m += message(data.containsLowercase) : null;
    return m;
}
/**
 * Handle success of an jQuery ajax request
 * @param data server response object
 * @param errorId id of error message div - to display error message there
 * @param validBool name of boolean global window variable to be set true or false (response returns 'success' as true)
 * @param enableBtn id of button to be enabled if response returns success as true
 * @param disableBtn id of button to be dispable if repsonse returns success as false
 */
export function handleSuccess(data, errorId, validBool, enableBtn, disableBtn) {
    if (data.success == false) {
        $(errorId).html(message(data.message));
        $(errorId).show();
        //@ts-ignore
        validBool.val = false;
        console.log(`validBool: ${validBool.val}`);
        disableBtn();
    }
    else {
        $(errorId).hide();
        //@ts-ignore
        validBool.val = true;
        console.log(`validBool: ${validBool.val}`);
        enableBtn();
    }
}
/**
 * Handles success of a password response from the server
 *
 * @param errorId id of error message div - to display error message there
 * @param validBool name of boolean global window variable to be set true or false (response returns 'success' as true)
 * @param enableBtn id of button to be enabled if response returns success as true
 * @param disableBtn id of button to be dispable if repsonse returns success as false
 */
export function handlePasswordSuccess(data, errorId, validBool, enableBtn, disableBtn) {
    if (data.success == false) {
        var m = passwordMessages(data);
        $(errorId).html(m);
        $(errorId).show();
        //@ts-ignore
        validBool.val = false;
        console.log(`validBool: ${validBool.val}`);
        disableBtn();
    }
    else {
        $(errorId).hide();
        //@ts-ignore
        validBool.val = true;
        console.log(`validBool: ${validBool.val}`);
        enableBtn();
    }
}
//toggle patient password
$('#patient-show-password').on('focus', () => showPassword('#patient-password'));
$('#patient-hide-password').on('focus', () => hidePassword('#patient-password'));
//toggle admin password
$('#admin-show-password').on('focus', () => showPassword('#admin-password'));
$('#admin-hide-password').on('focus', () => hidePassword('#admin-password'));
//toggle doctor password
$('#doctor-show-password').on('focus', () => showPassword('#doctor-password'));
$('#doctor-hide-password').on('focus', () => hidePassword('#doctor-password'));
/*SECTION Patient Validation & Registration */
//disable button to start with
document.querySelector('#reg-btn-patient').disabled = true;
function disablePatientRegBtn() {
    console.warn('disablePatientRegBtn called');
    console.warn(`pNameValid: ${pNameValid.val} \n pUsernameValid: ${pUsernameValid.val}\n pPasswordValid: ${pPasswordValid.val}\n pEmailVaild: ${pEmailValid.val}`);
    if (pNameValid.val || pUsernameValid.val || pEmailValid.val || pPasswordValid.val) {
        document.querySelector('#reg-btn-patient').disabled = true;
        console.warn('button disabled');
    }
}
function enablePatientRegBtn() {
    console.warn('enablePatientRegBtn called');
    console.warn(`pNameValid: ${pNameValid.val} \n pUsernameValid: ${pUsernameValid.val}\n pPasswordValid: ${pPasswordValid.val}\n pEmailVaild: ${pEmailValid.val}`);
    if (pNameValid.val && pUsernameValid.val && pEmailValid.val && pPasswordValid.val) {
        document.querySelector('#reg-btn-patient').disabled = false;
        console.warn('button enabled');
    }
}
$('#patient-name').on('input', function () {
    var name = $('#patient-name').val();
    var data = { name };
    console.log('patient name:', name);
    $.ajax({
        url: "/rest/validate/name",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handleSuccess(data, '#patient-name-error', pNameValid, enablePatientRegBtn, disablePatientRegBtn)
    });
});
$('#patient-username').on('input', function () {
    var username = $('#patient-username').val();
    var data = { username };
    $.ajax({
        url: "/rest/validate/username",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handleSuccess(data, '#patient-username-error', pUsernameValid, enablePatientRegBtn, disablePatientRegBtn)
    });
});
$('#patient-email').on('input', function () {
    validateEmail('#patient-email', csrfToken, handleSuccessEmail);
});
function handleSuccessEmail(data) {
    handleSuccess(data, '#patient-email-error', pEmailValid, enablePatientRegBtn, disablePatientRegBtn);
}
$('#patient-password1').on('input', function () {
    var password1 = $('#patient-password1').val();
    var password2 = $('#patient-password2').val();
    var data = { password1, password2 };
    $.ajax({
        url: "/rest/validate/password",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handlePasswordSuccess(data, '#patient-password-error', pPasswordValid, enablePatientRegBtn, disablePatientRegBtn)
    });
});
$('#patient-password2').on('input', function () {
    var password1 = $('#patient-password1').val();
    var password2 = $('#patient-password2').val();
    var data = { password1, password2 };
    $.ajax({
        url: "/rest/validate/password",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handlePasswordSuccess(data, '#patient-password-error', pPasswordValid, enablePatientRegBtn, disablePatientRegBtn)
    });
});
$('#reg-btn-patient').on('click', () => postPatient());
/** Patient Registration */
function postPatient() {
    var name = $('#patient-name').val();
    var username = $('#patient-username').val();
    var email = $('#patient-email').val();
    var password = $('#patient-password1').val();
    // var pRepeat = $('#patient-password2').val()
    var patient = { name, username, email, password };
    $.ajax({
        url: "/rest/patient/create",
        type: "POST",
        data: JSON.stringify(patient),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                $('#message').html(message(data.message));
                $('#message').show();
            }
            else {
                $('#message').hide();
            }
        }
    });
}
/*SECTION Doctor Validation Registration */
var dNameValid = { val: false };
var dGmcValid = { val: false };
var dUsernameValid = { val: false };
var dEmailValid = { val: false };
var dPasswordValid = { val: false };
function disableDoctorRegBtn() {
    if (dNameValid.val || dGmcValid.val || dUsernameValid.val || dEmailValid.val || dPasswordValid.val) {
        document.querySelector('#reg-btn-doctor').disabled = true;
    }
}
function enableDoctorRegBtn() {
    if (dNameValid.val && dGmcValid.val && dUsernameValid.val && dEmailValid.val && dPasswordValid.val) {
        document.querySelector('#reg-btn-doctor').disabled = false;
    }
}
$('#doctor-name').on('input', function () {
    var name = $('#doctor-name').val();
    var data = { name };
    $.ajax({
        url: "/rest/validate/name",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handleSuccess(data, '#doctor-name-error', dEmailValid, enableDoctorRegBtn, disableDoctorRegBtn)
    });
});
$('#doctor-gmcNum').on('input', function () {
    var gmcNum = $('#doctor-gmcNum').val();
    var data = { gmcNum };
    $.ajax({
        url: "/rest/validate/gmcNum",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handleSuccess(data, '#doctor-gmcNum-error', dGmcValid, enableDoctorRegBtn, disableDoctorRegBtn)
    });
});
$('#doctor-username').on('input', function () {
    var username = $('#doctor-username').val();
    var data = { username };
    $.ajax({
        url: "/rest/validate/username",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handleSuccess(data, '#doctor-username-error', dUsernameValid, enableDoctorRegBtn, disableDoctorRegBtn)
    });
});
$('#doctor-email').on('input', function () {
    var email = $('#doctor-email').val();
    var data = { email };
    $.ajax({
        url: "/rest/validate/email",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handleSuccess(data, '#doctor-email-error', dEmailValid, enableDoctorRegBtn, disableDoctorRegBtn)
    });
});
$('#doctor-password1').on('input', function () {
    var password1 = $('#doctor-password1').val();
    var password2 = $('#doctor-password2').val();
    var data = { password1, password2 };
    $.ajax({
        url: "/rest/validate/password",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handlePasswordSuccess(data, '#doctor-password-error', dPasswordValid, enableDoctorRegBtn, disableDoctorRegBtn)
    });
});
$('#doctor-password2').on('input', function () {
    var password1 = $('#doctor-password1').val();
    var password2 = $('#doctor-password1').val();
    var data = { password1, password2 };
    $.ajax({
        url: "/rest/validate/password",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handlePasswordSuccess(data, '#doctor-password-error', dPasswordValid, enableDoctorRegBtn, disableDoctorRegBtn)
    });
});
//post doctor registration form
function postDoctor() {
    var dName = $('#doctor-name').val();
    var dUsername = $('#doctor-username').val();
    var dEmail = $('#doctor-email').val();
    var dPassword = $('#doctor-password').val();
    var dRepeat = $('#doctor-password2').val();
    var doctor = { dName, dUsername, dEmail, dPassword, dRepeat };
    var csrfToken = $("meta[name='_csrf']").attr("content"); //needed for post requests
    $.ajax({
        url: "/rest/doctor/create",
        type: "POST",
        data: JSON.stringify(doctor),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                $('#message').html(message(data.message));
                $('#message').show();
            }
            else {
                $('#message').hide();
            }
        }
    });
}
/*SECTION Admin Validation & Registration */
var aNameValid = { val: false };
var aUsernameValid = { val: false };
var aEmailValid = { val: false };
var aPasswordValid = { val: false };
function disableAdminRegBtn() {
    if (aNameValid.val || aUsernameValid.val || aEmailValid.val || aPasswordValid.val) {
        document.querySelector('#reg-btn-patient').disabled = true;
    }
}
function enableAdminRegBtn() {
    if (aNameValid.val && aUsernameValid.val && aEmailValid.val && aPasswordValid.val) {
        document.querySelector('#reg-btn-patient').disabled = false;
    }
}
$('#admin-name').on('input', function () {
    var name = $('#admin-name').val();
    var data = { name };
    $.ajax({
        url: "/rest/validate/name",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handleSuccess(data, '#admin-name-error', aNameValid, enableAdminRegBtn, disableAdminRegBtn)
    });
});
$('#admin-username').on('input', function () {
    var username = $('#admin-username').val();
    var data = { username };
    $.ajax({
        url: "/rest/validate/username",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handleSuccess(data, '#admin-username-error', aUsernameValid, enableAdminRegBtn, disableAdminRegBtn)
    });
});
$('#admin-email').on('input', function () {
    var email = $('#admin-email').val();
    var data = { email };
    $.ajax({
        url: "/rest/validate/email",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handleSuccess(data, '#admin-email-error', aEmailValid, enableAdminRegBtn, disableAdminRegBtn)
    });
});
$('#admin-password1').on('input', function () {
    var password1 = $('#admin-password1').val();
    var password2 = $('#admin-password2').val();
    var data = { password1, password2 };
    $.ajax({
        url: "/rest/validate/password",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handlePasswordSuccess(data, '#admin-password-error', aPasswordValid, enableAdminRegBtn, disableAdminRegBtn)
    });
});
$('#admin-password2').on('input', function () {
    var password1 = $('#admin-password1').val();
    var password2 = $('#admin-password2').val();
    var data = { password1, password2 };
    $.ajax({
        url: "/rest/validate/password",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handlePasswordSuccess(data, '#admin-password-error', aPasswordValid, enableAdminRegBtn, disableAdminRegBtn)
    });
});
$('#reg-btn-admin').on('click', () => postAdmin());
//admin post registration form
function postAdmin() {
    var name = $('#admin-name').val();
    var username = $('#admin-username').val();
    var email = $('#admin-email').val();
    var password1 = $('#admin-password1').val();
    var password2 = $('#admin-password2').val();
    var admin = { name, username, email, password1, password2 };
    var csrfToken = $("meta[name='_csrf']").attr("content"); //needed for post requests
    $.ajax({
        url: "/rest/admin/create",
        type: "POST",
        data: JSON.stringify(admin),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                $('#message').html(message(data.message));
                $('#message').show();
            }
            else {
                $('#message').hide();
            }
        }
    });
}
