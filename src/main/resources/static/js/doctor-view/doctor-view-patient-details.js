import { makeClickableTableRows, searchForPatient } from "../admin-view/admin-module1.js";
import { message } from "../admin-view/admin-module2.js";
import { getSelectedItemId } from "../admin-view/admin-search-users.js";
var csrfToken = $("meta[name='_csrf']").attr("content");
var currentPatientDetails;
//Ids for div to display alert messages
const messageDivId = '#message';
const messagePrescriptionsDivId = '#message-prescriptions';
const messageNotesDivId = '#message-medical-notes';
const messageRequestsDivId = '#message-appointment-requests';
//Ids for Information Popups
const popupPrescriptionsId = '#info-popup-prescriptions';
const popupNotesId = '#info-popup-medical-notes';
const popupRequestsId = '#info-popup-appointment-requests';
var currentPatientId = 0;
/**
 *
 * @param message
 * @param type
 * @param closeBtnId the id you want the close btn
 * to have - can be used to then reference for event handling
 * @returns
 */
export function popupMessage(message, type, closeBtnId) {
    //note - substring used to remove the hash before the id
    var popupHTML = '<div class="alert ' + type + '">' +
        '<div id="' + closeBtnId.substring(1) + '" class="btn-x">X</div>' +
        '<p>' + message + '</p>' +
        '</div>';
    return popupHTML;
}
//SECTION ****** PatientSearchTable ******
$('#patient-searchbar').on('input', () => {
    var name = $('#patient-searchbar').val();
    var pageNum = $('#p-pageNum').val();
    if (!pageNum) {
        pageNum = 1;
    }
    searchForPatient(name, pageNum, csrfToken);
});
/**the current page number */
var patientTableCurrentPageNum = 1;
var patientTablePagePrev = 0;
var patientTablePageNext = 2;
function setPageNumVars(currentPageNum) {
    patientTableCurrentPageNum = currentPageNum;
    patientTablePagePrev = patientTableCurrentPageNum - 1;
    patientTablePageNext = patientTableCurrentPageNum + 1;
}
$('#btn-prev').on('click', () => {
    var name = $('#patient-searchbar').val();
    //ajax request for doctors - on previous page of results
    searchForPatient(name, patientTablePagePrev, csrfToken);
    //set current page to previous page & update prev and next page numbers
    setPageNumVars(patientTablePagePrev);
});
$('#btn-next').on('click', () => {
    var name = $('#patient-searchbar').val();
    //ajax request for doctors - on previous page of results
    searchForPatient(name, patientTablePageNext, csrfToken);
    //set current page to next page & update prev and next page numbers
    setPageNumVars(patientTablePageNext);
});
$('#btn-go').on('click', () => {
    var name = $('#patient-searchbar').val();
    var pageNum = Number($('#p-pageNum').html());
    //ajax request for doctors - on previous page of results
    searchForPatient(name, pageNum, csrfToken);
    //set current page to the entered page number & update prev and next page numbers
    setPageNumVars(pageNum);
});
function viewPatientDetails() {
    //get selected patient id
    var id = getSelectedItemId('#patient-search-table-body');
    //set current patient id variable - needed for pop up tables
    currentPatientId = Number(id);
    //fetch patient information & load tables
    $.ajax({
        url: "/rest/patient/" + id,
        type: "GET",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                //save patient infomation in variable
                currentPatientDetails = data.patientJsons[0];
                //load tables with information
                loadPatientPrescriptionTable(data);
                loadPatientDoctorNotesTable(data);
                loadPatientAppointmentRequestTable(data);
            }
            else {
            }
            $('#message').hide();
        },
        error: () => {
            $('#message').show();
            $('#message').html(message('Error retrieving patient information', 'alert-danger'));
        }
    });
}
$('#btn-view-patient').on('click', () => {
    viewPatientDetails();
});
//SECTION ****** Prescription ******
//show prescription form
$('#btn-add-prescription').on('click', () => {
    //show popup form
    $('#prescription-div').show();
});
//hide prescription form
$('#prescription-form-close').on('click', () => {
    $('#prescription-div').hide();
});
//submit prescription form
$('#prescription-form-submit').on('click', () => {
    //get form data
    var patientId = getSelectedItemId('#patient-search-table-body');
    var medicationName = $('#medication-name').html();
    var doctorsDirections = $('#directions').html(); //from contenteditable div
    var data = { medicationName, doctorsDirections, patientId };
    if (medicationName.length != 0 && doctorsDirections.length != 0 && patientId) {
        submitPrescriptionForm(data);
        $('#medication-name').html('');
        $('#directions').html('');
        $(messagePrescriptionsDivId).hide();
    }
    else {
        $(messagePrescriptionsDivId).show();
        $(messagePrescriptionsDivId).html(popupMessage('Please do not leave fields empty', 'alert-warning', messagePrescriptionsDivId + '-close'));
        //hide error message
        $(messagePrescriptionsDivId + '-close').on('click', () => {
            $(messagePrescriptionsDivId).hide();
        });
    }
});
function submitPrescriptionForm(data) {
    //submit form
    $.ajax({
        url: "/rest/doctor/add-prescription",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                $('#prescription-div').hide();
                $('#prescription-form').trigger('reset');
                $(messageDivId).html(message('Prescription Added Successfully', 'alert-info'));
                //refresh with updated details
                viewPatientDetails();
                $('#message').hide();
            }
            else {
                $('#prescription-div').show();
            }
        },
        error: () => {
            $(messageDivId).show();
            $(messageDivId).html(message('Error retrieving patient information', 'alert-danger'));
        }
    });
}
//SECTION ******  Notes *********
//show add notes form
$('#btn-add-note').on('click', () => {
    //TODO show popup form
    $('#note-div').show();
});
//hide add notes form
$('#note-form-close').on('click', () => {
    $('#note-div').hide();
});
//submit add notes form
$('#note-form-submit').on('click', () => {
    //get form data
    var patientId = getSelectedItemId('#patient-search-table-body');
    var noteHeading = $('#note-heading').html();
    var noteBody = $('#note-body').html();
    var data = { noteHeading, noteBody, patientId };
    if (noteHeading.length != 0 && noteBody.length != 0 && patientId) {
        submitMedicalNoteForm(data);
        //reset form content
        $('#note-heading').html('');
        $('#note-body').html('');
        $(messageNotesDivId).hide();
    }
    else {
        $(messageNotesDivId).show();
        $(messageNotesDivId).html(popupMessage('Please do not leave fields empty', 'alert-warning', messageNotesDivId + '-close'));
    }
    //hide error message
    $(messageNotesDivId + '-close').on('click', () => {
        $(messageNotesDivId).hide();
    });
});
function submitMedicalNoteForm(data) {
    //submit form
    $.ajax({
        url: "/rest/doctor/add-medical-note",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                $('#note-div').hide();
                $('#note-form').trigger('reset');
                $('#message').html(message('Prescription Added Successfully', 'alert-info'));
                //refresh with updated details
                viewPatientDetails();
            }
            else {
                $('#prescription-div').show();
            }
        },
        error: () => {
            $('#message').html(message('Error retrieving patient information', 'alert-danger'));
        }
    });
}
//SECTION ****** Requests ******
//show request form
$('#btn-add-request').on('click', () => {
    //TODO show popup form
    $('#appointment-request-div').show();
});
//hide request form
$('#appointment-request-form-close').on('click', () => {
    $('#appointment-request-div').hide();
});
//submit Request form
$('#appointment-request-form-submit').on('click', () => {
    //get form data
    var patientId = getSelectedItemId('#patient-search-table-body');
    var appointmentType = $('#appointment-type').html();
    var appointmentInfo = $('#appointment-info').html();
    var data = { appointmentType, appointmentInfo, patientId };
    if (appointmentType.length != 0 && appointmentInfo.length != 0 && patientId) {
        submitAppointmentRequestForm(data);
        //reset form input divs
        $('#appointment-type').html('');
        $('#appointment-info').html('');
        $(messageRequestsDivId).hide();
    }
    else {
        $(messageRequestsDivId).show();
        $(messageRequestsDivId).html(popupMessage('Please do not leave fields empty', 'alert-warning', messageRequestsDivId + '-close'));
    }
    //hide error message
    $(messageRequestsDivId + '-close').on('click', () => {
        $(messageRequestsDivId).hide();
    });
});
function submitAppointmentRequestForm(data) {
    //submit form
    $.ajax({
        url: "/rest/doctor/add-patient-appointment-request",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                $('#appointment-request-div').hide();
                $('#appointment-request-form').trigger('reset');
                $('#message').html(message('Prescription Added Successfully', 'alert-info'));
                //refresh with updated details
                viewPatientDetails();
            }
            else {
                $('#appointment-request-div').show();
            }
        },
        error: () => {
            $('#message').html(message('Error retrieving patient information', 'alert-danger'));
        }
    });
}
/**
 * Assumes single patient is returned in data object
 * @param data
 * @returns
 */
