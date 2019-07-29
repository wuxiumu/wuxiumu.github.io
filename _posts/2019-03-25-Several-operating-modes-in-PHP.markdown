---
layout:     post
title:      "PHP中的几种运行模式"
subtitle:   " \"Several operating modes in PHP\""
date:       2019-03-25 15:10:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 基础
    - php
---

>  php基础

话说PHP当下一共有4种运行模式

1）cgi通用网关接口（通用网关接口））

2）fast-cgi常驻（long-live）型的CGI php-fpm

3）cli命令行运行（命令行界面）

4）web模块模式（apache等web服务器运行的模块模式）

## CGI
全称是“通用网关接口”(Common Gateway Interface)， 它可以让一个客户端，从网页浏览器向执行在Web服务器上的程序请求数据，描述的是客户端和这个程序之间传输数据的一种标准，另外CGI独立于任何语言，所以可以用任何一种语言编写，只要这种语言具有标准输入、输出和环境变量。如php,perl,tcl等。

CGI针对每个用户请求都要开单独的子进程去维护，所以数量多的时候会出现性能问题，最近几年很少用。

每有一个用户请求，都会先要创建cgi的子进程，然后处理请求，处理完后结束这个子进程

cgi是一种为了保证web server传递过来的数据是标准格式的通用网关接口协议

比较老，比较原始，大多已经不用了


## FastCGI
CGI的升级版本，FastCGI 像是一个常驻 (long-live) 型的 CGI，它可以一直执行着，只要激活后，不会每次都要花费时间去解析php.ini、重新载入全部dll扩展并重初始化全部数据结构。

PHP使用PHP-FPM(FastCGI Process Manager)，全称PHP FastCGI进程管理器进行管理。

FastCGI工作原理

FastCGI的工作原理是：

(1)、Web Server启动时载入FastCGI进程管理器【PHP的FastCGI进程管理器是PHP-FPM(php-FastCGI Process Manager)】（IIS ISAPI或Apache Module);

(2)、FastCGI进程管理器自身初始化，启动多个CGI解释器进程 (在任务管理器中可见多个php-cgi.exe)并等待来自Web Server的连接。

(3)、当客户端请求到达Web Server时，FastCGI进程管理器选择并连接到一个CGI解释器。Web server将CGI环境变量和标准输入发送到FastCGI子进程php-cgi。

(4)、FastCGI子进程完成处理后将标准输出和错误信息从同一连接返回Web Server。当FastCGI子进程关闭连接时，请求便告处理完成。FastCGI子进程接着等待并处理来自FastCGI进程管理器（运行在 WebServer中）的下一个连接。在正常的CGI模式中，php-cgi.exe在此便退出了。

在CGI模式中，可以想象 CGI通常有多慢。每一个Web请求PHP都必须重新解析php.ini、重新载入全部dll扩展并重初始化全部数据结构。使用FastCGI，所有这些都只在进程启动时发生一次。一个额外的好处是，持续数据库连接(Persistent database connection)可以工作。

## Cli
PHP-CLI是PHP Command Line Interface的简称，就是PHP在命令行运行的接口，区别于在Web服务器上运行的PHP环境（PHP-CGI等）。

我们在Linux下经常使用”php –m”查找PHP安装了那些扩展就是PHP命令行运行模式。 你可以打入 php -h 来看看具体都有什么命令。

在php-cli模式下我们可以直接启动一个php文件并执行，就像workerman中一样

```
php index.php start
```

要说明的是，php-cli模式并没有php运行超时的说法。

## 模块模式
```
Apache + mod_php
lighttp + spawn-fcgi
nginx + PHP-FPM
```

一般是针对apache而言的，这种方式，他们的共同本质都是用 LoadModule 来加载 phpX_module，就是把php作为apache的一个子模块来运行。当通过web访问php文件时，apache就会调用phpX_module来解析php代码，那么phpX_module是怎么来将数据传给php解析器来解析php代码的呢？答案是通过sapi。

所以，以上的apache调用php执行的过程如下：

```
apache -> httpd -> php5_module -> sapi -> php
```

apache每接收一个请求，都会产生一个进程来连接php通过sapi来完成请求，可想而知，如果一旦用户过多，并发数过多，服务器就会承受不住了。

