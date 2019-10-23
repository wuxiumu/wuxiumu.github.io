---
layout:     post
title:      "PHP+Mysql 面试题记录"
subtitle:   " \"PHP+Mysql interview record\""
date:       2019-10-01 12:30:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 数据库
    - 面试
---
 
- Mysql  innodb和myisam区别？   
    - [文章1](https://blog.csdn.net/qq_27607965/article/details/79925288)
        - MyISAM
            ```
            不需要事务支持（不支持）
            并发相对较低（锁定机制问题）
            数据修改相对较少（阻塞问题），以读为主
            数据一致性要求不是非常高
            ```
        - InnoDB 
            ```
            需要事务支持（具有较好的事务特性）
            行级锁定对高并发有很好的适应能力，但需要确保查询是通过索引完成
            数据更新较为频繁的场景
            数据一致性要求较高
            硬件设备内存较大，可以利用InnoDB较好的缓存能力来提高内存利用率，尽可能减少磁盘 IO
            ```
    - [文章2](https://blog.csdn.net/qq_31984879/article/details/85285399)
    - [文章3](https://www.jb51.net/article/157181.htm)
    - [文章4](https://blog.csdn.net/wjtlht928/article/details/46641865
 )
- Mysql 索引的类型有哪几种？
    - [文章1](https://segmentfault.com/a/1190000018872822)
        - 从数据结构角度
        - 从物理存储角度
        - 从逻辑角度
    - [文章2](https://www.php.cn/mysql-tutorials-418140.html)
    - [文章3](http://mrdede.com/?p=1780)
- Mysql 共享锁排它锁？
    - [文章1](https://blog.csdn.net/puhaiyang/article/details/72284702)
        - 乐观锁、悲观锁、共享锁、排它锁、行锁、表锁
    - [文章2](https://blog.csdn.net/lemon89/article/details/51477497)
    - [文章3](https://blog.csdn.net/taosst/article/details/83235572)
        - 共享锁【S锁】
        - 排他锁【X锁】
- Mysql  四种事务隔离级别
    - [文章1](https://www.cnblogs.com/huanongying/p/7021555.html)

    事务隔离级别|	脏读|	不可重复读	|幻读
    ---|---|---|---
    读未提交（read-uncommitted）|	是|	是|	是
    不可重复读（read-committed）|	否|	是|	是
    可重复读（repeatable-read）|	否|	否|	是
    串行化（serializable）|	否|	否	|否

    - [文章2](https://blog.csdn.net/mydriverc2/article/details/78904566)
    - [文章3](https://www.jianshu.com/p/75187e19faf2)
- Mysql事务与redis事务的区别
    - [文章1](https://blog.csdn.net/github_26672553/article/details/82892233)
        - redis和mysql事务的对比（不能回滚）：
    - [文章2](https://blog.csdn.net/weixin_43658613/article/details/90738773)
    - [文章3](https://segmentfault.com/a/1190000018706074?utm_source=tag-newest)
- mysql主键索引和唯一索引的区别
    - [文章1](https://www.cnblogs.com/linguoguo/p/10529272.html)
        - 主键是一种约束，唯一索引是一种索引，两者在本质上是不同的。
        - 主键创建后一定包含一个唯一性索引，唯一性索引并不一定就是主键。
        - 唯一性索引列允许空值，而主键列不允许为空值。
    - [文章2](https://www.php.cn/mysql-tutorials-378196.html)
    - [文章3](https://www.iteye.com/blog/huangyongxing310-2374758)
- mysql主从的原理及哪些日志类型？
    - [文章1](https://blog.csdn.net/mydriverc2/article/details/78580147)
        - Relay_Master_Log_File SQL线程，读到的相对于主库日志的文件名。
        -  Exec_Master_Log_Pos SQL线程，执行SQL，相对于主库日志文件的位置。
    - [文章2](https://www.jianshu.com/p/163252dcd8b9)
    - [文章3](https://www.linuxidc.com/Linux/2018-05/152252.htm)
- mysql主从复制出现延迟的原因？
    - [文章1](https://blog.csdn.net/hao_yunfeng/article/details/82392261)
        -  架构方面
        - 硬件方面
        - mysql主从同步加速
        - 从文件系统本身属性角度优化 
        - 同步参数调整主库是写，对数据安全性较高，比如sync_binlog=1，
    - [文章2](https://bbs.csdn.net/topics/391976105?list=439712)
    - [文章3](http://blog.sina.com.cn/s/blog_15d27af820102yiz4.html)
- Mysql索引的创建原则？
    - [文章1](https://www.cnblogs.com/niuben/p/11250230.html)
        - 对排序、分组、联合查询频率高的字段创建索引； 
        - 选择唯一性索引
        - 尽量使用前缀来索引
    - [文章2](https://blog.csdn.net/justry_deng/article/details/81458470)
    - [文章3](https://blog.csdn.net/tongdanping/article/details/79878302)
- Mysql explain的每项说明
    - [文章1](https://blog.csdn.net/weixin_43025071/article/details/89511724)
        - ID：Query Optimizer 所选定的执行计划中查询的序列号
        - Select_type：所使用的查询类型，主要有以下这几种查询类型
        - DEPENDENT SUBQUERY：子查询中内层的第一个 SELECT，依赖于外部查询的结果集；
    - [文章2](https://blog.csdn.net/u011546953/article/details/81591688)
    - [文章3](https://blog.csdn.net/jiadajing267/article/details/81269067)
- mysql索引的原理
    - [文章1](https://www.cnblogs.com/wlwl/p/9465583.html)
        - Myisam引擎(非聚集索引)
        - Innodb引擎(聚集索引)
        - B+Tree的特性
    - [文章2](https://blog.csdn.net/u013308490/article/details/83001060)
    - [文章3](https://blog.csdn.net/alex_xfboy/article/details/82818753)
- Mysql优化的思路？
    - [文章1](https://blog.csdn.net/whistlegirl/article/details/101024749)
        - 用EXPLAIN使你的SELECT查询更加清晰
        - 利用LIMIT 1取得唯一行
        -  索引中的检索字段
    - [文章2](https://www.cnblogs.com/peteremperor/p/10949308.html)
    - [文章3](https://blog.csdn.net/cnm____1314/article/details/80042080)
 
## mysql索引的类型分几种？并做简要说明。
1. 普通索引

    这是最基本的索引，值可以为空，它没有任何限制，仅加速查询
    增加索引：
    ```
    CREATE INDEX indexName ON tableName(columnName(length));
    ALTER table tableName ADD INDEX indexName(columnName);
    ```
    如果是CHAR，VARCHAR类型，length可以小于字段实际长度；如果是BLOB和TEXT类型，必须指定 length。

    删除索引：DROP INDEX indexName ON tablename;
2. 唯一索引

    索引列的值必须唯一，但允许有空值。如果是组合索引，则列值的组合必须唯一。它有以下几种创建方式：
    ```
    CREATE UNIQUE INDEX indexName ON tablename(columnName(length)) ;
    ALTER table tablename ADD UNIQUE [indexName] (columnName(length));
    ```

3. 主键索引

    主键是一种唯一性索引，但它必须指定为PRIMARY KEY，不可以有空值，每个表只能有一个主键。
    ```
    ALTER table tablename add primary key (`columnName`)
    ```
4. 全文索引:

    全文索引的索引类型为FULLTEXT。全文索引可以在varchar、char、text类型的列上创建。可以通过ALTER TABLE或CREATE INDEX命令创建。对于大规模的数据集，通过ALTER TABLE（或者CREATE INDEX）命令创建全文索引要比把记录插入带有全文索引的空表更快。MyISAM支持全文索引，InnoDB在mysql5.6之后支持了全文索引。 全文索引不支持中文需要借sphinx(coreseek)或迅搜技术处理中文。
    ```
    alter table tablename add FULLTEXT(`columnName`);
    ```
    索引优化： https://www.cnblogs.com/pcyy/p/7943759.html

## SQL中什么情况下需要用到左连接（left join）?
    LEFT JOIN 关键字会从左表 (table_name1) 那里返回所有的行，即使在右表 (table_name2) 中没有匹配的行。

 
## 参考 
- php
    - [php面试必问的面试问题](https://www.php.cn/php-weizijiaocheng-391400.html)
    - [其他](https://www.cnblogs.com/457248499-qq-com/p/7403177.html)
    - [基本含概PHP+mysql所有方方面面的面试题,针对性模块性复习，高薪面试必过](https://blog.csdn.net/linzhiweng/article/details/72831885)
- mysql
    - [MySQL 分库分表方案，总结的非常好！](https://blog.csdn.net/qq_39940205/article/details/80536666)
    - [MySQL分库分表原理](https://www.jianshu.com/p/7aec260ca1a2)
- 总结
    - [2年php开发工作经验，跳槽之后面试20余家公司的总结](https://www.php.cn/toutiao-387211.html)
    - [前天面试一个php17k薪水的程序员,项目经验蛮牛B的，这些基础的都不会](https://bbs.csdn.net/topics/390885069)