---
layout:     post
title:      "Mysql 引擎"
subtitle:   " \"Mysql engine\""
date:       2018-11-29 09:20:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 数据库
    - mysql
---

>  Mysql基础

### 引擎
- InnoDB: 事务、行锁、聚簇索引
- MyISAM：表锁、非聚簇索引、无法安全恢复
- Memory: 基于内存、表锁、每行长度固定不支持blob\text
- Archive: 只支持select、insert
- Blackhole\CSV\Federated\merge\NDB


### 锁
- 乐观锁：
  update table table_name
  set column_name = value, version=version+1
  and
  where version = version;
- 悲观锁：update table table_name set column_name = value for update;
- 共享锁：x锁

### 事务
如果一个数据库声称支持事务的操作，那么该数据库必须要具备以下四个特性：

- 原子性（Atomicity）
- 一致性（Consistency）
- 隔离性（Isolation）
- 持久性（Durability）

以上是事务的四大特性(简称ACID)，其中事务的隔离性，
当多个线程都开启事务操作数据库中的数据时，数据库系统要能进行隔离操作，
以保证各个线程获取数据的准确性，如果不考虑事务的隔离性，会发生的几种问题：

- 脏读：一个事务内修改了数据，另一个事务读取并使用了这个数据；
- 幻读：一个事务内修改了涉及全表的数据，另一个事务往这个表里面插入了新的数据，第一个事务出现幻读；
- 不可重复读：一个事务内连续读了两次数据，中间另一个事务修改了这个数据，导致第一个事务前后两次读的数据不一致；
- 更新丢失：一个事务内变更了数据，另一个事务修改了这个数据，最后前一个事务commit导致另一个事务的变更丢失；

### MySQL数据库为我们提供的四种隔离级别

- Read Uncommitted（读取未提交内容）
- Read Committed（读取提交内容）
- Repeatable Read（可重读）Mysql默认
- Serializable（可串行化）


| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
| --- | --- | --- | --- |
| Read Uncommitted | √ | √  | √ |
| Read Committed | × | √ | √ |
| Repeatable Read | × | × | √ |
| Serializable | × | × | × |


### 索引

##### 建立表结构时添加的索引

- 主键唯一索引
- 唯一索引
- 普通索引
- 联合索引

##### 依据是否聚簇区分

- 聚簇索引
  + 引擎类型：InnoDB
  + 叶子结点存放数据本身
- 非聚簇索引
  + 引擎类型：MyISAM
  + 叶子结点存的指针指向数据的实际地址，索引和数据分开

##### 索引底层数据结构

- hash索引
  + 优点
    * 效率高，一次查找 时间复杂度O(1)
  + 缺点
    * 只能进行=，<=>，in查询，无法进行范围查询
      - 原因：对待查找的值进行hash算法，之后的hash值进行查找 
    * 无法排序
      - 原因：同上
    * 无法避免回表查找
      - 原因：hash值和值的指针存放在hash表中
  - 低层实现
    * hash表(散列表)
- b-tree索引
- b+tree索引

—— mysql优化 后记
## mysql优化

### 1、编码

```sql
# 查看mysql编码
show variables like 'character%';
+--------------------------+----------------------------+
| Variable_name            | Value                      |
+--------------------------+----------------------------+
| character_set_client     | utf8mb4                    | 客户端来源数据使用的字符集
| character_set_connection | utf8mb4                    | 连接层字符集
| character_set_database   | utf8                       | 当前选中数据库的默认字符集
| character_set_results    | utf8mb4                    | 查询结果字符集
| character_set_server     | latin1                     | 默认的内部操作字符集
| character_set_system     | utf8                       | 系统元数据(字段名等)字符集
+--------------------------+----------------------------+
8 rows in set (0.01 sec)

# 字符集
utf8、utf8mb4
要在 Mysql 中保存 4 字节长度的 UTF-8 字符，需要使用 utf8mb4 字符集，但只有 5.5.3 版本以后的才支持(查看版本： select version();)。我觉得，为了获取更好的兼容性，应该总是使用 utf8mb4 而非 utf8.  对于 CHAR 类型数据，utf8mb4 会多消耗一些空间，根据 Mysql 官方建议，使用 VARCHAR  替代 CHAR。

# 排序规则
_ci、_bin
_ci表示大小写不敏感
_bin表示按编码值比较

```

### 2、多列索引规则

左前缀规则

举例：index(a,b,c)

|条件|索引是否发挥作用|用了哪些列|
|-|-|-|
|Where a=3 | 是|只使用了a列|
|Where a=3 and b=5| 是|使用了a,b列|
|Where a=3 and b=5 and c=4| 是|使用了abc|
|Where b=3  or  where c=4| 否||
|Where a=3 and c=4| 是|a列能发挥索引,c不能|
|Where a=3 and b>10 and c=7| 是|a能利用,b能利用, c不能利用|
|where a=3 and b like ‘xxxx%’ and c=7| 是|a能用,b能用,c不能用|

### 3、myisam和innodb索引区别

描述

- myisam主索引和次索引都指向物理行，比如id指向了物理行，由索引到磁盘拿数据（回行）
- innodb的主索引行上直接存储行的数据，称为聚簇索引，次索引指向主索引，比如id行包括了name、age等等数据，name包括了id

聚簇索引缺点：节点分裂，行数据搬运缓慢，因此尽量用递增整形做索引
myisam则分裂较快

索引覆盖：查找的字段正好是索引，速度快

### 4、索引选择

1. 查询频繁
2. 区分度高
3. 长度小 比如在word字段上设索引，最短长度为2，最长为14，需要测试覆盖率，count(left(word, 4))/count(*)
4. 尽量能覆盖常用查询字段

### 5、分页优化

- 使用where id > 5000000 limit 10  => limit 5000000,10
  - 这样的做法是会走id主键索引，速度是非常快的
  - 需要id连续，因为逻辑删除数据
- 延迟关联，先取索引数据，再由索引到磁盘拿数据（回行）
  - select id,name from lx limit 5000000,10 => select lx.id,name from lx inner join (select id
  - from lx limit 5000000,10) as tmp on lx.id = tmp.id

### 6、索引与排序

1. 对于覆盖索引,直接在索引上查询时,就是有顺序的, using index
2. 先取出数据,形成临时表做filesort(文件排序,但文件可能在磁盘上,也可能在内存中)

我们的争取目标-----取出来的数据本身就是有序的! 利用索引来排序.

- [『浅入深出』MySQL 中事务的实现](http://draveness.me/mysql-transaction.html)