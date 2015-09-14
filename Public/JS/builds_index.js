$(document).ready(function(){
    ShowBuildsList(1);

    $(".head_tab_select").bind("click",function(){
        $("#link_list li").removeClass("ui-tabs-selected");
        $(this).addClass("ui-tabs-selected");
        var select = $(this).attr("t");
        if (select == 2) {
            $("#build_add").show();
            $("#build_list").hide();
        } else {
            $("#build_add").hide();
            $("#build_list").show();
            ShowTasksList(1);
        }
    });
});

function ShowBuildsList(p){
    if(typeof p == undefined) {
        p = 1;
    }else {
        $("body").data("page",p);
    }
    var url = "getBuildList";
    $.get(url,
        {"p": p},
        function(obj){
            if(obj.status > 0){
                $("#build_list").html(BuildsListHtml(obj));
            }else{
                alert(obj.info);
            }
        },
        "json"
    );
}

function BuildsListHtml(obj){
    var data = obj.data;
    var html = '<table style="table-layout:auto">';
    var html = '<table><tr><th>ID</th><th>版本名字</th><th>版本类型</th><th>生成时间</th></tr>';
    if(data != null && data.length > 0) {
        for(var key in data) {
            html += '<tr><td class="price">'+data[key].bid+'</td>';
            html += '<td class="price">'+data[key].bname+'</td>';
            html += '<td class="price">'+data[key].btestname+'</td>';
            html += '<td class="price">'+data[key].bctime+'</td></tr>';
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
