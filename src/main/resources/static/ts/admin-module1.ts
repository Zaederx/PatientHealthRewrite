/* Data to rows
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
 * Take a tableBody and adds EventListeners 
 * @param tableBody - tableBody
 */
export function makeClickableDoctorTableRows(tableBody:HTMLTableElement, csrfToken?:string) {
    var rows = tableBody?.querySelectorAll('tr');
    rows.forEach( row => {
        row.addEventListener('click', () => {
            var selected = row.getAttribute('data-selected')
            var id = row.getAttribute('data-id') as string
            if (selected == 'false') {
                //unselect previously selected row
                var previouslySelected = tableBody.querySelector('tr[data-selected=true]') as HTMLTableRowElement
                if (previouslySelected) {
                    highlightRow(previouslySelected,plain)
                    previouslySelected.setAttribute('data-selected','false')
                }
                
                //highlight newly selected row
                highlightRow(row,yellow)
                if(csrfToken) {
                    displayDoctorsPatientDetails(id,csrfToken)
                }
                //select doctor row
                row.setAttribute('data-selected', 'true')
            }
        })
    })
}

export function highlightRow(row:HTMLTableRowElement, colour:string) {
    row.style.backgroundColor = colour;
}

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
                makeClickablePatientTableRows(tableBody)
            }
            else {
                var errorMsg = '<tr colspan="4">'+'NO PATIENTS TO DISPLAY'+'</tr>'
                $('#current-patient-table-body').html(errorMsg)
            }
        }
    })
}

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
                makeClickableDoctorTableRows(tableBody,csrfToken)
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

export // SECTION - Patient's Searchbar
function searchForPatient(name:string, pageNum:number, csrfToken:string) {
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
                makeClickablePatientTableRows(tableBody)
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

var patientSearchTable = document.querySelector('#patient-search-table-body') as HTMLTableElement

export function makeClickablePatientTableRows(tableBody:HTMLTableElement = patientSearchTable ) {
    var rows = tableBody?.querySelectorAll('tr');
    rows.forEach( row => {
        row.addEventListener('click', () => {
            var selected = row.getAttribute('data-selected')
            var id = row.getAttribute('data-id') as string
            if (selected == 'false') {
                //unselected previously selected row
                var previouslySelected = tableBody.querySelector('tr[data-selected=true]') as HTMLTableRowElement
                if (previouslySelected) {
                    highlightRow(previouslySelected,plain)
                    previouslySelected.setAttribute('data-selected','false')
                }
                
                //highlight newly selected row
                highlightRow(row,yellow)
                row.setAttribute('data-selected', 'true')
            }
        })
    })
}

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