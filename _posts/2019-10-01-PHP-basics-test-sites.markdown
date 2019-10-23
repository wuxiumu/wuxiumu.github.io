---
layout:     post
title:      "PHP基础知识考点"
subtitle:   " \"PHP basics test sites\""
date:       2019-10-01 09:30:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 面试
    - php
---

![](/img/in-post/post-blog/3817251934a8845b62c54ea8390f499d.png)
 
## 1.PHP 引用变量
- ### 真题回顾

         什么是引用变量？在PHP中用什么符号定义引用变量

- ### 考点分析

php引用变量的概念及定义方式；

php变量的工作原理。理解COW（copy on write 写时复制机制）；
```
<?php

$a = range(0, 3);
xdebug_debug_zval('a');

$b = &$a;
xdebug_debug_zval('a');

$a = range(0, 3);
xdebug_debug_zval('a');
```

考点 unset：
```
<?php
// unset 只会取消引用，不会销毁空间
$a = 1;
 
$b = &$a;
 
unset($b);
 
echo $a. "\n";//$a 还是1
```

考点 :对象本身就是引用传值
```
<?php
 
// 对象本身就是引用传递
class Person
{
    public $name = "zhangsan";
}
 
$p1 = new Person;
xdebug_debug_zval('p1');
 
$p2 = $p1;
xdebug_debug_zval('p1');
 
$p2->name = "lisi";
xdebug_debug_zval('p1');
```

- 一网打尽

写出如下程序的输出结果
```
<?php
 
/**
 * 写出如下程序的输出结果
 * 程序运行时，每一次循环结束后变量$data的值是什么？请解释
 * 程序执行完成后，变量$data的值是什么？请解释
 */
 
$data = ['a', 'b', 'c'];
 
foreach ($data as $key=>$val)
{
    $val = &$data[$key];
    var_dump($data);
}
 
var_dump($data);
```

延伸考点
```
a.函数参数
    默认情况下函数是值传递
    如果希望允许函数修改它的值，必须通过引用传递
b.外部文件导入
    include、require语句包含并运行制定文件
    如果给出路径名，按路径名找，否则在include_path中查找
    如果include_path中也没有，则在调用文件的当钱目录查找
    include加载未找到文件会发出一条警告，脚本继续运行。
    requier加载未找到文件会发出一个致命错误，脚本终止。
    require_once,include_once和require，include，的区别是检查文件是否已经包含过，如果是则不再次包含。
c.系统内置函数
    1.时间日期函数
        data（） 格式化本地日期和时间，并返回格式化的日期字符串
        strtotimme（）获取指定日期的unix时间戳
        mktime（）返回一个日期的 UNIX 时间戳，然后使用它来查找该日期的天
        time（）返回当前时间的 Unix 时间戳，并格式化为日期
        microtime（） 函数返回当前 Unix 时间戳的微秒数
        date_default_timezone_set（）设置默认时区
    2.ip处理函数
        ip2long（）将四个字段以点分开的IP网络址协议地址转换成整数
        long2ip（）用于将一个数字格式的IPv4地址转换成字符串格式
    3.序列化和反序列化函数
        serialize（）
        unserialize（）
        较为复杂的数组数据变为字符串，方便数组存库操作。需要用的时候取出还原
    4.字符串处理函数
        implode（） 把数组元素组合为一个字符串
        explode（） 把字符串打散为数组
        join（） 把数组元素组合为一个字符串
        strrev（） 反转字符串
        trim（）移除字符串两侧的字符
        ltrim（）移除字符串左侧的字符
        rtrim（）移除字符串右侧的字符
        strstr（）函数搜索字符串在另一字符串中是否存在，如果是，返回该字符串及剩余部分，否则返回 FALSE
        number_format（）通过千位分组来格式化数字
        ………………
    5.数组处理函数
        array_keys（）返回包含数组中所有键名的一个新数组
        array_value（）返回数组中所有的值（不保留键名）
        array_diff（）比较两个数组的键值，并返回差集
        array_intersect（）比较两个数组的键值，并返回交集
        array_merge（） 把两个数组合并为一个数组
        array_shift（）删除数组中的第一个元素，并返回被删除元素的值
        array_unshift（）函数用于向数组插入新元素。新数组的值将被插入到数组的开头
        array_pop（）函数删除数组中的最后一个元素
        aray_push（）函数向数组尾部插入一个或多个元素
        sort（） 函数对索引数组进行升序排序
        rsort() 函数对索引数组进行降序排序
        ……………………
```

