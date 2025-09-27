import { message, Table } from "./admin-module2.js"
import { searchForUser } from "./admin-module3.js"
import { validateEmail, validatePassword, validateUsername } from "./admin-module4.js"
import { handlePasswordSuccess, handleSuccess } from "./admin-register-users.js"
import { getSelectedItemId } from "./admin-search-users.js"

var csrfToken = $("meta[name='_csrf']").attr("content") as string
var searchBy:'name'|'username' = 'name'
const searchbarId = '#user-searchbar'
const pageNumId = '#pageNum'
//input ids
const idInputId = '#user-id' //hidden input
const nameInputId = '#user-name'
const usernameInputId = '#user-username'
const emailInputId = '#user-email'
const passwordInputId = '#user-password'
const password2InputId = '#user-passwordTwo'

//page total id
const pageTotalElementId = '#pageTotal'

//submit btn id
const deleteBtnId = '#btn-delete-user'

//validation boolean values
var nameValid = false
var usernameValid = false
var emailValid = false
var passwordValid = false

//set table
var table = new Table()
table.idRoot = '#user-details-'
//enable searchbar
$(searchbarId).on('input',()=>{
    var name = $(searchbarId).val() as string;
    var pageNum = $(pageNumId).val() as number
    if(!pageNum) {pageNum = 1}
    searchForUser(name,pageNum,csrfToken,pageTotalElementId,searchBy)
})

/**the current page number */
var userTableCurrentPageNum = 1
var userTablePagePrev = 0
var userTablePageNext = 2

function setPageNumVars(currentPageNum:number) {
    userTableCurrentPageNum = currentPageNum;
    userTablePagePrev = userTableCurrentPageNum - 1;
    userTablePageNext = userTableCurrentPageNum + 1;
}

//SECTION - SET BUTTONS
$('#btn-search-username').on('click', () => {
    searchBy = 'username'
})

$('#btn-search-name').on('click', () => {
    searchBy = 'name'
})

$('#btn-prev').on('click', () => {
    var name = $(searchbarId).val() as string;
    //ajax request for doctors - on previous page of results
    searchForUser(name,userTablePagePrev,csrfToken,pageTotalElementId,searchBy)
    //set current page to previous page & update prev and next page numbers
    setPageNumVars(userTablePagePrev as number)
})
$('#btn-next').on('click', () => {
    var name = $(searchbarId).val() as string;
    //ajax request for doctors - on previous page of results
    searchForUser(name,userTablePageNext,csrfToken,pageTotalElementId,searchBy)
    //set current page to next page & update prev and next page numbers
    setPageNumVars(userTablePageNext as number)
})
$('#btn-go').on('click', () => {
    var name = $(searchbarId).val() as string;
    var pageNum = Number($(pageNumId).html() as string)
    //ajax request for doctors - on previous page of results
    searchForUser(name,pageNum,csrfToken,pageTotalElementId,searchBy)
    //set current page to the entered page number & update prev and next page numbers
    setPageNumVars(pageNum as number)
})


$(deleteBtnId).on('click', () => {
    var ok = confirm("Are you sure you wand to delete this user?")
    //if confirmed ok for deletion
    if (ok) {
        //get selected id
        var id = getSelectedItemId(table.getTableId())
        //submit user to be deleted
        $.ajax({
            url: "/rest/user/delete/"+id,
            type: "DELETE",
            contentType: "application/json",
            dataType:"json",
            headers: {'X-CSRF-TOKEN':csrfToken},
            success: (data) => handleEditSuccess(data) ,
            error: () => handleEditError()
        })
    }
})

function handleEditSuccess(data:JsonResponse) {
    if(data.success) {
        $('#message').html(message("Editing user successful",'alert-info'))
    }
}

function handleEditError() {
    $('#message').html(message('Error retrieving doctor information','alert-danger'))
}