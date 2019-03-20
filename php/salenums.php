<?php
require_once("config.php");
$salenums = $_GET["salenums"];
$skipNum=$_GET["skipNum"];
$showNum=$_GET["showNum"];
$str = "select * from goodsinfo order by salenums $salenums limit $skipNum,$showNum";
$res = mysql_query($str);
$obj = array();
while($result = mysql_fetch_array($res,MYSQLI_ASSOC))
{
$obj[] = $result;
}
echo json_encode($obj);
?>