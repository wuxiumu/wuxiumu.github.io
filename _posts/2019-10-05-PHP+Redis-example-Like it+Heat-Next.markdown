---
layout:     post
title:      "PHP+Redis 实例 点赞 + 热度"
subtitle:   " \"PHP+Redis example   Like it + Heat Next\""
date:       2019-10-05 09:20:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 数据库
    - redis
---
 
- PHP+Redis 实例【一】点赞 + 热度 上篇
    - https://www.cnblogs.com/sunshine-H/p/7922285.html
- PHP+Redis 实例【一】点赞 + 热度 下篇
    -  https://www.cnblogs.com/sunshine-H/p/7928034.html 
- PHP+Redis 有序集合实现 24 小时排行榜实时更新
    - https://learnku.com/articles/30279
    - 1、数据准备
    - 2、获取 score 高分 top10 排名 (ZREVRANGE 为降序，ZRANGE 为升序)
    - 3、查看用户 ee 的实际排名 (ZREVRANK 为降序，ZRANK 为升序)、实时分数
- 使用redis实现排行榜功能
    - https://blog.csdn.net/u011510825/article/details/85394592
    ```
        zrange  查看排行榜 (升序)

        zrevrange 查看排行榜 （降序）

        zadd 添加一个数据

        zrem 删除一个数据

        zrank 获取排名（升序）

        zrevrank 获取排名 （降序）
    ```      
 
