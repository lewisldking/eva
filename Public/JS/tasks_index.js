$(document).ready(function(){
    ShowTasksList(1);

    $(".head_tab_select").bind("click",function(){
        $("#link_list li").removeClass("ui-tabs-selected");
        $(this).addClass("ui-tabs-selected");
        var select = $("#link_list .ui-tabs-selected").attr("t");
        if (select == 2) {
            $("#create_tasks").show();
            $("#tasks_show").hide();

            var testType = $("#tType").val();
            getBuilds(testType);
            getMachines();
        } else {
            $("#create_tasks").hide();
            $("#tasks_show").show();
            ShowTasksList(1);
        }
    });

    $("#bType").bind("change", function(){
        ShowTasksList(1);
    });

    $("#tType").bind("change", function(){
        var testType = $("#tType").val();
        getBuilds(testType);
    });

});

function ShowTasksList(p){
    if(typeof p == undefined) {
        p = 1;
    }else {
        $("body").data("page",p);
    }
    var testType = $("#bType").val();

    var url = "getTaskList";
    $.get(url,
        {
            "p": p,
            "t": testType
        },
        function(obj){
            if(obj.status > 0){
                $("#tasks_list").html(TasksListHtml(obj));

                $(".task").on("click", 'a', function(){
                    var tid = $(this).attr("tid");
                    var curRow = $(this).parent().parent();
                    var url = "getJobListByTaskID";

                    $.get(url,
                        {"tid": tid},
                        function(obj){
                            if(obj.status > 0){
//                                alert("length:"+obj.data.length);
                                ShowDetailJobs(curRow,obj);
                            }else{
                                alert(obj.info);
                            }
                        },
                        "json"
                    );
                });

            }else{
                alert(obj.info);
            }
        },
        "json"
    );
}

function TasksListHtml(obj){
    var data = obj.data;
    var html = '<table><tr><th>ID</th><th>版本类型</th><th>测试版本</th><th>执行状态</th><th>是否发邮件</th><th>创建时间</th><th>查看</th></tr>';
    if(data != null && data.length > 0) {
        for(var key in data) {
            html += '<tr class="task"><td class="price">'+data[key].tid+'</td>';
            html += '<td class="price">'+data[key].btestname+'</td>';
            html += '<td class="price">'+data[key].bname+'</td>';
            switch ( data[key].tstatus){
                case '0':
                    html += '<td class="price">未执行</td>';
                    break;
                case '1':
                    html += '<td class="price">执行中</td>';
                    break;
                case '2':
                    html += '<td class="price">完成</td>';
                    break;
                case '4':
                    html += '<td class="price">异常</td>';
                    break;
            }
            if(data[key].temail==0){
                html += '<td class="price">未发送</td>';
            }else{
                html += '<td class="price">已发送</td>';
            }
            html += '<td class="price">'+data[key].tctimestamp+'</td>';

            html += '<td class="price"><a href="javascript:void(0)" tid="'+data[key].tid+'" >查看详情</a> </tr>';
        }
    }else {
        html += '<tr><td class="price" colspan="7" style="text-align:center;matrix:20px">无数据</td></tr>';
    }
    html += '</table>';
    if(obj.info != null) {
        html += '<div class="pagination pagination-left">'+obj.info+'</div>';
    }
    return html;
}

function ShowDetailJobs(row, ajaxobj){
    var data = ajaxobj.data;

    if(data != null && data.length > 0) {
        var html = '<tr class="detailsjob"><th rowspan="'+(data.length+1)+'">Job 详细信息</th><th>job ID</th><th>机器名称</th><th>执行状态</th><th>机器IP</th><th colspan="2">机器系统</th></tr>';
        for(var key in data) {
            html += '<tr class="detailsjob"><td class="price">'+data[key].jid+'</td>';
            html += '<td class="price">'+data[key].mname+'</td>';
            switch ( data[key].jstatus){
                case '0':
                    html += '<td class="price">未执行</td>';
                    break;
                case '1':
                    html += '<td class="price">执行中</td>';
                    break;
                case '2':
                    html += '<td class="price">完成</td>';
                    break;
                case '4':
                    html += '<td class="price">异常</td>';
                    break;
            }

            html += '<td class="price">'+data[key].mip+'</td>';
            html += '<td colspan="2" class="price">'+data[key].mos+'</td></tr>';
        }

        $(".detailsjob").remove();
        row.after(html);
    }

}

function getBuilds(aType) {
    var url = "getTypes";
    $.get(url,
        {"tType": aType},
        function (obj) {
            BindBuildsOptionsHTML(obj);
        },
        "json"
    );
}
function BindBuildsOptionsHTML(obj) {
    var data = obj.data;
    var html = "";
    if (data != null && data.length > 0) {
        for (var key in data) {
            html += '<option value="' + data[key].id + '">' + data[key].bname + '</option>';
        }
        $("#tBuild").html(html);
    }
}
function getMachines(){
    var url = "getMachines";
    $.get(
        url,
        function(obj){
            BindMachinesOptionsHTML(obj);
        },
        "json"
    );
}
function BindMachinesOptionsHTML(obj) {
    var data = obj.data;
    var html = "";
    if (data != null && data.length > 0) {
        for (var key in data) {
            html += '<option value="' + data[key].mid + '">' + data[key].mos + '</option>';
        }
        $("#tMachine").html(html);
    }
}