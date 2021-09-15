var csrfToken = $("meta[name='_csrf']").attr("content");//needed for post requests
function showPassword(id:string){
    $(id+'1').attr('type', 'text');
	$(id+'2').attr('type', 'text');
}

function hidePassword(id:string){
    $(id+'1').attr('type', 'password');
	$(id+'2').attr('type', 'password');
}

function message(message:string):string {
    return '<p class="alert alert-info">'+message+'</p>'
}

function passwordMessages(data:PasswordResponse) {
    var m = ''
    data.passwordsMatch != undefined ? m += message(data.passwordsMatch) : null
    data.passwordLength != undefined ? m += message(data.passwordLength) : null
    data.specialCharacters != undefined ? m += message(data.specialCharacters) : null
    data.containsNumber != undefined ? m += message(data.containsNumber) : null
    data.containsUppercase != undefined ? m += message(data.containsUppercase) : null
    data.containsLowercase != undefined ? m += message(data.containsLowercase) : null
    return m
}

function handleSuccess(data:JsonResponse,errorId:string, validBool:string, enableBtn:Function, disableBtn:Function) {
    if(data.success == false) {
        $(errorId).html(message(data.message));
        $(errorId).show()
        //@ts-ignore
        window[validBool] = false
        disableBtn()
    } 
    else {
        $(errorId).hide()
        //@ts-ignore
        window[validBool] = true
        enableBtn()
    }
}

function handlePasswordSuccess(data:PasswordResponse,errorId:string, validBool:string, enableBtn:Function, disableBtn:Function) {
    if(data.success == false) {
        var m = passwordMessages(data)
        $(errorId).html(m);
        $(errorId).show()
        //@ts-ignore
        window[validBool] = false
        disableBtn()
    } 
    else {
        $(errorId).hide()
        //@ts-ignore
        window[validBool] = true
        enableBtn()
    }
}
//toggle patient password
$('#patient-show-password').on('focus', () => showPassword('#patient-password'))
$('#patient-hide-password').on('focus', () => hidePassword('#patient-password'))
//toggle admin password
$('#admin-show-password').on('focus', () => showPassword('#admin-password'))
$('#admin-hide-password').on('focus', () => hidePassword('#admin-password'))
//toggle doctor password
$('#doctor-show-password').on('focus', () => showPassword('#doctor-password'))
$('#doctor-hide-password').on('focus', () => hidePassword('#doctor-password'))

var pNameValid = false
var pUsernameValid = false 
var pEmailValid = false
var pPasswordValid = false

/*SECTION Patient Validation & Registration */
function disablePatientRegBtn() {
    if (!pNameValid || !pUsernameValid || !pEmailValid || !pPasswordValid) {
        (document.querySelector('#reg-btn-patient') as HTMLButtonElement).disabled = true
    }
}

function enablePatientRegBtn() {
    if (pNameValid && pUsernameValid && pEmailValid && pPasswordValid) {
        (document.querySelector('#reg-btn-patient') as HTMLButtonElement).disabled = false
    }
}


$('#patient-name').on('input', function () {
    var name = $('#patient-name').val() as string
    var data = {name}
    console.log('patient name:',name)
    $.ajax({
        url: "/rest/validate/name",
        type: "POST",
        data: JSON.stringify(data),
        contentType:"application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleSuccess(data,'#patient-name-error', "pNameValid", enablePatientRegBtn, disablePatientRegBtn)
    })
})


$('#patient-username').on('input', function () {
    var username = $('#patient-username').val() as string
    var data = {username}
    $.ajax({
        url: "/rest/validate/username",
        type: "POST",
        data: JSON.stringify(data),
        contentType:"application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleSuccess(data,'#patient-username-error', "pUsernameValid", enablePatientRegBtn, disablePatientRegBtn)
    })
})

$('#patient-email').on('input', function () {
    var email = $('#patient-email').val() as string
    var data = {email}
    $.ajax({
        url: "/rest/validate/email",
        type: "POST",
        data: JSON.stringify(data),
        contentType:"application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleSuccess(data,'#patient-email-error', "pEmailValid", enablePatientRegBtn, disablePatientRegBtn)
    })
})

