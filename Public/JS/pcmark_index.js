$(document).ready(function () {
    var os_type = $("#os_type");
    getOSList(os_type);
    getResultListByType("AVC_OEM");
    getCleanOSList();

    $(".head_tab_select").bind("click", function () {
        $("#link_list li").removeClass("ui-tabs-selected");
        $(this).addClass("ui-tabs-selected");
        var select = $("#link_list .ui-tabs-selected").attr("t");
        if (select == 2) {
            $("#clean_result").show();
            $("#result_list").hide();
            var mid = $("#mid");
            getOSList(mid);
        } else {
            $("#clean_result").hide();
            $("#result_list").show();

            var os_type = $("#os_type");
            getOSList(os_type);
            getResultListByType("AVC_OEM");
        }
    });

    $("#evaluate_type").bind("change", function () {
        var valueType = $("#evaluate_type").val();
        getResultListByType(valueType);
    });

    $("#test_result").bind("change", function () {
        var jid = $("#test_result").val();
        $("#test_date").html(getDateListByJobID(jid));
    });

    $("#compare_btn").bind("click", function () {
        $("#result_table").html('Loading...');
        var testjobid = $("#test_date").val();
        var url = "getResultsList";
        $.get(
            url,
            {
                "testid": testjobid
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
    var html = '<table style="width: 70%;"><tr><th width="30%">PCMark平均得分</th><th width="30%">标准差</th><th width="40%">具体结果</th></tr>';
    if (data != null && data.length > 0) {
        for (var key in data) {
            html += '<tr><td class="price">' + data[key].pcavgvalue + '</td>';
            html += '<td class="price">' + data[key].pcdevivalue + '</td>';
            html += '<td class="price">' + data[key].pcdetailvalues + '</td></tr>';
        }
    } else {
        html += '<tr><td class="price" colspan="3" style="text-align:center;matrix:20px">无数据</td></tr>';
    }
    html += '</table>';
    $("#result_table").html(html);
}

function ShowResultsList(obj) {
    var data = obj.data;
    var html = '<table style="width: 85%;"><tr><th>测试环境</th><th>按照AVC规则得分</th><th>PCMark8得分(WorkBench)</th><th>标准差</th><th>详细数据</th></tr>';
    if (data != null && data.length == 2) {
        var index = 0, clean_value = 1;
        for (var key in data) {
            if(index == 0)
            {
                html += '<tr><td class="price">' + "干净系统" + '</td>';
                html += '<td class="price">' + 100.00 + '</td>';
                clean_value = data[key].pcavgvalue;
            }
            else
            {
                html += '<tr><td class="price">' + "测试版本" + '</td>';
                var test_score = (100* data[key].pcavgvalue)/clean_value;
                test_score = Math.round(test_score*100)/100
                html += '<td class="price">' + test_score   + '</td>';
            }

            html += '<td class="price">' + data[key].pcavgvalue + '</td>';
            html += '<td class="price">' + Math.round(data[key].pcdevivalue*100)/100 + '</td>';
            html += '<td class="price">' + data[key].pcdetailvalues + '</td></tr>';
            index ++;
        }
    } else if(data.length == 0 ){
        html += '<tr><td class="price" colspan="5" style="text-align:center;matrix:20px">无数据</td></tr>';
    } else{
        html += '<tr><td class="price" colspan="5" style="text-align:center;matrix:20px">数据长度不对</td></tr>';
    }

    html += '</table>';
    $("#result_table").html(html);
}

function getOSList(select) {
    var url = "getOSList";
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

function getResultListByType(testType) {
    var url = "getTypes";
    var type = testType;
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
        $("#test_result").html(html);
        var tempHTML = getDateListByJobID(first_index);
        $("#test_date").html(tempHTML);
    }
    else {
        $("#test_result").html("");
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

