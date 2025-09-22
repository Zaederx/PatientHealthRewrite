import { highlightRow, makeClickableTableRows, plain, selectRow, yellow } from "./admin-module1.js";
/**
 * Represents an html table's id and body content.
 * This class assumes the table follows the follow naming convention:
 * ```
 * //all table elements should have the same root i.e.
 * idRoot = '#user-select-'
 * //and should end with the element name
 * tableId = '#user-select-table'
 * tableHeadId = '#user-select-thead'
 * tableBodyId = '#user-select-tbody'
 * ```
 */
export class Table {
    constructor(idRoot, thead, tbody) {
        this.idRoot = idRoot ? idRoot : "";
        this.thead = thead ? thead : "";
        this.tbody = tbody ? tbody : "";
    }
    getTableId() {
        return this.idRoot + 'table';
    }
    getTheadId() {
        return this.idRoot + 'thead';
    }
    getTbodyId() {
        return this.idRoot + 'tbody';
    }
}
/**
 * Object to help map user information to the correct tables.
 *
 * i.e. There are three tables in admin-search-users.html view
 * and this object helps to match information to the right table
 * whether that be table 1, 2 or 3
 */
export class TableData {
    constructor(table1, table2, table3) {
        //set table 1
        this.table1 = table1 ? table1 : new Table();
        this.table1.idRoot = '#user-select-';
        //set table 2
        this.table2 = table2 ? table2 : new Table();
        this.table2.idRoot = '#user-info-';
        //set table 3
        this.table3 = table3 ? table3 : new Table();
        this.table3.idRoot = '#user-additional-';
    }
}
/**
 * Take message and bootstrap alert type to produce html
 * message div
 * ```
 * return '<p class="alert '+type+'">'+message+'</p>'
 * ```
 * @param message
 * @param type
 * @returns
 */
export function message(message, type) {
    return '<p class="alert ' + type + '">' + message + '</p>';
}
//SECTION - DOCTOR
/**
 * *** NOTE: use with admin 'search-users' view - TABLE 1***
 *
 * Takes multiple doctors data and converts them to html
 * table rows
 * @param data - AJAX response DoctorResponseList
 * @returns
 */
export function doctorsToRows(data) {
    var table = new Table();
    var table1 = '';
    data.doctorJsons.forEach(d => {
        table1 += '<tr data-id="' + d.id + '" data-selected="false" data-userType="doctor">' +
            '<td>' + d.name + '</td>' +
            '<td>' + d.username + '</td>' +
            '</tr>';
    });
    table.tbody = table1;
    return table;
}
export function doctorsToRowsDetailed(data) {
    var table = new Table();
    var table1 = '';
    data.doctorJsons.forEach(d => {
        table1 += '<tr data-id="' + d.id + '" data-selected="false" data-userType="doctor">' +
            '<td>' + d.name + '</td>' +
            '<td>' + d.username + '</td>' +
            '<td>' + d.specialisation + '</td>' +
            '<td>' + d.email + '</td>' +
            '</tr>';
    });
    table.tbody = table1;
    return table;
}
/**
 * *** NOTE: use with admin 'search-users' view - TABLE 2 & 3***
 * Takes single doctor's infomation and displays on the table 2
 * and table 3
 * Data object should just have one doctor avaialble in
 * doctorJsons attribute.
 * Used for working with the server response data from
 * fetchDoctorDetails method.
 * @param data
 * @returns
 */
export function doctorDetailsToRows(data) {
    var rows = new TableData();
    rows.table2.thead = '<tr>' +
        '<th>Email</th>' +
        '<th>Specialisation</th>' +
        '</tr>';
    rows.table2.tbody = '<tr>' +
        '<td>' + data.doctorJsons[0].specialisation + '</td>' +
        '<td>' + data.doctorJsons[0].email + '</td>' +
        '</tr>';
    rows.table3.thead = '<tr>' +
        '<th colspan="3">Patients</th>' +
        '</tr>' +
        '<tr>' +
        '<th>Patients Name</th>' +
        '<th>Username</th>' +
        '<th>Email</th>' +
        '</tr>';
    var patients = '';
    data.doctorJsons[0].patientJsons.forEach(p => {
        patients += '<tr>' +
            '<td>' + p.name + '</td>' +
            '<td>' + p.username + '</td>' +
            '<td>' + p.email + '</td>' +
            '</tr>';
    });
    rows.table3.tbody = patients;
    return rows;
}
/**
 * Send ajax request to server to fetch doctor info.
 * Then fills table2 ('#user-info-table')& tbody2 ('#user-info-tbody')
 * and table3 ('#user-additional-table') and tbody3 ('#user-additional-tbody') with data
 * @param docId
 */
