import { addPatientToDoctor, displayDoctorsPatientDetails, searchForDoctor, searchForPatient, removePatientFromDoctor } from "./admin-module1.js";

var csrfToken = $("meta[name='_csrf']").attr("content") as string//needed for post requests
//SECTION doctor-searchbar
$('#doctor-searchbar').on('input', ()=> {
    //if no page number given - it uses current page number
    var name = $('#doctor-searchbar').val() as string;
    searchForDoctor(name,doctorTableCurrentPageNum,csrfToken)
})

/**the current page number */
var doctorTableCurrentPageNum = 1
var doctorTablePagePrev = 1
var doctorTablePageNext = 2

function setPageNumVars(currentPageNum:number) {
    doctorTableCurrentPageNum = currentPageNum;
    doctorTablePagePrev = doctorTableCurrentPageNum - 1;
    doctorTablePageNext = doctorTableCurrentPageNum + 1;
}
function getSelectedDoctorId() {
    var tableBody = document.querySelector('#doctor-search-table-body') as HTMLTableElement
    var currentlySelected = tableBody.querySelector('tr[data-selected=true]') as HTMLTableRowElement
    var docId = currentlySelected.getAttribute('data-docId') as string
    return docId
}
$('#btn-prev').on('click', () => {
    var name = $('#doctor-searchbar').val() as string;
    //ajax request for doctors - on previous page of results
    searchForDoctor(name,doctorTablePagePrev,csrfToken)
    //set current page to previous page & update prev and next page numbers
    setPageNumVars(doctorTablePagePrev as number)
})
$('#btn-next').on('click', () => {
    var name = $('#doctor-searchbar').val() as string;
    //ajax request for doctors - on previous page of results
    searchForDoctor(name,doctorTablePageNext,csrfToken)
    //set current page to next page & update prev and next page numbers
    setPageNumVars(doctorTablePageNext as number)
})
$('#btn-go').on('click', () => {
    var name = $('#doctor-searchbar').val() as string;
    var pageNum = Number($('#pageNum').html() as string)
    //ajax request for doctors - on previous page of results
    searchForDoctor(name,pageNum,csrfToken)
    //set current page to the entered page number & update prev and next page numbers
    setPageNumVars(pageNum as number)
})

function getSelectedPatientId() {
    var tableBody = document.querySelector('#patient-search-table-body') as HTMLTableElement
    var currentlySelected = tableBody.querySelector('tr[data-selected=true]') as HTMLTableRowElement
    var pId = currentlySelected.getAttribute('data-pId') as string
    return pId
}

function getSelectedRemovePatientId() {
    var tableBody = document.querySelector('#current-patient-table-body') as HTMLTableElement
    var currentlySelected = tableBody.querySelector('tr[data-selected=true]') as HTMLTableRowElement
    var pId = currentlySelected.getAttribute('data-pId') as string
    return pId
}

$('#patient-searchbar').on('input', ()=> {
    var name = $("#patient-searchbar").val() as string
    //ajax request for patients - on current page number
    searchForPatient(name,patientTableCurrentPageNum,csrfToken)
})

$('#p-btn-prev').on('click', () => {
    var name = $('#patient-searchbar').val() as string;
    searchForPatient(name,patientTablePagePrev,csrfToken)
    //set current page to previous page & update prev and next page numbers
    setPatientPageNumVars(patientTablePagePrev as number)
})
$('#p-btn-next').on('click', () => {
    var name = $('#patient-searchbar').val() as string;
    searchForPatient(name,patientTablePageNext,csrfToken)
    //set current page to next page & update prev and next page numbers
    setPatientPageNumVars(patientTablePageNext as number)
})
$('#p-btn-go').on('click', () => {
    var name = $('#patient-searchbar').val() as string;
    var pageNum = Number($('#p-pageNum').html() as string)

    searchForPatient(name,pageNum,csrfToken)
    //set current page to entered page number & update prev and next page numbers
    setPatientPageNumVars(pageNum as number)
})

/**the current page number */
var patientTableCurrentPageNum = 1
var patientTablePagePrev = 1
var patientTablePageNext = 2

function setPatientPageNumVars(currentPageNum:number) {
    patientTableCurrentPageNum = currentPageNum;
    patientTablePagePrev = patientTableCurrentPageNum - 1;
    patientTablePageNext = patientTableCurrentPageNum + 1;
}

$('#btn-add-selected-patient').on('click', ()=> {
    var docId = getSelectedDoctorId()
    var pId = getSelectedPatientId()
    clickAddPatient(pId,docId,csrfToken)
})

function clickAddPatient(pId:string,docId:string,csrfToken:string) {
    //send request to add patient to doctor's patients list
    addPatientToDoctor(pId,docId,csrfToken).then(
        //send request to fetch updated doctor's patients list
        () => displayDoctorsPatientDetails(docId,csrfToken)
    )
}

$('#btn-remove-selected-patient').on('click', ()=> {
    var pId = getSelectedRemovePatientId();
    var docId = getSelectedDoctorId();
    clickRemovePatient(pId,docId)
})

function clickRemovePatient(pId:string,docId:string) {
    //send ajax request to remove patient from doctor
    removePatientFromDoctor(pId,docId,csrfToken).then(
        //send request to fetch updated doctor's patients list
        () => displayDoctorsPatientDetails(docId,csrfToken)
    )

}

