---
layout:     post
title:      "SVN 入门到放弃"
subtitle:   "SVN entry to give up"
header-img: "img/post-bg-2015.jpg"
navcolor:   "invert"
date:       2018-12-01 00:00:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 工具
---
## svn入门
慕课网教程 ：[SVN从入门到放弃](https://www.imooc.com/learn/845)

## window系统安装
```
TortoiseSVN 1.10.0, Build 28176 - 64 Bit , 2018/04/14 08:00:32
包含汉化包
链接：https://pan.baidu.com/s/1Vx7o30MBRCmnyAv84ANBKQ 
提取码：b2qn 
```

## linux系统安装

### Ubuntu安装svn

**1. 先查看是否已经安装了svn**

如果没有安装svn则：
```
svn --version
The program 'svn' is currently not installed. You can install it by typing:
sudo apt-get install subversion
```

**2. 安装代码**

先更新一下（可选）
```
sudo apt-get update
```

安装

```
sudo apt-get install subversion
```

**3. 如果已经安装svn则提示svn版本号：**

```
svn --version
svn, version 1.9.7 (r1800392)
   compiled Mar 28 2018, 08:49:13 on x86_64-pc-linux-gnu

Copyright (C) 2017 The Apache Software Foundation.
This software consists of contributions made by many people;
see the NOTICE file for more information.
Subversion is open source software, see http://subversion.apache.org/

The following repository access (RA) modules are available:

* ra_svn : Module for accessing a repository using the svn network protocol.
  - with Cyrus SASL authentication
  - handles 'svn' scheme
* ra_local : Module for accessing a repository on local disk.
  - handles 'file' scheme
* ra_serf : Module for accessing a repository via WebDAV protocol using serf.
  - using serf 1.3.9 (compiled with 1.3.9)
  - handles 'http' scheme
  - handles 'https' scheme

The following authentication credential caches are available:

* Plaintext cache in /home/meiyoufan/.subversion
* Gnome Keyring
* GPG-Agent
* KWallet (KDE)
```

**4. 代码库创建：**

安装完成后要建立SVN库
```
mkdir -p /opt/svn/repositories
svnadmin create /opt/svn/repositories
```

可能会遇到权限不足的问 请切换管理员
```
sudo -i
```

执行后，自动建立repositories库，查看/opt/svn/repositories文件夹包含了conf，db，format，hooks，locks，README.txt等文件，说明一个SVN库已经建立。

**5. 配置版本库：**

进入上面conf文件夹下，进行配置：

**a. 用户密码passwd配置：**
```
vi + passwd  
```

//+表示光标放在文件最低端

修改passwd为一下内容：
```
[users]
harry = harryssecret
sally = sallyssecret
meiyoufan=meiyoufan
```

**b. 权限控制authz配置：**

```
vi authz
```

设置哪些用户可以访问哪些目录，向authz文件追加以下内容：
```
[/]
meiyoufan=rw  //给该用户访问所有库的权限
```

 或
```
[repositories:/project]  //repository库的根目录权限
meiyoufan=rw
```

/ 表示根目录及以下，根目录是svnserve启动时指定的，我们指定的是/opt/svn；/ 就是指对全部版本库都具有权限

repositories：/ 表示对库repositories的根目录设置权限

PS：
```
* 权限配置文件中出现的用户名必须已在用户配置文件中定义。

* 对权限配置文件的修改立即生效，不必重启svn。
```
 

**c. 服务svnserve.con配置：**
```
vi svnserve.conf
```

添加一下内容：

```
[general]
#匿名访问的权限，可以是read,write,none,默认为read
anon-access=none
#使授权用户有写权限
auth-access=write
#密码数据库的路径
password-db=passwd
#访问控制文件
authz-db=authz
#认证命名空间，subversion会在认证提示里显示，并且作为凭证缓存的关键字
realm=/opt/svn/repositories
```

这里注意各标签不能错，也不能有重复，不然无法连接。

 

**d. 配置防火墙端口（如果需要）：**

不一定每个人都需要设置，可以先测试后再看是否需要打开端口
```
vi /etc/sysconfig/iptables
```

添加一下内容：
```
-A INPUT -m state --state NEW -m tcp -p tcp --dport 3690 -j ACCEPT
```

保存后重启防火墙
```
service iptables restart
``` 

**6. 查看：**

**a. 启动SVN**
```
svnserve -d -r /opt/svn/repositories
``` 

**b. 查看SVN进程**
```
ps -ef|grep svn|grep -v grep
root 12538 1 0 14:40 ? 00:00:00 svnserve -d -r /opt/svn/repositories
``` 

**c. 检测SVN端口**
```
netstat -ln |grep 3690
tcp 0 0 0.0.0.0:3690 0.0.0.0:* LISTEN
```

**7. 停止重启SVN：**
```
killall svnserve //停止
svnserve -d -r /opt/svn/repositories // 启动
``` 

**8. 测试连接：**

使用TortoiseSVN进行测试：

1. SVN服务启动后，需要使用客户端测试连接：

   客户端连接地址：svn://192.168.15.231；然后，输入用户名密码；

2. 新建一个文件夹，即本地的库文件夹，右键checkout，将会得到一个隐藏文件夹.svn；

3. 在此文件夹中放入项目内容，然后右键点击commit，就可以上传本地项目了。

### Centos安装svn
 
**1. 安装代码**

安装

```
sudo apt-get install subversion
```

**2. 如果已经安装svn则提示svn版本号：**

```
svn --version
svn, version 1.7.14 (r1542130)
   compiled Apr 11 2018, 02:40:28

Copyright (C) 2013 The Apache Software Foundation.
This software consists of contributions made by many people; see the NOTICE
file for more information.
Subversion is open source software, see http://subversion.apache.org/

The following repository access (RA) modules are available:

* ra_neon : Module for accessing a repository via WebDAV protocol using Neon.
  - handles 'http' scheme
  - handles 'https' scheme
* ra_svn : Module for accessing a repository using the svn network protocol.
  - with Cyrus SASL authentication
  - handles 'svn' scheme
* ra_local : Module for accessing a repository on local disk.
  - handles 'file' scheme

```

**3. 配置创建仓库**

我们这里在/opt下建立一个名为svn的仓库（repository），以后所有代码都放在这个下面，创建成功后在svn下面多了几个文件夹。
```
[root@localhost /]# cd /opt
[root@localhost opt]# mkdir svn
[root@localhost opt]# svnadmin create /opt/svn
[root@localhost opt]# ls svn
conf  db  format  hooks  locks  README.txt
```

我们这里特别关注一下conf文件夹，这个是存放配置文件的
```
[root@localhost opt]# cd svn/conf
[root@localhost conf]# ls
authz  passwd  svnserve.conf
```

其中：

authz 是权限控制文件

passwd 是帐号密码文件

svnserve.conf 是SVN服务配置文件

接下来我们依次修改这3个文件。

**4. 配置passwd**
```
[root@localhost conf]# vi passwd 
[users]
xiaowu=123456
xiaomi=123456
xiaozhong=123456
xiaohua=123456
xiaohu=123456
```

上面的例子中我们创建了5个用户

**5 .配置authz**
```
[root@localhost conf]# vi authz 
[/]
xiaowu=rw
xiaomi=r
xiaozhong=r
xiaohua=r
xiaohu=r
*=
```
*=
上面配置的含义是，liuxianan对/opt/svn/下所有文件具有可读可写权限，test只有只读权限，除此之外，其它用户均无任何权限，最后一行*=很重要不能少。

**6. 配置svnserve.conf**
```
[root@localhost conf]# vi svnserve.conf 
```

打开下面的5个注释
```
anon-access = none#匿名用户可读
auth-access = write #授权用户可写
password-db = passwd #使用哪个文件作为账号文件
authz-db = authz #使用哪个文件作为权限文件
realm = /opt/svn # 认证空间名，版本库所在目录
```

**2点注意：**

最后一行的realm记得改成你的svn目录打开注释时切记前面不要留有空格，否则可能有问题


**7. 启动与停止**
```
[root@localhost conf]# svnserve -d -r /opt/svn（启动）
[root@localhost conf]# killall svnserve（停止）
```
svnserve -d -r /opt/svn --listen-port 9000

上述启动命令中，-d表示守护进程， -r 表示在后台执行。停止还可以采用杀死进程的方式：
```
[root@localhost conf]# ps -ef|grep svnserve
root      4908     1  0 21:32 ?        00:00:00 svnserve -d -r /home/svn
root      4949  4822  0 22:05 pts/0    00:00:00 grep svnserve
[root@localhost conf]# kill -9 4908
```

**8. 客户端连接**
这里使用TortoiseSVN，输入地址svn:/你的IP 即可，不出意外输入用户名和密码就能连接成功了。

默认端口3690，如果你修改了端口，那么要记得加上端口号。

设置SVN自动更新
```
cd /opt/svn/hooks

mv post-commit.tml post-commit
````
然后：
```
vim post-commit
```

```
#!/bin/sh 
#
#
#
REPOS="$1"
REV="$2"
export LANG=zh_CN.UTF-8
SVN=/usr/bin/svn           #这里配置的是svn安装bin目录下的svn文件 
WEB=/opt/lampp/htdocs/     #要更新的目录 
$SVN update $WEB --username xxx --password xxx （此版本是linux下，windows下是.bat，写法少有不同）
```

然后记得让post-commit有执行的权限： chmod 777 post-commit

总结
总的来说，如果你不需要杂七杂八的权限配置只是自己一个人用的话，安装配置还是比较简单的，并不像网上说的那么麻烦，我按照网上的方法一次性成功了。