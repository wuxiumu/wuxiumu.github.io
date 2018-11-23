---
layout:     post
title:      "Github pages 绑定个人域名"
subtitle:   "Github pages,Bind a personal domain name"
header-img: "img/post-bg-2015.jpg"
navcolor:   "invert"
date:       2018-11-23 14:00:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 工具
---


> 读完需要 6 分钟


## 前言
近日搭建了自己的 Blog，使用的是 Hexo + github pages。众所周知，github pages的域名都是统一的your_name.github.io。想了想，能不能换个域名呢？当然是可以滴。
于是，在度娘了之后，也算找到了方法。但是网上的介绍都是操作流程，没有详细的解释，我自己也是有些迷糊。好在域名绑定成功了。
遂决定写一篇博文分享一下自己对这个过程的理解。
请自行准备：个人的 github pages，个人域名

## 简述
绑定域名需要在 域名解析服务商 和 github 两边都进行操作。

1. 在域名解析服务商进行个人域名解析，将域名绑定到个人 github pages。
2. 同时在 github pages 需要配置 CNAME 文件重定向到你的域名。

### 1.域名解析配置
简单点说就是将域名和IP或其他域名进行绑定，让你能通过不同域名访问同一个网站。
解析商不多说，DNSPod、阿里云、腾讯云等等。一般国内域名购买商都同时提供解析服务。我使用的是腾讯云买的域名 xhuyq.me ，就用腾讯云解析了。

(1) A记录 类型 记录值填写 IP 值，两种选择：
```
> 你的 `github.io` 的 `IP` 值
> 在官方提供的两个 `IP` 中选择 `192.30.252.153`、`192.30.252.154`
```
(2) CNAME类型 （如图提示），请选好主机记录，按主机记录类型填写记录值。推荐选择的 @ ，那么记录值就填写按各位github名填写your_name.github.io就好了。

### 2.github pages 方面的 CNAME 文件配置
（1）在github的github pages的仓库根目录里加上CNAME文件，里面写上个人域名即可。我的是：
```
wqb.me
```
（2）或者直接在github.io仓库的Settings的GitHub Pages项直接设置Custom domain,github会自动添加CNAME文件:

domain-3

### 3.个人理解
那么，为什么配置了域名解析还要配置CNAME 文件呢？
实际上，个人域名是名字，github pages相当于网站空间。试想，如果不在网站空间配置CNAME，就可以成功绑定域名，那么岂不是可以给别随便一个的网站绑定上自己的域名？相同，如果只需配置github pages的CNAME，而不用域名解析，那不是也可以将自己的网站绑在人和别人的域名上？
所以，域名绑定是需要“双方同意”的。
如有不当，万望指正！