$(document).ready(function () {
    var os_type = $("#os_type");
    getOSList(os_type);
    getResultListByType("AVC", "OEM");
    getCleanOSList();

    $(".head_tab_select").bind("click", function () {
        $("#link_list li").removeClass("ui-tabs-selected");
        $(this).addClass("ui-tabs-selected");
        var select = $("#link_list .ui-tabs-selected").attr("t");
        if(select == 3){
            $("#result_chart").show();
            $("#result_list").hide();
            $("#clean_result").hide();

            var chart_os_type = $("#chart_os_type");
            getOSList(chart_os_type);

            $("#chart_btn").bind("click", function () {
                $("#container").html("loading...");
                var chart_av_type_val = $("#chart_av_type").val();
                var chart_os_val = $("#chart_os_type").val();
                var url = "getChartData";
                $.get(
                    url,
                    {
                        "cav": chart_av_type_val,
                        "cos": chart_os_val
                    },
                    function (obj) {
                        DrawAllCharts(obj)
                    },
                    "json"
                );

            });
        }
        else if (select == 2) {
            $("#result_chart").hide();
            $("#clean_result").show();
            $("#result_list").hide();
            var mid = $("#mid");
            getOSList(mid);
        } else {
            $("#result_chart").hide();
            $("#clean_result").hide();
            $("#result_list").show();

            var os_type = $("#os_type");
            getOSList(os_type);
            getResultListByType("AVC", "OEM");
        }
    });

    $("#evaluate_type").bind("change", function () {
        var valueType = $("#evaluate_type").val();
        var avType = $("#av_type").val();
        getResultListByType(valueType, avType);
    });
    $("#av_type").bind("change", function () {
        var valueType = $("#evaluate_type").val();
        var avType = $("#av_type").val();
        getResultListByType(valueType, avType);
    });


    $("#test_result").bind("change", function () {
        var jid = $("#test_result").val();
        $("#test_date").html(getDateListByJobID(jid));
    });

    $("#compare_btn").bind("click", function () {
        $("#result_table").html('Loading...');
        var testjobid = $("#test_date").val();
        var standard_value = $("#standard_value").val();

        var url = "getResultsList";
        $.get(
            url,
            {
                "testid": testjobid,
                "svalue": standard_value
            },
            function (obj) {
                ShowResultsList(obj)
            },
            "json"
        );
    });
    $("#view_btn").bind("click", function(){
        $("#result_table").html('Loading...');
        var clean_task_id = $("#date_clean").val();
        var url = "getCleanViewList";
        $.get(
            url,
            {'ctid': clean_task_id},
            function(obj){
                ShowCleanViewList(obj);
            },
            "json"
        );
    });

    $("#set_btn").bind("click",function(){
       var clean_task_id = $("#date_clean").val();
        var url = "updateCleanDefaultValue";
        $.post(
            url,
            {'ctid':clean_task_id},
            function(obj){
                ShowSetDefaultResult(obj);
            },
            "json"
        );

    });


});

function ShowSetDefaultResult(obj){
    $("#setDefault").html("");
    var status = obj.status;
    if(status != null && status > 0){
        $("#setDefault").html("设置成功！");
    }
    else{
        $("#setDefault").html("设置出错"+ obj.info);
    }
    setTimeout(function(){
        $("#setDefault").html("");
    }, 3000);
}

function ShowCleanViewList(obj) {
    var data = obj.data;
    var html = '<table style="width: 60%;"><tr><th>测试用例</th><th>测试数据</th></tr>';
    if (data != null && data.length > 0) {
        for (var key in data) {
            html += '<tr><td class="price">' + data[key].crname + '</td>';
            html += '<td class="price">' + data[key].crvalue + '</td></tr>';
        }
    } else {
        html += '<tr><td class="price" colspan="2" style="text-align:center;matrix:20px">无数据</td></tr>';
    }
    html += '</table>';
    $("#result_table").html(html);
}

function ShowResultsList(obj) {
    var data = obj.data;
    var html = '<table style="width: 85%;"><tr><th>测试用例</th><th>基准版本数据</th><th>测试版本数据</th><th>数据对比</th><th>数据打分</th></tr>';
    if (data != null && data.length > 0) {
        for (var key in data) {
            html += '<tr><td class="price">' + data[key].crname + '</td>';
            html += '<td class="price">' + data[key].basevalue + '</td>';
            html += '<td class="price">' + data[key].testvalue + '</td>';
            html += '<td class="price">' + data[key].percent + '%</td>';
            html += '<td class="price">' + data[key].score + '</td></tr>';
        }
    } else {
        html += '<tr><td class="price" colspan="5" style="text-align:center;matrix:20px">无数据</td></tr>';
    }
    html += '</table>';
    $("#result_table").html(html);
}

function getOSList(select) {
    var url = "getOSList";
//    $.get(url,
//        function (obj) {
//            BindOSList(obj, select);
//        },
//        "json"
//    );
    $.ajax({
        url:url,
        async:false,
        type: 'get',
        dataType:'json',
        success: function(obj){
            BindOSList(obj, select);
        }
    });

}

function BindOSList(obj, selector) {
    var data = obj.data;
    var html = "";
    if (data != null && data.length > 0) {
        for (var key in data) {
            html += '<option value="' + data[key].mid + '">' + data[key].mos + '</option>';
        }
    }
    selector.html(html);
}

