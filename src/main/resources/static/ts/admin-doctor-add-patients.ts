var csrfToken = $("meta[name='_csrf']").attr("content");//needed for post requests
//SECTION doctor-searchbar
$('#doctor-searchbar').on('input', ()=> {
    //if no page number given - it uses current page number
    var name = $('#doctor-searchbar').val() as string;
    searchForDoctor(name)
    var tableBody = document.querySelector('#doctor-search-table-body') as HTMLTableElement;
    makeClickableTableRows(tableBody)
})

/**
 * Data to rows
 * @param data - AJAX response DoctorResponseList
 * @returns 
 */
function doctorDataToRows(data:DoctorResponseList) {
    var rows = '';
    data.doctorJsons.forEach( d => {
        var cell = '<tr data-docId="'+d.id+'" data-selected="false">'+
                        '<td>'+d.name+'</td>' + 
                        '<td>'+d.username+'</td>'+
                        '<td>'+d.specialisation+'</td>'+
                        '<td>'+d.email+'</td>'+
                    '</tr>';
        rows += cell
    })
    return rows;
}

/**
 * Take Ajax response data (DoctorResponseList) and returns
 * table rows of patient data
 * @param data DoctorResponseList
 * @returns rows - of patient data
 */
function doctorPatientsDataToRows(data:DoctorResponseList) {
    var rows = '';
    data.doctorJsons[0].patients.forEach( p => {
        var cell = '<tr data-docId="'+p.id+'" data-selected="false">'+
                        '<td>'+p.name+'</td>'+ 
                        '<td>'+p.username+'</td>'+
                        '<td>'+p.DOB+'</td>'+
                        '<td>'+p.email+'</td>'+
                    '</tr>';
        rows += cell
    })
    return rows
}

const light_blue = '#86f9d6'
const light_red = '#fad6bb'
const yellow = '#fdfc8a'
const plain = ''

/**
 * Take a tableBody and adds EventListeners 
 * @param tableBody - tableBody
 */
function makeClickableTableRows(tableBody:HTMLTableElement) {
    var rows = tableBody?.querySelectorAll('tr');
    rows.forEach( row => {
        row.addEventListener('clicked', () => {
            var selected = row.getAttribute('data-selected')
            var docId = row.getAttribute('data-docId') as string
            if (selected == 'false') {
                highlightRow(row,yellow)
                displayDoctorsPatientDetails(docId)
                row.setAttribute('data-selected', 'true')
            }
            else {
                highlightRow(row,plain)
                clearDoctorsPatientsDetailsTable()
                row.setAttribute('data-selected', 'false')
            }
        })
    })
}

function highlightRow(row:HTMLTableRowElement, colour:string) {
    row.style.backgroundColor = colour;
}

function displayDoctorsPatientDetails(doctorId:string) {
    $.ajax({
        url: "rest/doctor/get-patients/"+doctorId,
        type: "GET",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data:DoctorResponseList) => {
            if(data.success) {
                var rows = doctorPatientsDataToRows(data)
                $('#patient-search-table-body').html(rows)
            }
            else {
                var errorMsg = '<tr colspan="4">'+'NO PATIENTS TO DISPLAY'+'</tr>'
                $('#patient-search-table-body').html(errorMsg)
            }
        }
    })
}

function clearDoctorsPatientsDetailsTable() {
    $('#patient-search-table-body').html('');
}

/**the current page number */
var tableCurrentPageNum = 1
var tablePagePrev = 1
var tablePageNext = 2
var totalPages = 1

function setPageNumVars(currentPageNum:number) {
    tableCurrentPageNum = currentPageNum;
    tablePagePrev = tableCurrentPageNum - 1;
    tablePageNext = tableCurrentPageNum + 1;
}

function setTotalPages(total:number) {
    totalPages = total
}

$('#btn-prev').on('click', () => {
    var name = $('#doctor-searchbar').val() as string;
    searchForDoctor(name,tablePagePrev)
})
$('#btn-next').on('click', () => {
    var name = $('#doctor-searchbar').val() as string;
    searchForDoctor(name,tablePageNext)
})
$('#btn-go').on('click', () => {
    var name = $('#doctor-searchbar').val() as string;
    var pageNum = Number($('#pageNum').html() as string)

    searchForDoctor(name,pageNum)
})

function searchForDoctor(name:string, pageNum:number = tableCurrentPageNum) {
    setPageNumVars(pageNum as number)
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
                setTotalPages(data.totalPages)
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

