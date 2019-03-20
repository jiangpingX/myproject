<?php
require_once("config.php");
$startPrice = $_GET["startPrice"];
$endPrice = $_GET["endPrice"];
$skipNum = $_GET["skipNum"];
$showNum = $_GET["showNum"];
$str = "select * from goodsinfo where goodsprice>=$startPrice and goodsprice<=$endPrice limit $skipNum,$showNum";
$res = mysql_query($str);

$obj = array();
while($result = mysql_fetch_array($res,MYSQLI_ASSOC))
{
$obj[] = $result;
}
// $obj["count"] = $result2[0];
echo json_encode($obj);
?>