function loadPatientPrescriptionTable(data) {
    var patient = data.patientJsons[0];
    var rows = '';
    patient.prescriptions.forEach(p => {
        var row = '<tr data-id="' + p.id + '" data-selected="false" data-userType="patient">' +
            '<td>' + p.medicationName + '</td>' +
            '</tr>';
        rows += row;
    });
    $('#patient-prescription-tbody').html(rows);
    var tableBody = document.querySelector('#patient-prescription-tbody');
    makeClickableTableRows(tableBody);
}
/**
 * Assumes single patient is returned in data object
 * @param data
 * @returns
 */
function loadPatientDoctorNotesTable(data) {
    var patient = data.patientJsons[0];
    var rows = '';
    patient.medicalNotes.forEach(note => {
        var row = '<tr data-id="' + note.id + '" ' +
            'data-selected="false" data-userType="patient">' +
            '<td>' + note.noteHeading + '</td>' +
            '</tr>';
        rows += row;
    });
    $('#patient-medical-notes-tbody').html(rows);
    var tableBody = document.querySelector('#patient-medical-notes-tbody');
    makeClickableTableRows(tableBody);
}
/**
 * Assumes single patient is returned in data object
 * @param data
 * @returns
 */
function loadPatientAppointmentRequestTable(data) {
    var patient = data.patientJsons[0];
    var rows = '';
    patient.appointmentRequests.forEach(request => {
        var row = '<tr data-id="' + request.id + '" data-selected="false" data-userType="patient">' +
            '<td>' + request.appointmentType + '</td>' +
            '</tr>';
        rows += row;
    });
    $('#appointment-request-tbody').html(rows);
    var tableBody = document.querySelector('#appointment-request-tbody');
    makeClickableTableRows(tableBody);
}
//SECTION ****** Viewing Futher Infomation Detials In Popup ******
function displayInfoPopup(popupId, html) {
    $(popupId).show();
    $(popupId).html(html);
}
$('#btn-view-prescription').on('click', () => viewPrescription());
$('#btn-view-medical-note').on('click', () => viewMedicalNote());
$('#btn-view-appointment-request').on('click', () => viewAppointmentRequest());
$('#btn-info-popup-close').on('click', () => {
    $('#btn-info-popup').hide();
});
function viewPrescription(optId) {
    //get selected prescription id
    var prescriptionId = optId ? optId : Number(getSelectedItemId('#patient-prescription-tbody'));
    //find it in list of current patient prescriptions
    var prescription = currentPatientDetails.prescriptions.filter((p) => { return p.id == prescriptionId; })[0];
    //display
    var html = '<span id="' + popupPrescriptionsId.substring(1) + '-close" class="btn-x">X</span>' +
        '<label>Medication Name:</label>' +
        '<div class="field">' + prescription.medicationName + '</div>' +
        '<label>Doctors Directions:</label>' +
        '<div class="field">' + prescription.doctorsDirections + '</div>' +
        '<div id="' + popupPrescriptionsId.substring(1) + '-edit"  class="btn btn-warning">Edit</div>' +
        '<div id="' + popupPrescriptionsId.substring(1) + '-delete" class="btn btn-danger">Delete</div>';
    displayInfoPopup(popupPrescriptionsId, html);
    //enable close button
    $(popupPrescriptionsId + '-close').on('click', () => {
        $(popupPrescriptionsId).hide();
    });
    //enable edit button
    $(popupPrescriptionsId + '-edit').on('click', () => {
        editPrescription(prescriptionId);
    });
    //enable delete button
    $(popupPrescriptionsId + '-delete').on('click', () => {
        deletePrescription(prescriptionId);
    });
}
function editPrescription(id) {
    //find it in list of current patient prescriptions
    var prescription = currentPatientDetails.prescriptions.filter((p) => { return p.id == id; })[0];
    //display
    var html = '<span id="' + popupPrescriptionsId.substring(1) + '-close" class="btn-x">X</span>' +
        '<label>Medication Name:</label>' +
        '<span id="' + popupPrescriptionsId.substring(1) + '-medication-name"' + ' contenteditable="true" class="editable">' + prescription.medicationName + '</span>' +
        '<label>Doctors Directions:</label>' +
        '<span id="' + popupPrescriptionsId.substring(1) + '-doctors-directions"' + 'contenteditable="true" class="editable">' + prescription.doctorsDirections + '</span>' +
        '<div id="' + popupPrescriptionsId.substring(1) + '-submit"  class="btn btn-warning">Submit</div>' +
        '<div id="' + popupPrescriptionsId.substring(1) + '-back" class="btn btn-danger">Back</div>';
    displayInfoPopup(popupPrescriptionsId, html);
    //enable close button
    $(popupPrescriptionsId + '-close').on('click', () => {
        $(popupPrescriptionsId).hide();
    });
    //enable submit button
    $(popupPrescriptionsId + '-submit').on('click', () => {
        submitPrescriptionEdit(id);
    });
    //enable back button
    $(popupPrescriptionsId + '-back').on('click', () => {
        viewPrescription(id);
    });
}
function submitPrescriptionEdit(id) {
    var medicationName = $(popupPrescriptionsId + '-medication-name').html();
    var doctorsDirections = $(popupPrescriptionsId + '-doctors-directions').html();
    var prescriptionId = id;
    var patientId = currentPatientId;
    var data = { medicationName, doctorsDirections, patientId, prescriptionId };
    $.ajax({
        url: "/rest/doctor/edit-patient-prescription",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                $(popupPrescriptionsId).hide();
                //clear fields
                $(popupPrescriptionsId + 'medication-name').html('');
                $(popupPrescriptionsId + 'doctor-directions').html('');
                //success message
                $(messagePrescriptionsDivId).html(popupMessage(data.message, 'alert-info', messagePrescriptionsDivId + '-close'));
                //refresh with updated details
                viewPatientDetails();
            }
            else {
                //success message
                $(messagePrescriptionsDivId).html(popupMessage(data.message, 'alert-warning', messagePrescriptionsDivId + '-close'));
            }
        },
        error: () => {
            $('#message').html(message('Error retrieving patient information', 'alert-danger'));
        }
    });
}
function deletePrescription(prescriptionId) {
    var confirmation = confirm('Are you sure you want to delete this prescription?');
    if (confirmation) {
        //send request to delete prescription
        $.ajax({
            url: "/rest/doctor/delete-prescription/" + prescriptionId,
            type: "DELETE",
            contentType: "application/json",
            dataType: "json",
            headers: { 'X-CSRF-TOKEN': csrfToken },
            success: (data) => {
                if (data.success) {
                    //hide infomation popup
                    $(popupPrescriptionsId).hide();
                    //display success message
                    $(messagePrescriptionsDivId).html(popupMessage(data.message, 'alert-info', messagePrescriptionsDivId + '-close'));
                    //refresh with updated details
                    viewPatientDetails();
                }
                else {
                    //error message
                    $(messagePrescriptionsDivId).html(popupMessage(data.message, 'alert-warning', messagePrescriptionsDivId + '-close'));
                }
            },
            error: () => {
                $(messagePrescriptionsDivId).html(popupMessage('Error retrieving patient information', 'alert-danger', messagePrescriptionsDivId + '-close'));
            }
        });
    }
}
function viewMedicalNote(optId) {
    //get selected prescription id
    var id = optId ? optId : Number(getSelectedItemId('#patient-medical-notes-tbody'));
    //find it in list of current patient prescriptions
    var note = currentPatientDetails.medicalNotes.filter((n) => { return n.id == id; })[0];
    //display
    var html = '<span id="' + popupNotesId.substring(1) + '-close" class="btn-x">X</span>' +
        '<label>Note Heading:</label>' +
        '<div class="field">' + note.noteHeading + '</div>' +
        '<label>Note Body:</label>' +
        '<div class="field">' + note.noteBody + '</div>' +
        '<div id="' + popupNotesId.substring(1) + '-edit"  class="btn btn-warning" >Edit</div>' +
        '<div id="' + popupNotesId.substring(1) + '-delete" class="btn btn-danger" >Delete</div>';
    displayInfoPopup(popupNotesId, html);
    //enable close button - must be done after elements are added to the dom
    $(popupNotesId + '-close').on('click', () => {
        $(popupNotesId).hide();
    });
    //enable edit button
    $(popupNotesId + '-edit').on('click', () => {
        editMedicalNote(id);
    });
    //enable delete button
    $(popupNotesId + '-delete').on('click', () => {
        deleteMedicalNote(id);
    });
}
function editMedicalNote(id) {
    //find it in list of current patient prescriptions
    var note = currentPatientDetails.medicalNotes.filter((n) => { return n.id == id; })[0];
    //display
    var html = '<span id="' + popupNotesId.substring(1) + '-close" class="btn-x">X</span>' +
        '<label>Note Heading:</label>' +
        '<div id="' + popupNotesId.substring(1) + '-heading" contenteditable="true" class="editable">' + note.noteHeading + '</div>' +
        '<label>Note Body:</label>' +
        '<div id="' + popupNotesId.substring(1) + '-body" contenteditable="true" class="editable">' + note.noteBody + '</div>' +
        '<div id="' + popupNotesId.substring(1) + '-submit" class="btn btn-warning">Submit</div>' +
        '<div id="' + popupNotesId.substring(1) + '-back" class="btn btn-danger">=Back</div>';
    displayInfoPopup(popupNotesId, html);
    //enable close button - must be done after elements are added to the dom
    $(popupNotesId + '-close').on('click', () => {
        $(popupNotesId).hide();
    });
    //enable submit button
    $(popupNotesId + '-submit').on('click', () => {
        submitMedicalNoteEdit(id);
    });
    //enable delete button
    $(popupNotesId + '-back').on('click', () => {
        viewMedicalNote(id);
    });
}
function submitMedicalNoteEdit(medicalNoteId) {
    var noteHeading = $(popupNotesId + '-heading').html();
    var noteBody = $(popupNotesId + '-body').html();
    var patientId = currentPatientId;
    var id = medicalNoteId;
    var data = { noteHeading, noteBody, patientId, id };
    //field and message id bases
    var popupId = popupNotesId;
    var messageId = messageNotesDivId;
    //ajax
    $.ajax({
        url: "/rest/doctor/edit-medical-note",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                //hide display popup
                $(popupId).hide();
                //clear fields
                $(popupId + '-heading').html('');
                $(popupId + '-body').html('');
                //display success message
                $(messageId).html(popupMessage(data.message, 'alert-info', messageId + '-close'));
                //refresh with updated details
                viewPatientDetails();
            }
            else {
                //display warning message
                $(messageId).html(popupMessage(data.message, 'alert-warning', messageId + '-close'));
            }
        },
        error: () => {
            $(messageId).html(message('Error retrieving patient information', 'alert-danger'));
        }
    });
}
function deleteMedicalNote(medicalNoteId) {
    var confirmation = confirm('Are you sure you want to delete this medical note?');
    if (confirmation) {
        //field and message id bases
        var popupId = popupNotesId;
        var messageId = messageNotesDivId;
        var closeBtnId = messageId + '-close';
        //send request to delete prescription
        $.ajax({
            url: "/rest/doctor/delete-medical-note/" + medicalNoteId,
            type: "DELETE",
            contentType: "application/json",
            dataType: "json",
            headers: { 'X-CSRF-TOKEN': csrfToken },
            success: (data) => {
                if (data.success) {
                    //hide infomation popup
                    $(popupId).hide();
                    //display success message
                    $(messageId).html(popupMessage(data.message, 'alert-info', closeBtnId));
                    //refresh with updated details
                    viewPatientDetails();
                }
                else {
                    //error message
                    $(messageId).html(popupMessage(data.message, 'alert-warning', closeBtnId));
                }
            },
            error: () => {
                $(messageId).html(popupMessage('Error retrieving patient information', 'alert-danger', messageId + '-close'));
            }
        });
    }
}
function viewAppointmentRequest(optId) {
    //get selected prescription id
    var id = optId ? optId : Number(getSelectedItemId('#appointment-request-tbody'));
    //find it in list of current patient prescriptions
    var request = currentPatientDetails.appointmentRequests.filter((r) => { return r.id == id; })[0];
    //display
    var html = '<div id="' + popupRequestsId.substring(1) + '-close" class="btn-x">X</div>' +
        '<label>Appointment Type:</label>' +
        '<div class="field">' + request.appointmentType + '</div>' +
        '<label>Appointment Info:</label>' +
        '<div class="field">' + request.appointmentInfo + '</div>' +
        '<div id="' + popupRequestsId.substring(1) + '-edit"  class="btn btn-warning" onclick="editAppointmentRequest(' + id + ')">Edit</div>' +
        '<div id="' + popupRequestsId.substring(1) + '-delete" class="btn btn-danger" onclick="deleteAppointmentRequest(' + id + ')">Delete</div>';
    //display Info Popup
    displayInfoPopup(popupRequestsId, html);
    //enable close button
    $(popupRequestsId + '-close').on('click', () => {
        $(popupRequestsId).hide();
    });
    //enable edit button
    $(popupRequestsId + '-edit').on('click', () => {
        editAppointmentRequest(id);
    });
    //enable delete button
    $(popupRequestsId + '-delete').on('click', () => {
        deleteAppointmentRequest(id);
    });
}
function editAppointmentRequest(id) {
    //find it in list of current patient prescriptions
    var request = currentPatientDetails.appointmentRequests.filter((r) => { return r.id == id; })[0];
    //display
    var html = '<div id="' + popupRequestsId.substring(1) + '-close" class="btn-x">X</div>' +
        '<label>Appointment Type:</label>' +
        '<div id="' + popupRequestsId.substring(1) + '-type"contenteditable="true" class="editable">' + request.appointmentType + '</div>' +
        '<label>Appointment Info:</label>' +
        '<div id="' + popupRequestsId.substring(1) + '-info" contenteditable="true" class="editable">' + request.appointmentInfo + '</div>' +
        '<div id="' + popupRequestsId.substring(1) + '-submit"  class="btn btn-warning">Submit</div>' +
        '<div id="' + popupRequestsId.substring(1) + '-back" class="btn btn-danger">Back</div>';
    //display Info Popup
    displayInfoPopup(popupRequestsId, html);
    //enable close button
    $(popupRequestsId + '-close').on('click', () => {
        $(popupRequestsId).hide();
    });
    //enable submit button
    $(popupRequestsId + '-submit').on('click', () => {
        submitAppointmentRequestEdit(id);
    });
    //enable delete button
    $(popupRequestsId + '-back').on('click', () => {
        viewAppointmentRequest(id);
    });
}
function submitAppointmentRequestEdit(requestId) {
    var appointmentType = $(popupRequestsId + '-type').html();
    var appointmentInfo = $(popupRequestsId + '-info').html();
    var patientId = currentPatientId;
    var data = { appointmentType, appointmentInfo, patientId, requestId };
    //field and message id bases
    var popupId = popupRequestsId;
    var messageId = messageRequestsDivId;
    //ajax
    $.ajax({
        url: "/rest/doctor/edit-appointment-request",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                //hide display popup
                $(popupId).hide();
                //clear fields
                $(popupId + '-heading').html('');
                $(popupId + '-body').html('');
                //display success message
                $(messageId).html(popupMessage(data.message, 'alert-info', messageId + '-close'));
                //refresh with updated details
                viewPatientDetails();
            }
            else {
                //display warning message
                $(messageId).html(popupMessage(data.message, 'alert-warning', messageId + '-close'));
            }
        },
        error: () => {
            $(messageId).html(message('Error retrieving patient information', 'alert-danger'));
        }
    });
}
function deleteAppointmentRequest(requestId) {
    var confirmation = confirm('Are you sure you want to delete this medical note?');
    if (confirmation) {
        //field and message id bases
        var popupId = popupRequestsId;
        var messageId = messageRequestsDivId;
        var closeBtnId = messageId + '-close';
        //send request to delete prescription
        $.ajax({
            url: "/rest/doctor/delete-appointment-request/" + requestId,
            type: "DELETE",
            contentType: "application/json",
            dataType: "json",
            headers: { 'X-CSRF-TOKEN': csrfToken },
            success: (data) => {
                if (data.success) {
                    //hide infomation popup
                    $(popupId).hide();
                    //display success message
                    $(messageId).html(popupMessage(data.message, 'alert-info', closeBtnId));
                    //refresh with updated details
                    viewPatientDetails();
                }
                else {
                    //error message
                    $(messageId).html(popupMessage(data.message, 'alert-warning', closeBtnId));
                }
            },
            error: () => {
                $(messageId).html(popupMessage('Error retrieving patient information', 'alert-danger', messageId + '-close'));
            }
        });
    }
}
