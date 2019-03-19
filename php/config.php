<?php
@header("content-type:text/html;charset=utf8");
mysql_connect("localhost:3306","root","root");//你们的是3306
mysql_select_db("myproject");//表示选择的执行的数据库
mysql_query("set character set 'utf8'"); //设置执行语句的编码格式  防止中文乱码
?>