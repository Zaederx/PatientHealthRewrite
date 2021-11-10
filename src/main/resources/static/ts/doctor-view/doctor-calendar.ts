import { getSelectedItemId } from "../admin-view/admin-search-users.js"
import { currentDoctorId, getCurrentWeekAppointments, handleCalendarSuccess, handleError, openAppointmentPopup_ViewMode, setCurrentDoctorId, submitAppointment, viewAppointment } from "../calendar/calendar.js"
import { popupMessage } from "../doctor-view/doctor-view-patient-details.js"

var csrfToken = $("meta[name='_csrf']").attr("content") as string
//make request to server for current week's events
var pageNum = 0 //get current week via pagination
var calendarErrorMessage = "Error retrieving calendar data"

const calendarMessageId = '#calendar-message'
const calendarMessageCloseBtnId = '#calendar-message-close'
const appointmentPopupId = '#appointment-popup'

var selectedAppointmentId = ''
var currentWeekNumber = 0




//get doctors id on load
window.onload = () => {
    console.log('window has loaded')
    //hide create appointment button
    $('#btn-create-appointment').hide()
    getCurrentDoctorsId().then ( () => {
        getCurrentWeekAppointments(currentDoctorId)
    })

    //remove edit appointment button from DOM
    //doctor should not be able to edit - only admin
    $('#btn-appointment-edit').remove()
}

//get this doctor's id
async function getCurrentDoctorsId() {
    return $.ajax({
        url: "/rest/doctor/current-doctor/get-id",
        type: "GET",
        contentType: "application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data:JsonResponse) => {
            if(data.success) {
                setCurrentDoctorId(data.message)
            }
        },
        error: () => handleError(calendarErrorMessage)
    })
}



