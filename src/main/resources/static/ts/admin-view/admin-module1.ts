/** 
 * *** NOTE: use with admin 'search-users' view - TABLE 1***
 * Data to rows
 * @param data - AJAX response DoctorResponseList
 * @returns 
 */
export function doctorDataToRows(data:DoctorResponseList) {
   var rows = '';
   data.doctorJsons.forEach( d => {
       var cell = '<tr data-id="'+d.id+'" data-selected="false" data-userType="doctor">'+
                       '<td>'+d.name+'</td>' + 
                       '<td>'+d.username+'</td>'+
                       '<td>'+d.specialisation+'</td>'+
                       '<td>'+d.email+'</td>'+
                   '</tr>';
       rows += cell
   })
   return rows;
}


const light_blue = '#86f9d6'
const light_red = '#fad6bb'
export const yellow = '#fdfc8a'
export const plain = ''

/**
 * Selects a table row
 * @param tableBody 
 * @param row 
 * @param csrfToken 
 */
export function selectRow(tableBody:HTMLTableElement,row:HTMLTableRowElement, csrfToken?:string) {
    console.log('row selected')
    var selected = row.getAttribute('data-selected')
    var id = row.getAttribute('data-id') as string
    if (selected == 'false') {
        //get previously selected row if there is one
        var previouslySelected = tableBody.querySelector('tr[data-selected=true]') as HTMLTableRowElement
        //if there is a previously selcted row - unselect this row
        if (previouslySelected) {
            highlightRow(previouslySelected,plain)
            previouslySelected.setAttribute('data-selected','false')
        }

        //highlight newly selected row
        highlightRow(row,yellow)
        //set newlyselected row attribute 'data-selected' to true
        row.setAttribute('data-selected', 'true')
        
        if(csrfToken) {
            displayDoctorsPatientDetails(id,csrfToken)
        }
        
    }    
        
}

/**
 * Makes rows of a table selectable/clickable.
 * @param tableBody 
 * @param select 
 * @param csrfToken 
 */
export function makeClickableTableRows(tableBody:HTMLTableElement,select:Function=selectRow, csrfToken?:string) {
    var rows = tableBody?.querySelectorAll('tr');
    rows.forEach( row => {
        row.addEventListener('click', () => {
            //doctor user csrfToken
            if(csrfToken) {
                select(tableBody,row,csrfToken)
            }
            //if not doctor using csrfToken
            else {
                select(tableBody,row)
            }
            
        })
    })
}

export function highlightRow(row:HTMLTableRowElement, colour:string) {
    console.log('highlighting row')
    row.style.backgroundColor = colour;
}

/**
 * Displays a doctor's list of patients and their details.
 * @param doctorId 
 * @param csrfToken 
 */
export function displayDoctorsPatientDetails(doctorId:string, csrfToken:string) {
    $.ajax({
        url: "/rest/doctor/get-patients/"+doctorId,
        type: "GET",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data:PatientResponseList) => {
            if(data.success) {
                //get doctor's patient's data
                var rows = patientDataToRows(data)
                $('#current-patient-table-body').html(rows)
                //make doctor's patients table rows clickable
                var tableBody = document.querySelector('#current-patient-table-body') as HTMLTableElement;
                makeClickableTableRows(tableBody,selectRow)
            }
            else {
                var errorMsg = '<tr colspan="4">'+'NO PATIENTS TO DISPLAY'+'</tr>'
                $('#current-patient-table-body').html(errorMsg)
            }
        }
    })
}
/**
 * Searches for a doctor from the database and presents a list of possible record matches on the frontend table.
 * Note: this functions uses the specific table IDs within the function that match tables on the frontend. Changing the IDs on the frontend will mean needing to change the id's here.
 * @param name doctor's name
 * @param pageNum table pagination/page number
 * @param csrfToken the page's csrf token
 */
export function searchForDoctor(name:string, pageNum:number,csrfToken:string) {
    $('#pageNum').html(String(pageNum));
    console.log("pageNum set to :",pageNum)
    $.ajax({
        url: "/rest/doctor/get-doctor/name/"+name+'/'+pageNum,
        type: "GET",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data:DoctorResponseList) => {
            if(data.success) {
                //fetch results from json response
                var doctorRows = doctorDataToRows(data);
                //display results
                $('#doctor-search-table-body').html(doctorRows)
                //setTotalPages
                $('#pageTotal').html("of "+data.totalPages)
                //make table rows clickable
                var tableBody = document.querySelector('#doctor-search-table-body') as HTMLTableElement;
                makeClickableTableRows(tableBody,selectRow,csrfToken)
            }
            else {
                //display error message
                var cell = '<td colspan="4">'+'NO RESULTS TO DISPLAY'+'</td>'
                $('#doctor-search-table-body').html(cell)
            }
        },
        error: () => {
            var cell = '<td colspan="4">'+'ERROR FETCHING RESULTS'+'</td>'
            $('#doctor-search-table-body').html(cell)
        }
    })
}

