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
var Table = /** @class */ (function () {
    function Table(idRoot, thead, tbody) {
        this.idRoot = idRoot ? idRoot : "";
        this.thead = thead ? thead : "";
        this.tbody = tbody ? tbody : "";
    }
    Table.prototype.getTableId = function () {
        return this.idRoot + 'table';
    };
    Table.prototype.getTheadId = function () {
        return this.idRoot + 'thead';
    };
    Table.prototype.getTbodyId = function () {
        return this.idRoot + 'tbody';
    };
    return Table;
}());
export { Table };
/**
 * Object to help map user information to the correct tables.
 *
 * i.e. There are three tables in admin-search-users.html view
 * and this object helps to match information to the right table
 */
var TableData = /** @class */ (function () {
    function TableData(table1, table2, table3) {
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
    return TableData;
}());
export { TableData };
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
    var tables = new TableData();
    var table1 = '';
    data.doctorJsons.forEach(function (d) {
        table1 += '<tr data-id="' + d.id + '" data-selected="false" data-userType="doctor">' +
            '<td>' + d.name + '</td>' +
            '<td>' + d.username + '</td>';
        '</tr>';
    });
    tables.table1.tbody = table1;
    return tables;
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
    data.doctorJsons[0].patientJsons.forEach(function (p) {
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
 * Send ajax request to server to fecth doctor info.
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
        success: function (data) {
            //get doctor data for table 2 and table 3
            var tables = doctorDetailsToRows(data);
            //display doctor info - table 2
            $(tables.table2.getTheadId()).html(tables.table2.thead);
            $(tables.table2.getTbodyId()).html(tables.table2.tbody);
            //display doctor's patients - table 3
            $(tables.table3.getTheadId()).html(tables.table3.thead);
            $(tables.table3.getTbodyId()).html(tables.table3.tbody);
        },
        error: function () {
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
        success: function (data) {
            var tables = doctorsToRows(data);
            var t1 = tables.table1;
            //display doctname name and username
            $(t1.getTbodyId()).html(t1.tbody);
            var tableBody = document.querySelector(t1.getTbodyId());
            makeClickableTableRows(tableBody, selectRow);
        },
        error: function () {
            $('#message').html(message('Error retrieving doctor information', 'alert-danger'));
        }
    });
}
//SECTION - PATIENT
/**
 * Take patient data and returns them as HTML strings
 * inside of TableData object
 * @param data - AJAX response DoctorResponseList
 * @returns rows:TableData
 */
export function patientsToRows(data) {
    var tables = new TableData();
    var table1 = '';
    data.patientJsons.forEach(function (p) {
        table1 += '<tr data-id="' + p.id + '" data-selected="false" data-userType="patient">' +
            '<td>' + p.name + '</td>' +
            '<td>' + p.username + '</td>';
        '</tr>';
    });
    tables.table1.tbody += table1;
    return tables;
}
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
        success: function (data) {
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
        error: function () {
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
    console.log("searchForPatient called");
    $('#pageNum').html(String(pageNum));
    console.log("pageNum set to:", pageNum);
    $.ajax({
        url: "/rest/patient/get-patient/name/" + name + '/' + pageNum,
        type: "GET",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: function (data) {
            if (data.success) {
                var tables = patientsToRows(data);
                console.log('tables:', tables);
                var t1 = tables.table1;
                //display doctor name name and username
                $(t1.getTbodyId()).html(t1.tbody);
                var tableBody = document.querySelector(t1.getTbodyId());
                makeClickableTableRows(tableBody, selectRow);
            }
            else {
                $('#message').html(message(data.message, 'alert-warning'));
            }
        },
        error: function () {
            $('#message').html(message('Error retrieving patient information', 'alert-danger'));
        }
    });
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
    data.adminJsons.forEach(function (a) {
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
        success: function (data) {
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
        error: function () {
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
        success: function (data) {
            var tables = adminsToRows(data);
            var t1 = tables.table1;
            //display admin name and username
            $(t1.getTbodyId()).html(t1.tbody);
            var tableBody = document.querySelector(t1.getTbodyId());
            makeClickableAdminTableRows(tableBody);
        },
        error: function () {
            $('#message').html(message('Error retrieving admin information', 'alert-danger'));
        }
    });
}
function makeClickableAdminTableRows(tableBody) {
    var rows = tableBody === null || tableBody === void 0 ? void 0 : tableBody.querySelectorAll('tr');
    rows.forEach(function (row) {
        row.addEventListener('click', function () {
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
