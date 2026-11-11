---
layout: post
title: "客户成功台：大客户要跑，提前 30 天知道"
subtitle: "FDE 证据线 · 客户成功台工作台复盘：管道漏斗、MRR、健康度、流失预警四视图，把「客户悄悄流失」变成「提前干预」。在线直达，Mock 数据开箱即用。"
date: 2026-11-12
author: "WuQingBao"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
  - 客服
  - FDE
---

> 🤖 **AI 协作说明**：本文为工作台证据线草稿，由 AI 基于真实代码结构起草，作者负责补充真实业务数据与终审。
> **草稿状态：待作者 review**——所有效果数字均为占位，发布前必须替换为真实数据（搜索 `待补真实数据`）。

## 一、业务问题：流失是结果，预警才是管理

ToB 业务最痛的时刻不是客户流失那一刻，而是续约会上才发现"原来他三个月没用核心功能了"。客户成功的关键是**把流失从结果变成过程指标**：登录频率、功能使用深度、工单情绪、NPS——这些先导信号组合成健康度，健康度下滑才是需要出手的那一刻。

## 二、方案：四视图盯住续约前后全周期

[客户成功台 CRM Workbench](https://wuxiumu.github.io/zcode-workbench/workbenches/crm-workbench/)（点开即用，Mock 数据驱动）：

| 视图 | 回答的问题 | 图表形态 |
|------|------|------|
| 管道漏斗 | 新签推进到哪一步 | 线索→商机→谈判→成交 |
| MRR 趋势 | 经常性收入涨跌与构成 | 新增/续费/流失堆叠 |
| 客户健康度 | 谁在悄悄远离 | 客户 × 健康分色块 |
| 流失预警 | 现在该救谁 | 预警名单 + 原因标签 |

与[运维监控台](https://wuxiumu.github.io/zcode-workbench/workbenches/ops-center/)、[增长分析台](https://wuxiumu.github.io/zcode-workbench/workbenches/growth-analytics/)共享同一套工程底座：单文件、ECharts 5、懒初始化护栏——三个工作台拼起来正好是"**获客 → 活跃 → 续费**"的完整客户生命周期。

## 三、效果数字（发布前必须填真实值）

<!-- 待补真实数据：替换为你真实项目中的数字 -->
- 流失预警触达后的挽留成功率：____%；
- 高危客户干预窗口：从"续约前 7 天"提前到"前 ____ 天"；
- MRR 流失率季度环比：____% → ____%；
- CSM 人均管理客户数：____ → ____。

## 四、给同类场景的复用建议

1. **健康度是加权公式，不是单指标**——登录频次 × 功能深度 × 工单情绪 × NPS，权重和业务方一起定，公式写进文档；
2. **预警必须带"为什么"**——只有分数没有原因标签的预警，CSM 还是得挨个翻数据，等于没预警；
3. **和客服工单打通**——[客服岗位的 AI 化率约 85%](/2026/10/12/ai-collaboration-customer-service/)，工单情绪数据正是健康度的关键输入，两个系统打通后预警质量明显提升。

**在线直达**：[https://wuxiumu.github.io/zcode-workbench/workbenches/crm-workbench/](https://wuxiumu.github.io/zcode-workbench/workbenches/crm-workbench/)
