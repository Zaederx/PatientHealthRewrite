import { handleError } from "../calendar/calendar.js"
import { popupMessage } from "../doctor-view/doctor-view-patient-details.js"

var csrfToken = $("meta[name='_csrf']").attr("content")
const appointmentsBadgeNumId = '#appointments-badge-num'
const prescriptionsBadgeNumId = '#prescriptions-badge-num'
const messageBadgeNumId = '#message-badge-num'
const medicalNotesBadgeNumId = '#medical-notes-badge-num'


window.onload = () => fetchBadgeCount()

//fetch Appointment badge count
function fetchBadgeCount() {
    $.ajax({
        url: '/rest/patient/get-current-patient-info',
        type: "GET",
        // data: JSON.stringify(data),
        contentType: "application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleBadgeCountSuccess(data) ,
        error: () => handleBadgeCountError()
    })
}

function handleBadgeCountSuccess(data:PatientResponseList) {
    if(data.success) {
        var p = data.patientJsons[0]
        $(appointmentsBadgeNumId).html(String(p.appointments.length))
        $(prescriptionsBadgeNumId).html(String(p.prescriptions.length))
        $(messageBadgeNumId).html(String(p.messagesRecieved.length))
        $(medicalNotesBadgeNumId).html(String(p.medicalNotes.length))
    }
    else {

    }
}
const messageDivId = '#message'
const popupCloseBtnId = '#btn-close-popup'

function handleBadgeCountError() {
    $(messageDivId).html(popupMessage('Error fetching badges info','alert-danger',popupCloseBtnId))
    $(popupCloseBtnId).on('click', () => {
        $(messageDivId).hide()
    })
}
//fetch Prescriptions badge count

//fetch Message badge count

//fetch Medical Notes badge count


//set Appointment badge onclick

//set Prescriptins badge onclick

//set Message badge onclick

//set Medical Notes badge onclick