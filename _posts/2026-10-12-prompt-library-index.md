---
layout: post
title: "AI协同提示词模板库：索引与速查"
subtitle: "《AI协同开发规范》全系列 60+ 条提示词模板的工作副本库，按场景速查、按岗位归集，干活时直接来抄。"
date: 2026-10-12
author: "WuQingBao"
header-img: "img/post-bg-2015.jpg"
tags:
  - AI协同开发
  - 提示词模板
  - 索引
---
# 00-模板库索引 · AI 协同提示词速查

> 💬 **这是什么**：《AI协同开发规范》全系列 60+ 条提示词模板的**工作副本库**——干活时直接来这里抄，不用翻分册。分册是教科书，模板库是工具箱。
> 总纲见 [AI协同开发规范](/2026/10/12/ai-collaborative-development-specification/)，岗位全景见 [00-汇总·一人公司AI协同岗位全景](/2026/10/12/ai-collaboration-roles-overview/)。

**使用三步**：① 按下方速查找到模板 → ② 填占位符（xxx / 粘贴处）→ ③ 使用前过一遍红线自查。

> 🚫 **红线自查（每次粘贴前 3 秒）**：不含密钥/证书/生产配置 · 不含真实用户数据（先脱敏）· 新依赖走白名单 · 高风险模块（支付/权限/资金）AI 只当草稿纸。

---

## 一、场景速查：我现在要干什么 → 用哪个模板

| 我要… | 用模板 | 所在文件 |
|---|---|---|
| 写代码（通用起手式） | A.1 让 AI 写代码 | [AI协同开发规范](/2026/10/12/ai-collaborative-development-specification/) 附录 A |
| 让 AI 审我的代码 | A.2 让 AI 帮你审代码 | [AI协同开发规范](/2026/10/12/ai-collaborative-development-specification/) 附录 A |
| 判断需求是真是伪 | 01-A 需求真伪预判 | [01-产品经理](/2026/10/12/prompt-library-product-manager/) |
| 写 PRD / 拆用户故事 | 01-B PRD 初稿 | [01-产品经理](/2026/10/12/prompt-library-product-manager/) |
| 出视觉风格 / 设计 token | 02-A 风格探索 · 02-C token 反推 | [02-UIUX设计](/2026/10/12/prompt-library-uiux-design/) |
| 设计稿转前端代码 | 02-D 设计稿转代码 · 05-A 页面生成 | [02-UIUX设计](/2026/10/12/prompt-library-uiux-design/) / [05-前端开发](/2026/10/12/prompt-library-frontend/) |
| 技术选型 / 架构方案 | 03-A 选型对比 · 03-B 架构草图 | [03-架构](/2026/10/12/prompt-library-architect/) |
| 按接口契约写后端 | 04-A 按契约实现接口 | [04-后端开发](/2026/10/12/prompt-library-backend/) |
| 查 bug / 分析崩溃 | 04-B Bug 定位 · 06-C 崩溃堆栈 · 08-D 故障归因 | [04-后端开发](/2026/10/12/prompt-library-backend/) / [06-移动端开发](/2026/10/12/prompt-library-mobile/) / [08-运维DevOps](/2026/10/12/prompt-library-devops/) |
| 补单元测试 / 查假测试 | 04-C 单测补全 · 07-D 断言质检 | [04-后端开发](/2026/10/12/prompt-library-backend/) / [07-测试QA](/2026/10/12/prompt-library-qa/) |
| 写测试用例（从需求） | 07-A 用例设计 | [07-测试QA](/2026/10/12/prompt-library-qa/) |
| 上生产前的变更脚本 | 08-B 部署+回滚（成对） | [08-运维DevOps](/2026/10/12/prompt-library-devops/) |
| 安全审查 / 越权检查 | 04-D 安全加固 · 09-A 攻击面 · 09-B 越权专项 | [04-后端开发](/2026/10/12/prompt-library-backend/) / [09-安全](/2026/10/12/prompt-library-security/) |
| 建表 / 取数 / 慢查询 | 10-A 数据模型 · 10-B 取数 · 10-C 慢查询 | [10-数据库与数据分析](/2026/10/12/prompt-library-database-data/) |
| 写 README / API 文档 / changelog | 11-A/B/C | [11-技术文档](/2026/10/12/prompt-library-tech-docs/) |
| 投放素材 / 落地页 / 增长周报 | 12-B/C/D | [12-市场增长](/2026/10/12/prompt-library-marketing/) |
| 把踩坑笔记写成文章 | 13-A 原料成文（核心模板） | [13-内容运营](/2026/10/12/prompt-library-content-ops/) |
| 发布前事实核查 | 13-D 事实核查 | [13-内容运营](/2026/10/12/prompt-library-content-ops/) |
| 搭 AI 客服机器人 | 14-B 机器人系统提示词（三笼头） | [14-客服](/2026/10/12/prompt-library-customer-service/) |
| 拆目标 / 每日站会 / 周复盘 | 15-A/B/C | [15-项目管理](/2026/10/12/prompt-library-project-management/) |
| 起草隐私政策 / 解读对方合同 | 16-A/B | [16-法务合规](/2026/10/12/prompt-library-legal/) |
| 开源许可证合规 | 16-C 许可证矩阵 · 09-C 依赖漏洞解读 | [16-法务合规](/2026/10/12/prompt-library-legal/) / [09-安全](/2026/10/12/prompt-library-security/) |

