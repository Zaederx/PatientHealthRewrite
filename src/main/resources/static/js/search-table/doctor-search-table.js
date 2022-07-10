import { makeClickableTableRows, selectRow } from "../admin-view/admin-module1.js";
import { doctorsToRowsDetailed, Table } from "../admin-view/admin-module2.js";
import { popupMessage } from "../doctor-view/doctor-view-patient-details.js";
var csrfToken = $("meta[name='_csrf']").attr("content"); //needed for post requests
//SECTION doctor-searchbar
$('#doctor-searchbar').on('input', () => {
    //if no page number given - it uses current page number
    var name = $('#doctor-searchbar').val();
    searchForDoctor({ name: name, pageNum: doctorTableCurrentPageNum, csrfToken: csrfToken });
});
/**the current page number */
var doctorTableCurrentPageNum = 1;
var doctorTablePagePrev = 0;
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
$('#btn-doctor-table-prev').on('click', () => {
    var name = $('#doctor-searchbar').val();
    //ajax request for doctors - on previous page of results
    searchForDoctor({ name: name, pageNum: doctorTablePagePrev, csrfToken: csrfToken });
    //set current page to previous page & update prev and next page numbers
    setPageNumVars(doctorTablePagePrev);
});
$('#btn-doctor-table-next').on('click', () => {
    var name = $('#doctor-searchbar').val();
    //ajax request for doctors - on previous page of results
    searchForDoctor({ name: name, pageNum: doctorTablePageNext, csrfToken: csrfToken });
    //set current page to next page & update prev and next page numbers
    setPageNumVars(doctorTablePageNext);
});
$('#btn-doctor-table-go').on('click', () => {
    var name = $('#doctor-searchbar').val();
    var pageNum = Number($('#doctor-table-pageNum').html());
    //ajax request for doctors - on previous page of results
    searchForDoctor({ name: name, pageNum: pageNum, csrfToken: csrfToken });
    //set current page to the entered page number & update prev and next page numbers
    setPageNumVars(pageNum);
});
export function searchForDoctor(obj) {
    console.log("searchForPatient called");
    $('#doctor-table-pageNum').html(String(obj.pageNum));
    console.log("pageNum set to:", obj.pageNum);
    if (obj.successFunc == undefined) {
        obj.successFunc = doctorSearchSuccessFunc;
    }
    if (obj.errorFunc == undefined) {
        obj.errorFunc = handleDoctorSearchError;
    }
    if (obj.tableIdRoot == undefined) {
        obj.tableIdRoot = '#doctor-search-';
    }
    $.ajax({
        url: "/rest/doctor/get-doctor/name/" + obj.name + '/' + obj.pageNum,
        type: "GET",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        //@ts-ignore
        success: (data) => obj.successFunc(data, obj.tableIdRoot),
        //@ts-ignore
        error: () => obj.errorFunc()
    });
}
function doctorSearchSuccessFunc(data, tableIdRoot) {
    if (data.success) {
        var t1 = doctorsToRowsDetailed(data);
        t1.idRoot = tableIdRoot;
        console.warn('tableBodyId', t1.getTbodyId());
        //display doctor name and username
        $(t1.getTbodyId()).html(t1.tbody);
        var tableBody = document.querySelector(t1.getTbodyId());
        makeClickableTableRows(tableBody, selectRow);
    }
    else {
        var t1 = new Table();
        t1.idRoot = tableIdRoot;
        $(t1.getTbodyId()).html('<td colspan="4">NO RESULTS</td>');
        $(doctorErrorPopup).html(popupMessage(data.message, 'alert-danger', doctorErrorCloseBtnId));
    }
}
var doctorErrorPopup = '#doctor-error';
var doctorErrorCloseBtnId = '#btn-doctor-error-close';
function handleDoctorSearchError() {
    $(doctorErrorPopup).html(popupMessage('Error retrieving doctor information', 'alert-danger', doctorErrorCloseBtnId));
}
$();
