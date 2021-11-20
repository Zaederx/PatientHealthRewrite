import { message, Table } from "./admin-module2.js";
import { searchForUser } from "./admin-module3.js";
import { validateEmail, validatePassword, validateUsername } from "./admin-module4.js";
import { handlePasswordSuccess, handleSuccess } from "./admin-register-users.js";
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
var submitBtnId = '#btn-submit-edit';
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
//set edit button
$('#btn-edit').on('click', function () { return displaySelectedUserInForm(); });
//show / hide password fields
$('#btn-show-password').on('click', function () {
    $(passwordInputId).attr('type', 'text');
    $(password2InputId).attr('type', 'text');
});
$('#btn-hide-password').on('click', function () {
    $(passwordInputId).attr('type', 'password');
    $(password2InputId).attr('type', 'password');
});
/**
 * Displays users information in the edit user form
 */
function displaySelectedUserInForm() {
    //get tableBody
    var tableBody = document.querySelector(table.getTbodyId());
    //get selected row from table
    var row = tableBody.querySelector('tr[data-selected=true]');
    //retrieve information
    var id = row.getAttribute('data-id');
    var username = row.cells[1].textContent;
    var name = row.cells[2].textContent;
    var email = row.cells[3].textContent;
    //DISPLAY IN FORM
    $(idInputId).val(id);
    $(nameInputId).val(name);
    $(usernameInputId).val(username);
    $(emailInputId).val(email);
}
function enableSubmitBtn() {
    if (nameValid && usernameValid && emailValid && passwordValid) {
        document.querySelector(submitBtnId).disabled = false;
    }
}
function disableSubmitBtn() {
    if (!nameValid || !usernameValid || !emailValid || !passwordValid) {
        document.querySelector(submitBtnId).disabled = true;
    }
}
//SECTION - validate user inputs
//validate username
$(usernameInputId).on('input', function () {
    validateUsername(usernameInputId, csrfToken, function (data) {
        handleSuccess(data, usernameInputId + '-error', 'usernameValid', enableSubmitBtn, disableSubmitBtn);
    });
});
//validate email
$(emailInputId).on('input', function () {
    validateEmail(emailInputId, csrfToken, function (data) {
        handleSuccess(data, emailInputId + '-error', 'emailValid', enableSubmitBtn, disableSubmitBtn);
    }, function () {
        $('#message').html(message('Error validating email.', 'alert-danger'));
    });
});
//validate password field
$(passwordInputId).on('input', function () {
    validatePassword(passwordInputId, password2InputId, csrfToken, function (data) {
        handlePasswordSuccess(data, passwordInputId + '-error', "passwordValid", enableSubmitBtn, disableSubmitBtn);
    }, function () {
        $('#message').html(message('Error validating passwords.', 'alert-danger'));
    });
});
//validate second password field
$(password2InputId).on('input', function () {
    validatePassword(passwordInputId, password2InputId, csrfToken, function (data) {
        handlePasswordSuccess(data, passwordInputId + '-error', "passwordValid", enableSubmitBtn, disableSubmitBtn);
    }, function () {
        $('#message').html(message('Error validating passwords.', 'alert-danger'));
    });
});
$('#btn-submit-edit').on('click', function () {
    //get field values
    var id = $(idInputId).val();
    var name = $(nameInputId).val();
    var username = $(usernameInputId).val();
    var email = $(emailInputId).val();
    var password = $(passwordInputId).val();
    var data = { id: id, name: name, username: username, email: email, password: password };
    //submit changes
    $.ajax({
        url: "/rest/user/edit",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: function (data) { return handleEditSuccess(data); },
        error: function () { return handleEditError(); }
    });
});
function handleEditSuccess(data) {
    if (data.success) {
        $('#message').html(message("Editing user successful", 'alert-info'));
    }
}
function handleEditError() {
    $('#message').html(message('Error retrieving doctor information', 'alert-danger'));
}
