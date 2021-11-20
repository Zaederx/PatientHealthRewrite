import { message, Table } from "./admin-module2.js";
import { searchForUser } from "./admin-module3.js";
import { getSelectedUserId } from "./admin-search-users.js";
var csrfToken = $("meta[name='_csrf']").attr("content");
var searchBy = 'name';
var searchbarId = '#user-searchbar';
var pageNumId = '#pageNum';
//input ids
var idInputId = '#user-id'; //hidden input
var nameInputId = '#user-name';
var usernameInputId = '#user-username';
var emailInputId = '#user-email';
var passwordInputId = '#user-password';
var password2InputId = '#user-passwordTwo';
//page total id
var pageTotalElementId = '#pageTotal';
//submit btn id
var deleteBtnId = '#btn-delete-user';
//validation boolean values
var nameValid = false;
var usernameValid = false;
var emailValid = false;
var passwordValid = false;
//set table
var table = new Table();
table.idRoot = '#user-details-';
$(searchbarId).on('input', function () {
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
$('#btn-search-username').on('click', function () {
    searchBy = 'username';
});
$('#btn-search-name').on('click', function () {
    searchBy = 'name';
});
$('#btn-prev').on('click', function () {
    var name = $(searchbarId).val();
    //ajax request for doctors - on previous page of results
    searchForUser(name, userTablePagePrev, csrfToken, pageTotalElementId, searchBy);
    //set current page to previous page & update prev and next page numbers
    setPageNumVars(userTablePagePrev);
});
$('#btn-next').on('click', function () {
    var name = $(searchbarId).val();
    //ajax request for doctors - on previous page of results
    searchForUser(name, userTablePageNext, csrfToken, pageTotalElementId, searchBy);
    //set current page to next page & update prev and next page numbers
    setPageNumVars(userTablePageNext);
});
$('#btn-go').on('click', function () {
    var name = $(searchbarId).val();
    var pageNum = Number($(pageNumId).html());
    //ajax request for doctors - on previous page of results
    searchForUser(name, pageNum, csrfToken, pageTotalElementId, searchBy);
    //set current page to the entered page number & update prev and next page numbers
    setPageNumVars(pageNum);
});
$(deleteBtnId).on('click', function () {
    var ok = confirm("Are you sure you wand to delete this user?");
    //if confirmed ok for deletion
    if (ok) {
        //get selected id
        var id = getSelectedUserId(table.getTableId());
        //submit user to be deleted
        $.ajax({
            url: "/rest/user/delete/" + id,
            type: "DELETE",
            contentType: "application/json",
            dataType: "json",
            headers: { 'X-CSRF-TOKEN': csrfToken },
            success: function (data) { return handleEditSuccess(data); },
            error: function () { return handleEditError(); }
        });
    }
});
function handleEditSuccess(data) {
    if (data.success) {
        $('#message').html(message("Editing user successful", 'alert-info'));
    }
}
function handleEditError() {
    $('#message').html(message('Error retrieving doctor information', 'alert-danger'));
}
