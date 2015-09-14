/**
 * Created by Administrator on 15-2-12.
 */
$(document).ready(function(){
    ShowMachinessList();
});

function ShowMachinessList(){
    var url = "getMachinesList";
    $.get(url,
        function(obj){
            if(obj.status > 0){
                $("#machine_list").html(MachinesListHTML(obj));
            }else{
                alert(obj.info);
            }
        },
        "json"
    );
}

function MachinesListHTML(obj)
{
    var data = obj.data;
    var html = '<table style="table-layout:auto">';
    var html = '<table><tr><th>机器ID</th><th>机器名字</th><th>操作系统</th><th>当前状态</th></tr>';
    if(data != null && data.length > 0) {
        for(var key in data) {
            html += '<tr><td class="price">'+data[key].mid+'</td>';
            html += '<td class="price">'+data[key].mname+'</td>';
            html += '<td class="price">'+data[key].mos+'</td>';
            html += '<td class="price">'+data[key].mstatus+'</td></tr>';
        }
    }else {
        html += '<tr><td class="price" colspan="4" style="text-align:center;matrix:20px">无数据</td></tr>';
    }
    html += '</tbody></table>';
    if(obj.info != null) {
        html += '<div class="pagination pagination-left">'+obj.info+'</div>';
    }
    return html;
}