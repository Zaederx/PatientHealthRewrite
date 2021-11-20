import { searchForAdmin, searchForDoctor, searchForPatient, fetchPatientDetails, fetchAdminDetails, fetchDoctorDetails } from "./admin-module2.js";
var csrfToken = $("meta[name='_csrf']").attr("content");
$('#user-search-input').on('input', function () {
    var name = $('#user-search-input').val();
    var pageNum = $('#pageNum').val();
    if (!pageNum) {
        pageNum = 1;
    }
    var userType = getUserSearchType();
    console.log('userType:', userType);
    switch (userType) {
        case 'patient':
            searchForPatient(name, pageNum, csrfToken);
            break;
        case 'doctor':
            searchForDoctor(name, pageNum, csrfToken);
            break;
        case 'admin':
            searchForAdmin(name, pageNum, csrfToken);
            break;
    }
});
$('#btn-user-info').on('click', function () {
    console.log('btn-user-info clicked');
    fetchUserDetails();
});
/**
 * Returns the currectly selected radio button
 * usertype for the search field
 * @returns USERTYPE
 */
function getUserSearchType() {
    var userType = $('input[name="user-type"]:checked').val();
    return userType;
}
/**
 * Searches the table for the row that is selected.
 * Returns the id of the user in that row.
 * @returns
 */
export function getSelectedUserId(tableBodyId) {
    //get table
    var tableBody = document.querySelector(tableBodyId);
    //get selected row
    var row = tableBody.querySelector('tr[data-selected=true]');
    var id = row.getAttribute('data-id');
    return id;
}
/**
 * This sends ajax request to fetch selected
 * users details.
 * These details are then filled into
 * table 2 and 3 (the 'info' and 'additional' tables)
 */
function fetchUserDetails() {
    //get selected User
    var id = getSelectedUserId('#user-select-table');
    console.log('user id:', id);
    //identify usertype
    var usertype = getSelectedUserType();
    console.log('user type:', usertype);
    //fetch by user type
    switch (usertype) {
        case 'patient':
            fetchPatientDetails(id, csrfToken);
            break;
        case 'doctor':
            fetchDoctorDetails(id, csrfToken);
            break;
        case 'admin':
            fetchAdminDetails(id, csrfToken);
            break;
    }
}
/**
 * Searches table 1 for the selected user.
 * Returns the userType of this user.
 * @returns
 */
function getSelectedUserType() {
    //get table
    var tableBody = document.querySelector('#user-select-table');
    //get selected row
    var row = tableBody.querySelector('tr[data-selected=true]');
    var userType = row.getAttribute('data-userType');
    return userType;
}
