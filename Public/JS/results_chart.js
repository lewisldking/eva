$(document).ready(function () {
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

});
var colors_array = ["#9440ed","#0033ff", "#cb4b4b", "#4da74d","#edc240", "#999900", "#ff66ff","#afd8f8"]

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

function DrawOneChart(chart_data, placeholder_container, label_container, color_index){
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
