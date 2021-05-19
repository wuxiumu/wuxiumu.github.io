---
layout:     post
title:      "PHP中composer的安装和使用"
subtitle:   "PHP composer installation and use"
header-img: "img/post-bg-2015.jpg"
navcolor:   "invert"
date:       2018-12-01 23:10:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 工具
---

需要用到composer, 当需要更包的时候，脑子里突然忘记了怎么用了，马上去百度了一下，很长时间没用了，都没印象了，还好找到了一篇比较易懂的文章，分享一下，也做备用。以后没准还会用到。

## 问题一

加载php_curl.dll和php_openssl.dll出错原因及解决办法

原因是并不是所有的dll文件直接打开就可以了，有的是要依赖一些文件的，比如这个php_curl.dll就依赖两个文件（ssleay32.dll和libeay32.dll）如果这两个文件没有配置对那么就会提示找不到此动态库，这两个文件在php的目录下面，在install.txt这个文件里有对这些库文件加载时的说明。

解决办法：把这两个文件拷贝一份到系统目录下面，我放到windows下面，或是在httpd.conf的文件中配置一下：

```
LoadFile "D:/webserver/php/ssleay32.dll"
LoadFile "D:/webserver/php/libeay32.dll"
```

## 开始安装

是什么

如果你知道yum、apt-get、npm、bower等命令中的一种或者多种，那么，你也能很快知道composer是什么了。没错，它就是PHP里快速安装类库的。平时，我们安装一个PHP类库，需要搜索->下载；使用composer，我们只要知道包名，直接composer insatll就可以了。

PHP 语言本身就带有强大的网络功能、文件管理功能和丰富的系统 API，Composer 也只是一段 PHP 脚本而已。

引自Composer中文网的描述：

是 PHP 用来管理依赖（dependency）关系的工具。你可以在自己的项目中声明所依赖的外部工具库（libraries），Composer 会帮你安装这些依赖的库文件。

作用

安装PHP包、依赖库。

示例：

```
$ composer require monolog/monolog
```

这是在安装monolog库。

```
$ composer create-project laravel/laravel learnlaravel5 5.0.22
```

这是在安装laravel框架并创建项目。

YII框架也是通过composer安装的。

为什么用composer
通过过composer，我们可以使用大量的第三方库，而无需自己造轮子。优秀项目示例：

```
overtrue/wechat 让微信开发更简单！
catfan/medoo 一款ORM框架
monolog/monolog 日志记录
hprose/hprose RPC框架
```