// SECTION - Patient's Searchbar
/**
 * Fully handles searching for a patient and filling the patient table list.
 * Does this by sending and ajax request to the backend rest controller
 * with the `name` and `pageNum` in the request url and `csrfToken`
 * in the header.
 * It then filled the tables (already has the table id - don't change it on the frontend)
 * Important Note: changing the table id on the frontend will stop this fuction from working.
 * @param name name of the patient
 * @param pageNum patient table pagination/page number
 * @param csrfToken csrf token
 */
export function searchForPatient(name:string, pageNum:number, csrfToken:string) {
    $('#p-pageNum').html(String(pageNum));
    console.log("p-pageNum set to :",pageNum)
    $.ajax({
        url: "/rest/patient/get-patient/name/"+name+'/'+pageNum,
        type: "GET",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data:PatientResponseList) => {
            if(data.success) {
                //fetch results from json response
                var patientRows = patientDataToRows(data);
                //display results
                $('#patient-search-table-body').html(patientRows)
                //setTotalPages
                $('#p-pageTotal').html("of "+data.totalPages)
                //make table rows clickable
                var tableBody = document.querySelector('#patient-search-table-body') as HTMLTableElement;
                makeClickableTableRows(tableBody,selectRow)
            }
            else {
                //display error message
                var cell = '<td colspan="4">'+'NO RESULTS TO DISPLAY'+'</td>'
                $('#patient-search-table-body').html(cell)
            }
        },
        error: () => {
            var cell = '<td colspan="4">'+'ERROR FETCHING RESULTS'+'</td>'
            $('#patient-search-table-body').html(cell)
        }
    })
}

/**
 * Take patient data from an ajax response and turn it into patient table rows.
 * Takes the reponse data on the frontend modelled as a PatientResponseList
 * 
 * @param data PatientResponseList
 * @returns HTML table rows `<tr></tr>` of patient data
 */
export function patientDataToRows(data:PatientResponseList) {
    var rows = '';
    data.patientJsons.forEach( p => {
        var cell = '<tr data-id="'+p.id+'" data-selected="false" data-userType="patient">'+
                        '<td>'+p.name+'</td>'+ 
                        '<td>'+p.username+'</td>'+
                        '<td>'+p.DOB+'</td>'+
                        '<td>'+p.email+'</td>'+
                    '</tr>';
        rows += cell
    })
    return rows
}

// var patientSearchTable = document.querySelector('#patient-search-table-body') as HTMLTableElement

/**
 * Adds a patient to a doctor's patient list by sending a request to the backend.
 * Note: Doesn't update the frontend table. Have to retrieve the table again on the frontend after calling this function.
 * @param pId patient id 
 * @param docId doctor id
 * @param csrfToken csrf token
 * @returns 
 */
export async function addPatientToDoctor(pId:string,docId:string,csrfToken:string) {
    var data = {pId,docId}
    return $.ajax({
        url: "/rest/doctor/add-patient",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data:PatientResponseList) => {
            if(data.success) {
                $('#message').html('<div class="alert alert-info">Patient Added Successfully.</div>')
            }
            else {
                $('#message').html('<div class="alert alert-warning">'+data.message+'</div>')
            }
        },
        error: ()=> {
            $('#message').html('<div class="alert alert-danger">Error adding patient to doctor</div>')
        }
    })
}

/**
 * Sends a request to the backend to remove a patient from a doctor's list
 * @param pId patient id
 * @param docId doctor id
 * @param csrfToken csrf token
 * @returns 
 */
export function removePatientFromDoctor(pId:string,docId:string,csrfToken:string) {
    var data = {pId,docId}
    return $.ajax({
        url: "/rest/doctor/remove-patient",
        type: "DELETE",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data:PatientResponseList) => {
            if(data.success) {
                $('#message').html('<div class="alert alert-info">'+data.message+'</div>')
            }
            else {
                $('#message').html('<div class="alert alert-warning">'+data.message+'</div>')
            }
        },
        error: ()=> {
            $('#message').html('<div class="alert alert-danger">Error removing patient from doctor</div>')
        }
    })
}