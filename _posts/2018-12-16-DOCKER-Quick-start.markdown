---
layout:     post
title:      "DOCKER快速入门"
subtitle:   " \"DOCKER Quick start\""
date:       2018-12-16 15:10:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 运维    
---

>  DOCKER快速入门

## 什么是LXC
LXC为Linux Container的简写。Linux Container容器是一种内核虚拟化技术，可以提供轻量级的虚拟化，以便隔离进程和资源，而且不需要提供指令解释机制以及全虚拟化的其他复杂性。相当于C++中的NameSpace。容器有效地将由单个操作系统管理的资源划分到孤立的组中，以更好地在孤立的组之间平衡有冲突的资源使用需求。与传统虚拟化技术相比，它的优势在于：

与宿主机使用同一个内核，性能损耗小；

不需要指令级模拟；

不需要即时(Just-in-time)编译；

容器可以在CPU核心的本地运行指令，不需要任何专门的解释机制；

避免了准虚拟化和系统调用替换中的复杂性；

轻量级隔离，在隔离的同时还提供共享机制，以实现容器与宿主机的资源共享。

总结：Linux Container是一种轻量级的虚拟化的手段。

## 什么是Docker
Docker是Docker.inc公司开源的一个基于LXC技术之上构建的Container容器引擎，源代码托管在GitHub上，基于Go语言并遵从Apache2.0协议开源（可以商业）。

Docker项目的目标是实现轻量级的操作系统虚拟化解决方案。

Docker是通过内核虚拟化技术（namespaces及cgroups等）来提供容器的资源隔离与安全保障等。由于Docker通过操作系统层的虚拟化实现隔离，所以Docker容器在运行时，不需要类似虚拟机VM额外的操作系统开销，提高资源利用率。

下面图比较了Docker和传统虚拟化方式的不同之处，可见容器是在操作系统层面上实现虚拟化，直接复制本地主机的操作系统，而传统方式则是在硬件层面实现。

<img src="/img/in-post/post-blog/012116_1022_Docker1.png" width = "100%"/>
<img src="/img/in-post/post-blog/012116_1022_Docker2.png" width = "100%"/>

虚拟化与docker对比图

## Docker的工作模式
学习Docker的源码并不是一个枯燥的过程，反而可以从中理解Docker架构的设计原理。

Docker对使用者来讲是一个C/S模式的架构，而Docker的后端是一个非常松耦合的架构，模块各司其职，并有机组合，支撑Docker的运行。

用户是使用Docker Client与Docker Daemon建立通信，并发送请求给后者。

而Docker Daemon作为Docker架构中的主体部分，首先提供Server的功能使其可以接受Docker Client的请求；而后Engine执行Docker内部的一系列工作，每一项工作都是以一个Job的形式的存在。

Job的运行过程中，当需要容器镜像时，则从Docker Registry中下载镜像，并通过镜像管理驱动graphdriver将下载镜像以Graph的形式存储；当需要为Docker创建网络环境时，通过网络管理驱动networkdriver创建并配置Docker容器网络环境；当需要限制Docker容器运行资源或执行用户指令等操作时，则通过execdriver来完成。而libcontainer是一项独立的容器管理包，networkdriver以及execdriver都是通过libcontainer来实现具体对容器进行的操作。当执行完运行容器的命令后，一个实际的Docker容器就处于运行状态，该容器拥有独立的文件系统，独立并且安全的运行环境等。

CLI交互模型

<img src="/img/in-post/post-blog/012116_1022_Docker3.png" width = "100%"/>

Docker的C/S模式

RemoteAPI交互模型

<img src="/img/in-post/post-blog/012116_1022_Docker4.png" width = "100%"/>

Docker的C/S模式-RemoteAPI

## Docker八中应用场景

<img src="/img/in-post/post-blog/012116_1022_Docker5.png" width = "100%"/>


1、简化配置,统一配置,通过镜像快速启动(Simplifying)

2、代码流水线管理,开发环境->测试环境->预生产环境->灰度发布->正式发布，docker在这里实现了快速迁移(Code Oioeline Management)

