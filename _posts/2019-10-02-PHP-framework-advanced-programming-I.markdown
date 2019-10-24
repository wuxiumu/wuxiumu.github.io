---
layout:     post
title:      "PHP框架高级编程-01"
subtitle:   " \"PHP framework advanced programming-01\""
date:       2019-10-02 9:30:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Web框架    
    - 读书
---

## 内容简介：

　  尽管学习如何使用单个PHP框架生成动态网页相对简单，但确定这3种主流Web应用程序框架中哪一个最能满足您的要求却并不容易。

《PHP框架高级编程——应用Symfony、CakePHP和Zend》一书对3种最受欢迎的开源框架进行了毫无偏见的深入比较，这3种框架是Symfony、CakePHP和ZendFramework。

本书详细讨论了这3种框架之间的相同点和不同点，并提供每种框架的类似示例和任务，这样读者就可以确定哪种框架最适合自己。

 

## 主要内容

◆ 提供非常有价值的比较法，详细比较Symfony、CakePHP和Zend Framework的利弊，并介绍如何使用每种框架解决问题

◆ 介绍常见任务中使用的标准元素，例如窗体、邮件、搜索、安全和模板

◆ 讨论高级功能，例如AJAX、插件、Web服务、内容管理服务和国际化

◆ 演示如何使用各种测试工具来确保质量和提高性能

◆ 介绍即将发布的新框架，例如CodeIgniter、Lithium和Agavi

## 作者介绍：

Bartosz Porebski是一位视频游戏、Web应用程序和C++软件开发人员。他还是Brain-ComputerInterface的研究人员，同时也是波兰克拉科夫雅盖隆大学的讲师。

Karol Przystalski是Sabre Holdings公司的一位软件质量工程师，也是波兰克拉科夫雅盖隆大学的博士。他从Symfony的最早版本就开始使用它，并且写了一本关于Symfony框架的书籍。

Leszek Nowak有多年使用框架——例如Django、CakePHP和CodeIgniter——进行Web开发和图形设计的经验，他还从事3D建模、动画、图像识别和人工智能开发。他经常说“如果科学用于游戏，就会很有趣

