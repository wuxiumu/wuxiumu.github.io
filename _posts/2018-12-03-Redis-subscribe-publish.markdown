---
layout:     post
title:      "Redis 订阅/推送"
subtitle:   " \"Redis subscribe publish\""
date:       2018-12-03 09:50:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 数据库
    - Redis
---

>  redis实战

## publish.php
```
<?php
/**
 * redis实战
 *
 * 发布
 *
 * @author <https://github.com/wuxiumu>
 */

  //发布
  $redis = new \Redis();
  $redis->connect('127.0.0.1', 6379);
  $redis->publish('msg', '来自msg频道的推送');
  echo "msg频道消息推送成功～ \n";
  $redis->close();
```

## subscribe.php
```
<?php
/**
 * redis实战
 *
 * 订阅
 *
 * @author <https://github.com/wuxiumu>
 */

  // ini_set(‘default_socket_timeout’, -1);

  $redis = new \Redis();
  $redis->pconnect('127.0.0.1', 6379);

  //订阅
  echo "订阅msg这个频道，等待消息推送... \n";
  $redis->subscribe(['msg'], 'callfun');
  function callfun($redis, $channel, $msg)
  {
   print_r([
     'redis'   => $redis,
     'channel' => $channel,
     'msg'     => $msg
   ]);
  }

```
