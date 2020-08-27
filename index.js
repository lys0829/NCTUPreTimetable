Year = 109
Semester = 1
Courses = [
    {"id":1183,"name":"機率","time":"3CD5G-ED117"},
    {"id":1184,"name":"演算法概論","time":"	2CD4G-EC022"},
    {"id":5255,"name":"平行程式設計","time":"4CDX-EDB27"}
]

function gentable(){
    TimeList = ["M","N","A","B","C","D","X","E","F","G","H","Y","I","J","K","L"];
    TimeStatement = ["6:00 ~ 6:50","7:00 ~ 7:50","8:00 ~ 8:50","9:00 ~ 9:50","10:10 ~ 11:00","11:10 ~ 12:00","12:20 ~ 13:10","13:20 ~ 14:10","14:20 ~ 15:10","15:30 ~ 16:20","16:30 ~ 17:20","17:30 ~ 18:20","18:30 ~ 19:20","19:30 ~ 20:20","20:30 ~ 21:20","21:30 ~ 22:20"]
    Tid=0;
    TimeList.forEach(T => {
        //console.log(T);
        tr = `<tr id="R-${T}"><td scope="row">${T}-(${TimeStatement[Tid++]})</td>`;
        for(D=1;D<=7;D++){
            tr += `<td id="E-${D}${T}" class="TableElement" align='center' valign="middle"></td>`;
        }
        tr += `</tr>`;
        $("#timetable tbody").append(tr);
    });
}

function parseTime(timeCode){
    re = /[1-7][A-Z]+/g;
    timelist = timeCode.match(re);
    res = [];
    timelist.forEach(T => {
        for(i=1;i<T.length;i++){
            res.push(T[0]+T[i]);
        }
    });
    return res;
}

function showTable(CourseList){
    CourseList.forEach(Course => {
        timelist = parseTime(Course['time']);
        for(i=0;i<timelist.length;i++){
            $(`#E-${timelist[i]}`).append(`<button type="button" class="btn btn-outline-secondary course" name="${Course['id']}">${Course['name']}</button>`);
        }
    });
}

function AddCourse(CourseID){

}

$( document ).ready(function() {
    console.log("ready!");
    gentable();
    showTable(Courses);
    //$("#E-1I").append('<button type="button" class="btn btn-outline-secondary course" name="1234">計算機概論與程式設計(英文授課)</button>');
    //$("#E-1J").append('<button type="button" class="btn btn-outline-secondary course" name="1234">計算機概論與程式設計(英文授課)</button>');
    //$("#E-1K").append('<button type="button" class="btn btn-outline-secondary course" name="1234">計算機概論與程式設計(英文授課)</button>');
    //$("#E-1N").append('<button type="button" class="btn btn-secondary course">多媒體資訊系統概論</button>');
    $("#timetable").on("mouseenter",".course",function(event){
        id = $(this).attr("name");
        $(`button[name=${id}]`).addClass("active");
    });
    $("#timetable").on("mouseleave",".course",function(event){
        id = $(this).attr("name");
        $(`button[name=${id}]`).removeClass("active");
    });
    
});
