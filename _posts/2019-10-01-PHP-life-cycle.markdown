---
layout:     post
title:      "PHP的生命周期"
subtitle:   " \"PHP life cycle\""
date:       2019-10-01 13:30:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 面试
    - php
---
 
- PHP的生命周期
    - [文章1](https://segmentfault.com/a/1190000013321594)    
        - SAPI
        - PHP的启动和终止
        - PHP的生命周期
    - [文章2](https://www.cnblogs.com/applelife/p/10511837.html)
    - [文章3](https://www.php.cn/php-weizijiaocheng-424081.html)
- 线程\进程\协程的概念及关系
    - [文章1](https://blog.csdn.net/daaikuaichuan/article/details/82951084)  
        - 进程是资源分配的最小单位
        - 线程，有时被称为轻量级进程(Lightweight Process，LWP），是操作系统调度（CPU调度）执行的最小单位
        - 区别
            ```
            调度：线程作为调度和分配的基本单位，进程作为拥有资源的基本单位；

            并发性：不仅进程之间可以并发执行，同一个进程的多个线程之间也可并发执行；

            拥有资源：进程是拥有资源的一个独立单位，线程不拥有系统资源，但可以访问隶属于进程的资源。进程所维护的是程序所包含的资源（静态资源）， 如：地址空间，打开的文件句柄集，文件系统状态，信号处理handler等；线程所维护的运行相关的资源（动态资源），如：运行栈，调度相关的控制信息，待处理的信号集等；

            系统开销：在创建或撤消进程时，由于系统都要为之分配和回收资源，导致系统的开销明显大于创建或撤消线程时的开销。但是进程有独立的地址空间，一个进程崩溃后，在保护模式下不会对其它进程产生影响，而线程只是一个进程中的不同执行路径。线程有自己的堆栈和局部变量，但线程之间没有单独的地址空间，一个进程死掉就等于所有的线程死掉，所以多进程的程序要比多线程的程序健壮，但在进程切换时，耗费资源较大，效率要差一些。  
            ```
    - [文章2](https://www.cnblogs.com/huiziz/p/10271284.html)
    - [文章3](https://blog.csdn.net/feiwutudou/article/details/80607863)
- PHP多线程怎么实现
    - [文章1](https://www.php.cn/php-weizijiaocheng-406793.html)    
        - 多线程需要安装pthread扩展
    - [文章2](https://www.jianshu.com/p/02138ae8ab29)
    - [文章3](https://www.cnblogs.com/zhenbianshu/p/7978835.html)
- PHP设计模式及场景
    - [文章1](https://www.cnblogs.com/kinwing/p/11130335.html)    
        - 开放封闭原则：一个软件实体如类、模块和函数应该对扩展开放，对修改关闭。
        - 里氏替换原则：所有引用基类的地方必须能透明地使用其子类的对象.
        - 依赖倒置原则：高层模块不应该依赖低层模块，二者都应该依赖其抽象；抽象不应该依赖细节；细节应该依赖抽象。
        - 单一职责原则：不要存在多于一个导致类变更的原因。通俗的说，即一个类只负责一项职责。
        - 接口隔离原则：客户端不应该依赖它不需要的接口；一个类对另一个类的依赖应该建立在最小的接口上。
        -  迪米特法则：一个对象应该对其他对象保持最少的了解。
    - [文章2](http://www.imooc.com/article/details/id/290688)
    - [文章3](http://ddrv.cn/a/101585)
- PHP魔术方法的应用场景
    - [文章1](https://www.cnblogs.com/baocheng/p/5607216.html)
        - 魔术方法是PHP面向对象中特有的特性。它们在特定的情况下被触发，都是以双下划线开头，你可以把它们理解为钩子，利用模式方法可以轻松实现PHP面向对象中重载（Overloading即动态创建类属性和方法）    
    - [文章2](https://www.jb51.net/article/68760.htm)
    - [文章3](https://baijiahao.baidu.com/s?id=1607667991000169190&wfr=spider&for=pc)
- PHP7新特性
    - [文章1](https://blog.csdn.net/wuxing26jiayou/article/details/80036963) 
        - 1.类型的声明。
        - 5.define() 定义常量数组  
        - 7.匿名函数   
    - [文章2](https://blog.csdn.net/mnmnwq/article/details/86716687)
    - [文章3](https://www.jb51.net/article/159682.htm)