export function fetchDoctorDetails(docId, csrfToken) {
    console.log('fetchDoctorDetails called with docId: ' + docId);
    $.ajax({
        url: "/rest/doctor/" + docId,
        type: "GET",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            //get doctor data for table 2 and table 3
            var tables = doctorDetailsToRows(data);
            //display doctor info - table 2
            $(tables.table2.getTheadId()).html(tables.table2.thead);
            $(tables.table2.getTbodyId()).html(tables.table2.tbody);
            //display doctor's patients - table 3
            $(tables.table3.getTheadId()).html(tables.table3.thead);
            $(tables.table3.getTbodyId()).html(tables.table3.tbody);
        },
        error: () => {
            $('#message').html('<div class="alert alert-danger">Error retrieving doctor information</div>');
        }
    });
}
export function searchForDoctor(name, pageNum, csrfToken) {
    $('#pageNum').html(String(pageNum));
    console.log("pageNum set to:", pageNum);
    $.ajax({
        url: "/rest/doctor/get-doctor/name/" + name + '/' + pageNum,
        type: "GET",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            var t1 = doctorsToRows(data);
            //display doctname name and username
            $(t1.getTbodyId()).html(t1.tbody);
            var tableBody = document.querySelector(t1.getTbodyId());
            makeClickableTableRows(tableBody, selectRow);
        },
        error: () => {
            $('#message').html(message('Error retrieving doctor information', 'alert-danger'));
        }
    });
}
//SECTION - PATIENT
/**
 * Take patient data and returns them as HTML strings
 * inside of Table object. The Table object returned already has the
 * right table id root (`#user-select-`).
 * @param data - AJAX response PatientResponseList
 * @returns Table
 */
export function patientsToRows(data) {
    console.log("patientsToRows:", data);
    var table = new Table("#user-select-");
    var t = '';
    data.patientJsons.forEach(p => {
        t += '<tr data-id="' + p.id + '" data-selected="false" data-userType="patient">' +
            '<td>' + p.name + '</td>' +
            '<td>' + p.username + '</td>';
        '</tr>';
    });
    table.tbody = t;
    return table;
}
/**
 * Take patient details data and turns them into
 * table rows.
 * @param data
 * @returns
 */
export function patientDetailsToRows(data) {
    var tables = new TableData();
    var patient = data.patientJsons[0];
    var thead2 = '<tr>' +
        '<th>D.O.B</th>' +
        '<th>Email</th>' +
        '</tr>';
    var table2 = '<tr>' +
        '<td>' + patient.DOB + '</td>' +
        '<td>' + patient.email + '</td>' +
        '</tr>';
    var thead3 = '<tr>' +
        '<th>Dr. Name</th>' +
        '<th>Dr. Email</th>' +
        '</tr>';
    var table3 = '<tr>' +
        '<td>' + patient.doctorName + '</td>' +
        '<td>' + patient.doctorEmail + '</td>' +
        '</tr>';
    //set table 2 details          
    tables.table2.thead = thead2;
    tables.table2.tbody = table2;
    //set table 3 details
    tables.table3.thead = thead3;
    tables.table3.tbody = table3;
    return tables;
}
/**
 * Fetches patient details for table 2 and 3.
 * Display informtion in these tables.
 * @param pId
 */
export function fetchPatientDetails(pId, csrfToken) {
    $.ajax({
        url: "/rest/patient/" + pId,
        type: "GET",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                var tables = patientDetailsToRows(data);
                //display patient info
                $(tables.table2.getTheadId()).html(tables.table2.thead);
                $(tables.table2.getTbodyId()).html(tables.table2.tbody);
                //display patients doctor info
                $(tables.table3.getTheadId()).html(tables.table3.thead);
                $(tables.table3.getTbodyId()).html(tables.table3.tbody);
            }
            else {
                $('#message').html(message(data.message, 'alert-warning'));
            }
        },
        error: () => {
            $('#message').html(message('Error retrieving patient information', 'alert-danger'));
        }
    });
}
/**
 * Fills table with patients matching the name searched for
 * @param name
 * @param pageNum
 * @param csrfToken
 */
