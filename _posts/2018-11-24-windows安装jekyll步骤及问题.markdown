---
layout:     post
title:      "windows安装jekyll步骤及问题"
subtitle:   " \"Windows installation jekyll steps and problems\""
date:       2018-11-24 21:00:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 工具
---

> “JUST DO IT. ”

既然都看到这篇文章了，想必也对jekyll有所了解，我也是新手，将自己安装成功的经验分享给大家，希望能对大家有帮助。

## 步骤：

- 安装 Ruby & DevKit
- 安装 Jekyll

1、安装 Ruby
[下载地址：](https://rubyinstaller.org/downloads/)

注意版本要选 2.0 到 3.0 之间

本文使用的是：ruby 2.5.3p105 (2018-10-18 revision 65156) [x64-mingw32]

如果是第一次安装，推荐默认路径，不要乱改路径，避免一些不必要的问题，比如我的路径是：
```
C:\Ruby25-x64
```
1. 安装的时候注意勾选把ruby添加到路径PATH，如果不勾选也可以手动添加 
例如，按照我的路径，就应该添加：
```
C:\Ruby25-x64\bin;
```
检查ruby是否正常安装，会出现版本号
```
ruby -v
```
2. 安装DevKit

ruby 2.5.3p105 默认安装DevKit
```
gem -v  # 查看gem是否正常安装
```

3. 安装jekyll
```
gem install jekyll
jekyll --version
```

## 新建项目
```
jekyll new myblog
```
如果没有任何报错，会在当前目录下回生产一个 myblog 文件夹

4. 运行服务器
进入 myblog 文件夹，运行服务器
```
cd myblog
myblog>jekyll serve
```

访问测试：http://127.0.0.1:4000/

一切都很完美，不过这才刚刚开始。。。

5. 遇到的问题

没遇到过，本人最近在win7和win10安装都很顺利，找教程最好是最新的。因为软件也在更新。

参考文章：

[《jekyll中文文档》](https://www.jekyll.com.cn/)