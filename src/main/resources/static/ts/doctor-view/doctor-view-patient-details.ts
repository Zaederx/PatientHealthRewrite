import { makeClickableTableRows, searchForPatient, selectRow } from "../admin-view/admin-module1.js"
import { message } from "../admin-view/admin-module2.js";
import { getSelectedItemId } from "../admin-view/admin-search-users.js";

var csrfToken = $("meta[name='_csrf']").attr("content") as string
var currentPatientDetails:Patient

//Ids for div to display alert messages
const messageDivId = '#message'
const messagePrescriptionsDivId = '#message-prescriptions'
const messageNotesDivId = '#message-medical-notes'
const messageRequestsDivId = '#message-appointment-requests'

//Ids for Information Popups
const popupPrescriptionsId = '#info-popup-prescriptions'
const popupNotesId = '#info-popup-medical-notes'
const popupRequestsId = '#info-popup-appointment-requests'


//SECTION ****** PatientSearchTable ******
$('#patient-searchbar').on('input', () => {
    var name = $('#patient-searchbar').val() as string;
    var pageNum = $('#p-pageNum').val() as number
    if(!pageNum) {pageNum = 1}
    searchForPatient(name,pageNum,csrfToken)
})

/**the current page number */
var patientTableCurrentPageNum = 1
var patientTablePagePrev = 0
var patientTablePageNext = 2

function setPageNumVars(currentPageNum:number) {
    patientTableCurrentPageNum = currentPageNum;
    patientTablePagePrev = patientTableCurrentPageNum - 1;
    patientTablePageNext = patientTableCurrentPageNum + 1;
}

$('#btn-prev').on('click', () => {
    var name = $('#patient-searchbar').val() as string;
    //ajax request for doctors - on previous page of results
    searchForPatient(name,patientTablePagePrev,csrfToken)
    //set current page to previous page & update prev and next page numbers
    setPageNumVars(patientTablePagePrev as number)
})
$('#btn-next').on('click', () => {
    var name = $('#patient-searchbar').val() as string;
    //ajax request for doctors - on previous page of results
    searchForPatient(name,patientTablePageNext,csrfToken)
    //set current page to next page & update prev and next page numbers
    setPageNumVars(patientTablePageNext as number)
})
$('#btn-go').on('click', () => {
    var name = $('#patient-searchbar').val() as string;
    var pageNum = Number($('#p-pageNum').html() as string)
    //ajax request for doctors - on previous page of results
    searchForPatient(name,pageNum,csrfToken)
    //set current page to the entered page number & update prev and next page numbers
    setPageNumVars(pageNum as number)
})



function viewPatientDetails() {
    //get selected patient id
    var id = getSelectedItemId('#patient-search-table-body') as string

    //fetch patient information & load tables
    $.ajax({
        url: "/rest/patient/"+id,
        type: "GET",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data:PatientResponseList) => {
            if(data.success) {
                //save patient infomation in variable
                currentPatientDetails = data.patientJsons[0]
                //load tables with information
                loadPatientPrescriptionTable(data)
                loadPatientDoctorNotesTable(data)
                loadPatientAppointmentRequestTable(data)
            }
            else {

            }
            $('#message').hide()
        } ,
        error: () => {
            $('#message').show()
            $('#message').html(message('Error retrieving patient information','alert-danger'))
        }
    })
}
$('#btn-view-patient').on('click', () => {
    viewPatientDetails()
})

//SECTION ****** Prescription ******
//show prescription form
$('#btn-add-prescription').on('click', () => {
    //show popup form
    $('#prescription-div').show()
})

//hide prescription form
$('#prescription-form-close').on('click', () => {
    $('#prescription-div').hide()
})


//hide error message
$(messagePrescriptionsDivId+'-close').on('click', () => {
    $(messagePrescriptionsDivId).hide()
})

//submit prescription form
$('#prescription-form-submit').on('click', () => {
    //get form data
    var patientId = getSelectedItemId('#patient-search-table-body') as string
    var medicationName = $('#medication-name').html();
    var doctorsDirections = $('#directions').html();//from contenteditable div
    var data = {medicationName, doctorsDirections, patientId}

    if (medicationName.length != 0 && doctorsDirections.length != 0 && patientId) {
        submitPrescriptionForm(data)
        $('#medication-name').html('');
        $('#directions').html('');
        $(messagePrescriptionsDivId).hide()
    }
    else {
        $(messagePrescriptionsDivId).show()
        var html = $(messagePrescriptionsDivId).html()
        $(messagePrescriptionsDivId).html(message('Please do not leave fields empty','alert-warning')+html)
    }

})

