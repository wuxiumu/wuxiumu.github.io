---
layout: post
title: "是一个极简但酷炫的【读书金句分享+实时群聊交友】平台"
subtitle: "让灵魂碰撞，让金句流传。这里，每一条神评，都是你我的共鸣！"
date: 2025-06-26
author: "ai wu"
header-img: "https://archive.biliimg.com/bfs/archive/ced415ab3ac9ba35c050e32dffe15f8197db9ec8.png"
tags:
  - AI
  - Vue
  - GO
---


# **📚 QuoteChat —— 读书金句群聊交友站**





> 让灵魂碰撞，让金句流传。这里，每一条神评，都是你我的共鸣！



------



## **项目简介**



**QuoteChat** 是一个极简但酷炫的**读书金句分享+实时群聊交友**平台。

无论你是孤独的读书人，还是八卦的社交动物，这里都有你的“一席之地”。



**特色：**



- ✨ 金句/神评一键点赞、评论、收藏、转发
- 🧑‍🤝‍🧑 好友系统，群聊与私聊，边交友边吐槽
- 🚀 实时 WebSocket 群聊 + 私聊，体验如微信一样丝滑
- 🖼️ 图文/语音/视频消息、表情包，畅聊不卡壳
- 💬 管理后台，金句/评论/友链/用户/数据统计，一站掌控
- 🔒 JWT 登录、权限验证，支持多种登录模式
- 🔥 支持 WebRTC 音视频通话（可集成云厂商接口）



------



## **快速上手**



### **1. 环境准备**



- Node.js >= 18
- Go >= 1.18
- npm >= 10.8
- 推荐操作系统：macOS/Windows/Linux 皆可



### **2. 前端运行**



```
cd book-quote-chat-frontend
npm install
npm run dev         # 本地开发
npm run build       # 生产打包
```



### **3. 后端运行**



```
cd book-quote-chat-backend
go run main.go      # 本地后端服务
```



### **4. .env 配置参考**



```
VITE_API_BASE_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080/ws
ALLOWED_ORIGINS=http://localhost:5173,http://yourdomain.com
UPLOAD_EXTS=jpg,jpeg,png,gif,mp4,mp3
UPLOAD_MAX_SIZE_MB=20
```



------



## **主要功能一览**



- **读书金句/神评**：浏览、点赞、评论、复制，AI 神评论
- **群聊/私聊**：实时 WebSocket，消息动画，表情包、图片、语音/视频、文件
- **好友系统**：加好友、分组、备注、在线状态
- **WebRTC 音视频通话**：1对1通话，支持全屏、挂断、状态显示
- **管理后台**：内容审核、用户管理、日志、数据统计、友链配置
- **权限系统**：注册/登录/JWT，接口鉴权
- **限流防刷**：点赞、评论、举报等敏感操作限流
- **极简美观 UI**：自适应移动端，酷炫动画、支持主题切换
- **多语言/多端兼容**：PC/Mac/手机均流畅



------



## **技术栈**



- 前端：Vue3 + Vite + TailwindCSS + Pinia + WebSocket
- 后端：Go + 原生 HTTP + JWT + 文件存储
- 特色：无需数据库，所有核心数据 JSON 文件化，支持热加载



------



## **项目亮点**



- 前后端完全分离，接口文档完善，MVP 极易二次开发
- 所有关键接口都有自动化/集成测试，稳定可扩展
- UI/UX 追求极致，交互动画媲美大厂社交产品
- 支持扩展外部 AI/云音视频 SDK，兼容未来商业化



------



## **未来计划**



- 移动端 App（Flutter/H5混合）
- AI 智能推荐金句/好友
- 付费音视频分钟充值/会员体系
- 更多主题皮肤&自定义表情包
- 支持多语言国际化
- 支持插件市场，二次开发更简单



------



## **致谢&联系方式**





> 有问题请提 issue，欢迎 PR！

>

> 工程师：**Aric**

> 邮箱： wuxiumu@163.com

> 微信：qingbao199101

>

> 一句话宣言：“代码是桥梁，AI是未来。”



------



**点亮 Star，世界因你不同！🌟**