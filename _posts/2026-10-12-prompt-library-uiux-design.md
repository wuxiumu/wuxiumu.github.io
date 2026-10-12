---
layout: post
title: "AI协同提示词模板库：UIUX设计"
subtitle: "UI/UX 设计岗位 4 条核心提示词模板：风格探索、页面视觉稿、设计 token 反推、设计稿转前端代码。"
date: 2026-10-12
author: "WuQingBao"
header-img: "img/post-bg-2015.jpg"
tags:
  - AI协同开发
  - 提示词模板
  - UIUX设计
---
# 02-UIUX设计 · 提示词模板

> 📌 来源：[02-UIUX 设计 × AI 协同](/2026/10/12/ai-collaboration-uiux-design/) · 索引与用法见 [00-模板库索引](/2026/10/12/prompt-library-index/) · 系列总纲 [AI协同开发规范](/2026/10/12/ai-collaborative-development-specification/)
> 占位符（xxx / 粘贴处）填好后使用；使用前过一遍总纲五条红线：不贴密钥、不贴真实用户数据、新依赖走白名单。


### 模板 A · 风格方向探索

```text
【产品】xxx（一句话描述 + 目标用户）
【任务】给出 4 套差异明显的视觉风格方向，每套包含：
1. 风格关键词（3~5 个）
2. 色板（主色/辅色/中性色，给 HEX 值）
3. 字体建议（中文 + 英文，注明开源可商用）
4. 圆角/阴影/留白的总体倾向
5. 一个对标产品或参考流派
【约束】四套方向必须互相拉开差距，禁止四套都是"蓝白极简SaaS风"。
```

### 模板 B · 页面视觉稿（生图工具）

```text
High-fidelity UI design of「页面名称」for「产品类型」,
style:「从模板A选定的风格关键词」,
color palette:「HEX色板」, font:「字体」,
包含模块:「导航/列表/表单等具体清单」,
状态:「默认态」, clean layout, realistic content（用真实感假数据，禁止乱码占位）
--另出：空数据态 / 加载态 / 错误态 各一版
```

### 模板 C · 设计 token 反推

```text
以下是我选定的设计稿（贴图/描述）。请反推出设计 token：
1. colors（primary/secondary/neutral/semantic，HEX + 使用场景）
2. typography（字阶 h1~body~caption：字号/字重/行高）
3. spacing（间距体系，建议 4px 基准）
4. radius / shadow / border
输出为 JSON（可直接进 Tailwind config），并附一份「什么场景用什么 token」的使用规则。
```

### 模板 D · 设计稿转前端代码

```text
【输入】设计稿（贴图）+ 设计 token（粘贴模板C输出）
【任务】用「技术栈+版本号」实现该页面为可复用组件
【约束】
1. 所有颜色/字号/间距必须引用 token，禁止硬编码魔法值
2. 覆盖状态：默认/悬停/加载/空数据/错误
3. 响应式：移动端优先，断点 xxx
4. 无障碍：对比度达标、可聚焦元素有 focus 态、图片有 alt
【输出】完整组件代码 + token 配置文件 + 与设计稿的差异说明（如有妥协，列出来）
```

---

