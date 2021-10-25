import { makeClickableTableRows, searchForPatient } from "../admin-view/admin-module1.js"
import { message } from "../admin-view/admin-module2.js";
import { getSelectedUserId } from "../admin-view/admin-search-users.js";

var csrfToken = $("meta[name='_csrf']").attr("content") as string

//SECTION PatientSearchTable
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




$('#btn-view-patient').on('click', () => {
    //get selected patient id
    var id = getSelectedUserId('#patient-search-table-body') as string

    //fetch patient information & load tables
    $.ajax({
        url: "/rest/patient/"+id,
        type: "GET",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data:PatientResponseList) => {
            if(data.success) {
                loadPatientPrescriptionTable(data)
                loadPatientDoctorNotesTable(data)
                loadPatientDoctorNotesTable(data)
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

    
})

//SECTION Prescription
$('#btn-add-prescription').on('click', () => {
    //show popup form
    $('#prescription-form').show()
})

$('#prescription-form-submit').on('click', () => {
    //TODO get form data
    var patientId = getSelectedUserId('#patient-search-table-body') as string
    var medicationName = $('#medication-name').val();
    var doctorsDirections = $('#directions').val();
    var data = {medicationName, doctorsDirections, patientId}

    //TODO submit form
    $.ajax({
        url: "/rest/patient/add-prescription",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data:PatientResponseList) => {
            if(data.success) {
                $('#prescription-form').hide()
                $('#message').html(message('Prescription Added Successfully','alert-info'))
            }
            else {
                $('#prescription-form').show()
            }
        },
        error: () => {
            $('#message').html(message('Error retrieving patient information','alert-danger'))
        }
        
    })
})


$('#prescription-form-close').on('click', () => {
    $('#prescription-form').hide()
})

//SECTION Notes
$('#btn-add-notes').on('click', () => {
    //TODO show popup form
    $('#prescription-form').show()
})


//SECTION Requests
$('#btn-add-request').on('click', () => {
    //TODO show popup form
})

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
}

/**
 * Assumes single patient is returned in data object
 * @param data 
 * @returns 
 */
// function loadPatientAppointmentRequestTable(data:PatientResponseList) {
//     var patient = data.patientJsons[0]
//     var rows = ''
//     //TODO
//     patient.appointments.forEach( note => {
//         var row = '<tr data-id="'+note.id+'" data-selected="false" data-userType="patient">'+
//                         '<td>'+note.noteHeading+'</td>'+ 
//                     '</tr>';
//         rows += row
//     })
//     return rowss
// }