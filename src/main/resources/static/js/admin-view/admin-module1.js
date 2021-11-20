/**
 * *** NOTE: use with admin 'search-users' view - TABLE 1***
 * Data to rows
 * @param data - AJAX response DoctorResponseList
 * @returns
 */
export function doctorDataToRows(data) {
    var rows = '';
    data.doctorJsons.forEach(d => {
        var cell = '<tr data-id="' + d.id + '" data-selected="false" data-userType="doctor">' +
            '<td>' + d.name + '</td>' +
            '<td>' + d.username + '</td>' +
            '<td>' + d.specialisation + '</td>' +
            '<td>' + d.email + '</td>' +
            '</tr>';
        rows += cell;
    });
    return rows;
}
const light_blue = '#86f9d6';
const light_red = '#fad6bb';
export const yellow = '#fdfc8a';
export const plain = '';
/**
 * Selects a table row
 * @param tableBody
 * @param row
 * @param csrfToken
 */
export function selectRow(tableBody, row, csrfToken) {
    console.log('row selected');
    var selected = row.getAttribute('data-selected');
    var id = row.getAttribute('data-id');
    if (selected == 'false') {
        //get previously selected row if there is one
        var previouslySelected = tableBody.querySelector('tr[data-selected=true]');
        //if there is a previously selcted row - unselect this row
        if (previouslySelected) {
            highlightRow(previouslySelected, plain);
            previouslySelected.setAttribute('data-selected', 'false');
        }
        //highlight newly selected row
        highlightRow(row, yellow);
        //set newlyselected row attribute 'data-selected' to true
        row.setAttribute('data-selected', 'true');
        if (csrfToken) {
            displayDoctorsPatientDetails(id, csrfToken);
        }
    }
}
/**
 * Makes rows of a table selectable/clickable.
 * @param tableBody
 * @param select
 * @param csrfToken
 */
export function makeClickableTableRows(tableBody, select = selectRow, csrfToken) {
    var rows = tableBody?.querySelectorAll('tr');
    rows.forEach(row => {
        row.addEventListener('click', () => {
            //doctor user csrfToken
            if (csrfToken) {
                select(tableBody, row, csrfToken);
            }
            //if not doctor using csrfToken
            else {
                select(tableBody, row);
            }
        });
    });
}
export function highlightRow(row, colour) {
    console.log('highlighting row');
    row.style.backgroundColor = colour;
}
export function displayDoctorsPatientDetails(doctorId, csrfToken) {
    $.ajax({
        url: "/rest/doctor/get-patients/" + doctorId,
        type: "GET",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                //get doctor's patient's data
                var rows = patientDataToRows(data);
                $('#current-patient-table-body').html(rows);
                //make doctor's patients table rows clickable
                var tableBody = document.querySelector('#current-patient-table-body');
                makeClickableTableRows(tableBody, selectRow);
            }
            else {
                var errorMsg = '<tr colspan="4">' + 'NO PATIENTS TO DISPLAY' + '</tr>';
                $('#current-patient-table-body').html(errorMsg);
            }
        }
    });
}
export function searchForDoctor(name, pageNum, csrfToken) {
    $('#pageNum').html(String(pageNum));
    console.log("pageNum set to :", pageNum);
    $.ajax({
        url: "/rest/doctor/get-doctor/name/" + name + '/' + pageNum,
        type: "GET",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                //fetch results from json response
                var doctorRows = doctorDataToRows(data);
                //display results
                $('#doctor-search-table-body').html(doctorRows);
                //setTotalPages
                $('#pageTotal').html("of " + data.totalPages);
                //make table rows clickable
                var tableBody = document.querySelector('#doctor-search-table-body');
                makeClickableTableRows(tableBody, selectRow, csrfToken);
            }
            else {
                //display error message
                var cell = '<td colspan="4">' + 'NO RESULTS TO DISPLAY' + '</td>';
                $('#doctor-search-table-body').html(cell);
            }
        },
        error: () => {
            var cell = '<td colspan="4">' + 'ERROR FETCHING RESULTS' + '</td>';
            $('#doctor-search-table-body').html(cell);
        }
    });
}
// SECTION - Patient's Searchbar
export function searchForPatient(name, pageNum, csrfToken) {
    $('#p-pageNum').html(String(pageNum));
    console.log("p-pageNum set to :", pageNum);
    $.ajax({
        url: "/rest/patient/get-patient/name/" + name + '/' + pageNum,
        type: "GET",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                //fetch results from json response
                var patientRows = patientDataToRows(data);
                //display results
                $('#patient-search-table-body').html(patientRows);
                //setTotalPages
                $('#p-pageTotal').html("of " + data.totalPages);
                //make table rows clickable
                var tableBody = document.querySelector('#patient-search-table-body');
                makeClickableTableRows(tableBody, selectRow);
            }
            else {
                //display error message
                var cell = '<td colspan="4">' + 'NO RESULTS TO DISPLAY' + '</td>';
                $('#patient-search-table-body').html(cell);
            }
        },
        error: () => {
            var cell = '<td colspan="4">' + 'ERROR FETCHING RESULTS' + '</td>';
            $('#patient-search-table-body').html(cell);
        }
    });
}
export function patientDataToRows(data) {
    var rows = '';
    data.patientJsons.forEach(p => {
        var cell = '<tr data-id="' + p.id + '" data-selected="false" data-userType="patient">' +
            '<td>' + p.name + '</td>' +
            '<td>' + p.username + '</td>' +
            '<td>' + p.DOB + '</td>' +
            '<td>' + p.email + '</td>' +
            '</tr>';
        rows += cell;
    });
    return rows;
}
var patientSearchTable = document.querySelector('#patient-search-table-body');
export async function addPatientToDoctor(pId, docId, csrfToken) {
    var data = { pId, docId };
    return $.ajax({
        url: "/rest/doctor/add-patient",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                $('#message').html('<div class="alert alert-info">Patient Added Successfully.</div>');
            }
            else {
                $('#message').html('<div class="alert alert-warning">' + data.message + '</div>');
            }
        },
        error: () => {
            $('#message').html('<div class="alert alert-danger">Error adding patient to doctor</div>');
        }
    });
}
export function removePatientFromDoctor(pId, docId, csrfToken) {
    var data = { pId, docId };
    return $.ajax({
        url: "/rest/doctor/remove-patient",
        type: "DELETE",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                $('#message').html('<div class="alert alert-info">' + data.message + '</div>');
            }
            else {
                $('#message').html('<div class="alert alert-warning">' + data.message + '</div>');
            }
        },
        error: () => {
            $('#message').html('<div class="alert alert-danger">Error removing patient from doctor</div>');
        }
    });
}
