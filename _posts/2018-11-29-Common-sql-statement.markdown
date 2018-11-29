---
layout:     post
title:      "常用sql语句整理：mysql"
subtitle:   " \"Common sql statement\""
date:       2018-11-29 09:10:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 数据库
    - mysql
---

>  Mysql基础

## mysql安装

### yum安装

```sh

# 检测已安装的mysql
yum list installed | grep mysql

# 移除已安装的mysql
yum -y remove mysql-libs.x86_64

# 下载mysql5.7的rpm包
wget https://dev.mysql.com/get/mysql57-community-release-el6-11.noarch.rpm

# yum本地安装源
yum localinstall mysql57-community-release-el6-11.noarch.rpm

# 检测允许安装的mysql插件
yum repolist enabled | grep mysql
yum search mysql-community

# 安装mysql
yum -y install mysql-community-server.x86_64

# 启动mysql
service mysqld start

# 自启动
chkconfig mysqld on

# 初始密码
-> 2lNu<K?kk;6%
grep 'temporary password' /var/log/mysqld.log

# 进入数据库
mysql -u root -p 2lNu<K?kk;6%

# 修改密码
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Root666,.';

# 远程登录密码
GRANT ALL ON *.* to root@'%' IDENTIFIED BY 'Root666,.';
GRANT ALL ON *.* to shengj@'%' IDENTIFIED BY 'Root666,.';

# 远程登录
mysql -h 104.223.3.138  -u root  -p Root666,.
```
### 数据库

```sql

# 创建数据库
create database `demo`;

# 查看所有数据库
show databases;

# 查看某个数据库
show create database `demo`;

# 修改数据库编码
alter database `demo` default character set utf8 collate utf8_unicode_ci;

# 删除数据库
drop database `demo`;
```

## 常用sql语句整理：mysql


1. 增

- 增加一张表
```
CREATE TABLE `table_name`(
  ...
  )ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

- 增加记录
```
INSERT INTO `your_table_name`(`column_name`)
VALUES
('your_value_one'),
('your_value_two');
```

- 增加字段
```
ALTER TABLE `your_table_name`
ADD `your_column_name` ...
AFTER `column_name`;
```

- 增加索引
  + 主键
  ```
  ALTER TABLE `your_table_name`
  ADD PRIMARY KEY your_index_name(your_column_name);
  ```
  + 唯一索引
  ```
  ALTER TABLE `your_table_name`
  ADD UNIQUE your_index_name(your_column_name);
  ```
  + 普通索引
  ```
  ALTER TABLE `your_table_name`
  ADD INDEX your_index_name(your_column_name);
  ```
  + 全文索引
  ```
  ALTER TABLE `your_table_name`
  ADD FULLTEXT your_index_name(your_column_name);
  ```


2. 删

- 逐行删除
```
DELETE FORM `table_name`
WHERE ...;
```

- 清空整张表
```
TRUNCATE TABLE `your_table_name`;
```

- 删除表
```
DROP TABLE `your_table_name`;
```

- 删除字段
```
ALTER TABLE `your_table_name`
DROP `column_name`;
```

- 删除索引
```
ALTER TABLE `your_table_name`
DROP INDEX your_index_name(your_column_name);
```


3. 改

- 变更数据
```
UPDATE `table_name`
SET column_name=your_value
WHERE ...;
```

- 变更字段
```
ALTER TABLE `your_table_name`
CHANGE `your_column_name` `your_column_name` ...(变更);
```

- 变更字段值为另一张表的某个值
```
UPDATE `your_table_name`
AS a
JOIN `your_anther_table_name`
AS b
SET a.column = b.anther_column
WHERE a.id = b.a_id...;
```

4. 查


- 普通查询
```
SELECT `column_name_one`, `column_name_two`
FROM `table_name`;
```

- where条件查询
```
select * from `user` where id=1;
```

- in/not in 关键字查询
```
select * from `user` where id in (1,2);
select * from `user` where id not in (1,2);
```

- between and 关键字查询
```
select * from `user` where id between 1 and 3;
```

- 空值(null)查询，使用is null来判断
```
alter table `user` add `age` varchar(10) default null;
select * from `user` where age is null;
```

- distinct(去重)关键字查询
```
select distinct(account) from `user`;
```

- like关键字查询
```
select * from `user` where `account` like "%en%";
```

- and关键字多条件查询,or关键字的使用也是类似
```
select * from `user` where `account`='shengj' and `id`>1;
select * from `user` where `account`='shengj' or  `account`='cenh';
```

### 聚合函数

count()函数 -> 记录总条数

sum()函数 -> 某个字段的总和

avg()函数 -> 字段的平均数

max()函数 -> 字段的最大值

min()函数 -> 字段的最小值

- 排序 order by
```
select * from `user` order by `id` desc; // 倒序
select * from `user` order by `id` asc; // 升序 默认
```

- 分组 group by
```
select * from `user` group by `id`;
```

- 使用limit限制查询结果的数量
```
select * from `user` limit 2;
```

- 别名 as
```
select u.id from `user` as u; // 表别名
select account as name from `user`; // 字段别名
```

- 关联查询
```
SELECT *
FROM `your_table_name`
AS a
JOIN `your_anther_table_name`
AS b
WHERE a.column_name = b.column_name...;
```

- 合计函数条件查询：WHERE 关键字无法与合计函数一起使用
```
SELECT aggregate_function(column_name)
FROM your_table_name
GROUP BY column_name
HAVING aggregate_function(column_name)...;
```

- 同一个实例下跨库查询
```
SELECT *
FROM database_name.your_table_name
AS a
JOIN another_database_name.your_another_table_name
AS b
WHERE a.column_name = b.column_name...;
```

5. 复制一张表结构
```
CREATE TABLE `your_table_name`
LIKE `destination_table_name`;
```

6. 完全复制一张表：表结构+全部数据
```
CREATE TABLE `your_table_name`
LIKE `destination_table_name`;

INSERT INTO `your_table_name`
SELECT *
FROM `destination_table_name`;
```

### 附录：mysql命令
``` 
登陆：mysql -h host -u username -p
列出数据库：SHOW DATABESES;
列出表:SHOW TABLES;
列出表结构:DESC table_name
使用一个数据库：USE database_name;
导入：source 'file';
导出：mysqldump -h 127.0.0.1 -u root -p "database_name" "table_name" --where="condition" > file_name.sql;
查看慢日志：mysqldumpslow -s [c:按记录次数排序/t:时间/l:锁定时间/r:返回的记录数] -t [n:前n条数据] -g "正则"　/path
新增用户： insert into `user`(`Host`, `User`, `authentication_string`) value('localhost', 'username', password('pwd')) 
```

### mysql 5.7 新增用户
```
// 插入新用户
insert into mysql.user(Host, User, authentication_string, ssl_cipher, x509_issuer, x509_subject
value('localhost', 'username', password('password'), '', '', '');

// 数据库授权
grant all privileges on dbname.name.* to username@localhost identified by 'password';

// 刷新权限信息
FLUSH PRIVILEGES;
```