## 2.常量及数据类型
- 真题回顾

      PHP字符串的三种定义方式及各自区别？定义方式：单引号、双引号、heredoc，newdoc。heredoc 类似于双引号，$str=<<<EoT ...... EoT;   newdoc类似单引号,$str=<<<'EoT' ...... EoT;

- 考点分析

       数据类型：三大类数据类型，标量：浮点、整型、字符串、布尔； 复合： 数组、特殊：

       浮点不能用于相等运算；

      布尔false的7种情况：0、0.0、‘’、‘0’、false、array()、null；

      数组:超全局数组，$GLOBAL 、$_GET、 $_POST、 $REQUEST、$_SESSION、$_COOKIE、$_SERVER、$_FILE、$_ENV;

     重点$_SERVER、

        $_SERVER['SERVER_ADDR']:服务器端的ip地址 、

        $_SERVER['SERVER_NAME']：服务器名称、

        $_SERVER['REQUEST_TIME']：请求时间、

        $_SERVER['HTTP_REFERER']：请求的上级页面

        $_SERVER['REMOTE_ADDR']：客户端ip

        $_SERVER['PATH_INFO']：

 常量：定义 const define ， const更快，是语言结构；define是函数；

     预定义常量：__FILE__、__DIR__、__LINE__、__FUNCTION__ 、__CLASS__、__TRAIT__、__METHOD__、 __NAMESPACE__

- 一网打尽

     用php写出显示客户端ip和服务端ip的代码；

    `__FILE__` 代表什么意思；

## 3.运算符

         foo() 和@foo()有什么区别     

- 真题回顾​​​​
- 考点分析

       错误抑制符号@的使用；

      延伸考点：

        运算符的优先级（ PHP手册运算符优先级）；比较运算符；递增递减运算符；逻辑运算符；

       重点记忆：递增/递减 > ! > 算数运算符 > 大小比较 > (不)相等比较 > 引用 > 位运算（^）>位运算符（|）> 逻辑与 >逻辑或 >三目> 赋值 > and > xor > or

      递增/递减不影响布尔值、递增NULL 值为1、递减null没有效果；

理解逻辑运算符 短路作用；
```
<?php
 
/**
 * 下列程序中请写出打印输出的结果
*/
$a = 0;
$b = 0;
 
if ($a = 3 > 0 || $b = 3 > 0) 
{
    $a++;
    $b++;
    echo $a. "\n";
    echo $b. "\n";
}
```

## 4.流程控制

- 真题回顾

       php的遍历数组的三种方式以及各自区别，使用for循环；使用foreach；使用while、list()、each()组合循环；

       for只能遍历索引数组，foreach可以遍历索引和关联数组。while、list() 和each()不会reset(); foreach会对数组reset操作；

- 考点分析

       延伸考点:if.... elseif..... 、 swich....case:switch后面的控制表达式的类型只能是整型、浮点型、或者字符串;

       switch 会生成跳转表、直接跳转到case；

- 一网打尽

      php如何优化多个if elseif 语句的情况？

## 5.自定义函数及内部函数
真题回顾
```
<?php
 
/**
 * 写出如下程序的输出结果：
 *
 */
 
$count = 5;
function get_count()
{
    static $count;  
    return $count++;
}
 
echo $count;
++$count;
 
echo get_count();
echo get_count();
```
- 考点分析

    变量的作用域 和 静态变量；

    函数的参数以及参数的引用传递；

   函数的返回值以及引用返回；

   外部文件的导入；

   系统内置函数；时间日期函数、ip处理函数，打印处理函数，序列化 反序列化函数、字符串处理函数，数组处理函数，

- 一网打尽