$('#patient-password1').on('input', function () {
    var password1 = $('#patient-password1').val() as string
    var password2 = $('#patient-password2').val() as string
    var data = {password1, password2}
    $.ajax({
        url: "/rest/validate/password",
        type: "POST",
        data: JSON.stringify(data),
        contentType:"application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handlePasswordSuccess(data,'#patient-password-error', "pPasswordValid", enablePatientRegBtn, disablePatientRegBtn)
    })
})

$('#patient-password2').on('input', function () {
    var password1 = $('#patient-password1').val() as string
    var password2 = $('#patient-password2').val() as string
    var data = {password1, password2}
    $.ajax({
        url: "/rest/validate/password",
        type: "POST",
        data: JSON.stringify(data),
        contentType:"application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handlePasswordSuccess(data,'#patient-password-error', "pPasswordValid", enablePatientRegBtn, disablePatientRegBtn)
    })
})
$('#reg-btn-patient').on('click', ()=> postPatient())

/** Patient Registration */
function postPatient() {
    var pName = $('#patient-name').val()
    var pUsername = $('#patient-username').val()
    var pEmail = $('#patient-email').val()
    var pPassword = $('#patient-password').val()
    var pRepeat = $('#patient-password2').val()

    var patient = {pName,pUsername,pEmail,pPassword,pRepeat}
    $.ajax({
        url: "/rest/patient/create",
        type: "POST",
        data: patient,
        headers: {'X-CSRF-TOKEN':csrfToken}
    })
}


/*SECTION Doctor Validation Registration */
var dNameValid = false
var dGmcValid = false
var dUsernameValid = false 
var dEmailValid = false
var dPasswordValid = false

function disableDoctorRegBtn() {
    if (!dNameValid || !dGmcValid || !dUsernameValid || !dEmailValid || !dPasswordValid) {
        (document.querySelector('#reg-btn-doctor') as HTMLButtonElement).disabled = true
    }
}

function enableDoctorRegBtn() {
    if (dNameValid && dGmcValid && dUsernameValid && dEmailValid && dPasswordValid) {
        (document.querySelector('#reg-btn-doctor') as HTMLButtonElement).disabled = false
    }
}

$('#doctor-name').on('input', function () {
    var name = $('#doctor-name').val() as string
    var data = {name}
    $.ajax({
        url: "/rest/validate/name",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleSuccess(data,'#doctor-name-error', 'dEmailValid', enableDoctorRegBtn, disableDoctorRegBtn)
    })
})

$('#doctor-gmcNum').on('input', function() {
    var gmcNum = $('#doctor-gmcNum').val() as string
    var data = {gmcNum}
    $.ajax({
        url: "/rest/validate/gmcNum",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleSuccess(data,'#doctor-gmcNum-error', 'dGmcValid', enableDoctorRegBtn, disableDoctorRegBtn)
    })
})


$('#doctor-username').on('input', function () {
    var username = $('#doctor-username').val() as string
    var data = {username}
    $.ajax({
        url: "/rest/validate/username",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleSuccess(data,'#doctor-username-error', 'dUsernameValid', enableDoctorRegBtn, disableDoctorRegBtn)
    })
})

$('#doctor-email').on('input', function () {
    var email = $('#doctor-email').val() as string
    var data = {email}
    $.ajax({
        url: "/rest/validate/email",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleSuccess(data,'#doctor-email-error', 'dEmailValid', enableDoctorRegBtn, disableDoctorRegBtn)
    })
})

$('#doctor-password1').on('input', function () {
    var password1 = $('#doctor-password1').val() as string
    var password2 = $('#doctor-password2').val() as string
    var data = {password1,password2}
    $.ajax({
        url: "/rest/validate/password",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handlePasswordSuccess(data,'#doctor-password-error', 'dPasswordValid', enableDoctorRegBtn, disableDoctorRegBtn)
    })
})

