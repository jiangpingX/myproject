$("#input1").bind("input",function(){
    var username = $("#input1").val();
  num1 = checkUsername(username);
 rydm(num1,"#input1");
});
$("#input2").bind("input",function(){
    var userpwd = $("#input2").val();
  num2 = checkUserpwd(userpwd);
 rydm(num2,"#input2");
});
$("#input4").bind("input",function(){
    var usertel = $("#input4").val();
  num4 = checkUsertel(usertel);
 rydm(num4,"#input4");
});
$("#input3").bind("input",function(){
    if(($("#input2").val()==$("#input3").val())&&($("#input3").val().length!=0))
    {
        $("#input3").siblings(".tip_right").css({"visibility":"visible"});
        $("#input3").siblings(".tip_bottom").css({"visibility":"hidden"});
        num3 = 1;
        
    }
    else{
        $("#input3").siblings(".tip_right").css({"visibility":"hidden"});
        $("#input3").siblings(".tip_bottom").css({"visibility":"visible"});
        num3 = 0;
    }
    return num3;
})
//生成验证码
$("#yanzhengma").click(function(){
    var random;
    var str = "";
    for(var i =0;i<4;i++)
    {
        random = Math.floor(Math.random()*9) ;
        str+= random;
    }
    $("#yanzhengma").html(str);
})
//点击注册
$("#zhece").click(function(){
    ($("#input5").val())==($("#yanzhengma").html())?num6=1:num6=0;
    $("#checkbox")[0].checked?num5=1:num5=0;
    if(num5==0){
        $(".xieyi").children("p").css({"visibility":"visible"});
    }
    else{
        $(".xieyi").children("p").css({"visibility":"hidden"});
    }
    if(num1==num2==num3==num4==num5==num6)
    {
        var username = $("#input1").val();
        var userpwd = $("#input2").val();
        var usertel = $("#input4").val();
        getuserData(username,userpwd,usertel).then(function(data){
                setuserData(data);
        })
    }
})



//获取数据
function getuserData(username,userpwd,usertel){
    var p = new Promise(function(resolve,reject){
        $.ajax({
            type:"get",
            url:"../php/register.php",
            data:{
                username:username,
                userpwd:userpwd,
                usertel:usertel
            },
            dataType:"json",
            success:function(data){
                resolve(data);
            }
        })
    })
    return p;
}
//数据处理
function setuserData(data){
switch(data["code"])
{
    case 0:
    // alert("用户名已存在");
    $("#username_tip").css({"visibility":"visible"});
    $("#username_tip").html("用户名已存在!");

    break;
    case 1:
    alert("即将跳转");
    //跳转到商品列表
    break;
    case 2:
    $("#usertel_tip").css({"visibility":"visible"});
    $("#usertel_tip").html("该手机号已被注册!");
    break;
}
}


function checkUsername(username){
    //用户名正则，4到16位（字母，数字，下划线
    var req = /^[a-zA-Z0-9_]{4,16}$/;
    return req.test(username);
}
function checkUserpwd(userpwd){
    //6-21位字母和数字
    var req=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
    return req.test(userpwd);
}
function checkUsertel(usertel){
    var req= /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    return req.test(usertel);
}
function rydm(num,obj){
    if(num==1)
 {
     $(obj).siblings(".tip_right").css({"visibility":"visible"});
     $(obj).siblings(".tip_bottom").css({"visibility":"hidden"});
     
 }
 else{
    $(obj).siblings(".tip_bottom").css({"visibility":"visible"});
    $(obj).siblings(".tip_right").css({"visibility":"hidden"});
    
 }
}