## 6.正则表达式
- 真题回顾

    手机号正则表达式的编写


    ```
    $isTel="/^([0-9]{3,4}-)?[0-9]{7,8}$/";
    $isMob="/^1[3-8]{1}[0-9]{9}$/";
    // 13988888888
    $str = '13988888888';
    $pattern = '/^139\d{8}$/';
    preg_match($pattern, $str, $match);
    var_dump($match);
    ```
    请写出一个正则表达式，取出页面中所有 img标签 中的 src值。
    ```
    $str = '<img alt="狗狗" id="dog" src="dog.jpg" />';
    $pattern = '/<img.*?src="(.*?)".*?\/?>/i';
    preg_match($pattern, $str, $match);
    var_dump($match);
    ```
    用来匹配邮箱，匹配方式如下
    ```
    $regex= '/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/';
    $regex1="/([a-z0-9]*[-_.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[.][a-z]{2,3}([.][a-z]{2})?/i"; 
    $str = "email@example.com";
    $result = preg_match($regex,$str)；
    //若邮箱格式正确，result值为1，错误则为false
    ```

- 考点分析

    正则表达式的作用：分割、查找、匹配、替换字符串

   分隔符：正斜线（/），hash符号（#），取反符号（~）；

   通用原子：\d(十进制0~9), \D（除了0~9）, \w（数组字母下划线），\W（除了数字字母下划线） ,\s（空白符）, \S（除了空白符）；

 元字符：

元字符
```
.	除了换行以外的任一字符	 
*	匹配前面的内容出现0次1次或者多次；	 
?	0次或者一次	 
^	必须以他开头 	 
$	必须以他结尾	 
+	出现一次或者多次	 
{n}	恰巧出现n次	 
{n,}	大于等于n次	 
{n,m}	大于等于n小于等于m	 
[ ]	表示一个集合，配置集合中的一个元素	 
()	 一个整体	 
[^]	除了 	 
|	或者	 
[-]	：一个范围  	例如[0-9] 
```
 模式修正符：
```
i：不区分大小写，

m：将字符串通过分隔符分割，就是将字符串中的每一行分别进行匹配

e：，s，U，x，A，D，u
```
延伸: 后向引用 、贪婪模式

- 一网打尽

## 7.文件及目录处理
- 真题回顾

     不断在hello.txt头部写入一行hello word 字符串，要求代码完整；
```
<?php
 
// 打开文件
// 将文件的内容读取出来，在开头加入Hello World
// 将拼接好的字符串写回到文件当中
// Hello 7891234567890
//
$file = './hello.txt';
$handle = fopen($file, 'r');
$content = fread($handle, filesize($file));
$content = 'Hello World'. $content;
fclose($handle);
$handle = fopen($file, 'w');
fwrite($handle, $content);
fclose($handle);
```
- 考点分析

    文件的读取/写入;

        fopen()函数，打开模式：r/r+,w/w+, a/a+,x/x+,b,t

   目录操作函数；

- 一网打尽

     通过php函数对目录进行遍历；
```
<?php
 
$dir = './test';
 
// 打开目录
// 读取目录当中的文件
// 如果文件类型是目录，继续打开目录
// 读取子目录的文件
// 如果文件类型是文件，输出文件名称
// 关闭目录
//
 
function loopDir($dir)
{
    $handle = opendir($dir);
 
    while(false!==($file = readdir($handle)))
    {
        if ($file != '.' && $file != '..')
        {
            echo $file. "\n";
            if (filetype($dir. '/'. $file) == 'dir')
            {
                loopDir($dir. '/'. $file);
            }
        }
    }
}
 
loopDir($dir);
```

## 8.会话控制
- 真题回顾

     简述cookie 和session的区别以及各自的工作机制，存储位置等，简述cookie的优缺点；

- 考点分析

       php会话控制结束；

      为什么要使用会话控制技术；

- 一网打尽

   session的存储方式，如何进行遍历；

## 9.面向对象
- 面试真题

    请写出php类权限控制修饰符； public protected private

- 考点分析

       面向对象的封装，继承和多态；单一继承，方法重写，抽象类的定义，接口的定义

       魔术方法：_

       设计模式:工厂模式 单例模式 单例模式 注册树模式 适配器模式观察者模式 策略模式；

- 一网打尽

     请写出php的构造函数和析构函数;

