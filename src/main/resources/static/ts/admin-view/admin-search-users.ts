import { searchForAdmin, searchForDoctor, searchForPatient, message, fetchPatientDetails, fetchAdminDetails, fetchDoctorDetails } from "./admin-module2.js"

var csrfToken = $("meta[name='_csrf']").attr("content") as string

$('#user-search-input').on('input', () => {
    var name = $('#user-search-input').val() as string
    var pageNum = $('#pageNum').val() as number
    if(!pageNum) {pageNum = 1}

    var userType = getUserSearchType()
    console.log('userType:',userType)
    
    switch (userType) {
        case 'patient': 
            searchForPatient(name, pageNum,csrfToken);
            break;
        case 'doctor': 
            searchForDoctor(name, pageNum,csrfToken);
            break;
        case 'admin':
            searchForAdmin(name, pageNum,csrfToken);
            break;
    }
    
})

$('#btn-user-info').on('click', ()=> {
    console.log('btn-user-info clicked')
    fetchUserDetails()
})

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













