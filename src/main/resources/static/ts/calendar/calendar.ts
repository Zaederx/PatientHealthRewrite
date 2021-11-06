import { getSelectedItemId } from "../admin-view/admin-search-users.js"
import { popupMessage } from "../doctor-view/doctor-view-patient-details.js"

var csrfToken = $("meta[name='_csrf']").attr("content") as string
//make request to server for current week's events
var pageNum = 0 //get current week via pagination
var calendarErrorMessage = "Error retrieving calendar data"

var calendarMessageId = '#calendar-message'
var calendarMessageCloseBtnId = '#calendar-message-close'
var patientTableId = '#patient-search-tbody'
var doctorTableId = '#doctor-search-tbody'
var currentPatientId = ''
var currentDoctorId = ''
var currentWeekNumber = 0



//have select button for doctor and patients search tables
$('#btn-select-patient').on('click', () => {
    console.log('patient selected')
    //set patient id
    currentPatientId = getSelectedItemId(patientTableId)
})
$('#btn-select-doctor').on('click', () => {
    console.log('doctor selected')
    //set patient id
    currentDoctorId = getSelectedItemId(doctorTableId)
})
$('#btn-create-appointment').on('click', () => {
    var date = new Date()
    var docId = currentDoctorId
    var pId = currentPatientId
    openAppointmentPopup(date, docId, pId)
})

function openAppointmentPopup(date:Date, docId:string, pId:string) {
    //display popup
    $('#appointment-popup').show()
    //fill popup fields
    $('#appointment-date').html(date.toDateString())
    $('#appointment-time').html(date.toTimeString())
    //fill hidden fields
    $('#appointment-docId').html(docId)
    $('#appointment-pId').html(pId)
}

$('#appointment-popup-close').on('click', () => {
    $('#appointment-popup').hide()
})
$('#btn-appointment-submit').on('click', () => submitAppointment())

function submitAppointment() {
    var date = $('#appointment-date').val()
    var time = $('#appointment-time').val()
    var durationInMinutes = $('#appointment-duration').val()
    var appointmentType = $('#appointment-type').val()
    var appointmentInfo = $('#appointment-info').val()
    var weekNumber = currentWeekNumber
    var docId = currentDoctorId
    var pId = currentPatientId
    console.warn('pId:',pId)
    console.warn('docId:',docId)
    if (pId == '') {
        //display warning message
        $(calendarMessageId).show()
        $(calendarMessageId).html(popupMessage('Please select a patient for the appointment','alert-info',calendarMessageCloseBtnId))
        //enable generated POPUP close btn - can only be done once added to DOM
        $(calendarMessageCloseBtnId).on('click', () => {
            $(calendarMessageId).hide()
        })
         //close appointment form popup
         $('#appointment-popup').hide()
    }
    if (docId == '') {
        //display warning message
        $(calendarMessageId).show()
        $(calendarMessageId).html(popupMessage('Please select a doctor for the appointment','alert-info',calendarMessageCloseBtnId))
        //enable generated POPUP close btn - can only be done once added to DOM
        $(calendarMessageCloseBtnId).on('click', () => {
            $(calendarMessageId).hide()
        })
         //close appointment form popup
         $('#appointment-popup').hide()
    }
    if (pId != '' && docId != '') {
        var data = {date, time, appointmentType, appointmentInfo, durationInMinutes, weekNumber, docId, pId}
        //submit appointment via ajax
        $.ajax({
            url: "/rest/calendar/create-appointment/",
            data: JSON.stringify(data),
            type: "POST",
            contentType: "application/json",
            dataType:"json",
            headers: {'X-CSRF-TOKEN':csrfToken},
            success: (data) => handleCreateAppointmentSuccess(data),
            error: () => handleError('Error creating appointment')
        })
    }    
}



function handleCreateAppointmentSuccess(data:JsonResponse) {
    if (data.success) {
        //display success message
        $(calendarMessageId).html(popupMessage(data.message,'alert-info',calendarMessageCloseBtnId))
        //close appointment form popup
        $('#appointment-popup').hide()
        //refresh calendar
        getCurrentWeekAppointments()
    }
    else {
        //display error message
        $(calendarMessageId).html(popupMessage(data.message,'alert-warning',calendarMessageCloseBtnId))
    }
}


getCurrentWeekAppointments()

function getCurrentWeekAppointments() {
    //set current
    $.ajax({
        url: "/rest/calendar/get-current-week/",
        type: "GET",
        contentType: "application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleCalendarSuccess(data),
        error: () => handleError(calendarErrorMessage)
    })
}


const divHeight = 50 //px
function appointmentToHtml(a:Appointment):string {
    var hour = Number(a.hour)
    var minute = Number(a.min)
    var position = appointmentPosition(divHeight, hour, minute)
    var height = appointmentDurationLength(divHeight, a.durationInMinutes)
    var html = '<div class="single-appointment" data-position="' +position+'" style="top:'+position+'px; height:'+height+'"px>'+a.appointmentType+'</div>'

    return html
}

/**
 * 
 * @param divHeight the hieght of the div to put the appointment div into
 * @param hour the appointment hour
 * @param minute the appointment minute
 * @returns 
 */
function appointmentPosition(divHeight:number, hour:number, minute:number):number {
    var surgeryHours = 12
    var sixtyMins = 60
    var hourSlot = (divHeight/surgeryHours)
    var minSlot = (divHeight/surgeryHours/sixtyMins)
    var positionHour = hourSlot * hour
    var positionMinute =  minSlot * minute
    var position = (positionHour + positionMinute) + 13//10 pixels off
    return position
}

function appointmentDurationLength(divHeight:number, durationInMinutes:number) {
    var sixtyMins = 60
    var length = (divHeight/sixtyMins) * durationInMinutes
    return length
}

function handleCalendarSuccess(data:WeekResponse) {

    if (data.success) {
        var monday = ''
        var tuesday = ''
        var wednesday = ''
        var thursday = ''
        var friday = ''
        var saturday = ''
        var sunday = ''
    
        //get each days appointments
        data.week.monday.appointments.forEach( a => {
            var appointmentHTML = appointmentToHtml(a) as string
            monday += appointmentHTML
        })
        data.week.tuesday.appointments.forEach( a => {
            var appointmentHTML = appointmentToHtml(a) as string
            tuesday += appointmentHTML
        })
        data.week.wednesday.appointments.forEach( a => {
            var appointmentHTML = appointmentToHtml(a) as string
            wednesday += appointmentHTML
        })
        data.week.thursday.appointments.forEach( a => {
            var appointmentHTML = appointmentToHtml(a) as string
            thursday += appointmentHTML
        })
        data.week.friday.appointments.forEach( a => {
            var appointmentHTML = appointmentToHtml(a) as string
            friday += appointmentHTML
        })
        data.week.saturday.appointments.forEach( a => {
            var appointmentHTML = appointmentToHtml(a) as string
            saturday += appointmentHTML
        })
        data.week.sunday.appointments.forEach( a => {
            var appointmentHTML = appointmentToHtml(a) as string
            sunday += appointmentHTML
        })
    
        //input appointments to calendar html divs
        $('#monday-appointments').html(monday)
        $('#tuesday-appointments').html(tuesday)
        $('#wednesday-appointments').html(wednesday)
        $('#thursday-appointments').html(thursday)
        $('#friday-appointments').html(friday)
        $('#saturday-appointments').html(saturday)
        $('#sunday-appointments').html(sunday)

        //set current week number
        currentWeekNumber = data.week.weekNumber
    }
   
}

function handleError(message:string) {
    $('#message').html(message)
}

//