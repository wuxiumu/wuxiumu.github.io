---
layout:     post
title:      "Redis 队列"
subtitle:   " \"Redis queue\""
date:       2018-12-03 09:20:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 数据库
    - Redis
---

>  redis实战

## queue.php
```
<?php
/**
 * redis实战
 * Redis practice
 *
 * 利用列表list实现简单队列
 * Use list to implement a simple queue
 *
 * @author <https://github.com/wuxiumu>
 */

$redis = new \Redis();
$redis->connect('127.0.0.1', 6379);

// 进队列
// push data to queue
$userId = mt_rand(000000, 999999);
$redis->rpush('QUEUE_NAME',json_encode(['user_id' => $userId]));
$userId = mt_rand(000000, 999999);
$redis->rpush('QUEUE_NAME',json_encode(['user_id' => $userId]));
$userId = mt_rand(000000, 999999);
$redis->rpush('QUEUE_NAME',json_encode(['user_id' => $userId]));
echo "数据进队列成功 \n";
echo "push data to queue success \n";

// 查看队列
// show queue
$res = $redis->lrange('QUEUE_NAME', 0, 1000);
echo "当前队列数据为： \n";
echo "The queue's data are： \n";
print_r($res);

echo "----------------------------- \n";

// 出队列
// pop up the earlier data from queue
$redis->lpop('QUEUE_NAME');
echo "数据出队列成功 \n";
echo "pop up success \n";

// 查看队列
$res = $redis->lrange('QUEUE_NAME', 0, 1000);
echo "当前队列数据为： \n";
echo "The queue's data are： \n";
print_r($res);

```