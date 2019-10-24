---
layout:     post
title:      "PHP 使用 redis 的缓存实例"
subtitle:   " \"PHP uses redis cache instance\""
date:       2019-10-05 10:20:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 数据库
    - redis
---
 
 主要对热门城市进行缓存

首先判断如果是第一次访问，则查询数据库，并存入redis；如果不是，则直接从redis中读取数据

我设置了一个inner来判断是否为第一次访问，并且设置了inner的有效期是60秒（例如热门城市需要实时）

具体代码如下：
```
<?php  
//实例化redis
$redis = new \Redis();
//连接redis
$redis->connect('127.0.0.1',6379);
// $redis->auth('12345'); 
if($redis->get('inner')=='yes' || !$redis->get('inner')){
	//第一次进入,需要缓存
	//连接数据库进行查询
	$db = new mysqli('localhost','root','123456','php-framework');
	$sql = "select * from country";
	$res = $db->query($sql);
	while($new = mysqli_fetch_assoc($res)){
		$news[] = $new;
	}
    //将数据存入redis的list中
	$json=json_encode($news);
	$redis->del('news');//把键值删除，防止重复
    $redis->lPush('news', $json);
    $redis->set('inner', 'no',60); //设置键值有效期为60秒
}else{
	//从redis中取出数据
	$json=$redis->lRange('news', 0, -1);
	$news=json_decode($json[0],true);
}
 
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>redis缓存实例</title>
</head>
<body>
	<?php foreach ($news as $k => $v) {  ?>
		<li><?php  echo $v['name'];  ?></li>
	<?php } ?>
</body>
</html>
```