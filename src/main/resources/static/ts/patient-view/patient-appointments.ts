
import { makeClickableTableRows, selectRow } from "../admin-view/admin-module1.js";
import { handleSuccess } from "../admin-view/admin-register-users.js";
import { getSelectedItemId } from "../admin-view/admin-search-users.js";
import { popupMessage } from "../doctor-view/doctor-view-patient-details.js";

var csrfToken = $("meta[name='_csrf']").attr("content")
const topicsInputId = '#topics'
const descriptionInputId = '#description'

var appointments:Appointment[]
var appointmentRequests:PatientAppointmentRequest[]
window.onload = () => {
    console.log('window has loaded')
    fetchAppointments()
    fetchPatientAppointmentRequests()
}
//SECTION submit request form
$('#btn-submit-appointment').on('click', () => submitPatientAppointmentRequest())
function submitPatientAppointmentRequest() {
    var appointmentType = $(topicsInputId).val();
    var appointmentInfo = $(descriptionInputId).val();
    var morningSession = $('input[name="session"]:checked').val()

    var data = {appointmentType, appointmentInfo, morningSession}

    $.ajax({
        url: '/rest/patient/submit-appointment-request',
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",//sent to server
        dataType:"json",//recieved from server
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleSubmitSuccess(data),
        error: () => handleSubmitError()
    })
    
}

//handle data on successful submission of Patient Appointment Request
const messageDivId = '#message'
const closeBtnId = '#btn-message-close'
function handleSubmitSuccess(data:JsonResponse) {
    if(data.success) {
        $(messageDivId).html(popupMessage('Request submitted successfully', 'alert-info', closeBtnId))
        //reload appointment request table
        fetchPatientAppointmentRequests()
    }
    else {
        $(messageDivId).html(popupMessage(data.message, 'alert-warning', closeBtnId))
    }
}

//handles error from submitting Appointment Request
function handleSubmitError() {
    $(messageDivId).html(popupMessage('Error submitting appointment request', 'alert-danger', closeBtnId))
}

//SECTION appointments clickable table
const appointmentTableBodyId = '#appointments-tbody'
function fetchAppointments() {
    //fetch appointments
    $.ajax({
        url: '/rest/patient/get-appointments',
        type: "GET",
        contentType: "application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleFetchAppointmentsSuccess(data),
        error: () => handleSubmitError()
    })
}


/**
 * Fills table with fetched data
 */
function handleFetchAppointmentsSuccess(data:AppointmentResponseList) {
    console.log('handleFetchAppointmentsSuccess called')
    if(data.success) {
        //save appointments
        appointments = data.appointments
        //add appointment to table
        var html = appointmentsToHtml(data.appointments)
        $(appointmentTableBodyId).html(html)
        //make table clickable
        var tableBody = document.querySelector(appointmentTableBodyId) as HTMLTableElement
        makeClickableTableRows(tableBody,selectRow)
    }
    else {
        $(messageDivId).html(popupMessage(data.message, 'alert-warning', closeBtnId))
    }
}

/**
 * Returns list of appointment information as
 * html table rows with 'data-id' and
 * 'data-selected' attributes
 * @param appointments list of appointments
 * @returns 
 */
function appointmentsToHtml(appointments:Appointment[]) {
    var html = ''
    appointments.forEach( a => {
        html += '<tr data-id="'+a.id+'" data-selected="false">'+
                    '<td>'+a.appointmentType+'</td>'+
                    '<td>'+a.date+'</td>'+
                '</tr>'
    })
    return html
}



//SECTION patient appointment request clickable table

const appointmentRequestTableBodyId = '#patient-appointment-requests-tbody'
function fetchPatientAppointmentRequests() {
    //fetch appointments
    $.ajax({
        url: '/rest/patient/get-patient-appointment-requests',
        type: "GET",
        contentType: "application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleFetchPatientAppointmentRequestsSuccess(data),
        error: () => handleSubmitError()
    })

}
/**
 * Fills table with fetched data
 */
function handleFetchPatientAppointmentRequestsSuccess(data:PatientAppointmentRequestResponseList) {
    console.log('handleFetchPatientAppointmentRequestsSuccess called')
    if(data.success) {
        //save appointment requests
        appointmentRequests = data.patientAppointmentRequests
        //add appointment to table
        var html = patientAppointmentsRequestsToHtml(data.patientAppointmentRequests)
        $(appointmentRequestTableBodyId).html(html)
        //make table clickable
        var tableBody = document.querySelector(appointmentRequestTableBodyId) as HTMLTableElement
        makeClickableTableRows(tableBody)
    }
    else {
        $(messageDivId).html(popupMessage(data.message, 'alert-warning', closeBtnId))
    }
}

