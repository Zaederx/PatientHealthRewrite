//doctor-search-table-body

//doctor-searchbar
function doctorDataToRows(data:DoctorResponseList) {
    var cells = '';
    data.doctorJsons.forEach( d => {
        var cell = '<td>'+d.name+'</td>' + 
                '<td>'+d.username+'</td>'+
                '<td>'+d.specialisation+'</td>'+
                '<td>'+d.email+'</td>';
        cells += cell
    })
    return cells;
}
/**the current page number */
var tablePageNum = 1
var tablePagePrev = 1
var tablePageNext = 2
var totalPages = 1
const buttonLimit = 10

function setPageButtons(currentPageNum:number, total:number) {
    tablePageNum = currentPageNum;
    tablePagePrev = tablePageNum--;
    tablePageNext = tablePageNum++;
    totalPages = total
}
var start = 0
var stopLoop = 0
function generateButtons() {
    
    //go until page total
    if (totalPages < buttonLimit) {
        start = 1
        stopLoop = totalPages;
    }
    //if already at 10 pages - show another 10 (i.e.from 10 to 20)
    else if ((tablePageNum % buttonLimit == 0) && totalPages > buttonLimit) {
        start = tablePageNum
        stopLoop = start + buttonLimit-1
    }
    
    else if ((tablePageNum % buttonLimit != 0) && totalPages > buttonLimit) {
        //if heading to a lower / prev page - currently not visible in numbered buttons
        if (stopLoop > tablePageNum) {
            start = stopLoop - buttonLimit-1
        }
        //if not at the end of page number buttons - don't do anything
        else {
            return
        }
    }
    var buttonsHTML = ''
    buttonsHTML += '<div class="btn btn-primary" onclick="clickPrev()">'+'Prev'+'</div>'
    for(var i = start; i <= stopLoop; i++) {
        buttonsHTML += '<div class="btn btn-primary" id="page-btn-'+i+'" onclick="clickPageBtn('+i+')">'+i+'</div>'
    }
    buttonsHTML += '<div class="btn btn-primary" onclick="clickNext()">'+'Next'+'</div>'
    $('#doctor-table-buttons').html(buttonsHTML)
}
function clickPrev() {
    clickPageBtn(tablePagePrev)
}
function clickNext() {
    clickPageBtn(tablePageNext)
}
function clickPageBtn(pageNum: number) {
    var name = $('#doctor-searchbar').val() as string;
    $.ajax({
        url: "/rest/doctor/name/"+name+'/'+pageNum,
        type: "GET",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data:DoctorResponseList) => {
            if(data.success) {
                var doctorRows = doctorDataToRows(data);
                //display results
                $('#doctor-search-table-body').html(doctorRows)
                setPageButtons(pageNum,data.totalPages)
                generateButtons()
            }
            else {
                //display error message
            }
        }
    })
}

//oninput - query
$('#doctor-searchbar').on('input', ()=> {
    var name = $('#doctor-searchbar').val() as string;
    $.ajax({
        url: "/rest/doctor/name/"+name,
        type: "GET",
        dataType:"json",
        headers: {'X-CSRF-TOKEN':csrfToken},
        success: (data:DoctorResponseList) => {
            if(data.success) {
                var doctorRows = doctorDataToRows(data);
                //display results
                $('#doctor-search-table-body').html(doctorRows)
            }
            else {
                //display error message
            }
        }
    })
})