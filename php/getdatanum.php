<?php
@require_once("config.php");
$str = "select count(*) as sum from goodsinfo ";
$res = mysql_query($str);
$result = mysql_fetch_array($res);
$obj = array();
$obj["count"] = $result["sum"];

echo json_encode($obj);
?>