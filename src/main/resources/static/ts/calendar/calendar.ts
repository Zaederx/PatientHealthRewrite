import { getSelectedItemId } from "../admin-view/admin-search-users.js"
import { popupMessage } from "../doctor-view/doctor-view-patient-details.js"

var csrfToken = $("meta[name='_csrf']").attr("content") as string
//make request to server for current week's events
var pageNum = 0 //get current week via pagination
var calendarErrorMessage = "Error retrieving calendar data"

var calendarDate = new Date();
const calendarMessageId = '#calendar-message'
const calendarMessageCloseBtnId = '#calendar-message-close'
const patientTableId = '#patient-search-tbody'
const doctorTableId = '#doctor-search-tbody'
const appointmentPopupId = '#appointment-popup'
var currentPatientId = ''
export var currentDoctorId = ''
var selectedAppointmentId = ''


/**the current page number */
var calendarCurrentWeekNum = 1
var calendarPrevWeekNum = 1
var calendarNextWeekNum = 2

function setPageNumVarsCalendar(currentPageNum:number) {
    calendarCurrentWeekNum = currentPageNum;
    calendarPrevWeekNum = calendarCurrentWeekNum - 1;
    calendarNextWeekNum = calendarCurrentWeekNum + 1;
    console.log('calendarCurrentWeekNum:',calendarCurrentWeekNum)
    console.log('calendarPrevWeekNum:',calendarPrevWeekNum)
    console.log('calendarNextWeekNum:',calendarNextWeekNum)
}


export function getCurrentWeekAppointments(docId:string) {
    if (docId != '' && docId!= null) {
        //set current
        $.ajax({
            url: "/rest/calendar/get-current-week/"+docId,
            type: "GET",
            contentType: "application/json",
            dataType:"json",
            headers: {'X-CSRF-TOKEN':csrfToken},
            success: (data) => handleCalendarSuccess(data),
            error: () => handleError(calendarErrorMessage)
        })
    }
    
}

//have select button for doctor and patients search tables
$('#btn-select-patient').on('click', () => {
    console.log('patient selected')
    //set patient id
    currentPatientId = getSelectedItemId(patientTableId)
    //indicate patient is selected
    if (currentPatientId) {
        indicatePatientSelected()
    }
})
$('#btn-select-doctor').on('click', () => {
    console.log('doctor selected')
    //set patient id
    currentDoctorId = getSelectedItemId(doctorTableId)
    //get appointments for calendar
    getCurrentWeekAppointments(currentDoctorId)
    //indicate doctor is selected
    if (currentDoctorId) {
        indicateDoctorSelected()
    }
    console.warn('currentDoctorId:', currentDoctorId)
})
$('#btn-create-appointment').on('click', () => {
    var date = new Date(weekISO)
    openAppointmentPopup_AddMode(date)
})
$('#appointment-popup-close').on('click', () => {
    $(appointmentPopupId).hide()
})
$('#btn-appointment-submit').on('click', () => submitAppointment('/rest/calendar/create-appointment/'))

/**
 * Enables the Appointment Popup input fields
 */
function enableInputFields() {
    $('#appointment-date').removeAttr('disabled')
    $('#appointment-time').removeAttr('disabled')
    $('#appointment-duration').removeAttr('disabled')
    $('#appointment-type').removeAttr('disabled')
    //enable contenteditable span field
    $('#appointment-info').attr('contenteditable','')
    $('#appointment-info').addClass('editable')
    $('#appointment-info').removeClass('disabled')
}

/**
 * Disables the Appointment Popup input fields
 */
