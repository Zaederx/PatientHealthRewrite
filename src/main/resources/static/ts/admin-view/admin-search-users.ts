import { searchForAdmin, searchForDoctor, searchForPatient, message, fetchPatientDetails, fetchAdminDetails, fetchDoctorDetails } from "./admin-module2.js"

var csrfToken = $("meta[name='_csrf']").attr("content") as string

/**
 * Search for a user.
 * Retrieves that name of the user, 
 * the page number and the user type,
 * then searches for the name based on the user type selected.
 */
function searchForUserByName(pageNum?:number) {
    var name = $('#user-search-input').val() as string

    if (!pageNum) {
       pageNum = $('#pageNum').val() as number
    }
    setPageNumVars(pageNum)
    var userType = getUserSearchType()
    console.log('userType:',userType)
    
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

/**
 * Returns the currectly selected radio button 
 * usertype for the search field
 * @returns USERTYPE
 */
function getUserSearchType() {
    var userType = $('input[name="user-type"]:checked').val() as string
    return userType
}

/**
 * Searches the table for the row that is selected.
 * Returns the id of the user in that row.
 * @returns 
 */
 export function getSelectedItemId(tableBodyId: string): string {
    //get table
    var tableBody = document.querySelector(tableBodyId) as HTMLTableElement;
    //get selected row
    var row = tableBody.querySelector('tr[data-selected=true]') as HTMLTableRowElement
    var id = row.getAttribute('data-id') as string
    return id
}

/**
 * This sends ajax request to fetch selected
 * users details.
 * These details are then filled into 
 * table 2 and 3 (the 'info' and 'additional' tables)
 */
function fetchUserDetails() {
    //get selected User
    var id = getSelectedItemId('#user-select-table')
    console.log('user id:',id)
    //identify usertype
    var usertype = getSelectedUserType();
    console.log('user type:',usertype)
    //fetch by user type
    switch (usertype) {
        case 'patient':fetchPatientDetails(id,csrfToken);break;
        case 'doctor':fetchDoctorDetails(id,csrfToken);break;
        case 'admin':fetchAdminDetails(id,csrfToken);break;
    }
}

/**
 * Searches table 1 for the selected user.
 * Returns the userType of this user.
 * @returns 
 */
function getSelectedUserType() {
    //get table
    var tableBody = document.querySelector('#user-select-table') as HTMLTableElement;
    //get selected row
    var row = tableBody.querySelector('tr[data-selected=true]') as HTMLTableRowElement
    var userType = row.getAttribute('data-userType') as string
    return userType
}

//SECTION - ENABLE TABLE Searchbar, Table BUTTONS AND PAGE NUMBER
/**the current page number */
var searchTableCurrentPageNum = 1
var searchTablePagePrev = 1
var searchTablePageNext = 2

function setPageNumVars(currentPageNum:number) {
    searchTableCurrentPageNum = currentPageNum;
    searchTablePagePrev = searchTableCurrentPageNum - 1;
    searchTablePageNext = searchTableCurrentPageNum + 1;
}
//Search bar
$('#user-search-input').on('input', () => {
    var pageNum = 1
    //check for values of radio buttons - name, id , email
    //call relevant search function
    searchForUserByName(pageNum)   
})
$('#btn-prev').on('click', () => {
    searchForUserByName(searchTablePagePrev)
    //set current page to previous page & update prev and next page numbers
    setPageNumVars(searchTablePagePrev as number)
})
$('#btn-next').on('click', () => {
    searchForUserByName(searchTablePageNext)
    //set current page to next page & update prev and next page numbers
    setPageNumVars(searchTablePageNext as number)
})
$('#btn-go').on('click', () => {
    var pageNum = Number($('#pageNum').html() as string)
    searchForUserByName(pageNum)
    //set current page to the entered page number & update prev and next page numbers
    setPageNumVars(pageNum as number)
})
$('#btn-user-info').on('click', ()=> {
    console.log('btn-user-info clicked')
    fetchUserDetails()
})















