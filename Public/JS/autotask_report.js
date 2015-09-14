/**
 * Created by dabuwang on 15-6-19.
 */
$(document).ready(function () {

    getReportList();
	
    $("#search").bind("click", function () {
        getReportList();		
    });

});

function getReportList(){
    var days = $("#date").val();
    var url = "getReportDataByDays";
    $.get(url,
        {'days': days},
        function (obj) {
            DrawPieChat(obj);
        },
        "json"
    );
}
function DrawPieChat(obj){
	$("#report_pie").html('');
	var status = obj.status;
	if( status > 0){
		//var data = obj.data;
		var data = [];
		
		for(var i = 0; i< obj.data.length; i++){
			var temp_label = '';
			switch(obj.data[i].label){
				case '0':
					temp_label = "pass";
					break;
				case '1':
					temp_label = "failed";
					break;
				case null:
					temp_label = "nostatus";
					break;
				default:
					temp_label = "nostatus";
					break;
				
			}
			data[i] = {
				label:temp_label,
				data: Number(obj.data[i].data)
			}
		}
		
		$.plot($("#report_pie"), data,{
			series: {
				pie: { 
					innerRadius: 0.3,
					show: true,
					label: {
						show: true
					}
				}
			}
			
		});
	}else{
		$("#report_pie").html(obj.info);
	}
}