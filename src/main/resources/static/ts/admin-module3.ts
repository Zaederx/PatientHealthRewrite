import { makeClickableTableRows, selectRow } from "./admin-module1.js";
import { message, TableData } from "./admin-module2.js";

/*
Functionality needed for the admin-edit-users view
*/
export function usersToRows(data:UserResponseList) {
    var tables:TableData = new TableData();
    var table1 = ''

    data.userJsons.forEach( a => {
        table1 += '<tr data-id="'+a.id+'" data-selected="false" data-userType="'+a.role.toLowerCase()+'">'+
                        '<td>'+a.role+'</td>'+
                        '<td>'+a.username+'</td>'+
                        '<td>'+a.name+'</td>' +
                        '<td>'+a.email+'</td>' + 
                        
                    '</tr>';
    })
            
    tables.table1.tbody += table1
    tables.table1.idRoot = '#user-details-'
    return tables;
}

function handleSearchForUserSuccess(data:UserResponseList) {
        var tables:TableData = usersToRows(data)
        var t1 = tables.table1
        //display admin name and username
        $(t1.getTbodyId()).html(t1.tbody)
        var tableBody = document.querySelector(t1.getTbodyId()) as HTMLTableElement
        makeClickableTableRows(tableBody,selectRow)
}



export function searchForUser(name:string, pageNum:number, csrfToken:string) {
    console.log("searchForAdmin called")
    $('#pageNum').html(String(pageNum));
    console.log("pageNum set to:",pageNum)
    $.ajax({
        url: "/rest/user/get-user/name/"+name+'/'+pageNum,
        type: "GET",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data) =>  handleSearchForUserSuccess(data),
        error: () => {
            $('#message').html(message('Error retrieving admin information','alert-danger'))
        }
    })
}