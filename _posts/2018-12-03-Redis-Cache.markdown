---
layout:     post
title:      "Redis 缓存"
subtitle:   " \"Redis Cache\""
date:       2018-12-03 09:20:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 数据库
    - Redis
---

>  redis实战

## cache.php
```
<?php
/**
 * redis实战
 * Redis practice
 *
 * 简单字符串缓存
 * easy string cache
 *
 * @author <https://github.com/wuxiumu>
 */
 
$redis = new \Redis();
$redis->connect('127.0.0.1', 6379);

/**
 * 缓存数据
 * cache data
 */
$redis->set('cache-key', json_encode([
  'data-list' => '这是个缓存数据～',
  'data-list-en' => 'This a data of cache~',
]), JSON_UNESCAPED_UNICODE);
echo "字符串缓存成功～ \n\n";
echo "String cache success \n\n";

/**
 * 获取缓存数据
 * get cache data
 */
$data = $redis->get('cache-key');
echo "读取缓存数据为： \n";
echo "The cache data is: \n";
print_r(json_decode($data,true));

```