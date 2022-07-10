import { makeClickableTableRows, selectRow } from "./admin-module1.js";
import { message, TableData } from "./admin-module2.js";
/*
Functionality needed for the admin-edit-users view
*/
export function usersToRows(data) {
    var tables = new TableData();
    var table1 = '';
    data.userJsons.forEach(a => {
        table1 += '<tr data-id="' + a.id + '" data-selected="false" data-userType="' + a.role.toLowerCase() + '">' +
            '<td>' + a.role + '</td>' +
            '<td>' + a.username + '</td>' +
            '<td>' + a.name + '</td>' +
            '<td>' + a.email + '</td>' +
            '</tr>';
    });
    tables.table1.tbody += table1;
    tables.table1.idRoot = '#user-details-';
    return tables;
}
/**
 * Function to handle the response from search for user function
 * @param data server response object
 * @param pageTotalId id of element to display total page number
 */
function handleSearchForUserSuccess(data, pageTotalId) {
    var tables = usersToRows(data);
    var t1 = tables.table1;
    //display admin name and username
    $(t1.getTbodyId()).html(t1.tbody);
    var tableBody = document.querySelector(t1.getTbodyId());
    makeClickableTableRows(tableBody, selectRow);
    //show total number of pages
    $(pageTotalId).html(String(data.totalPages));
}
/**
 * Function to search for users
 * @param name
 * @param pageNum
 * @param csrfToken
 */
export function searchForUser(name, pageNum, csrfToken, pageTotalElementId, by) {
    var url = '';
    if (by == 'name') {
        url = "/rest/user/get-user/name/";
    }
    else if (by == 'username') {
        url = "/rest/user/get-user/username/";
    }
    console.log("searchForAdmin called");
    $('#pageNum').html(String(pageNum));
    console.log("pageNum set to:", pageNum);
    $.ajax({
        url: url + name + '/' + pageNum,
        type: "GET",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handleSearchForUserSuccess(data, pageTotalElementId),
        error: () => {
            $('#message').html(message('Error retrieving admin information', 'alert-danger'));
        }
    });
}
