---
layout:     post
title:      "Docker下极速体验kafka"
subtitle:   " \"Docker under the speed of experience kafka\""
date:       2019-10-06 09:20:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 数据库
    - docker
---

- [Docker下kafka学习，三部曲之一：极速体验kafka](https://blog.csdn.net/boling_cavalry/article/details/71576775)
- [Docker下kafka学习，三部曲之二：本地环境搭建](https://blog.csdn.net/boling_cavalry/article/details/71601189)
- [Docker下kafka学习，三部曲之三：java开发](https://blog.csdn.net/boling_cavalry/article/details/71634631)

Kafka是一种高吞吐量的分布式发布订阅消息系统

新建一个docker-compose.yml文件，内容如下：
```
version: '2'
services:
  zk_server: 
    image: daocloud.io/library/zookeeper:3.3.6
    restart: always
  kafka_server: 
    image: bolingcavalry/kafka:0.0.1
    links: 
      - zk_server:zkhost
    command: /bin/sh -c '/usr/local/work/start_server.sh'
    restart: always
  message_producer: 
    image: bolingcavalry/kafka:0.0.1
    links: 
      - zk_server:zkhost
      - kafka_server:kafkahost
    restart: always
  message_consumer: 
    image: bolingcavalry/kafka:0.0.1
    links: 
      - zk_server:zkhost
    restart: always
```
打开终端，在docker-compose.yml所在目录下执行docker-compose up -d，由于需要从hub.docker.com下载镜像，所以需要等待几分钟，下载结束后会自动启动四个容器
 