<?php
require_once("config.php");
$username = $_GET["username"];
$userpwd = $_GET["userpwd"];
$usertel = $_GET["usertel"];
$str = "select count(*) from userinfo where username = '$username'";
$res = mysql_query($str);
$rows = mysql_fetch_array($res);
$obj = array();
if($rows[0]>0)
{
    $obj["code"]=0;
    $obj["msg"] = "用户名已存在";
    
}
$str2 = "select count(*) from userinfo where usertel = $usertel";
    $res2 = mysql_query($str2);
    $rwos2 = mysql_fetch_array($res2);
    if($rwos2[0]>0)
    {
        $obj["code"]=2;
        $obj["msg"] = "该手机号已被注册";
    }
    if($rows[0]<=0&&$rwos2[0]<=0)
{
    $str3 = "insert  into userinfo(username,userpwd,usertel) VALUES('$username','$userpwd','$usertel')";
    $res3 = mysql_query($str3);
    $rows3 = mysql_affected_rows();
    if($rows3>0)
    {
        $obj["code"]=1;
        $obj["msg"] = "注册成功";
    }
        
}
echo json_encode($obj);
?>