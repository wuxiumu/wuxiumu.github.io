---
layout: post
title: "【实战记录】如何优雅实现多端自适应的 Agora 多人视频通话 —— 支持窗口旋转与原生全屏"
subtitle: "读书金句分享+交友群聊"
date: 2025-06-27
author: "ai wu"
header-img: "https://archive.biliimg.com/bfs/archive/ced415ab3ac9ba35c050e32dffe15f8197db9ec8.png"
tags:
  - AI
  - Vue
---




# **【实战记录】如何优雅实现多端自适应的 Agora 多人视频通话 —— 支持窗口旋转与原生全屏**





**项目背景**

最近在开发一个“读书金句分享+交友群聊”类的 web 项目，核心功能之一就是支持多用户 Agora 实时视频通话。基础功能搞定后，遇到了实际业务场景中常见但容易被忽略的体验痛点，比如：



- 手机端横屏/竖屏、摄像头倒置、对方视频方向乱、用户无法“真全屏”沉浸看画面
- PC端/移动端同一套代码，操作难以兼容全部场景





这篇文章就记录一下我是如何用 Vue3 + Agora Web SDK，搞定**多窗口独立旋转、原生全屏、移动端自适应**等细节的技术思考与实践。



------





## **1. 问题与目标**





**目标**：



- 多人通话，每个窗口可以单独旋转，适配任意拍摄方向（竖屏自拍、横屏合影……）
- 视频窗口可以原生全屏，不被浏览器工具栏干扰，移动端、PC都能流畅切换
- UI 响应式，按钮大、手指友好、主操作不挡住画面
- 兼容 Agora 的 mute/音视频切换，用户体验一致





------





## **2. 技术实现**







### **2.1 多窗口独立旋转**





**核心思路**：每个窗口维护自己的旋转角度，点击“旋转”按钮，CSS transform: rotate() 即可。



**代码片段**：

```
<!-- template 里 -->
<video
  :style="{ transform: 'rotate(' + (rotateMap[uid] || 0) + 'deg)' }"
  ...
/>
<button class="rotate-btn" @click.stop="rotateVideo(uid)">⟳</button>
// script
const rotateMap = reactive({})
function rotateVideo(uid) {
  rotateMap[uid] = ((rotateMap[uid] || 0) + 90) % 360
}
```



------





### **2.2 真·全屏支持（原生 requestFullscreen）**





**亮点**：



- 不是伪全屏（div盖满），是真正浏览器全屏，iOS/安卓都支持
- 适配任意窗口，支持 PC F11/手机全面屏体验





**代码片段**：

```
<button class="fullscreen-btn" @click.stop="enterRealFullscreen(uid)">⛶</button>
function enterRealFullscreen(uid) {
  let videoEl = (uid === 'local') ? localVideo.value : remoteVideoRefs.get(uid)
  if (videoEl?.requestFullscreen) videoEl.requestFullscreen()
}
```



------





### **2.3 响应式布局与移动端优化**





- **按钮区域大，触控友好**，.rotate-btn、.fullscreen-btn 均为圆形大按钮
- **所有按钮绝不挡住画面中央内容**，靠边浮动
- **全屏/旋转状态都在 reactive 里，切换频道自动重置**





**核心样式**：

```
.rotate-btn, .fullscreen-btn {
  font-size: 1.6rem;
  width: 50px; height: 50px;
  position: absolute; right: 16px; bottom: 18px;
}
@media (max-width: 600px) {
  .rotate-btn, .fullscreen-btn { font-size: 2rem; width: 62px; height: 62px; }
}
```



------





## **3. 体验与收获**





- **用户可以在手机上轻松将视频横竖切换，轻松一键“真·全屏”沉浸聊天**
- 适配任何设备，告别“仰脖看横屏，歪头看竖屏”的尴尬
- 多窗口旋转互不影响，体验和微信/钉钉会议类似，甚至更灵活
- 所有状态都自动重置，体验稳定





------





## **4. 技术要点小结**





- Vue3 的 reactive/ref 完美支持复杂状态（旋转角度、静音状态、全屏窗口等）
- CSS transform/原生全屏 API 组合，兼容主流浏览器
- 移动端优先设计，提升了多人场景的产品力





------





## **5. 拓展思考**





- 可以根据实际业务需求，扩展为支持拖拽窗口、自定义布局、多人实时画中画
- 旋转角度也可与服务端同步，实现“视频方向广播”
- 自动检测屏幕方向变化，进一步提升移动端体验





------





## **6. 项目链接与源码**





> 项目已同步开源，欢迎 Star & Issue 交流！

>  https://github.com/wuxiumu/book-quote-chat



------



**结语：**

一次小小的体验细节优化，却带来了“多端畅聊”的质变。下次你做视频会议/在线教育/远程面试时，不妨也大胆尝试这种极致自适应方案！

