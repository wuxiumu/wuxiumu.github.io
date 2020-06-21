---
layout:     post
title:      "你了解RESTful API吗？说说干什么用的。"
subtitle:   " \"Do you understand RESTful API? Talk about what it's for\""
date:       2019-11-11 15:10:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 基础
    - 知识
    - 网络
---

>  网络知识

## 介绍
rest是REpresentational State Transfer三个单词的缩写，由Roy Fielding于2000年论文中提出，它代表着分布式服务的架构风格。而如果想你的api被称为restful api，只要遵循其规定的约束即可。

## rest设计原则
客户端-服务器：通过将用户UI与数据存储分开，我们可以简化服务器组件来提高跨多个平台的用户界面的可移植性并提高可伸缩性。 它可以比表现成前后端分离的思想。

无状态：从客户端到服务器的每个请求都必须包含理解请求所需的所有信息，并且不能利用服务器上任何存储的上下文。 这表示你应该尽可能的避免使用session，由客户端自己标识会话状态。（token）

规范接口：REST接口约束定义：资源识别; 请求动作; 响应信息; 它表示通过uri标出你要操作的资源，通过请求动作（http method）标识要执行的操作，通过返回的状态码来表示这次请求的执行结果。

可缓存： 缓存约束要求将对请求的响应中的数据隐式或显式标记为可缓存或不可缓存。如果响应是可缓存的，则客户端缓存有权重用该响应数据以用于以后的等效请求。 它表示get请求响应头中应该表示有是否可缓存的头（Cache-Control) 其中1，2，3约束最为重要，其中1容易理解。接下来我们就谈谈无状态和规范接口的原则。

## uri规范
资源的描述构成了uri，它一般有以下约束：

使用名词。如 user, student, class
```
api.example.com/class-manag…

api.example.com/device-mana…

api.example.com/user-manage…

api.example.com/user-manage…
```
使用http method来对应不同的请求动作（数据库或者业务逻辑） GET：查询操作：
HTTP GET /devices?startIndex=0&size=20 表示按照查询条件获取设备列表
```
HTTP GET /configurations?startIndex=0&size=20

HTTP GET /devices/{id}/configurations

HTTP GET /devices/{id}
```
POST：新增操作：
```
HTTP POST /device 表示新增一个设备 PUT 更新操作（代表更新一个实体的所有属性）

HTTP PUT /devices/{id} 表示更新一个设备（设备唯一id区分） PATCH 部分更新（代表更新一个实体的部分属性）由于有的浏览器兼容性问题，一般推荐使用put

HTTP PATCH /devices/{id} 表示更新device的部分属性

DELETE 删除操作 HTTP DELETE /devices/{id} 表示删除一个设备，根据id区分
```
使用连字符（ - ）而不是（_）来提高URI的可读性
```
api.example.com/inventory-m… //更易读

api.example.com/inventory_m… //更容易出错
```
在URI中使用小写字母(特殊情况除外，例如专有名词) api.example.org/my-folder/m…

不要使用文件扩展名 文件扩展名看起来很糟糕，不会增加任何优势。删除它们也会减少URI的长度。没理由保留它们
```
api.example.com/device-mana… / 不要使用它 /

api.example.com/device-mana… / *这是正确的URI * /
```
使用查询组件过滤URI集合

很多时候，我们会遇到需要根据某些特定资源属性对需要排序，过滤或限制的资源集合的要求。为此，请不要创建新的API - 而是在资源集合API中启用排序，过滤和分页功能，并将输入参数作为查询参数传递。例如
```
http://api.example.com/device-management/managed-devices
http://api.example.com/device-management/managed-devices?region=USA
http://api.example.com/device-management/managed-devices?region=USA&brand=XYZ
http://api.example.com/device-management/managed-devices?region=USA&brand=XYZ&sort=installation-date
```
不要在末尾使用/
作为URI路径中的最后一个字符，正斜杠（/）不会添加语义值，并可能导致混淆。最好完全放弃它们。

使用http状态码定义api执行结果
```
1xx：信息 通信传输协议级信息。

2xx：成功 表示客户端的请求已成功接受。

3xx：重定向 表示客户端必须执行一些其他操作才能完成其请求。

4xx：客户端错误 此类错误状态代码指向客户端。

5xx：服务器错误 服务器负责这些错误状态代码。 
```
另外完整的更为详细的状态码此处不做赘述。一般简化版本的api会使用200，400，500，其中400代表客户端调用有误，将具体业务逻辑错误信息放入response body：
```
{
  "error": "username.or.password.error"
}
```

api版本定义

当我们需要对现有的api接口升级的时候，因为该api接口已经投入使用，所以新添加的业务可能无法保证兼容原来的逻辑，这个时候就需要新的接口，而这个接口一般表示对原来的接口的升级（不同版本），那版本怎么定义呢？

URI版本控制（推荐） api.example.com/v1 apiv1.example.com
使用自定义请求标头进行版本控制 
```
Accept-version：v1 
Accept-version：v2
```
使用Accept header 进行版本控制 
```
Accept:application / vnd.example.v1 + json Accept:application / vnd.example + json; version = 1.0
```

## 无状态
使REST API无状态有一些非常显着的优点：

无状态通过将API部署到多个服务器，有助于将API扩展到数百万并发用户。任何服务器都可以处理任何请求，因为没有与会话相关的依赖。（集群）

无状态使得REST API不那么复杂 - 可以删除所有服务器端状态同步逻辑。（删除session，清理多余空间）

无状态API也很容易缓存。特定软件可以通过查看该一个请求来决定是否缓存HTTP请求的结果。从先前的请求中获得的状态可能会影响这个请求的可缓存性，这并不存在任何不确定性。它提高了应用程序的性能。

服务器永远不会忘记每个客户端身份”，因为客户端会在每个请求中发送所有必要的信息。（携带token）

那么无状态又要怎么实现呢？前面我们已经说了，服务端不应该再保存session会话，这个工作全部交由http请求去标识，而最常见的做法则是使用token。生成token可以考虑使用jwt，oauth。

## 总结
我们首先介绍rest服务背景，引出rest架构的介绍，最后重点介绍了rest api的约束设计。

## 参考
- [理解RESTful架构-阮一峰](https://www.ruanyifeng.com/blog/2011/09/restful.html)
- [13 个设计 REST API 的最佳实践](https://segmentfault.com/a/1190000017464263)
 