## 目    录
```
第1章  Symfony、CakePHP和Zend
Framework简介 1
1.1  Web应用程序框架的定义及
其用法 1
1.1.1  框架与库 2
1.1.2  使用框架的时机 3
1.1.3  PHP与其他编程语言 4
1.2  开源PHP Web框架 5
1.2.1  公众关注的框架对比 5
1.2.2  3种框架概述 7
1.2.3  其他框架 9
1.3  Web框架中的设计模式 13
1.3.1  设计模式的定义 13
1.3.2  模型-视图-控制器作为主要
的结构设计模式 14
1.3.3  其他设计模式概述 15
第2章  框架入门 27
2.1  配置要求 27
2.1.1  XAMPP 28
2.1.2  Apache 31
2.1.3  数据库 32
2.1.4  PEAR 33
2.1.5  Subversion(SVN) 34
2.1.6  安装概述 34
2.2  安装 35
2.2.1  Symfony 35
2.2.2  CakePHP 37
2.2.3  Zend Framework 38
2.3  配置 39
2.3.1  Symfony 39
2.3.2  CakePHP 39
2.3.3  Zend Framework 40
2.4  Hello World应用程序 40
2.4.1  Symfony 40
2.4.2  CakePHP 42
2.4.3  Zend Framework 43
2.5  结构 45
2.5.1  Symfony 45
2.5.2  CakePHP 47
2.5.3  Zend Framework 48
2.6  IDE支持 49
2.6.1  NetBeans 50
2.6.2  Eclipse 50
2.6.3  Zend Studio 51
第3章  使用数据库 53
3.1  对象关系映射 53
3.1.1  对象关系阻抗误配 54
3.1.2  Propel 56
3.1.3  Doctrine 56
3.1.4  CakePHP的ORM 57
3.1.5  Zend_Db 57
3.1.6  其他ORM解决方案 59
3.2  数据库配置 59
3.2.1  开放数据库互连(ODBC) 60
3.2.2  SQLite 60
3.2.3  PostgreSQL 62
3.2.4  MySQL 63
3.2.5  Microsoft SQL Server 65
3.2.6  Oracle 68
3.2.7  DB2 69
3.3  与数据库通信 70
3.3.1  模式 71
3.3.2  固件 76
3.3.3  命令行接口 80
第4章  使用3种框架的第一个
应用程序 85
4.1  设计 85
4.2  Symfony 87
4.2.1  项目 87
4.2.2  模型 88
4.2.3  控制器 88
4.2.4  视图 91
4.3  CakePHP 96
4.3.1  项目 96
4.3.2  模型 97
4.3.3  控制器 98
4.3.4  视图 100
4.4  Zend Framework 105
4.4.1  项目 105
4.4.2  模型 106
4.4.3  控制器 113
4.4.4  视图 118
第5章  窗体 125
5.1  字段验证 125
5.1.1  窗体验证的运行过程 126
5.1.2  Symfony 128
5.1.3  CakePHP 133
5.1.4  Zend Framework 136
5.2  定制窗体 138
5.2.1  Symfony 139
5.2.2  CakePHP 149
5.2.3  Zend Framework 154
5.3  使用Captcha防止接收垃圾
邮件 163
5.3.1  问题 163
5.3.2  解决方案 165
第6章  邮件 175
6.1  创建邮件应用程序 175
6.1.1  发送邮件的方法和Web
服务器 176
6.1.2  PHP配置 176
6.1.3  SMTP服务器配置 177
6.2  SwiftMailer 178
6.2.1  Symfony 178
6.2.2  CakePHP 184
6.2.3  Zend Framework 187
6.3  CakePHP的邮件组件 189
6.3.1  发送简单的电子邮件 190
6.3.2  发送HTML电子邮件 191
6.3.3  添加附件 191
6.3.4  抄送 192
6.3.5  远程SMTP服务器 192
6.3.6  安全连接 192
6.3.7  小结 193
6.4  Zend邮件程序 194
6.4.1  发送简单的电子邮件 194
6.4.2  发送HTML电子邮件 194
6.4.3  添加附件 195
6.4.4  抄送 195
6.4.5  远程SMTP服务器 196
6.4.6  安全连接 196
6.4.7  小结 197
6.5  PHPMailer 197
6.5.1  Symfony 198
6.5.2  CakePHP 198
6.5.3  Zend Framework 199
第7章  搜索 203
7.1  问题 203
7.1.1  全文本搜索 204
7.1.2  索引 204
7.1.3  搜索查询 205
7.2  解决方案 206
7.2.1  Sphinx 206
7.2.2  Lucene 213
7.2.3  Google Custom Search 218
第8章  安全 221
8.1  设置安全连接 221
8.1.1  问题 222
8.1.2  配置Web服务器 223
8.1.3  Symfony 226
8.1.4  CakePHP 228
8.1.5  Zend Framework 228
8.2  保护配置文件窗体免受XSS
和注入攻击 229
8.2.1  问题 229
8.2.2  解决方案 231
8.3  CSRF 234
8.3.1  问题 234
8.3.2  解决方案 235
第9章  模板 239
9.1  使用辅助类和Lightbox创建
简单的图像库 239
9.1.1  表示层辅助类 241
9.1.2  Lightbox 242
9.1.3  Symfony 242
9.1.4  CakePHP 245
9.1.5  Zend Framework 247
9.2  在Web框架中使用模板
引擎 249
9.2.1  Smarty 250
9.2.2  Dwoo 255
9.2.3  Twig 258
9.3  其他增件模板引擎概述 260
9.3.1  Template Blocks 260
9.3.2  Open Power Template
(OPT) 261
9.3.3  TinyButStrong 262
9.3.4  Rain TPL 264
9.3.5  Savant 265
第10章  AJAX 269
10.1  AJAX简介 270
10.2  自动完成 272
10.2.1  Symfony 272
10.2.2  CakePHP 274
10.2.3  Zend Framework 277
10.3  动态弹出窗口 283
10.3.1  Symfony 283
10.3.2  CakePHP 288
10.3.3  Zend Framework 291
10.4  与AJAX用户聊天 293
10.4.1  Symfony 294
10.4.2  CakePHP 297
10.4.3  Zend Framework 300
第11章  创建插件 305
11.1  Symfony 305
11.1.1  插件结构 306
11.1.2  开发插件 306
11.1.3  测试插件 308
11.2  CakePHP 309
11.2.1  插件结构 309
11.2.2  开发插件 310
11.2.3  测试插件 312
11.3  Zend Framework 313
第12章  Web服务 315
12.1  REST风格的新闻阅读 315
12.1.1  REST的工作原理 316
12.1.2  Symfony 317
12.1.3  CakePHP 320
12.1.4  Zend Framework 323
12.2  在电子商务应用程序中
应用SOAP Web服务 329
12.2.1  为PHP安装SOAP
扩展 330
12.2.2  使用soapUI进行测试 330
12.2.3  SOAP和REST之间的
不同 330
12.2.4  Symfony 331
12.2.5  CakePHP 337
12.2.6  Zend Framework 340
第13章  后端 343
13.1  Symfony 343
13.1.1  Doctrine管理模块 344
13.1.2  Apostrophe 346
13.1.3  Diem 347
13.2  CakePHP 349
13.2.1  Croogo 349
13.2.2  Wildflower 351
13.3  Zend Framework 352
13.3.1  TomatoCMS 352
13.3.2  Pimcore 352
13.3.3  Digitalus CMS 354
13.4  功能总结 355
第14章  国际化 357
14.1  国际化的定义 357
14.2  Symfony 358
14.2.1  配置 358
14.2.2  模板 359
14.2.3  窗体 363
14.2.4  为i18n使用数据库 364
14.2.5  增件 365
14.3  CakePHP 366
14.3.1  配置 366
14.3.2  模板 367
14.3.3  窗体 369
14.3.4  为i18n使用数据库 370
14.3.5  增件 374
14.4  Zend Framework 374
14.4.1  配置 374
14.4.2  转换 376
14.4.3  窗体 376
14.4.4  为i18n使用数据库 378
14.4.5  增件 378
第15章  测试 379
15.1  测试简介 379
15.1.1  如何开始测试 380
15.1.2  测试用例、测试套件和
测试覆盖率 380
15.1.3  测试的种类 381
15.1.4  何时结束测试 384
15.1.5  bug是我们的朋友 385
15.1.6  固件 387
15.1.7  仿制品 387
15.1.8  测试驱动的开发 388
15.1.9  测试框架 389
15.2  使用功能测试进行黑盒
注册窗体测试 391
15.2.1  问题 392
15.2.2  解决方案 392
15.3  使用Selenium实现CMS
测试自动化 397
15.3.1  安装Selenium IDE 397
15.3.2  安装Selenium Remote
Control 398
15.3.3  问题 399
15.3.4  解决方案 400
15.4  邮件单元测试 407
15.4.1  问题 407
15.4.2  解决方案 409
第16章  用户管理 415
16.1  基本用户管理 415
16.1.1  RBAC和ACL 415
16.1.2  Symfony 417
16.1.3  CakePHP 426
16.1.4  Zend Framework 431
16.2  使用LDAP实现确定用户 435
16.2.1  需求 435
16.2.2  LDAP的运行原理 437
16.2.3  准备LDAP 437
16.2.4  LDAP配置 438
16.2.5  解决方案 451
第17章  性能 459
17.1  使用JMeter进行压力测试、
负载测试和性能测试 459
17.2  基准测试 463
17.2.1  Hello World 463
17.2.2  简单的CRUD应用程序 464
17.3  开发速度 464
第18章  总结 465
18.1  功能 465
18.1.1  Symfony 465
18.1.2  CakePHP 467
18.1.3  Zend Framework 467
18.1.4  功能表 468
18.2  获胜者是… 469
附录A  Web资源 471
附录B  CodeIgniter、Lithium和Agavi
的代码示例 477
```