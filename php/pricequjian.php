<?php
require_once("config.php");
$startPrice = $_GET["startPrice"];
$endPrice = $_GET["endPrice"];
$str = "select * from goodsinfo where goodsprice>=$startPrice and goodsprice<=$endPrice";
$res = mysql_query($str);
$str2 = "select count(*) from goodsinfo where goodsprice>=$startPrice and goodsprice<=$endPrice";
$res2 = mysql_query($str2);
$result2 = mysql_fetch_array($res2);
$obj = array();
while($result = mysql_fetch_array($res,MYSQLI_ASSOC))
{
$obj[] = $result;
}
// $obj["count"] = $result2[0];
echo json_encode($obj);
?>