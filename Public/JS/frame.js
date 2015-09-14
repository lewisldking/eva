
$(document).ready(function(){
    $(".left").bind("click", function(){
        var sub_link = $(this).attr("link");
        var frame = document.getElementById("frame_content_show");
        frame.src = sub_link;
    });
});
