import { searchForPatient } from "../admin-view/admin-module2";

var csrfToken = $("meta[name='_csrf']").attr("content") as string

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