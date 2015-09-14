function U(sUri)
{
    return "/"+sUri;
}

function P(sUri)
{
    return "/Public/"+sUri;
}
function hideMsg(obj)
{
    $(obj).parent().parent().slideUp();
}

function getMsg(iCode,sMsg)
{
    var sType = "";
    var sTitle = "";
    switch(iCode) {
        case 0:
            sType = "error";sTitle = "错误消息";
            break;
        case -1:
            sType = "notice";sTitle = "通知";
            break;
        case -2:
            sType = "warning";sTitle = "警告";
            break;
        default:
            sType = "success";sTitle = "系统消息";
            break;
    }
    var html = '<div id="message-'+sType+'" class="message message-'+sType+'"><div class="image"><img src="'+P('images/'+sType+'.png')+'" alt="'+sType+'" height="32" /></div>';
    html += '<div class="text"><h6>'+sTitle+'</h6><span>'+sMsg+'</span></div><div class="dismiss"><a href="javascript:void(0);" onclick="hideMsg(this)"></a></div></div>';
    return html;
}

function getRequest(url,param,func)
{
    $.get(url,param,func,"json");
}

function postRequest(url,param,func)
{
    $.post(url,param,func,"json");
}

function closeLayout()
{
    $('#frame_overlay_dialog').overlay().close();
}

function loadLayout(html,cb,top)
{
    $('#frame_overlay_dialog').html(html);
    if(cb != undefined && cb !="") {
        cb();
    }
    var left = ($("body").width() - $("#frame_overlay_dialog").width()) / 2;
    $('#frame_overlay_dialog').css("left",left+"px");
    if(top != undefined && top !="") {
        $('#frame_overlay_dialog').css("top",top+"px");
    }
    $("#frame_overlay_dialog").overlay().load();

}