---

## 二、分岗位模板总目（60 条）

| 文件 | 岗位 | 模板清单 |
|---|---|---|
| [01-产品经理](/2026/10/12/prompt-library-product-manager/) | 产品经理 | A 需求真伪预判 · B PRD 初稿 · C 竞品分析 · D 用户反馈归类 |
| [02-UIUX设计](/2026/10/12/prompt-library-uiux-design/) | UI/UX 设计 | A 风格方向探索 · B 页面视觉稿（生图） · C 设计 token 反推 · D 设计稿转前端代码 |
| [03-架构](/2026/10/12/prompt-library-architect/) | 架构师 | A 技术选型对比 · B 架构方案草图 · C 技术债扫描 · D 代码骨架生成 |
| [04-后端开发](/2026/10/12/prompt-library-backend/) | 后端 | A 按契约实现接口 · B Bug 定位 · C 单元测试补全 · D 安全加固审查 |
| [05-前端开发](/2026/10/12/prompt-library-frontend/) | 前端 | A 页面/组件生成 · B 状态管理设计 · C 挑刺修复（配截图） · D 性能审查 |
| [06-移动端开发](/2026/10/12/prompt-library-mobile/) | 移动端 | A 跨端页面生成 · B 上架材料清单 · C 崩溃堆栈分析 |
| [07-测试QA](/2026/10/12/prompt-library-qa/) | 测试 | A 用例设计（从需求不从代码） · B E2E 自动化脚本 · C 变更影响面/最小回归清单 · D 断言质检 |
| [08-运维DevOps](/2026/10/12/prompt-library-devops/) | 运维 | A CI/CD 流水线 · B 部署+回滚脚本（成对） · C 监控告警设计 · D 故障第一轮归因 |
| [09-安全](/2026/10/12/prompt-library-security/) | 安全 | A 攻击面审查（双角色） · B 鉴权越权专项 · C 依赖漏洞解读 · D 应急预案起草 |
| [10-数据库与数据分析](/2026/10/12/prompt-library-database-data/) | 数据 | A 数据模型设计 · B 自然语言取数 · C 慢查询优化 · D 数据质量校验 |
| [11-技术文档](/2026/10/12/prompt-library-tech-docs/) | 文档 | A README 生成/重写 · B API 文档生成 · C Changelog 生成 · D 文档巡检 |
| [12-市场增长](/2026/10/12/prompt-library-marketing/) | 增长 | A 定位话术刺激 · B 投放素材批量 · C 落地页生成 · D 增长数据周报 |
| [13-内容运营](/2026/10/12/prompt-library-content-ops/) | 内容 | A 原料成文 · B 选题库维护 · C 多平台改写 · D 事实核查 |
| [14-客服](/2026/10/12/prompt-library-customer-service/) | 客服 | A 知识库初版 · B 机器人系统提示词 · C 工单回复起草 · D 周复盘 |
| [15-项目管理](/2026/10/12/prompt-library-project-management/) | 项目管理 | A 目标拆解 · B 每日站会监工 · C 周报与归因 · D 点子池批量裁决 |
| [16-法务合规](/2026/10/12/prompt-library-legal/) | 法务 | A 隐私政策/用户协议起草 · B 对方合同解读 · C 开源许可证合规 |

---

## 三、库的维护纪律（对应总纲 L·沉淀）

1. **改了就记**：实战中改顺手的模板，直接更新到对应文件，改动处加一行 `<!-- 2026-xx-xx 调整了xxx -->`。
2. **新模板入库格式**（总纲附录 A.3）：模板名称 + 适用场景 + 模板正文 + 使用示例 + 至少 1 次实际使用效果记录。
3. **坑点反哺**：在分册"坑点清单"新增坑时，检查对应模板的【约束】段是否需要加一条防线。
4. **以分册为准**：模板库是工作副本；如与分册正文冲突（分册修订后），以分册为准并同步过来。