$('#doctor-password2').on('input', function () {
    var password1 = $('#doctor-password1').val() as string
    var password2 = $('#doctor-password1').val() as string
    var data = {password1,password2}
    $.ajax({
        url: "/rest/validate/password",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handlePasswordSuccess(data,'#doctor-password-error', 'dPasswordValid', enableDoctorRegBtn, disableDoctorRegBtn)
    })
})
//post doctor registration form
function postDoctor() {
    var dName = $('#doctor-name').val()
    var dUsername = $('#doctor-username').val()
    var dEmail = $('#doctor-email').val()
    var dPassword = $('#doctor-password').val()
    var dRepeat = $('#doctor-password2').val()

    var doctor = {dName,dUsername,dEmail,dPassword,dRepeat}
    var csrfToken = $("meta[name='_csrf']").attr("content");//needed for post requests
    $.ajax({
        url: "/rest/doctor/create",
        type: "POST",
        data: JSON.stringify(doctor),
        contentType: "application/json",
        dataType: "json",
        headers: {'X-CSRF-TOKEN':csrfToken}
    })
}



/*SECTION Admin Validation & Registration */
var aNameValid = false
var aUsernameValid = false 
var aEmailValid = false
var aPasswordValid = false

function disableAdminRegBtn() {
    if (!aNameValid || !aUsernameValid || !aEmailValid || !aPasswordValid) {
        (document.querySelector('#reg-btn-patient') as HTMLButtonElement).disabled = true
    }
}

function enableAdminRegBtn() {
    if (aNameValid && aUsernameValid && aEmailValid && aPasswordValid) {
        (document.querySelector('#reg-btn-patient') as HTMLButtonElement).disabled = false
    }
}

$('#admin-name').on('input', function () {
    var name = $('#admin-name').val() as string
    var data = {name}
    $.ajax({
        url: "/rest/validate/name",
        type: "POST",
        data: JSON.stringify(data),
        contentType:"application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleSuccess(data,'#admin-name-error', 'aNameValid', enableAdminRegBtn, disableAdminRegBtn)
    })
})


$('#admin-username').on('input', function () {
    var username = $('#admin-username').val() as string
    var data = {username}
    $.ajax({
        url: "/rest/validate/username",
        type: "POST",
        data: JSON.stringify(data),
        contentType:"application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleSuccess(data,'#admin-username-error', 'aUsernameValid', enableAdminRegBtn, disableAdminRegBtn)
    })
})

$('#admin-email').on('input', function () {
    var email = $('#admin-email').val() as string
    var data = {email}
    $.ajax({
        url: "/rest/validate/email",
        type: "POST",
        data: JSON.stringify(data),
        contentType:"application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleSuccess(data,'#admin-email-error', 'aEmailValid', enableAdminRegBtn, disableAdminRegBtn)
    })
})

$('#admin-password1').on('input', function () {
    var password1 = $('#admin-password1').val() as string
    var password2 = $('#admin-password2').val() as string
    var data = {password1,password2}
    $.ajax({
        url: "/rest/validate/password",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handlePasswordSuccess(data,'#admin-password-error', 'aPasswordValid', enableAdminRegBtn, disableAdminRegBtn)
    })
})

$('#admin-password2').on('input', function () {
    var password1 = $('#admin-password1').val() as string
    var password2 = $('#admin-password2').val() as string
    var data = {password1,password2}
    $.ajax({
        url: "/rest/validate/password",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handlePasswordSuccess(data,'#admin-password-error', 'aPasswordValid', enableAdminRegBtn, disableAdminRegBtn)
    })
})

$('#reg-btn-admin').on('click', ()=> postAdmin())

//admin post registration form
function postAdmin() {
    var name = $('#admin-name').val()
    var username = $('#admin-username').val()
    var email = $('#admin-email').val()
    var password1 = $('#admin-password1').val()
    var password2 = $('#admin-password2').val()

    var admin = {name, username,email, password1, password2}
    var csrfToken = $("meta[name='_csrf']").attr("content");//needed for post requests
    $.ajax({
        url: "/rest/admin/create",
        type: "POST",
        data: JSON.stringify(admin),
        contentType: "application/json",
        dataType: "json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: function(data) {
            if(data.success == false) {
				$('#admin-message').html(message(data.message));
			} 
            else {
                $('#admin-message').html(message(data.message));
            }
        }
    })
}


