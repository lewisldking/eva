/**
 * Created by dabuwang on 15-6-19.
 */
$(document).ready(function () {
    getDateList();
    getStatusList();
	
    $("#search").bind("click", function () {
        getStatusList();		
    });

});

function getDateList() {
    var url = "getDateList";
    $.ajax({
        url:url,
        async:false,
        type: 'get',
        dataType:'json',
        success: function(obj){
            BindDateList(obj);
        }
    });
}

function BindDateList(obj) {
    var data = obj.data;
    var htmldate = "";

    if (data != null && data.length > 0) {
        for (var key in data) {
            htmldate += '<option value="' + data[key].date + '">' + data[key].date + '</option>';
        }
    }
    $("#date").html(htmldate);
}

function getStatusList(){
    var datetime = $("#date").val();
    var url = "getStatusList";
    $.get(url,
        {'dt': datetime},
        function (obj) {
            BindStatusList(obj);
        },
        "json"
    );
}
function BindStatusList(obj){
 var data = obj.data;
    var html = '<table style="border-collapse: collapse;width: 90%; font-size:11pt; " border="1px" align="center"><tr><th width="25%">测试名称</th><th width="15%">开始时间</th><th width="15%">完成时间</th><th width="15%">测试结果</th><th width="15%">状态</th><th width="15%">任务说明</th></tr>';
    if (data != null && data.length > 0) {
        var temp_task_id = 0;
        for (var key in data) {
            if(temp_task_id != data[key].atid){
                temp_task_id = data[key].atid;
                html += '<tr class="task" id="task_'+data[key].atid+'" align="center"><td >' + data[key].tname + '</td>';

                html += '<td>' + data[key].atstarttime + '</td>';
                html += '<td>' + data[key].atendtime + '</td>';
                html += '<td>' + data[key].tresult + '</td>';
                if(data[key].status == 0)
                {
                    html += '<td>测试执行中</td>';
                }else{
                    html += '<td>测试完成</td>';
                }
                html += '<td>' + data[key].tcomment + '</td></tr>';

                // here is subjobstitle, if there is NOT job id, continue FOR loop
                if(data[key].ajid != null && data[key].ajid != 'undefined'){
                    html += '<tr class="job task_'+data[key].atid+'"><th>测试版本</th><th colspan="2">测试时间</th><th>测试结果</th><th colspan="2">详细日志</th></tr>';
                }else{
                    continue;
                }
            }
            // here is subjobs content
            html += '<tr class="job task_'+data[key].atid+'" align="center"><td >' + data[key].ajpcmgrver + '</td>';

            html += '<td colspan="2">' + data[key].ajmtime + '</td>';
            if(data[key].ajresult == 0){
                html += '<td style="color:green">测试通过</td>';
            }else{
                html += '<td style="color:red">测试失败</td>';
            }
            html += '<td colspan="2"><a href="/eva/upload/autojobs/'+data[key].ajlogpath +'"  target="_blank">结果日志</a></td></tr>';

        }
    } else {
        html += '<tr><td colspan="5" style="text-align:center;matrix:20px">无数据</td></tr>';
    }
    html += '</table>';
    $("#statsList").html(html);
	
	$(".job").hide();
	
	$(".task").bind("click", function () {
		$('.job.'+this.id).toggle();
	}).bind("mouseover", function () {
		$(this).addClass("mouseover");
	}).bind("mouseout", function () {
		$(this).removeClass("mouseover");
	});
}