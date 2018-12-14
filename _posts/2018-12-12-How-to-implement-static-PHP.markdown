---
layout:     post
title:      "PHP如何实现静态化"
subtitle:   " \"How to implement static PHP\""
date:       2018-12-12 15:10:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 基础
    - php
---

>  php基础

## 慕课网

[教学视频](PHP实现页面静态化)

## 为什么要页面静态化？

1. 动态文件执行过程:语法分析-编译-运行

2. 静态文件，不需要编译，减少了服务器脚本运行的时间，降低了服务器的响应时间，直接运行，响应速度快；如果页面中一些内容不经常改动，动态页面静态化是非常有效的加速方法。（纯静态，伪静态还是需要PHP解释器的）

3. 生成静态URL利于SEO，利于蜘蛛抓取和收录，有利于提升排名

优化页面响应时间方法

```
1.动态页面静态化

2.优化数据库

3.负载均衡

4.使用缓存等等

//动态页面静态化一般用于不经常改动的地方，频繁改动的地方一般不适用静态化，可用伪静态（例如微博等）
```

静态化详细介绍

1、纯静态分为局部静态化（局部动态化，使用AJAX动态获取数据）和纯静态化。

伪静态：改变URL（需要服务器支持,如：apache等等）

2、从URL结构以及页面名称看，伪静态和静态页面是一样的。伪静态的页面后缀可以是html htm 或者是目录格式

伪静态只是改变了URL的表现形式，实际上还是动态页面

静态页面可以节省服务器资源，而伪静态严格说是增加服务器资源消耗的

总结，在SEO方面，伪静态和静态页面的功能是相同的，但是伪静态本质上还是动态页面，所以消耗资源是和动态页面一样的，而且因为Rewrite服务器还需要消耗额外的资源。

Buffer缓冲区认知

1、开启buffer

•在php.ini中的output_buffering开启
•在php文件中使用ob_start()函数开启

?
1
2
3
4
5
; Default Value: Off
; Development Value: 4096
; Production Value: 4096
; http://php.net/output-buffering
output_buffering = 4096
2、获取缓冲区的内容

output_buffering=on 需要先开起，才能调用ob_get_contents()函数。但是，如果不开启output_buffering时，当在头文件中调用函数ob_start()函数时，ob_get_contents()也能使用。

ob_get_content();//返回输出缓冲区的内容;

PHP如何实现页面纯静态化

基本方式

1、file_put_contents

2、使用PHP内置缓存机制实现页面静态化output_buffering

?
1
2
3
4
ob_start()//如果php.ini已经开启，那么这里会开启一个新的输出缓冲区;
ob_get_contents()//获取输出缓冲区内容；
ob_clean()//清空输出缓冲区内容，但是不会删除输出缓冲区
ob_get_clean//获取输出缓冲区内容并且删除输出缓冲区，等价于ob_get_contents和ob_end_clean)
下方这段代码，运行是不会有输出的

原因就是输出缓冲区被清空了，看上图理解

?
1
2
3
4
5
ob_start();
echo 777;
echo 000;
ob_clean();
echo ob_get_contents();
纯静态实现，代码和实现逻辑参考：
?
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
<?php
/**
 * 触发系统生成纯静态化页面业务逻辑
 * 有3种方案： 
 * 第一：定时扫描程序(利用crontab来处理) 
 * 第二：手动触发方式，人为触发
 * 第三：页面添加缓存时间，在页面中控制时间来操作
*/
//===========================================
//生成纯静态文件步骤
//1、连接数据库，然后从数据库里面获取数据
//2、把获取到的数据填充到模版文件里面
//3、需要把动态的页面转为静态页面，生成静态化文件
//============================================
//PHP实现页面静态化有以下步骤：
//1:A.php请求数据库数据：通过mysql或者mysqli或者PDO扩展
//2:在A.html中输出A.php请求的数据库数据:一般是将将在数据库中取出的数组形式的数据赋予新的数组，并且输出
//3:在A.php中包含A.html文件:直接通过require_once()函数或者inclde_once()
//4：开启数据缓存ob_start()=>获取获取缓存内容并且将数据生成在静态文件中file_put_contents('index.shtml',ob_get_clean());
//header("content-type:text/htm;charset=utf-8");
if(is_file('./index.html') && (time() - filemtime('./index.html') < 1200))
{
  //缓存未失效则直接加载静态文件
  require_once('./index.html');
}
else
{
  //缓存失效了则重新生成
  // 引入数据库链接操作
  require_once('./db.php');
  $sql = "select * from news where `category_id` = 1 and `status` = 1 limit 4";
  try
  {
      $db = Db::getInstance()->connect();
      $result = mysql_query($sql, $db);
      $newsList = array();
      while($row = mysql_fetch_assoc($result)) 
      {
          $newsList[] = $row;
      }
  }
  catch(Exception $e)
  {
      // TODO
  }
  ob_start();
  require_once('template/index.php');//引入模版文件
  file_put_contents('./index.html', ob_get_contents());//生成静态文件
  //ob_clean();
}
静态页面中局部动态化实现

利用Jquery中的ajax请求文件，获取到返回的JSON数据，然后应用到模版就可以了

伪静态

Nginx服务器默认不支持PATH INFO模式，需要额外配置

Apache伪静态设置

1、开启apache mod_rewrite.so 配置 在 httpd.conf中。

测试的话可以用phpinfo查看，看是否loaded modules 有这个模块

2、inculde conf/extra/httpd-vhosts.conf virtual hosts支持，虚拟域名配置

3、编辑vartual host 文件

4、本机host文件加入配置的域名（如果需要本机测试针对windows）

5、伪静态配置

- 5.1 rewrite engine on 
- 5.2编写规则

?
1
^/post/([0-9]*).html$ /post.php?id=$1
放在 virtualhost 段中 
post.php 中编写

?
1
2
<?php 
echo 'this is '.$_GET['id'];
然后可以访问a.com/123.html 返回的就是this is 123.

扩展：如果目录下有123.html这个真正的文件，那么还是加载了动态的post 123. 
那么如何设置呢，想要当前文件有了真正的静态文件，那么需要以下配置了

?
1
2
3
4
5
6
RewriteEngine on
RewriteRule ^/post/([0-9]*).html$ /post.php?id=$1
#存在目录
RewriteCond %｛DOCUMENT_ROOT}%{REQUEST_FILENAME}!-d
#存在文件
RewriteCond%｛DOCUMENT_ROOT｝%{REQUEST_FILENAME}}!-f
以上两句话意思是如果根目录下有请求的目录或者文件，那就用他

当然这个要放在刚刚的那个rewrite的上面。

Nginx伪静态

伪静态是影响服务器性能的，不是越多越好，需要按需求而定