## 10.网络协议考点
- 真题回顾

      http 1.1 中 状态码200， 301 304 403 404 500的含义；

     [【PHP面试题】HTTP/1.1中，状态码 200 301 304 403 404 500 的含义。](https://blog.csdn.net/studyphp123/article/details/83620154)

- 考点分析
      osi七层模型：物理层、数据链路层、网络层、传输层、会话层、表示层、应用层；

      http的工作原理及特点；基于b/s模式

      http协议常见请求头/响应头 和请求方法；content-type、accept、origin、...

      https协议的工作原理；get post head options put delete trace

    get post  区别，

    常见协议含义及端口;

- 一网打尽

# PHP基础知识点（面试常考）
超全局变量
```
$_SERVER['SERVER_ADDR'] 服务器IP地址

$_SERVER['QUERY_STRING'] ?后面的一大串

$_SERVER['REMOTE_ADDR']客户端IP地址 

$_SERVER['HTTP_REFFRER']上级请求的页面，如果通过网址通过访问，为空

$_SERVER['PATH_INFO']中间的use/reg    
```
 错误运算符@：

php支持一个错误运算符@。当将其放在一个PHP表达式之前，该表达式可能产生的任何错误信息

都被忽略掉

运算符优先级：

1.递增递减运算符不影响布尔值 2.递减NULL没有效果，递增NULL值为1 3.递增和递减在前就先运算

符后返回，反之就先返回，后运算

VAR_DUMP和PRINT_R的区别：

var_dump返回表达式的类型与值而print_r仅返回结果，相比调试代码使用var_dump更便于阅读。
 

FLASE的七种情况：都是等值的

超全局数组  $GLOBALS包括后面所有数组

短路作用

三种循环方式：1.FOR 2.FOREACH 3.WHILE、LIST()、EACH()

静态变量
- [Static（静态）关键字](https://www.php.net/oop5.static)
- [php中static 静态关键字](https://www.cnblogs.com/haizizhu/p/8040236.html)
- [PHP Static（静态）关键字解说](https://blog.csdn.net/whosheng/article/details/101084204)
- [PHP static](https://blog.csdn.net/xbj24215/article/details/90376847)

打印处理：

print()只能打印一个 echo能打印多个，逗号隔开

var_dump()能打印类型 pirnt_r()能打印格式化好的数据

var_export()能打印格式化好的数据第二个参数true能返回，符合php语法，var_dump()不行

序列化和反序列化函数：

php数组随机函数：

array_rand() 函数返回数组中的随机键名，或者如果您规定函数返回不只一个键名，则返回包含随机键名的数组。
```
<?php
$a=array("red","green","blue","yellow","brown");
$random_keys=array_rand($a,3);
echo $a[$random_keys[0]]."<br>";
echo $a[$random_keys[1]]."<br>";
echo $a[$random_keys[2]];
?>
```
运行实例

数组处理函数



array_diff()数组X集 array_intersect()交集 array_merge()数组合并

字符串处理函数


IP处理函数

long2ip用于将一个数字格式的IPv4地址转换成字符串格式(192.168.0.1)

ip2long()相反

序列化函数

序列化serialize()：就是将一个变量所代表的 “内存数据”转换为“字符串”的形式，并持久保存在硬盘（写入文件中保存）上的一种做法，即，把“内存数据”转换为“字符串”然后保存到文件中；

反序列化unserialize()：就是将序列化之后保存在硬盘（文件）上的“字符串数据”恢复为其原来的内存形式的变量数据的一种做法，即，把文件中保存的序列化后的“字符串数据”恢复为“内存数据”；

 

## 网络协议
osi七层模型：

1.物理层 2.数据俩链路层 3.网络层 4.传输层 5.会话层 6.表示层 7.应用层

第一层：物理层

为设备之间的信息传输提供可靠环境，那么这个环境是什么呢？
就是如：同轴电缆，插头，接收器，水晶头，网线等。可以在通信的两个数据终端的设备之间连接起来形成一条通路。
再说下这个协议中的某一项规定：比如eiars-232-c及rs-449就可以兼容于100序列线上。

第二层：数据链路层

提供数据的传送服务。这里涉及到一个信息就是帧，它是数据传输的单元，不同的协议帧的长短也不同。它还有差错恢复，流量控制的功能（这个指的是硬件）

ISO1745--1975 、ISO7776 、ISO3309--1984 就是这一层的三种不同协议，而每一个协议帧的长短也是不同的。

我们常见的链路层产品就是网卡，网桥等。

第三层：网络层 

它的作用是路由的选择，网络的激活和终止。它还有的一个重要功能就是在一条数据链路上复用多条网络连接，大多采用的是分时复用的技术。

我们常见的是路由器、网关等

第四层：传输层

它是两台计算机经过网络进行数据通信时最基础的端到端的一个层次。它的服务满足了传送质量，传达速度，传送费用的不同需要。它还具有差错恢复，流量控制的功能（这个指的是软件）

很多时候我们会发现QQ聊天的速度很快，但是我们上网速度就很慢，这就是因为QQ使用UDP协议，没有纠错功能，而网络的传输使用的是TCP协议，它的纠错功能就会导致传输速度变慢。还有UDP协议

第五层：会话层

它的服务可使应用建立和维持会话。再举个栗子：就像两个人打电话，一个人说，对方听到后回应他，这就是会话层在发挥作用，它能够使信息传递时保持同步，并按次序进行。

第六层：表示层

它包括数据的表示形式，文字，图形，图片等都有各自的格式，就像图片的格式有JPG，GIF等。

还有就是数据含义，就是数据的符号

这一层的作用就是为异种机通信提供一种公共语言，以便相互操作。例如，IBM主机使用EBCDIC编码，而大部分的PC机使用的是ASCII码。这就要表示层来完成这一转换。

第七层：应用层

实现应用进程之间的信息交换。同时还有一系列的业务处理所需要的服务功能。像文件的传送，访问和管理，打印服务都是属于应用层。

七层模型是很抽象的一个概念。一般情况下，物理层，数据链路层，网络层对应的是一个设备，这个设备在某一层就有某种功能，而传输层，会话层，表示层对应的是协议，而应用层就是使用什么样的软件。

 

HTTP协议工作特点



工作原理



 

请求/响应头：
Content-Type请求与实体的对应的MME信息

Accept指定客户端能接受的内容、类型

Origin最初请求来源与哪里主要POST

Cache-Control 指定请求的缓存机制

User-Agent用户信息

Referrer上级请求路径

X-Forwaeded-For请求端真实的IP

Access-Control-Allow-Origin 允许特定域名进行访问，跨域使用

Last-Modified 请求资源的最后相应时间

 

HTTP请求方法：

HEAD不会回传资源，只会回传头信息

OPTIONS测试服务器功能是否正常，返回该资源服务器支持的所有HTTP请求方法

 PUT 更新内容 替换内容

TRACE请求服务器回显的信息 测试

GET与POST区别

1.刷新页面的时候，get无害，post重新提交数据

2.get能收藏为书签，post不可以

3.get能缓存，post不能

4.get向URL提交数据长度2048字符 post无限制

5.get与post允许数据类型不一样 

6.get不安全，在URL中显示，post安全很多

HTTPS工作原理

## 网络协议

FTP文件传输协议 默认端口21 下载文件，上传主页

Telnet用户能通过自己的身份远程连接到计算机上 远程登录 默认端口23

SMTP定义简单邮箱传输协议 端口25

POP3接收邮件 端口110

HTTP超文本传输协议 端口80

DNS域名解析服务 windowNT系统中用的多 端口53

文件写入：将文件的内容读取出来，在开头加入Hello World
```
//打开文件
//将文件的内容读取出来，在开头加入Hello World
//将拼接好的字符串写回到文件当中
 
$file = './hello.txt'
 
$handle = fopen($file,'r');
 
$content = fread($handle,filesize($file));    //读取文件
 
$content = 'Hello World'.$content;   //连接字符
 
fclose($handle);
 
$handle = fopen($file,'w');  //只读
 
fwrite($handle,$content);
 
fclose($handle);
遍历文件夹下的文件

//打开目录
//读取目录当中的文件
//如果文件类型是目录，继续打开目录
//读取子目录的文件
//如果文件类型是文件，输出文件名称
//关闭目录
 
 
$dir = './test';
 
    function loopDir($dir)   //递归遍历方法
    {
        $handle = opendir($dir);
        while(false!==($file = readdir($handle)))
 
        {
            if($file!='.'&&$file!='..')
            {
                echo $file."\n";
                if(filetype($dir.'/'.$file)=='dir')  //如果是文件夹
                {
                    loopDir($dir.'/'.$file);  //调用本身函数
                }
            }
        }
    }
 
loopDir($dir);
```
魔术方法