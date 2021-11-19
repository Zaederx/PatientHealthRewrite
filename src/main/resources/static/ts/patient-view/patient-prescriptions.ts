import { popupMessage } from "../doctor-view/doctor-view-patient-details.js"

var csrfToken = $("meta[name='_csrf']").attr("content")

//fetch prescriptions
window.onload = () => fetchPrescriptions()
/**
 * Fetches prescriptions from server
 * and fills these into prescription table body
 */
function fetchPrescriptions() {
    $.ajax({
        url: '/rest/patient/get-prescriptions',
        type: "GET",
        dataType:"json",//recieved from server
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleFetchPrescriptionSuccess(data),
        error: () => $(messageDivId).html(popupMessage('Error fetching prescriptions', 'alert-warning', closeBtnId)) 
    })
}

//handle data on successful submission of Patient Appointment Request
const messageDivId = '#message'
const closeBtnId = '#btn-message-close'
const prescriptionsTBodyId = '#patient-prescriptions-tbody'
function handleFetchPrescriptionSuccess(data:PrescriptionResponseList) {
    if(data.success) {
        //fill prescriptions into table
        var html = prescriptionsToHTML(data.prescriptions)
        $(prescriptionsTBodyId).html(html)
    }
    else {
        //display error message
        $(messageDivId).html(popupMessage(data.message, 'alert-warning', closeBtnId))
    }
}



/**
 * Returns list of prescriptions as string
 * html table rows with prescription information
 * @param prescriptions list of prescriptions
 * @returns 
 */
function prescriptionsToHTML(prescriptions:Prescription[]):string {
    var html = ''
    prescriptions.forEach( p => {
        html += '<tr data-id="'+p.id+'" data-selected="false">'+
                    '<td>'+ p.medicationName + '</td>' +
                    '<td>'+ p.doctorsDirections + '</td>' +
                '</tr>'
    })
    return html
}