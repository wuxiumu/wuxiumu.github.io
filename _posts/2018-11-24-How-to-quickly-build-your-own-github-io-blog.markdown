---
layout:     post
title:      "如何快速搭建自己的github.io博客"
subtitle:   " \"How to quickly build your own github.io blog\""
date:       2018-11-24 9:00:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 工具
---

> “JUST DO IT. ”

## github.io博客推荐

**作为程序员的我推荐一款我们觉得不错的选github.io**

## 要完成自己的github.io博客网站，总共分三步

- 开通自己的github.io repo
- 选择一款Jekyll的主题
- 编写发布博客

### 开通自己的github.io repo
github.io是完全基于github创建的，其本质上是在你的github账户下创建一个特殊的repo。你可以参照如下步骤完成：

创建repo

当然，一切的前提是你得首先有个github的账户，这里还请自行解决。登陆你的账户后，你可以创建一个新的repo。请务必注意该repo的名字，必须保持格式<username>.github.io，其中<username>替换成你的github账户名，这里假定创建的repo为tobiasalin.github.io

### 把你创建的repo clone到本地

本文假定你已经有一定的git使用基础了，如果没有也没关系，Google一下(https://www.google.com/)
git的基本使用极为简单。

```
git clone https://github.com/wuxiumu/wuxiumu.github.io
``` 
编写简单的博客首页
```
cd wuxiumu.github.io
echo "Hello World!" > index.html
git add index.html
git commit -m "Init commit"
git push origin master
```
打开博客网站https://<username>.github.io

不出意外，你就可以看到你的Hello World!博客首页了。如果不小心出了意外，通常情况下，你只需等一会再刷新就会好，要是还没好，通常说明你的运气实在太背，请自行了断。

### 选择一款Jekyll的主题

github.io默认采用Jekyll作为建站工具。Jekyll是一款当前火热的开源的静态网站建站工具，拥有非常庞大的使用群里和社区，其Github截止本文，已经有超过3W+的star，拥有丰富的插件，丰富的主题，并且有无数的人已经帮你早出了无数的轮子可供参考。Jekyll自身的强大功能已经足够你打造自己心仪的静态网站（这里注意的是静态网站，Jekyll没有任何的后台数据库），然而前提是你自己还是得有一定的前端功底，而为了不至于长的太难看，你还得有一定的设计能力。这一下子把大部分人给难住了，咱们只是为了单纯的写写博客啊，至于有这么多要求吗？看到这里，很多人可能觉得此法不怎么方便啊，然则，正如刚刚反复强调的，Jekyll已经有一个非常庞大的社区，这就意味着，你完全可以借鉴别人已经造好的轮子，放在Jekyll这里，咱们应该成为主体（Theme）比较合适。本文推荐国内用户可以考虑一款国人开发的主题。博主的个人博客即是采用了这个主题。

Fork出自己的repo

为了便于管理，建议先把Huxpro fork到自己的账户下

clone主题
```
git clone git@github.com:keysaim/huxpro.github.io.git
```
当然，你也可以直接clone它的样板repo
```
git clone git@github.com:Huxpro/huxblog-boilerplate.git
```
添加自己的github.io git repo 
clone了huxpro的repo之后，需要将自己创建的github.io repo设置到clone的repo：
```
$ cd huxpro.github.io
$ git remote add mine git@github.com:keysaim/keysaim.github.io.git
```
其中，请自行将其中的repo url换成你自己的。

修改必要的配置

clone之后的repo其实是Huxpro自己的博客网站，里面有非常多作者自己的博文，可根据自己的需要进行必要的删减。基于Jekyll的博客网站，对于配置，非常重要的一个文件是_config.yml文件，代开这个文件进行必要的修改：


### Site settings

```
title:  吴庆宝 Blog
SEOTitle: 吴庆宝的博客 |  吴庆宝 Blog
header-img: img/home-bg.jpg
email: wuxiumu@163.com
description: "关于后端与设计、黑客与工匠 | 朽木，Web & Mobile Lover | 这里是 @Wqb吴庆宝 的个人博客，与你一起发现更大的世界。"
keyword: "吴庆宝, 大宝天天见, 老宝你真好, 全栈, 朽木不可雕, @wuxiumu, 吴庆宝的博客, Wuxiumu Blog, 博客, 个人网站, 互联网, php, 后端, 前端, 设计, 产品"
url: "https://wqb.science"            
baseurl: ""  
```

### 编写发布博客
Jekyll对于博文，都是要求放在_posts目录下面，同时对博文的文件名有严格的规定，必须保持格式YEAR-MONTH-DAY-title.MARKUP，通常情况下，咱们采用推荐的Markdown撰写博文，基于该格式，本博文的文件名为2018-11-24-how-to-setup-your-github-io-blog.md。

写好博文之后，就可以通过git提交博文了：

```
git add _posts/2018-11-24-how-to-setup-your-github-io-blog.md
git commit -m "Add how to setup your github.io blog"
git push mine master
```

其中，mine就是前面设置的你自己的repo。等一会（通常几秒到几十秒不等），就可以打开自己的博客网站查看博文了，这里是我的
博客网站(https://wuxiumu.github.io)。
push成功之后，最好是再重新将自己的repo clone到本地。

本地查看自己的博客
有时候，在提交到github之前，咱们总想先看看博文的效果如何，既然github采用的也是Jekyll，那么咱们完全可以采用Jekyll在本地构建网站，查看博文效果。

安装Ruby（请务必确保版本在1.9.3以上）

可以参照官网教程进行安装， 

安装Github pages

Github pages其实就是github基于Jekyll用来构建github.io的工具，安装好Ruby之后可以执行：

```
gem install github-pages
```

开启Jekyll本地服务

```
cd keysaim.github.io
jekyll serve --watch
```

默认情况下，该服务会侦听在本地4000的端口上，可以打开浏览器访问
http://127.0.0.1:4000
这样就可以在本地查看自己的博文效果了。

## 结语
github.io通过基于Jekyll工具的Github pages来自动构建网站，同时本身又是github的repo，为使用者提供完全的内容控制，十分便利灵活。当然，要用好这个工具，还是对你有一定的要求：

必须得有基本的git使用基础

必须对前端有一定的概念

必须较为熟悉Markdown撰写

不过，幸运的是，这三点不论哪一点，其实都是相对较为简单的，git的基本使用，Google一下，我相信1小时学会不是太大问题；对前端的要求，由于前人已经造了足够多的轮子，咱们完全可以先借鉴别人的，等以后慢慢熟悉起来之后再考虑自己DIY；对于Markdown，个人觉得其语法真的是非常的简单，只要静下心来，一个下午足够让你编写基本的文章了。

最后，这里再次感谢Huxpro提供本站的Jekyll主题。