//图片切换
$(document).on("mouseover",".qiehuan>li",function(){
    var imgsrc = $(this).find("img").attr("src");
$(this).parent().parent().siblings(".line1").find("img").attr("src",imgsrc);
})

//右侧购物车
var flag = true;
    $("#shawdowCar").click(function(){
        if(flag){
            $("#right_shawdow").animate({width:"320px"},500);
            flag=false;
        }
        else{
            $("#right_shawdow").animate({width:"40px"},500);
            flag = true;
        }
    })


    //加入购物车按钮
    var Cuserid = getCookie("userid");
    //右侧购物车兰
function getthisdata(id)
{
    var goodsnum;
    updatedata(id,Cuserid,1).then(function(data){
         goodsnum = data["goodsnum"];
         if((goodsnum*1)<=1)
    {
        getsingledata(id).then(function(data){
            setsingledata(data);
        })
    }
    else{
        var x = $(`#shangpin${id}`).html()*1+1;
        $(`#shangpin${id}`).html(x);
    }
    })
    //更新购物车总价和总量
    getNumsPrices();
  
}    


//.............商品总量和总价
function getNumsPrices(){
    var totalnum =0;
    var tatalPrice= 0;
    var singelPrice = 0;
    for(var i=0;i<$("#list_ul>li>div").length;i++){
        
         totalnum += $("#list_ul>li>div").find(".shangpinnums").eq(i).html()*1;
         singelPrice=$("#list_ul>li>div").find(".pricea").eq(i).html()*1;
         tatalPrice += totalnum*singelPrice;
    }
    $("#totalnum").html(totalnum);
    $("#totalprice").html(tatalPrice.toFixed(2));
    $("#span_num1").html(totalnum);
}


function getsingledata(goodsid){
    var p = new Promise(function(resolve,reject){
        $.ajax({
            type:"get",
            url:"../php/getcurdata.php",
            data:{
                goodsid:goodsid
            },
            dataType:"json",
            success:function(data){
                resolve(data);
            }
        })
    })
    return p;
}

//更新数量
function updatedata(goodsid,userid,goodsnum){
    var p = new Promise(function(resolve,reject){
        $.ajax({
            type:"get",
            url:"../php/singledata.php",
            data:{
                goodsid:goodsid,
                userid:userid,
                goodsnum:goodsnum
            },
            dataType:"json",
            success:function(data){
                resolve(data);
            }
        })
    })
    return p;
}
function setsingledata(data){
var str ="";
data.forEach(function(item){
   var {id,goodsprice,salenums,goodsdescribe,goodsimg}=item;
   str+=` <li>
   <img src="${goodsimg}.jpg" alt="">
   <div>
       <p>${goodsdescribe}</p>
   ￥<span class="pricea">${goodsprice}</span>×<span id="shangpin${id}" class="shangpinnums">1</span>
   </div>
   
</li>`;
})
$("#list_ul").append(str);
}