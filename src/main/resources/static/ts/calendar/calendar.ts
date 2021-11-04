
var csrfToken = $("meta[name='_csrf']").attr("content") as string
//make request to server for current week's events
var pageNum = 0 //get current week via pagination
var calendarErrorMessage = "Error retrieving calendar data"

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



function appointmentToHtml(a:Appointment):string {
    var hour = Number(a.hour)
    var minute = Number(a.min)
    var position = appointmentPosition(divHeight, hour, minute)
    var html = '<div class="appointment" data-position="' +position+'">'+a.appointmentType+'</div>'

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
    var position = (positionHour + positionMinute)
    return position
}

const divHeight = 1000 //px
function handleCalendarSuccess(data:WeekResponse) {
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
}

function handleError(message:string) {
    $('#message').html(message)
}

//