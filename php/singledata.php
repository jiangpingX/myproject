<?php
@require_once("config.php");
$userid = $_GET["userid"];
$goodsid= $_GET["goodsid"];
$goodsnum = $_GET["goodsnum"];

//在执行新增的时候 要判断该用户是否买过该商品

$str = "select count(*) from  shoppingcar where  userid='$userid' and  goodsid='$goodsid'";
$str2 = "select sum(goodsnum) from shoppingcar where userid='$userid' and goodsid='$goodsid'";
$result = mysql_query($str);

$item  = mysql_fetch_array($result);

if($item[0]>0){
$str= "update  shoppingcar set goodsnum = goodsnum+$goodsnum  where  userid='$userid' and  goodsid='$goodsid'";
}else{
$str = "insert  into shoppingcar(userid,goodsid,goodsnum) values('$userid','$goodsid',$goodsnum)";
}

mysql_query($str);
$count = mysql_affected_rows();

$result2 = mysql_query($str2);
$item2 = mysql_fetch_array($result2);
$obj = array();

if($count>0){
    $obj["code"]=1;
    $obj["msg"]= "购买成功";
    $obj["goodsnum"] = $item2[0];
}else{
    $obj["code"]=0;
    $obj["msg"]= "购买失败";
}

echo  json_encode($obj);
?>