function submitPrescriptionForm(data:any) {
     //submit form
     $.ajax({
        url: "/rest/patient/add-prescription",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data:PatientResponseList) => {
            if(data.success) {
                $('#prescription-div').hide()
                $('#prescription-form').trigger('reset')
                $(messageDivId).html(message('Prescription Added Successfully','alert-info'))

                //refresh with updated details
                viewPatientDetails()
                $('#message').hide()
            }
            else {
                $('#prescription-div').show()
            }
        },
        error: () => {
            $(messageDivId).show()
            $(messageDivId).html(message('Error retrieving patient information','alert-danger'))
        }
        
    })
}


//SECTION ******  Notes *********

//show add notes form
$('#btn-add-note').on('click', () => {
    //TODO show popup form
    $('#note-div').show()
})

//hide add notes form
$('#note-form-close').on('click', () => {
    $('#note-div').hide()
})

//hide error message
$(messageNotesDivId+'-close').on('click', () => {
    $(messageNotesDivId).hide()
})

//submit add notes form
$('#note-form-submit').on('click', () => {
    //get form data
    var patientId = getSelectedItemId('#patient-search-table-body') as string
    var noteHeading = $('#note-heading').html();
    var noteBody = $('#note-body').html();
    var data = {noteHeading, noteBody, patientId}

    if (noteHeading.length != 0 && noteBody.length != 0 && patientId) {
        submitMedicalNoteForm(data)
        //reset form content
        $('#note-heading').html('');
        $('#note-body').html('');
        $(messageNotesDivId).hide()
    }
    else {
        $(messageNotesDivId).show()
        var html = $(messageNotesDivId).html()
        $(messageNotesDivId).html(message('Please do not leave fields empty','alert-warning')+html)
    }

    
})

function submitMedicalNoteForm(data:any) {
    //submit form
    $.ajax({
        url: "/rest/doctor/add-medical-note",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data:PatientResponseList) => {
            if(data.success) {
                $('#note-div').hide()
                $('#note-form').trigger('reset')
                $('#message').html(message('Prescription Added Successfully','alert-info'))
                //refresh with updated details
                viewPatientDetails()
            }
            else {
                $('#prescription-div').show()
            }
        },
        error: () => {
            $('#message').html(message('Error retrieving patient information','alert-danger'))
        }
        
    })
}



//SECTION ****** Requests ******

//show request form
$('#btn-add-request').on('click', () => {
    //TODO show popup form
    $('#appointment-request-div').show()
})

//hide request form
$('#appointment-request-form-close').on('click', () => {
    $('#appointment-request-div').hide()
})

//hide error message
$(messageRequestsDivId+'-close').on('click', () => {
    $(messageRequestsDivId).hide()
})

//submit Request form
$('#appointment-request-form-submit').on('click', () => {
    //get form data
    var patientId = getSelectedItemId('#patient-search-table-body') as string
    var appointmentType = $('#appointment-type').html();
    var appointmentInfo = $('#appointment-info').html();
    var data = {appointmentType, appointmentInfo, patientId}
    if (appointmentType.length != 0 && appointmentInfo.length != 0 && patientId) {
        submitAppointmentRequestForm(data)
        //reset form input divs
        $('#appointment-type').html('');
        $('#appointment-info').html('');
        $(messageRequestsDivId).hide()
    }
    else {
        $(messageRequestsDivId).show()
        var html = $(messageRequestsDivId).html()
        $(messageRequestsDivId).html(message('Please do not leave fields empty','alert-warning')+html)
    }
   
})
function submitAppointmentRequestForm(data:any) {
    //submit form
    $.ajax({
       url: "/rest/doctor/add-patient-appointment-request",
       type: "POST",
       data: JSON.stringify(data),
       contentType: "application/json",
       dataType: "json",
       headers: {'X-CSRF-TOKEN':csrfToken},
       success: (data:PatientResponseList) => {
           if(data.success) {
               $('#appointment-request-div').hide()
               $('#appointment-request-form').trigger('reset')
               $('#message').html(message('Prescription Added Successfully','alert-info'))
               //refresh with updated details
               viewPatientDetails()
           }
           else {
               $('#appointment-request-div').show()
           }

       },
       error: () => {
           $('#message').html(message('Error retrieving patient information','alert-danger'))
       }
       
   })
}



/**
 * Assumes single patient is returned in data object
 * @param data 
 * @returns 
 */
