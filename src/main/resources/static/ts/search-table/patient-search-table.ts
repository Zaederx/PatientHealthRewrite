import { makeClickableTableRows, selectRow } from "../admin-view/admin-module1.js";
import { message, patientsToRows, Table } from "../admin-view/admin-module2.js";
import { popupMessage } from "../doctor-view/doctor-view-patient-details.js";

var csrfToken = $("meta[name='_csrf']").attr("content") as string

//SECTION ****** PatientSearchTable ******
$('#patient-searchbar').on('input', () => {
    var name = $('#patient-searchbar').val() as string;
    var pageNum = $('#p-pageNum').val() as number
    if(!pageNum) {pageNum = 1}
    searchForPatient({name:name,pageNum:pageNum,csrfToken:csrfToken})
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

$('#btn-patient-table-prev').on('click', () => {
    var name = $('#patient-searchbar').val() as string;
    //ajax request for doctors - on previous page of results
    searchForPatient({name:name,pageNum:patientTablePagePrev,csrfToken:csrfToken})
    //set current page to previous page & update prev and next page numbers
    setPageNumVars(patientTablePagePrev as number)
})
$('#btn-patient-table-next').on('click', () => {
    var name = $('#patient-searchbar').val() as string;
    //ajax request for doctors - on previous page of results
    searchForPatient({name:name,pageNum:patientTablePageNext,csrfToken:csrfToken})
    //set current page to next page & update prev and next page numbers
    setPageNumVars(patientTablePageNext as number)
})
$('#btn-patient-table-go').on('click', () => {
    var name = $('#patient-searchbar').val() as string;
    var pageNum = Number($('#p-pageNum').html() as string)
    //ajax request for doctors - on previous page of results
    searchForPatient({name:name,pageNum:pageNum,csrfToken:csrfToken})
    //set current page to the entered page number & update prev and next page numbers
    setPageNumVars(pageNum as number)
})


export function searchForPatient( obj :{name:string, pageNum:number, csrfToken:string, tableIdRoot?:string, successFunc?:Function, errorFunc?:Function}) {
    console.log("searchForPatient called")
    $('#p-pageNum').html(String(obj.pageNum));
    console.log("pageNum set to:",obj.pageNum)
    if (obj.successFunc == undefined) {
        obj.successFunc = patientSearchSuccessFunc
    }
    if(obj.errorFunc == undefined) {
        obj.errorFunc = handlePatientSearchError
    }
    if(obj.tableIdRoot == undefined) {
        obj.tableIdRoot = '#patient-search-'
    }
    $.ajax({
        url: "/rest/patient/get-patient/name/"+obj.name+'/'+obj.pageNum,
        type: "GET",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        //@ts-ignore
        success: (data) => obj.successFunc(data,obj.tableIdRoot),
        //@ts-ignore
        error: () => obj.errorFunc()
    })
}

function patientSearchSuccessFunc(data:PatientResponseList, tableIdRoot:string) {
    if(data.success) {
        var t1:Table = patientsToRows(data)
        t1.idRoot = tableIdRoot
        console.warn('tableBodyId',t1.getTbodyId())
        //display doctor name and username
        $(t1.getTbodyId()).html(t1.tbody)
        var tableBody = document.querySelector(t1.getTbodyId()) as HTMLTableElement
        makeClickableTableRows(tableBody,selectRow)
    }
    else {
        var t1:Table = new Table()
        t1.idRoot = tableIdRoot
        $(t1.getTbodyId()).html('<td colspan="2">NO RESULTS</td>')
        $('#message').html(message(data.message,'alert-warning'))
    }
}
var patientErrorPopup = '#patient-error'
var patientErrorCloseBtnId = '#btn-patient-error-close'
function handlePatientSearchError() {
    $(patientErrorPopup).html(popupMessage('Error retrieving patient information','alert-danger', patientErrorCloseBtnId ))
}