而且，把mod_php编进apache时，出问题时很难定位是php的问题还是apache的问题。

由于php-cgi是随服务器启动载入的，所以初始化变量只会发生一次

>小结

如果要搭建一个高性能的PHP WEB服务器，目前最佳的方式是Apache/Nginx + FastCGI + PHP-FPM(+PHP-CGI)方式了，不要再使用 Module加载或者 CGI 方式啦

## PHP-FPM 
PHP-FPM（FastCGI 进程管理器）用于替换 PHP FastCGI 的大部分附加功能，对于高负载网站是非常有用的。
它的功能包括:

- 支持平滑停止/启动的高级进程管理功能;
- 可以工作于不同的 uid/gid/chroot 环境下，并监听不同的端口和使用不同的 php.ini 配置文件（可取代 safe_mode 的设置）;
- stdout 和 stderr 日志记录;
- 在发生意外情况的时候能够重新启动并缓存被破坏的 opcode;
- 文件上传优化支持;
- "慢日志" - 记录脚本（不仅记录文件名，还记录 PHP backtrace 信息，可以使用 ptrace或者类似工具读取和分析远程进程的运行数据）运行所导致的异常缓慢;
- fastcgi_finish_request() - 特殊功能：用于在请求完成和刷新数据后，继续在后台执行耗时的工作（录入视频转换、统计处理等）;
- 动态／静态子进程产生;
- 基本 SAPI 运行状态信息（类似Apache的 mod_status）;
- 基于 php.ini 的配置文件。

### 工作原理:
它的工作原理大概为:
```
php-fpm启动->生成n个fast-cgi协议处理进程
->监听一个端口等待任务用户请求->web服务器接收请求
->请求转发给php-fpm->php-fpm交给一个空闲进程处理
->进程处理完成->php-fpm返回给web服务器
->web服务器接收数据->返回给用户
```

## PHP-CLI
在前面的简单介绍中，我们已经了解了有PHP-CLI这个模式，现在我们继续详细了解下PHP-CLI和传统网络模式不一样的地方吧

超时时间
在php-cli中，是没有超时时间的，也无法通过set_time_limit设置超时时间，例如：
```
<?php
set_time_limit(30);
while (1){
    echo 1;
    sleep(1);
}
```

这段代码，在常规web下运行，只要到30秒就会报致命错误：超过30秒的最大执行时间......这样的错误
而在php-cli中，这段代码将会一直执行，一直输出1到控制台中

### 缓冲缓冲
在常规网络模式中，回声，的var_dump，的phpinfo等输出语句/函数，默认情况是先进入的PHP缓冲区，等缓冲区到达一定数量，才开始传输给网络服务器的，但是在PHP-CLI模式中，默认关闭缓冲液，直接输出，例如以下代码：
```
<?php
ob_start();//开启buffer缓冲区  php-cli下默认关闭buffer,由于web访问测试较麻烦,该段代码只为了查看以及测试缓冲区的作用,在web模式下,默认开启,无需手动开启,可自行配置
for($i=0;$i<1000;$i++){
    echo $i;
    sleep(1);
    if($i%10==0){
        //当i为10的倍数时,将直接结束并输出缓冲区的数据,然后再次开启缓冲区
        ob_end_flush();
        ob_start();
    }
}
```
也可通过ob_get_contents函数获取缓冲区内容，OB缓冲系列函数可自行搜索了解

缓冲缓冲详细内容可查看：http：//www.php20.cn/article/sw/buffer/104

标准输入/输出/错误
执行一个命令行都存在3个标准文件（Linux的一切皆文件）：

标准输入（stdin，通常对应终端的键盘，进程可通过该文件获取键盘输入的数据）

标准输出（stdout，对应终端的屏幕，进程通过写入数据到该文件，将数据显示到屏幕）

标准错误（stderr，对应终端的屏幕，进程通过写入数据到该文件，将错误信息显示到屏幕）在php-cli命令行下，可通过以上3个文件句柄进行一系列的逻辑操作，比如：
启动php文件，监听标准输入，获取到输入的网址，php再进行网址的数据请求/接收等等操作而在常规web模式下，标准输出会被拦截
echo var_dump等输出函数其实就是stdout，但是在常规web访问下被重定向到了web服务器，然后由web服务器输出

 