3、开发效率,对开发人员,有了镜像,直接启动容器即可(Developer Productivity)

4、应用隔离,相对于虚拟机的完全隔离会占用资源,docker会比较节约资源(App lsolation)

5、服务器整合,一台服务器跑多个docker容器,提高服务器的利用率(Server Consolidation)

6、调试能力,debug调试(Debugging Capabilties)

7、多租户,一个租户多个用户,类似于阿里公有云的一个project下多个用户(Multi-tenancy)

8、快速部署,不需要启动操作系统,实现秒级部署(Rapid Deplovment)

## Docker八中开发模式
1.共享基础容器

2.共享卷开发容器

3.开发工具容器

4.不同环境下测试容器

5.构建容器

6.安装容器

7.盒子中默认服务容器

8.基础设施/粘合剂容器

## Docker九个基本事实
1.容器不同于虚拟机

2.容器不如虚拟机来得成熟

3.容器可以在几分之一秒内启动

4.容器已在大规模环境证明了自身的价值

5.IT人员称容器为轻量级

6.容器引发了安全问题

7.Docker已成为容器的代名词，但它不是唯一的提供者

8.容器能节省IT人力，加快更新

9.容器仍面临一些没有解决的问题

## 使用Docker理由
作为一种新兴的虚拟化方式，Docker跟传统的虚拟化方式具有众多的优势。

首先，Docker容器的启动可以在秒级实现，这相比传统的虚拟机方式要快得多。其次，Docker对系统资源的利用率很低，一台主机上可以同时运行数千个Docker容器。

至于为什么要使用Docker：

技术储备
相对大公司这个非常重要,如果你们都在用,他们不用就落后了,等到完全成熟以后就跟不上了。

无技术栈和技术债
没有任何Openstack或者saltstack,服务down了就down了,所有的服务都是松耦合。

3、跟上潮流(提升自我,装逼)

面试的时候大家都会Docker,你不会是不是落后了。

4、符合当前业务

虽然Docker很优秀,但是，大多数处在第二种状态,很少有符合自己的业务

## Docker改变了什么
面向产品：产品交付

面向开发：简化环境配置

面向测试：多版本测试

面向运维：环境一致性

面向架构：自动化扩容(微服务)

Docker更快速的交付和部署

对于开发和人员来说，最希望的就是一次创建和配置，可以在任意地方正常运行。

开发者可以使用一个标准的镜像来构建一套开发容器，开发完成之后，运维人员可以直接使用这个容器来部署代码。Docker可以快速创建容器，快速迭代应用程序，并让整个过程全称可见，使团队中的其他成员更容易理解应用程序是如何创建和工作。Docker容器很轻很快！容器的启动时间是秒级的，大量第节约开发、测试、部署的时间。

Docker更高效的虚拟化

Docker容器的运行不需要额外的Hypervisor支持，它是内核级的虚拟化，因此可以实现更高的性能和效率。

Docker更轻松的迁移和扩展

Docker容器几乎可以字啊任意的平台上运行，包括物理机、虚拟机、公有云、私有云、个人电脑、服务器等。这种兼容性可以让用户把一个应用程序从一个平台直接迁移到另外一个。

Docker更简单的管理

使用Docker，只需要小小的修改，就可以替代往大量的更新工作。所有的修改都以增量的方式被分发和更新，从而实现自动化并且高效的管理。

## Docker与虚拟化
类别 | Docker |	OpenStack | 结论
---|------|------|------|------|------|------
部署难度  |	非常简单  |	组件多，部署复杂|	因为平台是对已有的线上生产环境进行改造，必须选择侵入性较小的容器化技术
启动速度  |	秒级  |	分钟级 |	面对流量峰值,速度就是一切
执行性能  |	和物理系统几乎一致   |	VM会占用一些资源  |	微博核心业务对服务SLA要求非常苛刻
镜像体积  |	镜像是MB级别  |	虚拟机镜像是GB级别	| 当集群大规模部署时，体积小就代表更大的并发调度量
管理效率  |	管理简单	|  组件相互依赖，管理复杂 |	生产系统集群可控性是核心竞争力
隔离性	| 隔离性高|	彻底隔离	
可管理性能	|单进程、不建议启动SSH|	完整的系统管理
网络连接|	比较弱	|借助Neutron可以灵活组建各类网络架构


