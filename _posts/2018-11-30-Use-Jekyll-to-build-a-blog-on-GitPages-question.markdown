---
layout:     post
title:      "使用Jekyll在GitPages搭建博客遇到的问题"
subtitle:   "Use Jekyll to build a blog on GitPages question"
header-img: "img/post-bg-2015.jpg"
navcolor:   "invert"
date:       2018-11-30 20:00:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 工具
---

## 安装Git并拉取分支，部署Jekyll

1. [安装Git](https://git-scm.com/book/zh/v1/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git) 

2. 拉取代码

在项目页，找到原谅色按钮”clone or download”复制链接，通常为”https://github.com/用户名/项目名.git”。 
调出命令行： 
- windows为win键+R键，输入cmd 
```git
git clone https://github.com/Huxpro/huxpro.github.io.git
```


## Jekyll

cd jekyll path // 移动到你的jekyll项目下，也就是你从git里clone下来的项目
jekyll serve // 启动服务，默认链接地址\"http:localhost:4000\"

期间遇到的一个问题：
```
$ jekyll serve
Configuration file: C:/www/wuxiumu.github.io/_config.yml
       Deprecation: The 'gems' configuration option has been renamed to 'plugins'. Please update your config file accordingly.
  Dependency Error: Yikes! It looks like you don't have jekyll-paginate or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. The full error message from Ruby is: 'cannot load such file -- jekyll-paginate' If you run into trouble, you can find helpful resources at https://jekyllrb.com/help/!
jekyll 3.8.5 | Error:  jekyll-paginate
```

这个原因是因为没有jekyll-paginate，使用
```
gem install jekyll-paginate
```
安装一下就好了。 
另外也有可能出现没有jekyll-gist错误，解决方法同上，这些错误取决模板所采用的一些服务。 