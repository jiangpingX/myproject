//图片切换
$(".qiehuan>li").mouseover(function(){
    var imgsrc = $(this).find("img").attr("src");
$(this).parent().parent().siblings(".line1").find("img").attr("src",imgsrc);
})