/**
 * Returns list of appointment requests to HTML
 * @param appointments list of appointments requests
 * @returns 
 */
function patientAppointmentsRequestsToHtml(appointments:PatientAppointmentRequest[]) {
    var html = ''
    appointments.forEach( a => {
        html += '<tr data-id="'+a.id+'" data-selected="false">'+
                    '<td>'+a.appointmentType+'</td>'+
                '</tr>'
    })
    return html
}

//SECTION DISPLAYING APPOINTMENT REQUEST INFORMATION
// Appointment Request Form Input Ids
const requestPopupFormId = '#patient-appointment-requests-popup'
const requestTypeId = '#request-appointment-type'
const requestInfoId = '#request-appointment-info'
//time preference radio buttons
const morningId = '#morning-session'
const afternoonId = '#afternoon-session'

const btnDisplayRequestId = '#display-appointment-requests'
const requestsTBodyId = '#patient-appointment-requests-tbody'
$(btnDisplayRequestId).on('click', () => displayAppointmentRequest(getSelectedItemId(requestsTBodyId)))

/**
 * Displays details of appointment request 
 * of the given id in a form.
 * Finds the appointment request in list of appointment requests
 * fetched from server
 * @param id of the appointment to be displayed
 */
function displayAppointmentRequest(id:string) {
    //find request
    var r = appointmentRequests.filter( r => r.id == id)[0]
    //disable form enable input fields
    disableRequestFormInputFields()
 // ** fill form with appointment information **
    fillFormWithRequestDetails(r)
    //display form
    $(requestPopupFormId).show()
}

/**
 * Fill Patient Appointment Request Form with request details
 * @param r - PatientAppointmentRequest
 */
function fillFormWithRequestDetails(r:PatientAppointmentRequest) {
    //appointment type
    $(requestTypeId +' option[value="'+r.appointmentType+'"]').prop('selected',true)//or attr('selected','selected')
    //appointment info
    $(requestInfoId).html(r.appointmentInfo)
    //appointment session
    console.warn('typeof r.morningSession:',typeof r.morningSession, 'value:',r.morningSession)
    if(r.morningSession == true) {
        // $(afternoonId).removeAttr('checked')
        $(morningId).attr('checked', 'checked')
    }
    else {
        // $(morningId).removeAttr('checked')
        $(afternoonId).attr('checked', 'checked')
    }
}

/**
 * Disable request form input fields.
 */
function disableRequestFormInputFields() {
     //disable form enable input fields
     $(requestTypeId).attr('disabled','')
     $(requestInfoId).attr('disabled','')
     $(morningId).attr('disabled','')
     $(afternoonId).attr('disabled','')
}
/**
 * Enable request form input fields.
 */
function enableRequestFormInputFields() {
    //disable form enable input fields
    $(requestTypeId).removeAttr('disabled')
    $(requestInfoId).removeAttr('disabled')
    $(morningId).removeAttr('disabled')
    $(afternoonId).removeAttr('disabled')
}

//enable request form popup's close button
const requestPopupCloseBtnId = '#request-popup-close'
$(requestPopupCloseBtnId).on('click', () => {
    console.log('closing request popup')
    $(requestPopupFormId).hide()
})


//SECTION DISPLAYING APPOINTMENT INFORMATION
const appointmentDateId = '#appointment-date'
const appointmentTimeId = '#appointment-time'
const appointmentDurationId = '#appointment-duration'
const appointmentTypeId = '#appointment-type'
const appointmentInfoId = '#appointment-info'
const appointmentPopupId = '#appointment-popup'
const appointmentPopupCloseBtnId = '#appointment-popup-close'
const btnDisplayAppointmentId = '#display-appointment'
const appointmentsTBodyId = '#appointments-tbody'

//display appointment
$(btnDisplayAppointmentId).on('click', () => displayAppointment(getSelectedItemId(appointmentsTBodyId)))
function displayAppointment(id:string) {
    //find request
    var a = appointments.filter(r => r.id == id)[0]
    //fill form with appointment information
    $(appointmentDateId).val(a.date)
    $(appointmentTimeId).val(a.time)
    $(appointmentDurationId).val(String(a.durationInMinutes))
    $(appointmentTypeId).val(a.appointmentType)
    $(appointmentInfoId).val(a.appointmentInfo)
    //display appointment popup
    $(appointmentPopupId).show()
}
//enable appointment popup's close button
$(appointmentPopupCloseBtnId).on('click', () => {
    $(appointmentPopupId).hide()
})
