import { message, Table } from "./admin-module2.js";
import { searchForUser } from "./admin-module3.js";
import { validateEmail, validatePassword, validateUsername } from "./admin-module4.js";
import { handlePasswordSuccess, handleSuccess } from "./admin-register-users.js";
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
const submitBtnId = '#btn-submit-edit';
//validation boolean values
var nameValid = { val: false };
var usernameValid = { val: false };
var emailValid = { val: false };
var passwordValid = { val: false };
var password2Valid = { val: false };
//set table
var table = new Table();
table.idRoot = '#user-details-';
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
$('#user-search-username').on('input', () => {
    searchBy = 'username';
});
$('#user-search-name').on('input', () => {
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
//set edit button
$('#btn-edit').on('click', () => displaySelectedUserInForm());
//show / hide password fields
$('#btn-show-password').on('click', () => {
    $(passwordInputId).attr('type', 'text');
    $(password2InputId).attr('type', 'text');
});
$('#btn-hide-password').on('click', () => {
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
    if (nameValid.val && usernameValid.val && emailValid.val && passwordValid.val && password2Valid.val) {
        document.querySelector(submitBtnId).disabled = false;
    }
}
function disableSubmitBtn() {
    if (!nameValid.val || !usernameValid.val || !emailValid.val || !passwordValid.val || !password2Valid.val) {
        document.querySelector(submitBtnId).disabled = true;
    }
}
//SECTION - validate user inputs
//validate username
$(usernameInputId).on('input', () => {
    validateUsername(usernameInputId, csrfToken, (data) => {
        handleSuccess(data, usernameInputId + '-error', usernameValid, enableSubmitBtn, disableSubmitBtn);
    });
});
//validate email
$(emailInputId).on('input', () => {
    validateEmail(emailInputId, csrfToken, (data) => {
        handleSuccess(data, emailInputId + '-error', emailValid, enableSubmitBtn, disableSubmitBtn);
    }, () => {
        $('#message').html(message('Error validating email.', 'alert-danger'));
    });
});
//validate password field
$(passwordInputId).on('input', () => {
    validatePassword(passwordInputId, password2InputId, csrfToken, (data) => {
        handlePasswordSuccess(data, passwordInputId + '-error', passwordValid, enableSubmitBtn, disableSubmitBtn);
    }, () => {
        $('#message').html(message('Error validating passwords.', 'alert-danger'));
    });
});
//validate second password field
$(password2InputId).on('input', () => {
    validatePassword(passwordInputId, password2InputId, csrfToken, (data) => {
        handlePasswordSuccess(data, passwordInputId + '-error', password2Valid, enableSubmitBtn, disableSubmitBtn);
    }, () => {
        $('#message').html(message('Error validating passwords.', 'alert-danger'));
    });
});
$('#btn-submit-edit').on('click', () => {
    //get field values
    var id = $(idInputId).val();
    var name = $(nameInputId).val();
    var username = $(usernameInputId).val();
    var email = $(emailInputId).val();
    var password = $(passwordInputId).val();
    //set data to send
    var data = { id, name, username, email, password };
    //submit changes
    $.ajax({
        url: "/rest/user/edit",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: (data) => handleEditSuccess(data),
        error: () => handleEditError()
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
