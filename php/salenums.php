<?php
require_once("config.php");
$salenums = $_GET["salenums"];
$str = "select * from goodsinfo order by salenums $salenums";
$res = mysql_query($str);
$obj = array();
while($result = mysql_fetch_array($res,MYSQLI_ASSOC))
{
$obj[] = $result;
}
echo json_encode($obj);
?>