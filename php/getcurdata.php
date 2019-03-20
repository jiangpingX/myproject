<?php
require_once("config.php");
$goodsid = $_GET["goodsid"];
$str = "select * from goodsinfo where id=$goodsid";
$res=mysql_query($str);
$obj = array();
while($result =mysql_fetch_array($res,MYSQLI_ASSOC)){
    $obj[]=$result;	
}
echo json_encode($obj);
?>