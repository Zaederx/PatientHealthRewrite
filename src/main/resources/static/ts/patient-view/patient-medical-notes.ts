import { makeClickableTableRows } from "../admin-view/admin-module1.js"
import { getSelectedItemId } from "../admin-view/admin-search-users.js"
import { popupMessage } from "../doctor-view/doctor-view-patient-details.js"

var csrfToken = $("meta[name='_csrf']").attr("content")
const messageDivId = '#message'
const closeBtnId = '#btn-message-close'

//fetch patient medical notes
window.onload = () => fetchMedicalNotes()
function fetchMedicalNotes() {
    $.ajax({
        url: '/rest/patient/get-medical-notes',
        type: "GET",
        dataType:"json",//recieved from server
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) => handleFetchMedicalNotesSuccess(data),
        error: () => {
            $(messageDivId).html(popupMessage('Error fetching medical notes', 'alert-warning', closeBtnId)) 
            //enable close button
            $(closeBtnId).on('click', () => {
                $(messageDivId).hide()
            })}
    })
}



const noteTBodyId = '#medical-notes-tbody'
var medicalNotes:MedicalNote[]
/**
 * 
 * @param data handles ajax success for fetching medical notes
 */
function handleFetchMedicalNotesSuccess(data:MedicalNoteResponseList) {
    if(data.success) {
        $(messageDivId).html(popupMessage('Request submitted successfully', 'alert-info', closeBtnId))
        //reload appointment request table
        var html = noteToHTML(data.medicalNotes)
        $(noteTBodyId).html(html)

        var tableBody = document.querySelector(noteTBodyId) as HTMLTableElement
        makeClickableTableRows(tableBody)
        //store note in variable
        medicalNotes = data.medicalNotes
    }
    else {
        $(messageDivId).html(popupMessage(data.message, 'alert-warning', closeBtnId))
    }
}

/**
 * Returns medical notes as HTML string
 * @param medicalNotes medical note to be converted to HTML
 * @returns 
 */
function noteToHTML(medicalNotes:MedicalNote[]) {
    var html = ''
    medicalNotes.forEach( n => {
        html += '<tr data-id="'+n.id+'" data-selected="false">'+
                    '<td>'+ n.noteHeading + '</td>' +
                '</tr>'
    })
    return html
}

//enables 'view medical note' button
const viewNoteBtnId = '#btn-view-note'
$(viewNoteBtnId).on('click', () => {
    var noteId = Number(getSelectedItemId(noteTBodyId))
    var note = medicalNotes.filter(n => n.id == noteId)[0]
    viewMedicalNote(note)
})

const headingId = '#medical-note-heading'
const bodyId = '#medical-note-body'
/**
 * Displays medical note on html page
 * @param note note to be displayed
 */
function viewMedicalNote(note:MedicalNote) {
    $(headingId).html(note.noteHeading)
    $(bodyId).html(note.noteBody)
}