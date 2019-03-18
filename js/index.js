
//城市选择部分
$.ajax({
    type:"get",
    url:"../city.json",
    success:function(data){
    data.forEach(function(item){
        var title = item["title"];
        var list = item["list"];
        var div = $(`<div class="city_content">
            <em>${title}</em>
        </div>`);
        list.forEach(function(item){
        div.append(`<a href="javascript:;">${item}</a>`);
        })
        $(".city_total").append(div);
    })
    }
})
$(".scroll_part>li").mouseover(function(){
    var data_id = $(this).attr("data-id")-1;
    var top = 0;
    for(var i=0;i<data_id;i++){
         top+= parseInt($(".city_total>.city_content").eq(i).css("height"))+5 ;
    }
    
    $(".city_total").stop().animate({scrollTop:top},1000);
    
})


//选项卡部分
$(".left_list_ul").children().hover(function(){
    $(this).find(".smallshawdow").show();
},function(){
    $(this).find(".smallshawdow").hide();
})


//轮播图部分
// var curIndex=-1;
// var timer = null;
// var lis = $("#ul1>img");
// var length = lis.length;
// var move = function(){
//     if(curIndex== length-1)
//     {
//         curIndex = 0;
//     }
//     else{
//         curIndex++;
//     }
//     lis.eq(curIndex-1).fadeOut(500);
//     lis.eq(curIndex).fadeIn(500);
//     $("#ol1>li").removeClass("selected");
//     $("#ol1>li").eq(curIndex).addClass("selected");
    
// };
// move();
// timer = setInterval(move,3000);

// $("#ol1>li").hover(function(){
//     clearInterval(timer);
// },function(){
//     timer = setInterval(move,3000);
// })



