---
layout: post
title: "macOS本地化deepseek"
subtitle: "本地化deepseek"
date: 2025-04-15
author: "acewu"
header-img: "img/post-bg-2015.jpg"
tags: 
    - mac
    - deepseek
    - ollama
    - chatbox
---
## 1.在mac电脑上安装ollama，
Ollama 是一个开源的本地大语言模型运行框架，专为在本地机器上便捷部署和运行大型语言模型。

先去 ollama 中文网 https://ollama.net.cn

建议顺手把Chatbox也下载了用于本地deepseek可视化使用。https://github.com/chatboxai/chatbox/releases

## 2.使用ollama安装deepseek
打开Mac 终端：其他—终端

然后运行：
```
ollama run deepseek-r1:14b
```


出现success之后即为安装成功，可以直接跟他提问啦～

想要退出deepseek时，使用
```
control+d 
```
下次再使用deepseek时，需要打开终端，
执行：
```angular2html
ollama run deepseek-r1:14b
```
即可再次提问
当然，也有其他的deepseek版本可以安装，根据电脑配置自行选择：
```angular2html
DeepSeek-R1-1.5b：
ollama run deepseek-r1:1.5b
DeepSeek-R1-7B：
ollama run deepseek-r1:7b
DeepSeek-R1-8B：
ollama run deepseek-r1:8b
DeepSeek-R1-14B：
ollama run deepseek-r1:14b
DeepSeek-R1-32B：
ollama run deepseek-r1:32b 
```
## 3.deepseek本地可视化
总是使用终端太麻烦了，可以借助其他方法实现本地可视化应用和管理（跟网页版形式几乎相同）
有以下几种方式可实现：

### 1）使用chatboxai 本地化页面（建议选择这个方法）
安装chatboxai（上面流程已经讲怎么下载啦）
安装完成后打开，根据提示选择本地大模型名称（有几个可以选几个），然后就开始使用本地网页化deepseek吧！

### 2）使用open-webui 本地化页面（经测试比较卡，还占很多存储不推荐）
1. 安装docker

2. 然后在终端安装open-webui：
    ```
    docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
    ```
3. 打开docker桌面版，点击open-webui跳转到网友使用deepseek

4. 几个版本的deepseek比较

本人电脑配置如下： MacBook Air (M2 2023)  24GB内存 2T

> 其他
## Chatbox配置本地DeepSeek聊天
1、下载Chatbox
2、配置为本地DeepSeek，配置：该选择OLLAMA API
3.无需联网也能和DeepSeek畅快聊天
![](https://archive.biliimg.com/bfs/archive/9968eef3d3b5d5cc662f426a8e99c0b8b8d862af.png)