## Docker三大核心概念
## Docker镜像(image)
## Docker镜像就是一个只读的模板。

例如：一个镜像可以包含一个完整的CentOS操作系统环境，里面仅安装了Apache或用户需要的其他应用程序。

镜像可以用来创建Docker容器。

Docker提供了一个很简单的机制来创建镜像或者更新现有的镜像，用户甚至可以直接从其他人那里下载一个已经做好的镜像来直接使用。

## Docker容器(container)
Docker利用容器来运行应用。

容器是从镜像创建的运行实例。它可以被启动、开始、停止、删除。每个容器都是相互隔离的，保证安全的平台。

可以把容器看做是一个简易版的Linux环境（包括root用户权限、进程空间、用户空间和网络空间等）和运行在其中的应用程序。

注意：镜像是只读的，容器在启动的时候创建一层可写层作为最上层。

## Docker仓库(repository)
仓库是集中存放镜像文件的场所。有时候把仓库和仓库注册服务器（Registry）混为一谈，并不严格区分。实际上，仓库注册服务器上往往存放着多个仓库，每个仓库中又包含了多个镜像，每个镜像有不同的标签(tag)。

仓库分为公开仓库(Public)和私有仓库(Private)两种形式。

最大的公开仓库是Docker Hub，存放了数量庞大的镜像供用户下载。国内的公开仓库包括Docker Pool等，可以提供大陆用户更稳定快读的访问。

当用户创建了自己的镜像之后就可以使用push命令将它上传到公有或者私有仓库，这样下载在另外一台机器上使用这个镜像时候，只需需要从仓库上pull下来就可以了。

注意：Docker仓库的概念跟Git类似，注册服务器可以理解为GitHub这样的托管服务。

## Docker企业实战

