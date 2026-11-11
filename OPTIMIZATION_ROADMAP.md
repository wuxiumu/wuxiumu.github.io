# wuxiumu.github.io · 持续优化路线图（自动化任务队列）

> 本文件是自动化优化任务的「任务队列」，由定时任务逐轮消费。每轮执行协议：
> 1. 工作分支 **auto-opt**（绝不直接动 master）：开始前 `git fetch origin`，然后 `git checkout auto-opt && git reset --hard origin/auto-opt`；
> 2. 从上往下找第一个未勾选的 `[ ]` 条目，**只完成这一个**，改动小而聚焦，不顺手大重构；
> 3. 完成后把 `[ ]` 改为 `[x]` 并追加 `（✅ YYYY-MM-DD 完成）`，与代码改动放进**同一个 commit**，提交信息风格 `feat(opt):` / `fix(opt):` / `docs:` + 中文描述；
> 4. **验证后再提交**：`python3 tools/tag_guard.py` 必须通过；改了 JS 跑 `node --check`；本地无 Jekyll 构建条件，用 front matter / HTML 结构校验代替；
> 5. 推送（本机 HTTPS push 被网络拦截，必须走 SSH 单次覆盖）：
>    `git -c url."git@github.com:".insteadOf="https://github.com/" push origin auto-opt`
> 6. 若所有条目已完成，从「扩展候选」挑一条追加到对应分区，再执行它。
>
> 红线：不碰 `_config.yml` 的 url/CNAME；不 force-push；不删文章；不动标签白名单以外的机制（标签只准从现有 64 个里选）。
>
> 目标双线：**[老板]** = 不懂技术的人 10 秒看懂 FDE 价值；**[同行]** = 展示工程与业务专业性；**[物料]** = 对外展示素材。价值观：AI 就是生产力。

---

## A. 老板视角 · 一眼看懂

- [x] [老板] 首页文章列表顶部加「FDE 精选」置顶区：从文章里挑 3 篇最能体现「业务问题 → 可运行系统 → 效果数字」的，用现有 featured/置顶机制或直接在 index.html 静态置顶（✅ 2026-11-12 完成：front matter 加 featured: true 标记 3 篇（企业AI落地 / 18岗位人机分工地图 / AI协同开发规范），index.html 用 where 过滤渲染置顶区，附工作台矩阵直达链接）
- [x] [老板] About 页顶部加 3 行「FDE 一页纸」：一句定位 + 一句证据（15 个在线工作台）+ 一句行动（微信/合作方式），大字号（✅ 2026-11-12 完成：_includes/about/zh.md 顶部插入内联样式卡片——定位/证据/合作三行，工作台矩阵直达链接，无 JS 无插件依赖）
- [x] [老板] 404 页面重做：迷路访客 3 秒内被导向 FDE 工作台矩阵或精选文章，而不是白屏（✅ 2026-11-12 完成：保留原 fullscreen 头图与布局，下方叠加导航卡片——主 CTA 工作台矩阵大按钮 + FDE 精选 3 篇 Liquid 动态 + 首页/About/Archive 次级链接，负 margin 卡片上浮设计）

## B. 同行视角 · 专业性

- [x] [同行] Archive 页 64 个标签按域分组展示（AI 族 / 技术栈 / 商业创业 / 组织成长 / 品牌系列），组名可点击折叠（✅ 2026-11-12 完成：分组定义放 front matter tag-groups，纯 Liquid 动态查 site.tags 渲染 + 组内按热度排序 + 组计数；原生 details 折叠零 JS；未归组标签自动落「其他」兜底组防漏；data-encode 过滤机制原样保留，校验 64 标签全覆盖 0 死标签）
- [ ] [同行] 给 10 篇 AI 主题高流量文章补「AI 协作说明」块（AI 承担什么 / 人工把关什么，链接协作规范），每轮补 2-3 篇，直至完成（此条目完成标准：10 篇全补完）（进度 3/10 @ 2026-11-12：enterprise-ai-just-beginning-huge-market-gap / ai-collaboration-roles-overview / ai-collaborative-development-specification，说明块置于 front matter 之后首屏位置，逐篇定制文案；剩余候选从 AI加速/AI协作 高热度标签文章中取）
- [x] [同行] 文章页底部加「相关文章」：按共享标签取 3 篇，Liquid 实现，无插件依赖（✅ 2026-11-12 完成：_layouts/post.html 在 </article> 后插入——遍历本文标签聚合候选池，uniq 去重 + 排除自身 + 按日期倒序取 3，与站点同宽容器 + 轻量卡片样式）
- [ ] [同行] sitemap.xml + robots.txt 补全并引用（Jekyll 模板或静态文件，注意 252 篇全量 URL）
- [ ] [同行] feed.xml 校验：XML 合法性、全文输出、分类/标签信息完整
- [ ] [同行] 页面性能巡检：首屏图片 loading="lazy"、ECharts/字体 CDN 回退链路验证、无阻塞渲染资源清点

## C. 展示物料 · 图文与动效

- [ ] [物料] 15 个工作台每个配一篇证据线文章（业务问题 → 方案 → 效果数字 → 在线直达链接），与工作台互链；每轮写 1 篇，直至 15 篇全完成（此条目完成标准：15 篇全上线）
- [ ] [物料] OG 分享卡片补全：文章页 og:image 用统一模板图，标题/描述取自 front matter，验证 3 个代表页面
- [ ] [物料] README 更新：站点定位一句话、目录结构、标签治理说明（链接 tools/TAG_MIGRATION.md）、auto-opt 协作流程说明

## 扩展候选（全部完成后从这里取）

- [ ] [同行] 站内搜索结果模板美化与关键词高亮
- [ ] [老板] 首页 Hero 区动态数字带（文章数 / 标签域 / 工作台数）
- [ ] [物料] 深色模式适配巡检与截图对比
- [ ] [同行] 文章代码块一键复制按钮
- [ ] [物料] 友情链接/合作伙伴区更新（挂 zcode-tast-cms、zcode-workbench）