function getCleanOSList() {
    var url = "getCleanOSList";
    $.get(url,
        function (obj) {
            BindCleanOSList(obj);
        },
        "json"
    );
}

function BindCleanOSList(obj) {
    var data = obj.data;
    var html = "";
    if (data != null && data.length > 0) {
        for (var key in data) {
            html += '<option value="' + data[key].mos + '">' + data[key].mos + '</option>';
        }
    }
    $("#os_clean").html(html);
    getCleanDateTimeList();
}
function getCleanDateTimeList() {
    var url = "getCleanDateTimeList";
    var os = $("#os_clean").val();
    $.get(url,
        {'os': os},
        function (obj) {
            BindCleanDateTimeList(obj);
        },
        "json"
    );
}
//task_info.tid, task_info.tctimestamp, task_info.tcleanset
function BindCleanDateTimeList(obj) {
    var data = obj.data;
    var html = "";
    if (data != null && data.length > 0) {
        for (var key in data) {
            if (data[key].tcleanset == 1) {
                html += '<option value="' + data[key].tid + '" selected="selected">' + data[key].tctimestamp + '</option>';
            } else {
                html += '<option value="' + data[key].tid + '">' + data[key].tctimestamp + '</option>';
            }

        }
    }
    $("#date_clean").html(html);
}

function getResultListByType(testType, avType) {
    var url = "getTypes";
    var type = testType + '_' + avType;
    $.get(url,
        { "t": type },
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
        var first_index = 0;
        for (var key in data) {
            if (first_index == 0) {
                first_index = data[key].id;
            }
            html += '<option value="' + data[key].id + '">' + data[key].bname + '</option>';
        }
//        $("#base_result").html(html);
        $("#test_result").html(html);
        var tempHTML = getDateListByJobID(first_index);
//        $("#base_date").html(tempHTML);
        $("#test_date").html(tempHTML);
    }
    else {
//        $("#base_result").html("");
        $("#test_result").html("");
//        $("#base_date").html("");
        $("#test_date").html("");
    }
}

function getDateListByJobID(job_id) {
    var url = "getDateList"
    var html = "";
    var mid = $("#os_type").val();
    $.ajax({async: false,
        url: url,
        data: {'jid': job_id, "mid": mid},
        success: function (obj) {
            html = DateListHTML(obj);
        },
        dataType: "json"
    });
    return html;
}

function DateListHTML(obj) {
    var data = obj.data;
    var html = "";
    if (data != null && data.length > 0) {
        for (var key in data) {
            html += '<option value="' + data[key].job_id + '">' + data[key].tctimestamp + '</option>';
        }
        $("#compare_btn").removeAttr("disabled");
    }
    else
    {
        $("#compare_btn").attr("disabled","disabled");
    }
    return html;
}

function DrawAllCharts(obj){
    if(obj.status > 0){
        var data = obj.data;
        if(data != null)
        {
            var container_HTML = "";
            var legend_prefix = "legend_";
            for(var key in data){
                container_HTML += "<div id='legend_"+data[key]['label']+"' style='width: 100%; margin-top: 20px;'></div>";
                container_HTML += "<div id='placeholder_"+data[key]['label']+"' style='width: 100%; height: 250px;margin-bottom: 60px;'></div>";
            }
            // 先自动加上 图表的div
            $("#container").html(container_HTML)
            var index = 0;
            for(var key in data){
                var legend_div_id = $("#"+"legend_"+data[key]['label']);
                var chart_div_id = $("#"+"placeholder_"+data[key]['label']);

                var temp_data = new Array(data[key]);
                DrawOneChart(temp_data, chart_div_id, legend_div_id, index);
                bingToolTips(chart_div_id);
                index++;
            }

        }

    }
    else{
        alert($("#container").html("加载失败:"+obj.info+", 重新点击或者联系dabuwang"));
    }
}
var colors_array = ["#9440ed","#0033ff", "#cb4b4b", "#4da74d","#edc240", "#999900", "#ff66ff","#afd8f8"]
function DrawOneChart(chart_data, placeholder_container, label_container,color_index){
    var options = {
        colors: new Array(colors_array[color_index%colors_array.length]),
        lines: {
            show: true,
            lineWidth: 1
        },
        valueLabels: {
            show: true,
            showAsHtml: true,
            align: "center"
        },
        points: {
            show: true,
            radius: 4
        },
        grid : {
            hoverable : true,
            clickable : true
        },
        legend:{
            show:true,
            layout: 'h',
            container: label_container
        },
        xaxis: {
            show: true,
            mode: "categories",
            tickLength: 0
        }
    };

    $.plot(placeholder_container,chart_data,options);
}

function showTooltip(x, y, contents) {
    $('<div id="tooltip">' + contents + '</div>').css( {
        position: 'absolute',
        display: 'none',
        top: y + 10,
        left: x + 10,
        border: '1px solid #fdd',
        padding: '2px',
        'background-color': '#fee',
        opacity: 0.80
    }).appendTo("body").fadeIn(200);
}

function bingToolTips(chart_div_id){
    var temp_Point = null;
    if(chart_div_id != null){
        chart_div_id.bind("plothover", function (event, pos, item) {
            if (item) {
                if (temp_Point != item.dataIndex) {
                    temp_Point = item.dataIndex;
                    $("#tooltip").remove();
                    var y = item.datapoint[1].toFixed(2);
                    showTooltip(item.pageX, item.pageY,y);
                }
            }
            else {
                $("#tooltip").remove();
                temp_Point = null;
            }
        });
    }
}