function disableInputFields() {
    //disable input fields
    $('#appointment-date').attr('disabled','')
    $('#appointment-time').attr('disabled','')
    $('#appointment-duration').attr('disabled','')
    $('#appointment-type').attr('disabled','')
    //disable contenteditable span field
    $('#appointment-info').removeAttr('contenteditable')
    $('#appointment-info').removeClass('editable')
    $('#appointment-info').addClass('disabled')
}
export function openAppointmentPopup_AddMode(date:Date) {
    //fill popup fields
    $('#appointment-date').val(date.toDateString())
    $('#appointment-time').val(date.toTimeString())

    //enable input fields
    enableInputFields()

    //enable submit button
    $('#btn-appointment-submit').removeAttr('disabled')
    $('#btn-appointment-submit').show()

    //hide and disable edit button
    $('#btn-appointment-edit').attr('disabled','')
    $('#btn-appointment-edit').hide()

    //hide and disable submit changes button
    $('#btn-appointment-submit-changes').attr('disabled','')
    $('#btn-appointment-submit-changes').hide()

    //hide and disable delete button
    $('#btn-appointment-delete').attr('disabled','')
    $('#btn-appointment-delete').hide()

    //display popup
    $(appointmentPopupId).show()

}

export function openAppointmentPopup_ViewMode(appointment:Appointment) {
    //set selected appointment id
    selectedAppointmentId = appointment.id;
    currentPatientId = appointment.pId;
    currentDoctorId = appointment.docId;

    //disable input fields
    disableInputFields()

    //fill appointment popup form with appointment details
    $('#appointment-date').val(appointment.date)
    $('#appointment-time').val(appointment.time)
    $('#appointment-duration').val(String(appointment.durationInMinutes))
    $('#appointment-type').val(appointment.appointmentType)
    //fill contenteditable span
    $('#appointment-info').html(appointment.appointmentInfo)

    //disable submit button
    $('#btn-appointment-submit').attr('disabled','')
    $('#btn-appointment-submit').hide()

    //show and enable edit button
    $('#btn-appointment-edit').removeAttr('disabled')
    $('#btn-appointment-edit').show()
    $('#btn-appointment-edit').on('click', () => openAppointmentPopup_EditMode())

    //hide and disable submit changes button
    $('#btn-appointment-submit-changes').attr('disabled','')
    $('#btn-appointment-submit-changes').hide()

    //hide and disable delete button
    $('#btn-appointment-delete').attr('disabled','')
    $('#btn-appointment-delete').hide()

    //display / show appointment popup
    $(appointmentPopupId).show()

}


export function openAppointmentPopup_EditMode() {
    //NOTE: FIELDS ARE ALREADY FILLED FROM VIEW_MODE
    //WHICH PRECEDES ACCESSING EDIT MODE

    //enable input fields
    enableInputFields()

    //hide and disable submit button
    $('#btn-appointment-submit').attr('disabled','')
    $('#btn-appointment-submit').hide()

    //hide and disable edit button
    $('#btn-appointment-edit').attr('disabled','')
    $('#btn-appointment-edit').hide()

    //show and enable submit changes button
    $('#btn-appointment-submit-changes').removeAttr('disabled')
    $('#btn-appointment-submit-changes').show()
    $('#btn-appointment-submit-changes').on('click', () => submitAppointment("/rest/calendar/edit-appointment",selectedAppointmentId))

    //hide and disable delete button
    $('#btn-appointment-delete').removeAttr('disabled')
    $('#btn-appointment-delete').show()
    $('#btn-appointment-delete').on('click', () => deleteAppointment(selectedAppointmentId))

    //display popup
    $(appointmentPopupId).show()
}