export function searchForPatient(name, pageNum, csrfToken) {
    console.log("function searchForPatient called");
    $('#pageNum').html(String(pageNum));
    console.log("pageNum set to:", pageNum);
    $.ajax({
        url: "/rest/patient/get-patient/name/" + name + '/' + pageNum,
        type: "GET",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => searchForPatientSuccess(data),
        error: () => {
            $('#message').html(message('Error retrieving patient information', 'alert-danger'));
        }
    });
}
function searchForPatientSuccess(data) {
    if (data.success) {
        //turn data into html table form
        var t1 = patientsToRows(data);
        console.log("patient data:", data);
        //display doctor name and username
        $(t1.getTbodyId()).html(t1.tbody);
        console.log("table id:", t1.getTheadId());
        console.log('tables:', t1.tbody);
        //query table body and make each row selectable / clickable
        var tableBody = document.querySelector(t1.getTbodyId());
        makeClickableTableRows(tableBody, selectRow);
        //set total page numbers for pagination on frontend
        var pageTotalStr = 'of ' + String(data.totalPages);
        $('#pageTotal').html(pageTotalStr);
    }
    else {
        $('#message').html(message(data.message, 'alert-warning'));
    }
}
//SECTION - ADMIN
/**
 * Take patient data and returns them as HTML strings
 * inside of TableData object
 * @param data - AJAX response DoctorResponseList
 * @returns rows:TableData
 */
export function adminsToRows(data) {
    var tables = new TableData();
    var table1 = '';
    data.adminJsons.forEach(a => {
        table1 += '<tr data-id="' + a.id + '" data-selected="false" data-userType="admin">' +
            '<td>' + a.name + '</td>' +
            '<td>' + a.username + '</td>';
        '</tr>';
    });
    tables.table1.tbody += table1;
    return tables;
}
/**
 * Returns the admins email details for table 2.
 * @param data
 * @returns
 */
export function adminDetailsToRows(data) {
    var tables = new TableData();
    var admin = data.adminJsons[0];
    var thead2 = '<tr>' +
        '<th>Email</th>' +
        '</tr>';
    var table2 = '<tr>' +
        '<td>' + admin.email + '</td>' +
        '</tr>';
    //set table 2 details          
    tables.table2.thead = thead2;
    tables.table2.tbody = table2;
    //clear table 3 details
    tables.table3.thead = '';
    tables.table3.tbody = '';
    return tables;
}
/**
* Sends AJAX request and fetches the Admin by id.
* Admin name and username are then filled into table1
* ('#user-select-tbody')
* @param id
*/
export function fetchAdminDetails(aId, csrfToken) {
    console.log('fetchAdminDetails called with id: ' + aId);
    $.ajax({
        url: "/rest/admin/" + aId,
        type: "GET",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            if (data.success) {
                var rows = adminDetailsToRows(data);
                //display admin info
                $(rows.table2.getTheadId()).html(rows.table2.thead);
                $(rows.table2.getTbodyId()).html(rows.table2.tbody);
                //clear third table
                $(rows.table3.getTbodyId()).html(rows.table3.thead);
                $(rows.table3.getTbodyId()).html(rows.table3.tbody);
            }
            else {
                $('#message').html(message(data.message, 'alert-warning'));
            }
        },
        error: () => {
            $('#message').html(message('Error retrieving admin information', 'alert-danger'));
        }
    });
}
/**
 * Search for admin with matching name and returns list of results to
 * table 1
 * @param name
 * @param pageNum
 * @param csrfToken
 */
export function searchForAdmin(name, pageNum, csrfToken) {
    console.log("searchForAdmin called");
    $('#pageNum').html(String(pageNum));
    console.log("pageNum set to:", pageNum);
    $.ajax({
        url: "/rest/admin/get-admin/name/" + name + '/' + pageNum,
        type: "GET",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => {
            var tables = adminsToRows(data);
            var t1 = tables.table1;
            //display admin name and username
            $(t1.getTbodyId()).html(t1.tbody);
            var tableBody = document.querySelector(t1.getTbodyId());
            //set total page numbers for pagination on frontend
            var pageTotalStr = 'of ' + String(data.totalPages);
            $('#pageTotal').html(pageTotalStr);
            //make table rows clickable
            makeClickableAdminTableRows(tableBody);
        },
        error: () => {
            $('#message').html(message('Error retrieving admin information', 'alert-danger'));
        }
    });
}
function makeClickableAdminTableRows(tableBody) {
    var rows = tableBody?.querySelectorAll('tr');
    rows.forEach(row => {
        row.addEventListener('click', () => {
            var selected = row.getAttribute('data-selected');
            if (selected == 'false') {
                //unselect previously selected row
                var previouslySelected = tableBody.querySelector('tr[data-selected=true]');
                if (previouslySelected) {
                    highlightRow(previouslySelected, plain);
                    previouslySelected.setAttribute('data-selected', 'false');
                }
                //highlight newly selected row
                highlightRow(row, yellow);
                //select doctor row
                row.setAttribute('data-selected', 'true');
            }
        });
    });
}
