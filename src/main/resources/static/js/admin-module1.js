var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * *** NOTE: use with admin 'search-users' view - TABLE 1***
 * Data to rows
 * @param data - AJAX response DoctorResponseList
 * @returns
 */
export function doctorDataToRows(data) {
    var rows = '';
    data.doctorJsons.forEach(function (d) {
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
var light_blue = '#86f9d6';
var light_red = '#fad6bb';
export var yellow = '#fdfc8a';
export var plain = '';
/**
 * Selects a table row
 * @param tableBody
 * @param row
 * @param csrfToken
 */
export function selectRow(tableBody, row, csrfToken) {
    var selected = row.getAttribute('data-selected');
    var id = row.getAttribute('data-id');
    if (selected == 'false') {
        //get previously selected row if there is one
        var previouslySelected = tableBody.querySelector('tr[data-selected=true]');
        //if there is - unselect this row
        if (previouslySelected) {
            highlightRow(previouslySelected, plain);
            previouslySelected.setAttribute('data-selected', 'false');
        }
        //highlight newly selected row
        highlightRow(row, yellow);
        if (csrfToken) {
            displayDoctorsPatientDetails(id, csrfToken);
        }
        //set newlyselected row attribute 'data-selected' to true
        row.setAttribute('data-selected', 'true');
    }
}
/**
 * Makes rows of a table selectable/clickable.
 * @param tableBody
 * @param selectRow
 * @param csrfToken
 */
export function makeClickableTableRows(tableBody, selectRow, csrfToken) {
    var rows = tableBody === null || tableBody === void 0 ? void 0 : tableBody.querySelectorAll('tr');
    rows.forEach(function (row) {
        row.addEventListener('click', function () {
            //doctor user csrfToken
            if (csrfToken) {
                selectRow(tableBody, row, csrfToken);
            }
            //if not doctor using csrfToken
            else {
                selectRow(tableBody, row);
            }
        });
    });
}
export function highlightRow(row, colour) {
    row.style.backgroundColor = colour;
}
export function displayDoctorsPatientDetails(doctorId, csrfToken) {
    $.ajax({
        url: "/rest/doctor/get-patients/" + doctorId,
        type: "GET",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: function (data) {
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
        success: function (data) {
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
        error: function () {
            var cell = '<td colspan="4">' + 'ERROR FETCHING RESULTS' + '</td>';
            $('#doctor-search-table-body').html(cell);
        }
    });
}
export // SECTION - Patient's Searchbar
 function searchForPatient(name, pageNum, csrfToken) {
    $('#p-pageNum').html(String(pageNum));
    console.log("p-pageNum set to :", pageNum);
    $.ajax({
        url: "/rest/patient/get-patient/name/" + name + '/' + pageNum,
        type: "GET",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: function (data) {
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
        error: function () {
            var cell = '<td colspan="4">' + 'ERROR FETCHING RESULTS' + '</td>';
            $('#patient-search-table-body').html(cell);
        }
    });
}
export function patientDataToRows(data) {
    var rows = '';
    data.patientJsons.forEach(function (p) {
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
export function addPatientToDoctor(pId, docId, csrfToken) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = { pId: pId, docId: docId };
            return [2 /*return*/, $.ajax({
                    url: "/rest/doctor/add-patient",
                    type: "POST",
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    dataType: "json",
                    headers: { 'X-CSRF-TOKEN': csrfToken },
                    success: function (data) {
                        if (data.success) {
                            $('#message').html('<div class="alert alert-info">Patient Added Successfully.</div>');
                        }
                        else {
                            $('#message').html('<div class="alert alert-warning">' + data.message + '</div>');
                        }
                    },
                    error: function () {
                        $('#message').html('<div class="alert alert-danger">Error adding patient to doctor</div>');
                    }
                })];
        });
    });
}
export function removePatientFromDoctor(pId, docId, csrfToken) {
    var data = { pId: pId, docId: docId };
    return $.ajax({
        url: "/rest/doctor/remove-patient",
        type: "DELETE",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: function (data) {
            if (data.success) {
                $('#message').html('<div class="alert alert-info">' + data.message + '</div>');
            }
            else {
                $('#message').html('<div class="alert alert-warning">' + data.message + '</div>');
            }
        },
        error: function () {
            $('#message').html('<div class="alert alert-danger">Error removing patient from doctor</div>');
        }
    });
}
