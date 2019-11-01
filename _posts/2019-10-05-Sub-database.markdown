---
layout:     post
title:      "分库分表"
subtitle:   " \"Sub-database\""
date:       2019-10-05 21:20:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 数据库
    - 优化
---
  
##  分库分表
- [shardingsphere 官网](https://shardingsphere.apache.org/index_zh.html)
- [MyCAT](https://github.com/MyCATApache/Mycat-Server)
- [cobar](https://github.com/alibaba/cobar)
- [Ctrip-DAL](https://github.com/ctripcorp/dal)
- [“分库分表" ？选型和流程要慎重，否则会失控](https://segmentfault.com/a/1190000017272697)

## 切入层次
-  编码层
-  框架层
-  驱动层
-  代理层
-  实现层

## 驱动层和代理层对比
- 驱动层特点
- 代理层特点
- 共同点
- 使用限制
- 产品

## 流程解决方案
- 信息收集
- 前期准备
- 实施阶段

## 题外话
没有支持的活别接，干不成。

分库分表是战略性的技术方案，很多情况无法回退或者回退方案复杂。如果要拆分的库表涉及多个业务方，公司技术人员复杂，CTO要亲自挂帅进行协调，并有专业仔细的架构师进行监督。没有授权的协调人员会陷入尴尬的境地，导致流程失控项目难产。

>真正经历过的人，会知道它的痛！