系统环境
```
[root@docker ~]# cat /etc/redhat-release #查看版本号

CentOS Linux release 7.1.1503 (Core)

[root@docker ~]# uname -r #查看Linux内核

c3.10.0-229.el7.x86_64

[root@docker ~]#yum install -y docker
#安装docker(CentOS7系统CentOS-Extras库中已带Docker)

[root@docker ~]#systemctl start docker 
#启动docker

[root@docker ~]#systemctl enable docker 
#加入开机自启动

[root@docker ~]# docker version
#查看docker版本信息

Client: #docker客户端版本信息

Version: 1.8.2-el7.centos

API version: 1.20

Package Version: docker-1.8.2-10.el7.centos.x86_64

Go version: go1.4.2

Git commit: a01dc02/1.8.2

Built:

OS/Arch: linux/amd64

Server: #docker服务端版本信息

Version: 1.8.2-el7.centos

API version: 1.20

Package Version:

Go version: go1.4.2

Git commit: a01dc02/1.8.2

Built:

OS/Arch: linux/amd64

Docker基础命令
[root@docker ~]# docker –help

Usage: docker [OPTIONS] COMMAND [arg…]

docker daemon [ –help | … ]

docker [ –help | -v | –version ]

A self-sufficient runtime for containers.

Options:

–config=~/.docker Location of client config files #客户端配置文件的位置

-D, –debug=false Enable debug mode #启用Debug调试模式

-H, –host=[] Daemon socket(s) to connect to #守护进程的套接字（Socket）连接

-h, –help=false Print usage #打印使用

-l, –log-level=info Set the logging level #设置日志级别

–tls=false Use TLS; implied by –tlsverify #

–tlscacert=~/.docker/ca.pem Trust certs signed only by this CA #信任证书签名CA

–tlscert=~/.docker/cert.pem Path to TLS certificate file #TLS证书文件路径

–tlskey=~/.docker/key.pem Path to TLS key file #TLS密钥文件路径

–tlsverify=false Use TLS and verify the remote #使用TLS验证远程

-v, –version=false Print version information and quit #打印版本信息并退出

Commands:

attach Attach to a running container #当前shell下attach连接指定运行镜像

build Build an image from a Dockerfile #通过Dockerfile定制镜像

commit Create a new image from a container’s changes #提交当前容器为新的镜像

cp Copy files/folders from a container to a HOSTDIR or to STDOUT #从容器中拷贝指定文件或者目录到宿主机中

create Create a new container #创建一个新的容器，同run 但不启动容器

diff Inspect changes on a container’s filesystem #查看docker容器变化

events Get real time events from the server #从docker服务获取容器实时事件

exec Run a command in a running container #在已存在的容器上运行命令

export Export a container’s filesystem as a tar archive #导出容器的内容流作为一个tar归档文件(对应import)

history Show the history of an image #展示一个镜像形成历史

images List images #列出系统当前镜像

import Import the contents from a tarball to create a filesystem image #从tar包中的内容创建一个新的文件系统映像(对应export)

info Display system-wide information #显示系统相关信息

inspect Return low-level information on a container or image #查看容器详细信息

kill Kill a running container #kill指定docker容器

load Load an image from a tar archive or STDIN #从一个tar包中加载一个镜像(对应save)

login Register or log in to a Docker registry #注册或者登陆一个docker源服务器

logout Log out from a Docker registry #从当前Docker registry退出

logs Fetch the logs of a container #输出当前容器日志信息

pause Pause all processes within a container #暂停容器

port List port mappings or a specific mapping for the CONTAINER #查看映射端口对应的容器内部源端口

ps List containers #列出容器列表

pull Pull an image or a repository from a registry #从docker镜像源服务器拉取指定镜像或者库镜像

push Push an image or a repository to a registry #推送指定镜像或者库镜像至docker源服务器

rename Rename a container #重命名容器

restart Restart a running container #重启运行的容器

rm Remove one or more containers #移除一个或者多个容器

rmi Remove one or more images #移除一个或多个镜像(无容器使用该镜像才可以删除，否则需要删除相关容器才可以继续或者-f强制删除)

run Run a command in a new container #创建一个新的容器并运行一个命令

save Save an image(s) to a tar archive #保存一个镜像为一个tar包(对应load)

search Search the Docker Hub for images #在docker hub中搜索镜像

start Start one or more stopped containers #启动容器

stats Display a live stream of container(s) resource usage statistics #统计容器使用资源

stop Stop a running container #停止容器

tag Tag an image into a repository #给源中镜像打标签

top Display the running processes of a container #查看容器中运行的进程信息

unpause Unpause all processes within a container #取消暂停容器

version Show the Docker version information #查看容器版本号

wait Block until a container stops, then print its exit code #截取容器停止时的退出状态值

Run ‘docker COMMAND –help’ for more information on a command. 
#运行docker命令在帮助可以获取更多信息

Docker镜像管理
搜索Docker镜像
[root@docker ~]# docker search centos
#搜索所有centos的docker镜像

INDEX          NAME(名称) DESCRIPTION(描述) STARS(下载次数) OFFICIAL(官方)     AUTOMATED(自动化)

docker.io         docker.io/centos The official build of CentOS. 1781           [OK]

docker.io     docker.io/jdeathe/centos-ssh CentOS-6 6.7 x86_64 /         14                   [OK]

……

获取Docker镜像
可以使用docker pull命令来从仓库获取所需要的镜像。下面的例子将从Docker Hub仓库下载一个Centos操作系统的镜像。

[root@docker ~]# docker pull centos #获取centos镜像

[root@docker ~]# docker run -it centos /bin/bash 
#完成后可以使用该镜像创建一个容器

[root@5284d42eeb3a /]#

查看docker镜像
镜像的ID唯一标识了镜像，如果ID相同,说明是同一镜像。

TAG信息来区分不同发行版本，如果不指定具体标记,默认使用latest标记信息。

[root@docker ~]# docker images
#查看docker镜像

REPOSITORY(来自那个仓库) TAG(标签) IMAGE ID(唯一ID) CREATED(创建时间) VIRTUAL SIZE(大小)

docker.io/centos         latest 60e65a8e4030     5 days ago     196.6 MB

docker.io/nginx         latest 813e3731b203     13 days ago     133.8 MB

删除Docker镜像
如果要移除本地的镜像,可以使用docker rmi命令(在删除镜像之前先用docker rm删除依赖于这个镜像的所有容器)。注意docker rm 命令是移除容器。

[root@docker ~]# docker rmi imageID  #删除docker镜像

导出Docker镜像
如果要导出镜像到本地文件,可以使用docker save命令。

[root@docker ~]# docker save centos > /opt/centos.tar.gz  #导出docker镜像至本地

[root@docker ~]# ll /opt/

-rw-r–r–. 1 root root 204205056 12月 30 09:53 centos.tar.gz

1.6.6导入Docker镜像
可以使用docker load从本地文件中导入到本地docker镜像库

[root@docker ~]# docker load < /opt/centos.tar.gz 
#导入本地镜像到docker镜像库

[root@docker ~]# docker images
#查看镜像导入情况

REPOSITORY TAG IMAGE ID CREATED VIRTUAL SIZE

docker.io/centos latest 60e65a8e4030 5 days ago 196.6 MB

Docker容器管理
启动Docker容器
启动容器有两种方式，一种是基于镜像新建一个容器并启动，另外一个是将在终止状态(stopped)的容器重新启动。

因为Docker的容器实在太轻量级了，很多时候用户都是随时删除和新创建容器。

新建容器并启动
所需要的命令主要为docker run

例如,下面的命令输出一个hehe,之后终止容器。

[root@docker ~]# docker run centos /bin/echo “hehe” #这跟在本地直接执行 /bin/echo ‘hehe’ 

hehe

[root@docker ~]# docker run –name mydocker -it centos /bin/bash #启动一个bash终端,允许用户进行交互。

[root@1c6c3f38ea07 /]# pwd

/

[root@1c6c3f38ea07 /]# ls

anaconda-post.log bin dev etc home lib lib64 lost+found media mnt opt proc root run sbin srv sys tmp usr var

–name:给容器定义一个名称

-i:则让容器的标准输入保持打开。

-t:让Docker分配一个伪终端,并绑定到容器的标准输入上

/bin/bash:执行一个命令

当利用docker run来创建容器时，Docker在后台运行的标准操作包括：

检查本地是否存在指定的镜像，不存在就从公有仓库下载
利用镜像创建并启动一个容器
分配一个文件系统，并在只读的镜像层外面挂在一层可读写层
从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中去
从地址池配置一个ip地址给容器
执行用户指定的应用程序
执行完毕后容器被终止
启动已终止容器
可以利用docker start命令，直接将一个已经终止的容器启动运行。

容器的核心为所执行的应用程序，所需要的资源都是应用程序运行所必需的。除此之外，并没有其他的资源。可以在伪终端中利用ps和top来查看进程信息。

[root@docker ~]# docker start 1c6c3f38ea07
#启动一个终止的容器

1c6c3f38ea07

[root@docker ~]# docker ps -a #查看是否启动

CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES

1c6c3f38ea07 centos “/bin/bash” 8 minutes ago Up 1 seconds mycentos

守护进程运行
更多的时候，需要让Docker容器在后台以守护形式运行。此时可以通过添加-d参数来实现。

例如下面的命令会在后台运行容器。

[root@docker ~]# docker run -d centos /bin/bash -c “while true; do echo hehe; sleep 1;done”

961fd1162c2f6a8d04e4d8ab6ccacf4cb01a90af8ab553d5e2c5063ac483ffd8

[root@docker ~]# docker ps #查看正在运行的docker容器

CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES

961fd1162c2f centos “/bin/bash -c ‘while ” 18 minutes ago Up 18 minutes agitated_raman

[root@docker ~]# docker logs 961fd1162c2f 
#获取容器输出信息,通过dockerlogs命令

hehe

hehe

…

停止容器
可以使用docker stop来终止一个运行中的容器。

此外，当Docker容器中指定的应用终结时，容器也自动终止。例如启动一个终端的容器，用户通过exit命令或者ctrl+d来退出终端时，所创建的容器立刻终止。

终止状态的容器可以用docker ps -a命令看到,也可以通过docker start ID 命令来启动容器。

[root@docker ~]# docker ps -a #查看所有容器的情况

CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES

961fd1162c2f centos “/bin/bash -c ‘while ” 30 minutes ago Up 30 minutes agitated_raman

[root@docker ~]# docker stop 961fd1162c2f #停止容器

961fd1162c2f

[root@docker ~]# docker ps -a

CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES

961fd1162c2f centos “/bin/bash -c ‘while ” 31 minutes ago Exited (137) 27 seconds ago agitated_raman

极端方式停止容器(不推荐)

[root@867e6627a194 ~]# docker ps -a -q 
#列出所有启动容器的ID

867e6627a194

[root@867e6627a194 ~]# docker kill $(docker ps -a -q) 
#批量杀掉启动的容器

./in.sh: 行 4: 20078 已杀死 nsenter -t $PID -u -i -n -p

删除容器
[root@867e6627a194 ~]# docker ps -a #查看所有容器当前状态

CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES

867e6627a194 centos “/bin/bash” 16 minutes ago Up 5 minutes mydocker

c599b569f387 centos “/bin/echo hehe” 19 minutes ago Exited (0) 19 minutes ago fervent_torvalds

302f39c202c9 nginx “/bin/bash” 2 hours ago Up 2 hours 80/tcp, 443/tcp mynginx

[root@867e6627a194 ~]#

[root@867e6627a194 ~]# docker rm c599b569f387 #删除已经停止的容器

c599b569f387

[root@867e6627a194 ~]# docker rm -f 302f39c202c9
#删除正在运行的容器

302f39c202c9

进入容器
使用-d参数时，容器启动后会进入后台。某些时候需要进入容器进行操作,有很多种方法，包括使用docker attach命令或nsenter工具等。

attach命令
docker attach是Docker自带的命令。下面示例如何使用该命令。

[root@docker ~]# docker ps -a

CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES

867e6627a194 centos “/bin/bash” 10 minutes ago Exited (127) 47 seconds ago mydocker

[root@docker ~]# docker start 867e6627a194
#启动已经停止的容器

867e6627a194

[root@docker ~]# docker attach 867e6627a194
#通过docker attach进入

[root@867e6627a194 /]#

但是使用attach命令有时候并不方便。当多个窗口同时attach到同一个容器的时候，所有的窗口都会同步显示,当某个窗口因命令阻塞时,其他窗口也无法执行操作了。

nsenter命令
nsenter可以访问另一个进程的名字空间。nsenter需要有root权限。

[root@docker ~]# yum install -y util-linux
#安装包中有需要用到的nsenter

[root@docker ~]# docker ps -a

CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES

867e6627a194 centos “/bin/bash” 10 minutes ago Exited (127) 47 seconds ago mydocker

[root@docker ~]# docker start 867e6627a194 #启动已经关闭的容器

867e6627a194

[root@docker ~]# docker inspect –format “{{.State.Pid}}” 867e6627a194
#找到容器的第一个进程PID

20012

[root@docker ~]# nsenter -t 20012 -u -i -n -p 
#通过这个PID连接到容器

[root@867e6627a194 ~]# exit

[root@docker ~]# docker ps

CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES

867e6627a194 centos “/bin/bash” 13 minutes ago Up 2 minutes mydocker

[root@docker ~]# cat in.sh #编写成脚本快速进入容器空间

#!/bin/sh

PID=$(docker inspect –format “{{.State.Pid}}” $1)

nsenter -t $PID -u -i -n -p

[root@docker ~]# docker ps 

CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES

867e6627a194 centos “/bin/bash” 15 minutes ago Up 4 minutes mydocker

[root@docker ~]# ./in.sh 867e6627a194 #执行脚本跟上容器ID快速进入

[root@867e6627a194 ~]

```

# 拓展阅读：

[docker 入门文档](https://yeasy.gitbooks.io/docker_practice/content/introduction/what.html)
[docker 菜鸟文档](http://www.runoob.com/docker/docker-tutorial.html)