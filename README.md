# 吴庆宝的个人博客

> 路漫漫其修远兮，吾将上下而求索。

🌐 在线地址：[https://wuxiumu.github.io](https://wuxiumu.github.io)

**定位一句话**：吴庆宝 · FDE（Forward Deployed Engineer）——把业务问题翻译成能跑起来的系统。博客沉淀 AI 落地实战（[AI协同开发规范系列](https://wuxiumu.github.io/2026/10/12/ai-collaborative-development-specification/)）与全栈工程，能力演示见 [FDE 工作台矩阵 ×15](https://wuxiumu.github.io/zcode-workbench/)。

## 项目简介

基于 **[Jekyll](https://jekyllrb.com/)** 构建、托管于 [GitHub Pages](https://pages.github.com/)，主题基于 [Hux Blog](https://github.com/Huxpro/huxpro.github.io) 二次开发。当前 **250+ 篇文章 / 64 个规范标签**，内容涵盖：

- **AI / LLM**：Agent 开发、RAG、Prompt 工程、Dify、Cursor
- **后端**：PHP (Laravel/Swoole)、Golang、Node.js、MySQL、Redis
- **前端**：Vue 2/3、React、TypeScript、小程序
- **管理与认知**：团队管理、方法论、一人公司、极简创业

## 目录结构

```
├── _config.yml            # Jekyll 站点配置
├── _posts/                # 博客文章（按日期命名）
├── _drafts/               # 草稿区（Jekyll 默认不发布，共创内容先落这里）
├── _includes/             # 可复用 HTML 片段（导航、页脚、侧栏等）
├── _layouts/              # 页面模板
├── tools/                 # 自动化工具（tag_guard 守门 / 标签迁移映射表）
├── docs/                  # 审计与决策报告（图片巡检 / CDN 抽查 / GA4 方案）
├── OPTIMIZATION_ROADMAP.md  # 持续优化任务队列（auto-opt 每轮消费）
├── sitemap.xml robots.txt # SEO 基建
├── js/  css/  img/        # 前端脚本 / 样式 / 图片
├── Gemfile  Rakefile      # Ruby 依赖 / 文章模板任务
└── package.json           # Node 依赖（Grunt 任务）
```

## 标签治理

标签采用**白名单制**（当前 64 个规范标签，详见 [tools/TAG_MIGRATION.md](tools/TAG_MIGRATION.md)）：

- 写新文章时**只准从现有 64 个标签里选**，新标签需预期 ≥3 篇复用才准入；
- CI 守门：`tools/tag_guard.py` 在每次 push/PR 时校验唯一标签数 ≤150，超限即红；
- 机制说明：Archive 页标签按域分组展示（AI 族 / 技术栈 / 商业创业 / 组织成长 / 品牌系列）。

## auto-opt 协作流程

本仓库由定时任务在 **auto-opt 分支**持续优化（任务队列见 [OPTIMIZATION_ROADMAP.md](OPTIMIZATION_ROADMAP.md)）：

```
每小时一轮：同步 origin/auto-opt → 取队列第一个未勾选条目
  → 实现（小而聚焦）→ 验证（tag_guard 等）→ commit → push auto-opt
```

- **master 永远不被自动改动**——所有产物落在 `auto-opt`，作者 review 后合并即部署；
- 共创类内容只写 `_drafts/`，正式发布永远由作者把关；
- 报告类产出（GA4 方案 / CDN 抽查 / 图片巡检）落在 `docs/`，涉及配置变更的决策归作者。

## 快速开始

```bash
# 本地启动（Ruby ≥ 2.7 + Bundler）
bundle install
bundle exec jekyll serve   # http://localhost:4000

# 创建新文章
rake post title="文章标题" subtitle="副标题"
```

## 部署

推送到 `master` 分支，GitHub Pages 自动构建发布。

## 许可证

[Apache License 2.0](LICENSE)