你可以在 [https://packagist.org/](https://packagist.org/) 

找到你需要的库。甚至你可以提交自己写的优秀的库到该平台里供大家使用。

如果不会composer，流行的laravel、yii框架安装都成为问题，更不用谈学习了；很多优秀的轮子你无法使用。所以，推荐phper必须学会composer。

安装Composer

首先得安装Composer命令行工具。由于国内互联网某种神秘的力量让Composer变得越来越不稳定，可能导致安装不了。如果无法按步骤安装，本小节最后我会提供国内下载地址。

脚本自动安装
下面是安装命令(来自[https://getcomposer.org/download/](https://getcomposer.org/download/))：

```
php -r "readfile('https://getcomposer.org/installer');" > composer-setup.php
 
php -r "if (hash('SHA384', file_get_contents('composer-setup.php')) === 'fd26ce67e3b237fffd5e5544b45b0d92c41a4afe3e3f778e942e43ce6be197b9cdc7c251dcde6e2a52297ea269370680') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); }"
 
php composer-setup.php
 
php -r "unlink('composer-setup.php');"
```

按顺序执行即可。安装好后提示：

```
All settings correct for using Composer
Downloading...
Composer successfully installed to: /root/composer/composer.phar
Use it: php composer.phar
```

操作执行结束，会在当前目录下生成composer.phar文件。

在Linux里，composer.phar是可执行程序。

例如，我们可以使用php composer.phar update执行更新操作。

全局安装：

```
mv composer.phar /usr/local/bin/composer
```

之后，就可以直接使用composer install安装包了。不过通常情况下只需将composer.phar的位置加入到PATH就可以，不一定要全局安装。

手动安装
首先去[https://getcomposer.org/download/](https://getcomposer.org/download/)

下载[https://getcomposer.org/download/1.2.0/composer](https://getcomposer.org/download/1.2.0/composer)

下载后放到php安装位置里，然后

Linux:

```
cp composer.phar /usr/bin/composer
chmod +x /usr/bin/composer
```

Windows:

新建：

```
composer.bat #windows用
composer #git-bash用
composer.bat
```

```
@ECHO OFF
php "%~dp0composer.phar" %*
```

## 开始使用

生成一个空的Composer项目

在合适的地方新建一个文件夹，命名为 MFFC（My First Framework based on Composer），在文件夹下新建文件 composer.json：

```
{
  "require": {
  }
}
```

命令行切换到 MFFC 目录下，运行：

```
composer update
```

就会在该目录下生成一个vendor文件夹。以后所有的第三扩展包都会安装在这里。

里面的代码大家可以看看。

安装扩展包

以下以monolog为例：

声明依赖

在项目目录下创建一个composer.json文件，指明依赖，比如，你的项目依赖 monolog：

```
{
    "require": {
        "monolog/monolog": "1.2.*"
    }
}
```

如果不需要使用https，可以这么写，以解决有时候因为https造成的问题：

```
{
    "require": {
        "monolog/monolog": "1.2.*"
    },
    "config": {
        "secure-http": false
    }
}
```

安装依赖

安装依赖非常简单，只需在项目目录下运行：

```
composer install
```

如果没有全局安装的话，则运行：

```
php composer.phar install
```

更新全部的包（谨慎使用）：

```
composer update
```

注意：使用composer install或者composer update命令将会更新所有的扩展包，项目中使用需谨慎！！！

若只安装指定的包推荐在命令行使用：

```
composer require monolog/monolog
```

进行安装。

如果需要指定版本：

```
composer require "monolog/monolog:1.2.*"
```

更新某个包：

```
composer update monolog/monolog
```

移除某个包：

```
composer remove monolog/monolog
```

如果手动更新了composer.json需要更新autoload：

```
composer dump-autoload
```

包版本约束

精确版本：示例： 1.0.2。

```
范围：使用比较操作符你可以指定包的范围。这些操作符包括：>，>=，<，<=，!=。你可以定义多个范围，使用空格 或者逗号,表示逻辑上的与，使用双竖线||表示逻辑上的或。其中与的优先级会大于或。示例：
```

```
>=1.0
>=1.0 <2.0
>=1.0 <1.1 || >=1.2

```

范围（使用连字符）:

```
例子：1.0 - 2.0，等同于>=1.0.0 <2.1（2.0相当于2.0.*）。

通配符：可以使用通配符去定义版本。1.0.*相当于>=1.0 <1.1。
例子：1.0.*

下一个重要版本操作符：使用波浪号~。示例：
~1.2相当于>=1.2 <2.0.0，而~1.2.3相当于>=1.2.3 <1.3.0。

折音号^：例如，^1.2.3相当于>=1.2.3 <2.0.0，因为在2.0版本前的版本应该都没有兼容性的问题。而对于1.0之前的版本，这种约束方式也考虑到了安全问题，例如^0.3会被当作>=0.3.0 <0.4.0对待。
```

自动加载

Composer提供了自动加载的特性，只需在你的代码的初始化部分中加入下面一行：

```
require 'vendor/autoload.php';
```

详细示例

```
{
    "require": {
        "php": ">=5.4.0",
        "illuminate/database": "*",
        "monolog/monolog": "1.2.*"
    },
    "config": {
        "secure-http": false
    },
    "autoload": {
        "classmap": [
          "app/models"
        ],
        "files": [
            "vendor/yjc/src/Alipay/autoload.php"
            ],
        "psr-4": {
            "Yjc\\Sms\\": "vendor/yjc/src/Sms"
        }
    }
}
```

autoload部分指定自动加载的文件夹，每次里面的文件有新增，使用composer dump-autoload即可。

详见：[http://docs.phpcomposer.com/03-cli.html#dump-autoload](http://docs.phpcomposer.com/03-cli.html#dump-autoload)

命令汇总

```
composer list  列出所有可用的命令
composer init   初始化composer.json文件(就不劳我们自己费力创建啦)，会要求输入一些信息来描述我们当前的项目，还会要求输入依赖包
composer install  读取composer.json内容，解析依赖关系，安装依赖包到vendor目录下
composer update   更新最新的依赖关系到compsoer.lock文件，解析最新的依赖关系并且写入composer.lock文件
composer search packagename 搜索包，packagename替换为你想查找的包名称
composer require packagename 添加对packagename的依赖，packagename可修改为你想要的包名称
composer show packagename
composer self-update 更新 composer.phar文件自身
composer dump-autoload --optimize 优化一下自动加载
 
composer command --help 以上所有命令都可以添加 --help选项查看帮助信息
更多可用命令，可以在命令行输入composer进行查看。
```

#### 模块仓库

packagist.org是Composer的仓库，很多著名的PHP库都能在其中找到。你也可以提交你自己的作品。

当你安装完Composer后，使用时，却发现不能下载包，或者很慢，这是一个『众所周知』的原因。

所以，我们使用国内的镜像站点进行代替，常用方法有两种：

##### 1. 修改全局配置：

全局配置的文件一般放在C:\Users\XXX\AppData\Roaming\Composer\config.json，例如C:\Users\YJC\AppData\Roaming\Composer\config.json。
（这里以windows路径为例）。可以通过命令composer config -l查看配置，其中[home]为配置所在目录。config.json即为配置文件。

```
{
    "config": {
 
    },
    "repositories": [
        {"type": "composer", "url": "http://pkg.phpcomposer.com/repo/packagist/"},
        {"packagist": false}
    ]
}

```
或者命令行直接修改：

```
composer config -g repo.packagist composer https://packagist.phpcomposer.com
```

##### 2. 修改当前配置：即项目当前的composer.json文件；

```
{
  "require": {
    "noahbuscher/macaw": "dev-master"
  },
  "repositories": [
        {   
            "packagist": false
        },  
        {   
            "type": "composer", 
            "url": "http://packagist.cn"
        }   
    ]
}
```
##### 3. 常见镜像地址：

https://packagist.org 国外的

http://packagist.phpcomposer.com 中国全量镜像

推荐的包

```
overtrue/wechat 让微信开发更简单！
thenbsp/wechat
catfan/medoo
illuminate/database
psr/log
monolog/monolog
symfony/event-dispatcher
phpunit/phpunit
phpunit/php-timer
michelf/php-markdown markdown 文档解析
intervention/image 图片处理
mytharcher/alipay-php-sdk
```

更多查看：[https://packagist.org/explore/popular](https://packagist.org/explore/popular)

发布自己的包

大概步骤如下：

在github上创建一个项目（项目名称可以随意）

编写composer.json

copy代码文件并修改命名空间

在https://packagist.org/上递交自己的包

设置github的hook

编写composer.json

先看一个示例：

```
{
    "name": "jenner/message_queue",
    "description": "php message queue wrapper",
    "license": "MIT",
    "keywords": ["message queue"],
    "version": "1.0.0",
    "authors": [
        {
            "name": "Jenner",
            "email": "hypxm@qq.com"
        }
    ],
    "require": {
        "php": ">=5.3.0"
    },
 
    "autoload": {
        "psr-0": {
            "Jenner\\Zebra\\MessageQueue": "src/"
        }
    }
}
```

#### 需要注意的几个字段说明如下：

name:包名称，递交时packagist会检测报名字是否合法。必须是一个/分隔的字符串。当别人引入你的包时，vendor下会自动创建这个目录。例如org/package包，则会在vender下创建org/package目录。

autoload:包的加载方式，具体加载方式可以参考composer中文网说明。这里使用的是psr-0标准加载方式。composer会在src目录下根据命名空间执行自动加载。

背景
Framework Interoperability Group（框架可互用性小组），简称 FIG，成立于 2009 年。FIG 最初由几位知名 PHP 框架开发者发起，在吸纳了许多优秀的大脑和强健的体魄后，提出了 PSR-0 到 PSR-4 五套 PHP 非官方规范：

```
PSR-0 (Autoloading Standard) 自动加载标准
PSR-1 (Basic Coding Standard) 基础编码标准
PSR-2 (Coding Style Guide) 编码风格向导
PSR-3 (Logger Interface) 日志接口
PSR-4 (Improved Autoloading) 自动加载优化标准
```

之后，在此标准之上，Composer 横空出世！Composer 利用 PSR-0 和 PSR-4 以及 PHP5.3 的命名空间构造了一个繁荣的 PHP 生态系统。Composer 类似著名的 npm 和 RubyGems，给海量 PHP 包提供了一个异常方便的协作通道，

Composer Hub 地址：[https://packagist.org/](https://packagist.org/)

Composer 中文网站：[http://www.phpcomposer.com/](http://www.phpcomposer.com/)。

#### 常见问题

1、Windows下出现：Fxp\Composer\AssetPlugin\Repository\NpmRepository does not exist
进入C:\Users\YJC\AppData\Roaming\Composer目录，删除vendor目录。

#### 有用的资源

1、利用 Composer 一步一步构建自己的 PHP 框架（一）——基础准备 - 岁寒
[https://lvwenhan.com/php/405.html](https://lvwenhan.com/php/405.html)

2、PHP 开发者该知道的 5 个 Composer 小技巧 - 新闻 - SegmentFault
[https://segmentfault.com/a/1190000000355928](https://segmentfault.com/a/1190000000355928)

3、Composer 中文网
[http://www.phpcomposer.com/](http://www.phpcomposer.com/)

4、Packagist / Composer 中国全量镜像
[http://pkg.phpcomposer.com/](http://pkg.phpcomposer.com/)

5、Composer安装
[https://getcomposer.org/download/](https://getcomposer.org/download/)

6、composer之创建自己的包 - 始终不够
[http://www.huyanping.cn/composer%e4%b9%8b%e5%88%9b%e5%bb%ba%e8%87%aa%e5%b7%b1%e7%9a%84%e5%8c%85/](http://www.huyanping.cn/composer%e4%b9%8b%e5%88%9b%e5%bb%ba%e8%87%aa%e5%b7%b1%e7%9a%84%e5%8c%85/)

7、php - 请各位分享或推荐一下composer里面好用的包 - SegmentFault
[https://segmentfault.com/q/1010000000484379](https://segmentfault.com/q/1010000000484379)

8、给 CI 插上翅膀——在 CodeIgniter 2 中使用 Laravel Eloquent ORM - 岁寒
[https://lvwenhan.com/php/414.html](https://lvwenhan.com/php/414.html)

9、Composer进阶使用 —— 常用命令和版本约束 - icyfire - SegmentFault
[https://segmentfault.com/a/1190000005898222](https://segmentfault.com/a/1190000005898222)

## PHP资源列表
超出你想象[https://www.jianshu.com/p/f2e40c0baf54?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation](https://www.jianshu.com/p/f2e40c0baf54?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)