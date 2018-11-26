---
layout:     post
title:      "knowledge"
subtitle:   " \"Php technology stack backend knowledge reserve warehouse\""
date:       2018-11-26 09:10:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 知识
---

> 一个php技术栈后端猿的知识储备仓库

## 前言

基础不牢，地动山摇，谨以此句提醒自己。

## 备注

状态        | 含义
--------- | -------
not-start | 当前未开始总结
doing     | 总结中
α         | 目前仅供参考未修正和发布
done      | 总结完毕
fixing    | 查漏补缺修改中

## 目录

- PHP基础学习(done)
  - 实例
  - 文档
  - 经验
- PHP深入学习(doing)
 
- 网络编程(doing)

- 问题排查(doing)
 
- Mysql(doing)

  - [常用sql语句] 
  - [引擎] 
  - [事务] 
  - [索引] 
    + 建立表结构时添加的索引
      * 主键唯一索引
      * 唯一索引
      * 普通索引
      * 联合索引
        - 最左匹配原则
    + 依据是否聚簇区分
      * 聚簇索引
      * 非聚簇索引
    + 索引底层数据结构
      * hash索引
      * b-tree索引
      * b+tree索引
    
  - [锁] 
    - 悲观锁
    - 乐观锁
  - 分表
    - 垂直分表
    - 水平分表
  - sql优化
  - 主从配置

- Redis(doing)
  - 常用命令
  - 实现原理&与memcache区别
  - 常见用途
    - [缓存] 
    - [队列] 
    - [悲观锁] 
    - [乐观锁] 
    - [订阅/推送] 
  - 常见业务实际使用
  - redis的基础数据结构

- Docker
  - [redis主从搭建]
  - [mysql主从搭建]
  - [codis环境]
  - mysql多主环境
  - kafka的环境搭建和使用
  - rabbitMQ的环境搭建和使用
  - zookeeper的环境搭建和使用
  - etcd的环境搭建和使用
  - ELK的环境搭建和使用
  - 网关服务kong的环境搭建和使用
  - 我所理想的架构

- 设计模式(done/fixing)

  - [概念]

  - 创建型模式实例

    - [单例模式] 
    - [工厂模式] 
    - [抽象工厂模式]
    - [原型模式]
    - [建造者模式]

  - 结构型模式实例

  - 行为型模式实例


- [数据结构(doing)]

  - 数组
  - 堆/栈
  - 树
  - 队列
  - 链表
  - 图
  - 散列表

- 算法(doing)

  - 算法分析

    - 时间复杂度/空间复杂度/正确性/可读性/健壮性

  - 算法实战

    - 排序算法(α)

      - [冒泡排序] 
      - [快速排序] 
      - [选择排序] 
      - [插入排序] 
      - [归并排序] 
      - [希尔排序] 
      - [基数排序] 

- 网络基础(doing)

  - [互联网协议概述]
  - [client和nginx简易交互过程] 
  - [nginx和php-fpm简易交互过程] 
  - [http] 
    - 报文
      - 报文头部
      - 报文体
    - 常见13种状态码
    - 方法method
    - https
    - http2
    - websocket

- 计算机基础(doing)

  - [linux常用命令]
  - shell

- 高并发相关(not-start)

---

## PHP基础学习

### 符合PSR的PHP编程规范(含个人建议)

#### [实例] 

#### [文档] 

#### [经验] 

#### [记一些坑] 

## Mysql

### [常用sql语句] 

### [引擎] 

### [事务] 

### [索引] 

### [锁] 

## Redis

### 常见用途 
 