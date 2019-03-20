$("#login").click(function(){
var username = $("#username").val();
var userpwd = $("#userpwd").val();
getuserData(username,userpwd).then(function(data){
    setData(data);
})
})




function getuserData(username,userpwd){
    var p = new Promise(function(resolve,reject){
        $.ajax({
            type:"get",
            url:"../php/login.php",
            data:{
                username:username,
                userpwd:userpwd,
            },
            dataType:"json",
            success:function(data){
                resolve(data);
            }
        })
    })
    return p;
}
function setData(data){
    switch(data["code"])
    {
        case 0:
        // alert("用户名已存在");
        $("#cuowu_tip").css({"visibility":"visible"});
        $("#cuowu_tip").html(data["msg"]);
        break;
        case 1:
        // $("#cuowu_tip").css({"visibility":visile});
        $("#cuowu_tip").css({"visibility":"hidden"});
        setCookie("username",$("#username").val(),7);
        setCookie("userid",$("#username").val()+1,7);
        alert("即将跳转");
        //跳转到商品列表
        break;
        
    }
}