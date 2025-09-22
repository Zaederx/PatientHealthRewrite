import { searchForAdmin, searchForDoctor, searchForPatient, fetchPatientDetails, fetchAdminDetails, fetchDoctorDetails } from "./admin-module2.js";
var csrfToken = $("meta[name='_csrf']").attr("content");
$('#user-search-input').on('input', () => {
    var pageNum = 1;
    searchForUser(pageNum);
});
/**
 * Search for a user.
 * Retrieves that name of the user,
 * the page number and the user type,
 * then searches for the name based on the user type selected.
 */
function searchForUser(pageNum) {
    var name = $('#user-search-input').val();
    if (!pageNum) {
        pageNum = $('#pageNum').val();
    }
    setPageNumVars(pageNum);
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
}
//SECTION - ENABLE TABLE BUTTONS AND PAGE NUMBER
/**the current page number */
var searchTableCurrentPageNum = 1;
var searchTablePagePrev = 1;
var searchTablePageNext = 2;
function setPageNumVars(currentPageNum) {
    searchTableCurrentPageNum = currentPageNum;
    searchTablePagePrev = searchTableCurrentPageNum - 1;
    searchTablePageNext = searchTableCurrentPageNum + 1;
}
$('#btn-prev').on('click', () => {
    searchForUser(searchTablePagePrev);
    //set current page to previous page & update prev and next page numbers
    setPageNumVars(searchTablePagePrev);
});
$('#btn-next').on('click', () => {
    searchForUser(searchTablePageNext);
    //set current page to next page & update prev and next page numbers
    setPageNumVars(searchTablePageNext);
});
$('#btn-go').on('click', () => {
    var pageNum = Number($('#pageNum').html());
    searchForUser(pageNum);
    //set current page to the entered page number & update prev and next page numbers
    setPageNumVars(pageNum);
});
$('#btn-user-info').on('click', () => {
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
export function getSelectedItemId(tableBodyId) {
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
    var id = getSelectedItemId('#user-select-table');
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