export function submitAppointment(url:string, appointmentId?:string) {
    var aId = appointmentId ? appointmentId : ''
    var date = $('#appointment-date').val()
    var time = $('#appointment-time').val()
    var durationInMinutes = $('#appointment-duration').val()
    var appointmentType = $('#appointment-type').val()
    var appointmentInfo = $('#appointment-info').html()
    var weekNumber = calendarCurrentWeekNum
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
         $(appointmentPopupId).hide()
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
         $(appointmentPopupId).hide()
    }
    if (pId != '' && docId != '') {
        var data = {date, time, appointmentType, appointmentInfo, durationInMinutes, weekNumber, docId, pId , aId}
        //submit appointment via ajax
        $.ajax({
            url: url,
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


export function deleteAppointment(id:string) {
    var deleteAppointment = confirm('Are you sure you want to delete this Appointment?')
    if (deleteAppointment == true) {
        $.ajax({
            url: '/rest/calendar/delete-appointment/'+id,
            type: "DELETE",
            contentType: "application/json",
            dataType:"json",
            headers: {'X-CSRF-TOKEN':csrfToken},
            success: (data) => handleCreateAppointmentSuccess(data),
            error: () => handleError('Error deleting appointment')
        })
    }
}


export function handleCreateAppointmentSuccess(data:JsonResponse) {
    if (data.success) {
        //display success message
        $(calendarMessageId).html(popupMessage(data.message,'alert-info',calendarMessageCloseBtnId))
        //close appointment form popup
        $(appointmentPopupId).hide()
        //refresh calendar
        getCurrentWeekAppointments(currentDoctorId)
    }
    else {
        //display error message
        $(calendarMessageId).html(popupMessage(data.message,'alert-warning',calendarMessageCloseBtnId))
    }
}




export const divHeight = 50 * 12
export function appointmentToHtml(a:Appointment):string {
    //work out position
    var hour = Number(a.hour)
    var minute = Number(a.min)
    var position = appointmentPosition(divHeight, hour, minute)
    var height = appointmentDurationLength(divHeight, a.durationInMinutes)
    //set html to be returned - with position information
    var html = '<div class="single-appointment" data-position="'+position+'" data-id="'+a.id+'" style="top:'+position+'px; height:'+height+'px">'+a.appointmentType+'</div>'

    return html
}



export function handleViewAppointmentSuccess(data:AppointmentResponse) {
    if (data.success) {
        //display appointment information
        openAppointmentPopup_ViewMode(data.appointment)
    }
    else {
        //display warning message
        $(calendarMessageId).html(popupMessage(data.message,'alert-warning',calendarMessageCloseBtnId))
    }
}




var hourSlots = new Map()

hourSlots.set(8,1)
hourSlots.set(9,2)
hourSlots.set(10,3)
hourSlots.set(11,4)
hourSlots.set(12,5)
hourSlots.set(13,6)
hourSlots.set(14,7)
hourSlots.set(15,8)
hourSlots.set(16,9)
hourSlots.set(17,10)
hourSlots.set(18,11)
hourSlots.set(19,12)
hourSlots.set(20,13)


/**
 * 
 * @param divHeight the hieght of the div to put the appointment div into
 * @param hour the appointment hour
 * @param minute the appointment minute
 * @returns 
 */
function appointmentPosition(divHeight:number, hour:number, minute:number):number {
    //hour and 
    const surgeryHours = 12
    const sixtyMins = 60
    //height of single unit - hour and mintue
    var hourUnit = (divHeight/surgeryHours)
    var minUnit = (hourUnit/sixtyMins)
    //position given the appointment hour and minute
    var positionHour = hourUnit * (hourSlots.get(hour) - 1)
    var positionMinute =  minUnit * minute
    var position = (positionHour + positionMinute)
    return position
}

function appointmentDurationLength(divHeight:number, durationInMinutes:number) {
    // constants
    const surgeryHours = 12
    const sixtyMins = 60
    //height of single unit - hour and mintue
    var hourUnit = (divHeight/surgeryHours)
    var minUnit = (hourUnit/sixtyMins)
    var length = minUnit * durationInMinutes
    return length
}

var weekISO = ''
export function handleCalendarSuccess(data:WeekResponse) {

    if (data.success) {
        //set pagination variables
        setPageNumVarsCalendar(data.week.weekNumber)
        weekISO = data.week.mondayDateStr
        $('#weekNum').html(String(data.week.weekNumber))
        //set week numbers for each
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

        //get individual day div's and enable appointments to be clicked
        var mondayDiv = document.querySelector('#monday-appointments') as HTMLDivElement
        var tuesdayDiv = document.querySelector('#tuesday-appointments') as HTMLDivElement
        var wednesdayDiv = document.querySelector('#wednesday-appointments') as HTMLDivElement
        var thursdayDiv = document.querySelector('#thursday-appointments') as HTMLDivElement
        var fridayDiv = document.querySelector('#friday-appointments') as HTMLDivElement
        var saturdayDiv = document.querySelector('#saturday-appointments') as HTMLDivElement
        var sundayDiv = document.querySelector('#sunday-appointments') as HTMLDivElement

        enableAppointmentClick(mondayDiv)
        enableAppointmentClick(tuesdayDiv)
        enableAppointmentClick(wednesdayDiv)
        enableAppointmentClick(thursdayDiv)
        enableAppointmentClick(fridayDiv)
        enableAppointmentClick(saturdayDiv)
        enableAppointmentClick(sundayDiv)

    }
}

function enableAppointmentClick(dayDiv:HTMLDivElement) {
    var appointmentDivs = dayDiv.querySelectorAll('div') 
    appointmentDivs.forEach ( (appointment) => {
        var id = appointment.getAttribute('data-id') as string
        appointment.onclick = () => {
            viewAppointment(id);
        }
    })
}

//display a popup message error
export function handleError(message:string) {
    var messageDivId = '#calendar-message'
    var closeBtnId = '#calendar-message-close'
    //display message
    $(messageDivId).html(popupMessage(message,'alert-info', closeBtnId))
    //enable popup message close button
    $(closeBtnId).on('click', () => {
        $(messageDivId).hide()
    })
}


/*SECTION Calendar forwards and backwards functionality */
export function getAppointments(docId:number, weekNumber:number, success:Function = handleCalendarSuccess) {
    if (docId && weekNumber) {
        $.ajax({
            url: "/rest/calendar/get-week-appointments/"+docId+'/'+ weekNumber,
            type: "GET",
            contentType: "application/json",
            dataType:"json",
            headers: {'X-CSRF-TOKEN':csrfToken},
            success: (data) => success(data),
            error: () => handleError('Error fetching appointment details')
        })
    }
    else {
        handleError('Error fetching appointment details')
    }
}

export function viewAppointment(id:string) {
    //make request to server for appointment
    $.ajax({
        url: "/rest/calendar/get-appointment/"+id,
        type: "GET",
        contentType: "application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleViewAppointmentSuccess(data),
        error: () => handleError('Error fetching appointment details')
    })
}


export function setCurrentDoctorId(id:string) {
    currentDoctorId = id
}

$('#btn-calendar-week-prev').on('click', () => {
    //ajax request for doctors - on previous page of results
    getAppointments(Number(currentDoctorId), calendarPrevWeekNum, handleCalendarSuccess)

    //set current page to previous page & update prev and next page numbers
    // setPageNumVarsCalendar(calendarPrevWeekNum as number)
})
$('#btn-calendar-week-next').on('click', () => {
    //ajax request for calendar - on next page of results
    getAppointments(Number(currentDoctorId),calendarNextWeekNum, handleCalendarSuccess)

    //set current page to next page & update prev and next page numbers
    // setPageNumVarsCalendar(calendarNextWeekNum as number)
})
//allow users to select a calendar week from a calendar input
$('#btn-calendar-week-go').on('click', () => {
    //TODO //IMPORTANT
    var weekNum = Number($('#weekNum').html() as string)
    //ajax request for calendar - on set page of results
    getAppointments(Number(currentDoctorId),weekNum, handleCalendarSuccess)
    
    //set current page to the entered page number & update prev and next page numbers
    // setPageNumVarsCalendar(weekNum as number)
})

//SECTION SELECTED BUTTONS
const doctorSelectId = '#doctor-selected'
const patientSelectId = '#patient-selected'
function indicateDoctorSelected() {
    $(doctorSelectId).removeClass('btn-danger')
    $(doctorSelectId).addClass('btn-info')
    $(doctorSelectId).text('Doctor Selected')
}
function indicatePatientSelected() {
    $(patientSelectId).removeClass('btn-danger')
    $(patientSelectId).addClass('btn-info')
    $(patientSelectId).text('Patient Selected')
}
    