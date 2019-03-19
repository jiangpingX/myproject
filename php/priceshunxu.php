<?php
require_once("config.php");
$price = $_GET["price"];
$str = "select * from goodsinfo order by goodsprice $price";
$res = mysql_query($str);
$obj = array();
while($result = mysql_fetch_array($res,MYSQLI_ASSOC))
{
$obj[] = $result;
}
echo json_encode($obj);
?>