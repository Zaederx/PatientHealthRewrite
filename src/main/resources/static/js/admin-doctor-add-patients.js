import { addPatientToDoctor, displayDoctorsPatientDetails, searchForDoctor, searchForPatient, removePatientFromDoctor } from "./admin-module1.js";
var csrfToken = $("meta[name='_csrf']").attr("content"); //needed for post requests
//SECTION doctor-searchbar
$('#doctor-searchbar').on('input', function () {
    //if no page number given - it uses current page number
    var name = $('#doctor-searchbar').val();
    searchForDoctor(name, doctorTableCurrentPageNum, csrfToken);
});
/**the current page number */
var doctorTableCurrentPageNum = 1;
var doctorTablePagePrev = 1;
var doctorTablePageNext = 2;
function setPageNumVars(currentPageNum) {
    doctorTableCurrentPageNum = currentPageNum;
    doctorTablePagePrev = doctorTableCurrentPageNum - 1;
    doctorTablePageNext = doctorTableCurrentPageNum + 1;
}
function getSelectedDoctorId() {
    var tableBody = document.querySelector('#doctor-search-table-body');
    var currentlySelected = tableBody.querySelector('tr[data-selected=true]');
    var docId = currentlySelected.getAttribute('data-id');
    return docId;
}
$('#btn-prev').on('click', function () {
    var name = $('#doctor-searchbar').val();
    //ajax request for doctors - on previous page of results
    searchForDoctor(name, doctorTablePagePrev, csrfToken);
    //set current page to previous page & update prev and next page numbers
    setPageNumVars(doctorTablePagePrev);
});
$('#btn-next').on('click', function () {
    var name = $('#doctor-searchbar').val();
    //ajax request for doctors - on previous page of results
    searchForDoctor(name, doctorTablePageNext, csrfToken);
    //set current page to next page & update prev and next page numbers
    setPageNumVars(doctorTablePageNext);
});
$('#btn-go').on('click', function () {
    var name = $('#doctor-searchbar').val();
    var pageNum = Number($('#pageNum').html());
    //ajax request for doctors - on previous page of results
    searchForDoctor(name, pageNum, csrfToken);
    //set current page to the entered page number & update prev and next page numbers
    setPageNumVars(pageNum);
});
function getSelectedPatientId() {
    var tableBody = document.querySelector('#patient-search-table-body');
    var currentlySelected = tableBody.querySelector('tr[data-selected=true]');
    var pId = currentlySelected.getAttribute('data-id');
    return pId;
}
function getSelectedRemovePatientId() {
    var tableBody = document.querySelector('#current-patient-table-body');
    var currentlySelected = tableBody.querySelector('tr[data-selected=true]');
    var pId = currentlySelected.getAttribute('data-id');
    return pId;
}
$('#patient-searchbar').on('input', function () {
    var name = $("#patient-searchbar").val();
    //ajax request for patients - on current page number
    searchForPatient(name, patientTableCurrentPageNum, csrfToken);
});
$('#p-btn-prev').on('click', function () {
    var name = $('#patient-searchbar').val();
    searchForPatient(name, patientTablePagePrev, csrfToken);
    //set current page to previous page & update prev and next page numbers
    setPatientPageNumVars(patientTablePagePrev);
});
$('#p-btn-next').on('click', function () {
    var name = $('#patient-searchbar').val();
    searchForPatient(name, patientTablePageNext, csrfToken);
    //set current page to next page & update prev and next page numbers
    setPatientPageNumVars(patientTablePageNext);
});
$('#p-btn-go').on('click', function () {
    var name = $('#patient-searchbar').val();
    var pageNum = Number($('#p-pageNum').html());
    searchForPatient(name, pageNum, csrfToken);
    //set current page to entered page number & update prev and next page numbers
    setPatientPageNumVars(pageNum);
});
/**the current page number */
var patientTableCurrentPageNum = 1;
var patientTablePagePrev = 1;
var patientTablePageNext = 2;
function setPatientPageNumVars(currentPageNum) {
    patientTableCurrentPageNum = currentPageNum;
    patientTablePagePrev = patientTableCurrentPageNum - 1;
    patientTablePageNext = patientTableCurrentPageNum + 1;
}
$('#btn-add-selected-patient').on('click', function () {
    var docId = getSelectedDoctorId();
    var pId = getSelectedPatientId();
    clickAddPatient(pId, docId, csrfToken);
});
function clickAddPatient(pId, docId, csrfToken) {
    //send request to add patient to doctor's patients list
    addPatientToDoctor(pId, docId, csrfToken).then(
    //send request to fetch updated doctor's patients list
    function () { return displayDoctorsPatientDetails(docId, csrfToken); });
}
$('#btn-remove-selected-patient').on('click', function () {
    var pId = getSelectedRemovePatientId();
    var docId = getSelectedDoctorId();
    clickRemovePatient(pId, docId);
});
function clickRemovePatient(pId, docId) {
    //send ajax request to remove patient from doctor
    removePatientFromDoctor(pId, docId, csrfToken).then(
    //send request to fetch updated doctor's patients list
    function () { return displayDoctorsPatientDetails(docId, csrfToken); });
}