function loadPatientPrescriptionTable(data:PatientResponseList) {
    var patient = data.patientJsons[0]
    var rows = ''
    patient.prescriptions.forEach( p => {
        var row = '<tr data-id="'+p.id+'" data-selected="false" data-userType="patient">'+
                        '<td>'+p.medicationName+'</td>'+ 
                    '</tr>';
        rows += row
    })
    $('#patient-prescription-tbody').html(rows)
    var tableBody = document.querySelector('#patient-prescription-tbody') as HTMLTableElement
    makeClickableTableRows(tableBody)
}

/**
 * Assumes single patient is returned in data object
 * @param data 
 * @returns 
 */
function loadPatientDoctorNotesTable(data:PatientResponseList) {
    var patient = data.patientJsons[0]
    var rows = ''
    patient.doctorNotes.forEach( note => {
        var row = '<tr data-id="'+note.id+ '" '+
        'data-selected="false" data-userType="patient">'+
                        '<td>'+note.noteHeading+'</td>'+ 
                    '</tr>';
        rows += row
    })
    $('#patient-medical-notes-tbody').html(rows)
    var tableBody = document.querySelector('#patient-medical-notes-tbody') as HTMLTableElement
    makeClickableTableRows(tableBody)
}

/**
 * Assumes single patient is returned in data object
 * @param data 
 * @returns 
 */
function loadPatientAppointmentRequestTable(data:PatientResponseList) {
    var patient = data.patientJsons[0]
    var rows = ''
    patient.appointmentRequests.forEach( request => {
        var row = '<tr data-id="'+request.id+'" data-selected="false" data-userType="patient">'+
                        '<td>'+request.appointmentType+'</td>'+ 
                    '</tr>';
        rows += row
    })
    $('#appointment-request-tbody').html(rows)
    var tableBody = document.querySelector('#appointment-request-tbody') as HTMLTableElement
    makeClickableTableRows(tableBody)
}




//SECTION ****** Viewing Futher Infomation Detials In Popup ******

function displayInfoPopup(popupId:string,html:string) {
    $(popupId).show()
    $(popupId).html(html)
}

$('#btn-view-prescription').on('click', () => viewPrescription())
$('#btn-view-medical-note').on('click', () => viewMedicalNote())
$('#btn-view-appointment-request').on('click', ()=> viewAppointmentRequest())
$('#btn-info-popup-close').on('click', () =>{
    $('#btn-info-popup').hide()
})

function viewPrescription() {
    //get selected prescription id
    var id = Number(getSelectedItemId('#patient-prescription-tbody'))
    //find it in list of current patient prescriptions
    var prescription = currentPatientDetails.prescriptions.filter((p)=>{return p.id == id})[0]
    //display
    var html = '<label>Medication Name:</label>'+
    '<div class="field">'+prescription.medicationName +'</div>'+
    '<label>Doctors Directions:</label>'+
    '<div class="field">'+prescription.doctorsDirections+'</div>'+
    '<span id="btn-info-popup-prescriptions-close" >Close</span>'

    displayInfoPopup(popupPrescriptionsId,html)
}

function viewMedicalNote() {
    //get selected prescription id
    var id = Number(getSelectedItemId('#patient-medical-notes-tbody'))
    //find it in list of current patient prescriptions
    var note = currentPatientDetails.doctorNotes.filter((n)=>{return n.id == id})[0]
    //display
    var html = '<label>Note Heading:</label>'+
    '<div class="field">'+note.noteHeading +'</div>'+
    '<label>Note Body:</label>'+
    '<div class="field">'+note.noteBody+'</div>'+
    '<span id="btn-info-popup-medical-notes-close" >X</span>'

    displayInfoPopup(popupNotesId,html)
}

function viewAppointmentRequest() {
    //get selected prescription id
    var id = Number(getSelectedItemId('#appointment-request-tbody'))
    //find it in list of current patient prescriptions
    var request = currentPatientDetails.appointmentRequests.filter((r)=>{return r.id == id})[0]
    //display
    var html = '<label>Appointment Type:</label>'+
    '<div class="field">'+request.appointmentType +'</div>'+
    '<label>Appointment Info:</label>'+
    '<div class="field">'+request.appointmentInfo+'</div>'+
    '<label>Doctor Name:</label>'+
    '<div class="field">'+request.doctorName+'</div>'+
    '<div id="btn-info-popup-appointment-requests-close">X</div>'
    displayInfoPopup(popupRequestsId,html)
}