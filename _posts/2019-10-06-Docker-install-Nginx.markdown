---
layout:     post
title:      "Docker 安装 Nginx"
subtitle:   " \"Docker install Nginx\""
date:       2019-10-06 09:20:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - docker
---
## 拉取官方的镜像
```
[root@localhost ~]# docker pull nginx
Using default tag: latest
latest: Pulling from library/nginx
743f2d6c1f65: Already exists 
d6c2f01b1dae: Pull complete 
d4da6ff1b555: Pull complete 
Digest: sha256:12db363acf5b2d2f9f5fed240e228a04692bdac68402430fbd2f720c3a967d01
Status: Downloaded newer image for nginx:latest
[root@localhost ~]#
```
以下命令使用 NGINX 默认的配置来启动一个 Nginx 容器实例：
```
[root@localhost ~]# docker run --name mynginx -p 8091:80 -d nginx
367c1d72c7505466309b968aad20c5409c3a3b19ac9d6fb9d2ba55bfb2fca3d3
[root@localhost ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                NAMES
367c1d72c750        nginx               "nginx -g 'daemon of…"   14 seconds ago      Up 12 seconds       0.0.0.0:80->8091/tcp   mynginx
[root@localhost ~]#
```
 在浏览器中输入地址

 但是为了方便部署，我们可以使用另外一种方式来启动一个nginx容器

首先进入根目录，创建目录 /php/nginx, 用于存放后面的相关东西。
```
cd ~
mkdir -p ~/php/nginx/www ~/php/nginx/logs ~/php/nginx/conf
```
 拷贝容器内 Nginx 默认配置文件到本地当前目录下的 conf 目录，容器 ID 可以查看 docker ps 命令输入中的第一列：
```
docker cp mynginx:/etc/nginx/nginx.conf ~/php/nginx/conf
docker cp mynginx:/etc/nginx/conf.d/default.conf  ~/php/nginx/conf
```
www: 目录将映射为 nginx 容器配置的虚拟目录。
logs: 目录将映射为 nginx 容器的日志目录。
conf: 目录里的配置文件将映射为 nginx 容器的配置文件。
此时docker容器创建命令如下：
```
docker run -d -p 8091:80 --name mynginx2 -v ~/php/nginx/www:/usr/share/nginx/html -v ~/php/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v ~/php/nginx/conf/default.conf:/etc/nginx/conf.d/default.conf -v ~/php/nginx/logs:/var/log/nginx nginx
```
命令说明：
```
-p 8091:80： 将容器的 80 端口映射到主机的 8091端口。

--name mynginx2：将容器命名为mynginx2。

~/php/nginx/www:/usr/share/nginx/html：将我们自己创建的 www 目录挂载到容器的 /usr/share/nginx/html。

-v ~/php/nginx/conf/nginx.conf:/etc/nginx/nginx.conf：将我们自己创建的 nginx.conf 挂载到容器的 /etc/nginx/nginx.conf。

-v ~/php/nginx/conf/default.conf:/etc/nginx/conf.d/default.conf：将我们自己创建的 default.conf 挂载到容器的 /etc/nginx/conf.d/default.conf。

-v ~/php/nginx/logs:/var/log/nginx：将我们自己创建的 logs 挂载到容器的 /var/log/nginx。
```
## 常用
- 删除mynginx容器
    ```
    docker rm mynginx
    ```
- 启动容器命令
    ```    
    docker start mynginx2
    ```
- 停止容器命令
    ```
    docker stop mynginx2 
    ```

## 配置证书
 