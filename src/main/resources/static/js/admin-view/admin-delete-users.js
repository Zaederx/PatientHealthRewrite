import { message, Table } from "./admin-module2.js";
import { searchForUser } from "./admin-module3.js";
import { getSelectedItemId } from "./admin-search-users.js";
var csrfToken = $("meta[name='_csrf']").attr("content");
var searchBy = 'name';
const searchbarId = '#user-searchbar';
const pageNumId = '#pageNum';
//input ids
const idInputId = '#user-id'; //hidden input
const nameInputId = '#user-name';
const usernameInputId = '#user-username';
const emailInputId = '#user-email';
const passwordInputId = '#user-password';
const password2InputId = '#user-passwordTwo';
//page total id
const pageTotalElementId = '#pageTotal';
//submit btn id
const deleteBtnId = '#btn-delete-user';
//validation boolean values
var nameValid = false;
var usernameValid = false;
var emailValid = false;
var passwordValid = false;
//set table
var table = new Table();
table.idRoot = '#user-details-';
//enable searchbar
$(searchbarId).on('input', () => {
    var name = $(searchbarId).val();
    var pageNum = $(pageNumId).val();
    if (!pageNum) {
        pageNum = 1;
    }
    searchForUser(name, pageNum, csrfToken, pageTotalElementId, searchBy);
});
/**the current page number */
var userTableCurrentPageNum = 1;
var userTablePagePrev = 0;
var userTablePageNext = 2;
function setPageNumVars(currentPageNum) {
    userTableCurrentPageNum = currentPageNum;
    userTablePagePrev = userTableCurrentPageNum - 1;
    userTablePageNext = userTableCurrentPageNum + 1;
}
//SECTION - SET BUTTONS
$('#btn-search-username').on('click', () => {
    searchBy = 'username';
});
$('#btn-search-name').on('click', () => {
    searchBy = 'name';
});
$('#btn-prev').on('click', () => {
    var name = $(searchbarId).val();
    //ajax request for doctors - on previous page of results
    searchForUser(name, userTablePagePrev, csrfToken, pageTotalElementId, searchBy);
    //set current page to previous page & update prev and next page numbers
    setPageNumVars(userTablePagePrev);
});
$('#btn-next').on('click', () => {
    var name = $(searchbarId).val();
    //ajax request for doctors - on previous page of results
    searchForUser(name, userTablePageNext, csrfToken, pageTotalElementId, searchBy);
    //set current page to next page & update prev and next page numbers
    setPageNumVars(userTablePageNext);
});
$('#btn-go').on('click', () => {
    var name = $(searchbarId).val();
    var pageNum = Number($(pageNumId).html());
    //ajax request for doctors - on previous page of results
    searchForUser(name, pageNum, csrfToken, pageTotalElementId, searchBy);
    //set current page to the entered page number & update prev and next page numbers
    setPageNumVars(pageNum);
});
$(deleteBtnId).on('click', () => {
    var ok = confirm("Are you sure you wand to delete this user?");
    //if confirmed ok for deletion
    if (ok) {
        //get selected id
        var id = getSelectedItemId(table.getTableId());
        //submit user to be deleted
        $.ajax({
            url: "/rest/user/delete/" + id,
            type: "DELETE",
            contentType: "application/json",
            dataType: "json",
            headers: { 'X-CSRF-TOKEN': csrfToken },
            success: (data) => handleEditSuccess(data),
            error: () => handleEditError()
        });
    }
});
function handleDeleteUserSuccess(data) {
    if (data.success) {
        $('#message').html(message("Deleting user successful", 'alert-info'));
    }
}
function handleDeleteUserError() {
    $('#message').html(message('Error deleting user', 'alert-danger'));
}
