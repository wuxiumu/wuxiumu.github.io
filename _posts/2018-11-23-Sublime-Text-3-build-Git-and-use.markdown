---
layout:     post
title:      "Sublime Text 3 搭建 Git 及使用"
subtitle:   " \"Sublime Text 3 build Git and use\""
date:       2018-11-23 12:00:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 工具
---

> “JUST DO IT. ”


## 配置

1. 配置全局参数
```
git config --global user.name "userName"
git config --global user.email "userEmail"
```
2. 设置默认推送分支
在Sublime Text 中直接使用 push 命令时会提示 未明确指定本地分支和远程分支，提示就不贴了，大概就是这个意思 
但Sublime Text中命令无法带参数，所有需要提前设置 push.default 
参数： 
	1. nothing：无操作，不推送任何分支 
	2. matching：匹配所有分支 （默认） 
	3. simple：匹配单个分支 
	4. tracking：将当前的分支推到它所跟踪的任何地方 
	5. current：推送当前的分支
```
git config --global push.default current
```

3. 生成 SSH key 密钥公钥
```
ssh-keygen -t rsa
```
- 中间会有三次输入，一次命名、两次密码，全部默认回车 
- 完成后会在 C:\Users\<userName>\.ssh 生成密钥文件 

4. 连接 Github
-  登陆 https://github.com，单击 New SSH key 
Title 自定义，将 id_rsa.pub 公钥中的内容拷贝到 Key 
- 打开 git bath 窗口，输入
```
$ ssh git@github.com
PTY allocation request failed on channel 0
Hi stephencode! You've successfully authenticated, but GitHub does not provide shell access.
Connection to github.com closed.
```
成功连接上 Github 了

5. Sublime Text 3 安装 Git
- 安装Git插件 
- 配置插件 Preferences/Package Settings/Git/Settings - User 实际路径根据 git 安装路径而改变
```
{
    "git_command": "C:\\Program Files\\Git\\cmd\\git.exe"
}
```

## 使用

### 远程仓库更新 

- 复制远程仓库 SSH 地址 
- 克隆项目到本地
```
git clone git@github.com:userName/projectName.git
```
- 用 Sublime Text 3 打开该项目
- 将文件添加到暂存区 Ctrl + Shift + P 调起命令面板，输入 Git: Add All，将文件提交至暂存区 
- 将文件提交至版本库 Ctrl + Shift + P 调起命令面板，输入 Git: Commit，将文件提交至版本库 
这时会弹出提交日志的文件，首行输入此次更新的内容和目的，关闭该文件即可 
- 将文件提交至远程版本库 Ctrl + Shift + P 调起命令面板，输入 Git: Push，将文件提交至版本库

## 本地仓库上传

- 先在 https://github.com 上创建一个和本地仓库名字相同的线上仓库
- 用 Sublime Text 3 打开该项目

- 初始化仓库  Ctrl + Shift + P 调起命令面板，输入 Git: Init，回车，确认路径，回车

- 将文件添加到暂存区 、版本库 ，与上面步骤一样
- 将文件提交至远程版本库 Ctrl + Shift + P 调起命令面板，输入 Git: Push，回车，确认路径，回车 
报了一个错，因为没有指明远程仓库的名字和url地址
- 配置远程仓库地址，由于Sublime Text 的 Git 命令不能带参数，在 Git Bash 中完成
```
git remote add origin git@github.com:userName/projectName.git
```
- 只需配置一次，后面直接调用 Git: Push 即可

—— wuxiumu 后记于 2018.11


