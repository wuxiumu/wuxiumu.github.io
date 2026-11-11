# wuxiumu.github.io · 持续优化路线图（自动化任务队列）

> 本文件是自动化优化任务的「任务队列」，由定时任务逐轮消费。**定位：这是一个博客**——优化围绕读者体验、SEO、站点质量展开；FDE 展示是博客的内容之一，不是博客本身。
>
> 每轮执行协议：
> 1. 工作分支 **auto-opt**（绝不直接动 master）：开始前 `git fetch origin`，然后 `git checkout auto-opt && git reset --hard origin/auto-opt`；
> 2. 从上往下找第一个未勾选的 `[ ]` 条目，**只完成这一个**，改动小而聚焦，不顺手大重构；
> 3. 完成后把 `[ ]` 改为 `[x]` 并追加 `（✅ YYYY-MM-DD 完成）`，与代码改动放进**同一个 commit**，提交信息风格 `feat(opt):` / `fix(opt):` / `docs:` + 中文描述；
> 4. **验证后再提交**：`python3 tools/tag_guard.py` 必须通过；改了 JS 跑 `node --check`；本地无 Jekyll 构建条件，用 front matter / HTML 结构校验代替；
> 5. 推送（本机 HTTPS push 被网络拦截，全局 git 配置还会把 SSH 改写成 HTTPS，必须禁用全局配置走 SSH）：
>    `GIT_CONFIG_GLOBAL=/dev/null git push origin auto-opt`
> 6. 若所有条目已完成，从「扩展候选」挑一条追加到对应分区，再执行它。
>
> 红线：不碰 `_config.yml` 的 url/CNAME；不 force-push；不删文章；标签只准从现有 64 个里选；**共创类任务只准写 `_drafts/`（Jekyll 默认不发布），绝不自动往 `_posts/` 加新文章**——正式内容必须由作者本人把关发布。
>
> 目标线：**[基建]** = SEO 与站点质量；**[体验]** = 读者阅读体验；**[回归]** = 对近期改动的验收；**[共创]** = 需作者把关的内容草稿。价值观：AI 就是生产力。

---

## 已完成存档

- [x] [老板] 首页「FDE 精选」置顶区（✅ 2026-11-12：3 篇 featured 标记 + where 过滤渲染 + 工作台矩阵直达）
- [x] [老板] About 页顶部「FDE 一页纸」三行卡片（✅ 2026-11-12：定位/证据/合作，零 JS 零插件）
- [x] [老板] 404 页重做为 FDE 导航页（✅ 2026-11-12：主 CTA 工作台矩阵 + 精选动态 + 次级链接）
- [x] [同行] Archive 64 标签按域分组可折叠（✅ 2026-11-12：5 组 front matter 定义 + 兜底组 + 过滤机制不变）
- [x] [同行] 10 篇 AI 主题高流量文章补「AI 协作说明」块（✅ 2026-11-12：4 轮完成，逐篇定制，全站核对 10 篇 0 重复）
- [x] [同行] 文章页底部「相关文章」按共享标签推荐（✅ 2026-11-12：uniq + 排除自身 + 日期倒序取 3，纯 Liquid）

---

## B. 基建 · SEO 与站点质量

- [x] [回归] 对近期 6 项改动的移动端 + 亮暗主题回归验收：首页精选区 / About 一页纸 / 404 卡片 / Archive 分组折叠 / 相关文章块 / AI 协作说明块，逐项检查 ≤768px 表现与暗色对比度，发现问题当场修（✅ 2026-11-12 完成：站点为纯亮色主题（Hux，无暗色模式），验收收敛为移动端 + 亮色对比度——修复 4 项：404 CTA 白字 #4f8cff 对比度 3.1:1 不达 AA → #2b6be0 ≈4.8:1；404 上浮 -60px 小屏压头图 → ≤768px 改 -30px；About 一页纸与相关文章块内联样式无法响应媒体查询 → 转 class + <style> 移动端规则；Archive 组计数 #999 2.8:1 → #666 5.7:1；首页精选区补 ≤768px padding；AI 协作说明块继承主题 blockquote 无问题）
- [x] [基建] sitemap.xml + robots.txt 补全（Jekyll Liquid 模板，252 篇全量 URL + 页面），robots 引用 sitemap（✅ 2026-11-12 完成：纯新增 2 个文件零现有代码改动；sitemap 循环 site.posts 全量 252 + html_pages（排除 404），模板沿用 feed.xml 的 layout:null + xml 惯例；模拟渲染验证 XML 合法、252 个 url 节点、循环配对）
- [x] [基建] feed.xml 覆盖面（已核实：`feed.xml:14` 写死 `limit:10`，252 篇仅 10 篇进订阅流）：放宽到 50 篇（全量 252 篇全文会让 feed 体积失控，先保守），并校验 XML 输出合法（✅ 2026-11-12 完成：单字符改动 `limit:10`→`limit:50`；模拟渲染最近 50 篇全文验证 RSS XML 合法、item 数=50；全量 252 篇是否放开留待观察订阅体积）
- [x] [基建] GA 统计已失效（已核实：`_config.yml` ga_track_id `UA-129669984-1` 是 Universal Analytics，UA 2023-07 已停止收数——统计代码在跑但数据为零）：产出一份「GA4 替换方案」报告（需要新 ID 由作者提供），未提供 ID 前不改任何代码（✅ 2026-11-12 完成：报告落 `docs/GA4_MIGRATION_REPORT.md`——现状核实（配置行/加载位置/失效原因）+ 三选项（GA4 升级 / 百度统计新增 / 置空停用）+ 作者决策路径，零代码改动）
- [x] [基建] PWA 缓存审计（已核实：`sw.js` 缓存名 `precache-then-runtime-v5`）：核对预缓存清单与导航请求策略，确认文章更新后老访客不会被旧缓存挡住；发现问题修 sw.js 并升版本号（✅ 2026-11-12 完成审计：① 导航请求已是 network-first + cache 降级 + offline 兜底（sw.js:190-204），文章更新即时可见，无需改；② 预缓存 11 项逐个核对全部存在，addAll 原子性无风险；③ activate 会清理所有非当前版本缓存，旧缓存不会跨版本残留；④ 唯一清理：白名单移除主题作者遗留域名 huangxuan.me / yanshuu.io（本站无此二域资源），缓存策略无行为变化故不升版本号）
- [x] [基建] 文章结构化数据：BlogPosting JSON-LD（标题/日期/作者/描述），利于搜索引擎摘要（✅ 2026-11-12 完成：`_layouts/post.html` 顶部插入 schema.org BlogPosting——headline/datePublished/author/description(subtitle 降级 excerpt)/mainEntityOfPage/keywords(tags)，全部字段走 `jsonify` 防 JSON 注入；4 组样本模拟解析含引号冒号最坏情况全过，252 篇全量生效零插件）
- [x] [基建] 页面性能巡检：首屏图片 loading="lazy"、CDN 回退链路验证、无阻塞渲染资源清点（✅ 2026-11-12 完成巡检+修复：**真 bug**——footer.html 的 highlight.js 与样式表走 `http://`，HTTPS 站点混合内容被浏览器拦截，等于全站代码高亮从未加载过，改 https 并验证 CDN 可达 200；连带 weibo 链接升级 https；其余结论：模板层 img 仅小头像（头图走 CSS 背景，lazy 不适用），无阻塞渲染资源清点干净，SW 运行时缓存已覆盖第三方 CDN（cdnjs 在白名单），lazy 改造无实际收益不做）

## C. 阅读体验 · 博客本职

- [x] [体验] 文章页阅读时长 + 字数统计（Liquid 计算，纯模板实现）（✅ 2026-11-12 完成：post.html 正文顶部一行「📝 全文约 N 字 · 预计阅读 M 分钟」，`content | strip_html | strip_newlines | size` 计字符、400 字/分钟向上取整；252 篇全量模拟验证 0 篇异常，最长 3.4 万字 ≈85 分钟、最短 35 字 ≈1 分钟；不动共享 intro-header，改动范围限 post 布局）
- [x] [体验] TOC 目录启用（~~已核实：全站 0 篇使用 `catalog: true`，主题自带的目录机制形同虚设~~ **前述核实有误，本轮勘正**）：复查 post.html 与 hux-blog.min.js 确认——**TOC 对所有文章默认渲染**（仅 `no-catalog: true` 会关闭，全站 0 篇关闭），63 篇文章带 `catalog: true` 字段（冗余但无害），目录条目由 hux-blog.min.js 动态填充且已就位；结论：无需任何改动，此前的"0 篇"系统计口径错误（只统计了顶层 .md 且管道写错）
- [x] [体验] gitalk 评论实测（已核实：clientID 已配置）：访问一篇文章页确认评论框正常加载；加载失败则加降级提示，不留白（✅ 2026-11-12 完成：实测三层——① 配置五项齐全；② GitHub Issues API 查证历史评论 issue 正常存在，gitalk 本体工作正常；③ CDN `cdn.jsdelivr.net` 部分网络环境不可达（实测 000）→ gitalk.html 加降级：脚本 onerror 标记 + `window.Gitalk` 不存在时渲染「到 GitHub Issues 留言」提示，渲染后 JS node --check 通过；另注：clientSecret 在公开仓库中属于 gitalk 机制固有的暴露，建议作者知悉）
- [x] [体验] 文章代码块一键复制按钮（原生 JS，无外部依赖）（✅ 2026-11-12 完成：post.html 末尾 ~40 行原生 JS——遍历 .post-container 内 pre 块注入悬浮按钮（hover 显现），clipboard API + execCommand 双通道兜底，跳过 mermaid 图与重复注入，"复制→✅ 已复制"1.6s 回弹；样式跟随上轮对比度结论，全部内联 JS node --check 通过）
- [x] [体验] 全站图片巡检：alt 缺失清点、超大图片清单（只报告清单，不擅自重压缩二进制）（✅ 2026-11-12 完成：报告落 `docs/IMAGE_AUDIT_REPORT.md`——51 张 markdown 图：alt 缺失仅 1 张（本轮已文本修复）、引用缺失 0、超大图 5 张共 2.7MB 已列清单与压缩建议待作者择机处理，未动任何二进制）
- [x] [体验] 归档页年份锚点导航（年份索引条，点击跳转对应年份区）（✅ 2026-11-12 完成：archive.html 文章列表上方加年份索引条（sticky 吸顶，样式与站点一致），Liquid 从倒序文章流去重取年份；每个年份 section 加 `id="year-YYYY"` + `scroll-margin-top:60px` 防吸顶遮挡；模拟渲染锚点 2026/2025/2021/2020/2018 与文章年份精确一致，Liquid 五组标签全配对；索引条在 js-result 展示区外，不干扰标签过滤 JS）

## D. 共创 · 内容草稿（作者把关制）

> 例外记录：2026-11-12 作者**直接约稿** 5 篇企业管理方法论（OKR / SOP / 授权 / 复盘 / 人才梯队），按约稿要求写入 `_posts/`（直接约稿=作者把关前置，仍经 auto-opt 分支 review 后才上线）。

- [x] [共创] 5 篇工作台证据线文章草稿（挑 5 个最有故事的工作台：运维监控 / 增长分析 / 客户成功 / AI Agent 观测 / 财务驾驶舱，其余 10 个等作者需要时再说）：每轮最多 1 篇写入 `_drafts/`——按博客里真实存在的技术点展开（如 tags 治理、`where` 过滤推荐、ECharts 接入），不虚构效果数字（数据位留空标注 `<!-- 待补真实数据 -->`），**绝不进 `_posts/`**；5 篇草稿全部入库即完成（✅ 2026-11-12 完成，5 轮各 1 篇：ops-center-evidence / growth-analytics-evidence / crm-workbench-evidence / agent-observatory-evidence / finance-cockpit-evidence——五篇以「稳定→找钱→留住→控本→看全局」生命周期互链成网，内链已发布文章，全部待作者补真实数字后自行发布；队列主任务全部完成，后续从扩展候选取）

## 扩展候选（全部完成后从这里取）

- [x] [基建] CDN 抽查报告（`_config.yml` cdn_url 指向 vbank8-test OSS 测试桶，favicon 抽查 200 可达）：盘点 `_includes/asset.html` 的引用范围，抽验 10 个资源 URL 可达性，给出「测试桶失效时的应急预案」（只报告，不动配置）（✅ 2026-11-12 完成：报告落 `docs/CDN_AUDIT_REPORT.md`——12 个核心静态资源全经 asset.html 分发（head 2CSS+mermaid / footer 8JS），抽验 14 个 URL 全 200；应急回退=置空 cdn_url 自动走本地（机制已内建）；建议迁正式桶或用真实访问数据验证 CDN 收益，未动任何配置）
- [x] [体验] 站内搜索结果模板美化与关键词高亮（✅ 2026-11-12 完成：footer.html 的 SimpleJekyllSearch `templateMiddleware` 钩子内实现高亮——多词/正则元字符转义/单字符词跳过/HTML 防护（解码后含 `<` 的值跳过高亮防破损标记）+ 空结果中文化提示样式化；search.html 补 `<mark>` 与空态样式；6 组单测全过，渲染后 JS node --check 通过）
- [x] [体验] 深色模式适配巡检与截图对比（✅ 2026-11-12 完成核实并关闭：全量 grep `prefers-color-scheme` / `data-theme` / `theme-toggle` 于 css/（hux-blog.css、bootstrap.css 各 0 处）/js/_includes——**站点不存在暗色模式**，巡检对象不存在；自动化的新 UI（年份导航条、404 卡片）使用 `#fff` 亮色假设与全站一致，无遗留问题；新增暗色模式属主题级大工程，超出最小改动原则，是否要做留待作者决策，候选池不再保留此项）
- [x] [体验] 首页 Hero 区动态数字带（文章数 / 标签域 / 工作台数）（✅ 2026-11-12 完成：fde-hero 联系方式下方新增三格数字带——`site.posts.size` 篇文章 / `site.tags | size` 个规范标签 / 15 个在线工作台，Liquid 取真值零硬编码；原生 JS ease-out cubic 数字滚动 900ms，`prefers-reduced-motion` 直接显示终值；样式沿用 fde-hero 色系（白字+品牌红分隔点）；渲染后 JS node --check 通过，tag_guard PASS）
- [x] [物料] README 更新：站点定位一句话、目录结构、标签治理说明（链接 tools/TAG_MIGRATION.md）、auto-opt 协作流程说明（✅ 2026-11-12 完成：定位一句话+能力演示入口；目录结构补齐 _drafts/tools/docs/sitemap 等新产物；标签白名单与 CI 守门说明；auto-opt 分支工作流程图示；**顺带纠正两处过时信息**——许可证 MIT→实际 Apache 2.0（核对 LICENSE 文件）、功能特性里的 Disqus/网易云跟帖（实际 gitalk，已删除段落）；7 项断言全过含引用文件存在性）
- [x] [物料] 友情链接区更新（挂 zcode-tast-cms、zcode-workbench）（✅ 2026-11-12 完成：`_config.yml` friends 数组头部插入两个自有项目——FDE 工作台矩阵在线站 + zcode-tast-cms 仓库（链接 curl 验证 200），旧友链保持不动；ruby YAML 解析验证数组完整（13 条），site.url 红线未触碰）

## 扩展候选（补充于 2026-11-12 主队列清空后）

- [x] [体验] 文章 pager（上一篇/下一篇）移动端检查：长标题换行与点击区域，发现问题修（✅ 2026-11-12 完成：审计结论——点击区 `li > a width:100%` 已合格无需改；**长标题无截断**导致 ≤767px 时左右两块高低不齐 → 移动端媒体查询内给标题 span 加两行 clamp（`-webkit-line-clamp:2`）+ 加大点击 padding，桌面端不受影响；scope 锁死在 post.html 内联 style，不动主题 css）
- [x] [共创] 2026-06 视频复盘类文章补「AI 协作说明」第二批（AI飞轮/AI过渡窗口/能租就别买等 3 篇，同第一批纪律）（✅ 2026-11-12 完成：3 篇逐篇定制（飞轮结构提炼/窗口期判断/顾客思维框架取舍），首屏插入链接协作规范；全站累计 18 篇带说明块（第一批 10 + 本批 3 + 企业管理约稿 5），对账一致）
- [x] [物料] About 英文版（`_includes/about/en.md`）同步工作台矩阵入口（✅ 2026-11-12 完成：en.md「What I'm building」节末新增 "Live proof" 行——英文叙述的 Workbench Matrix ×15 入口，与 zh.md 版能力演示行对照；4 项断言全过，中文版零影响）
- [x] [基建] search.json 重量审计 + 404 页 noindex（✅ 2026-11-12 完成：① 嫌疑排查——search.json 是每页都加载的搜索数据源，实测仅含 title/subtitle/tags/url/date 五字段无全文（约几十 KB），健康无需改动；② 真缺口——404 页缺 `noindex`，head.html 按 `page.url == '/404.html'` 条件插入 `robots noindex, follow`（sitemap 已排除，此处兜底外链引用场景）；OG meta 核查确认主题已齐备 og:image 兜底）
- [x] [基建] 全站外链健康抽查（✅ 2026-11-12 完成：424 条唯一外链分层抽样 25 条——真死链 1 条已移除（solr.cc/blog/ 404，Middleware 老文资源清单，CRLF 保留）、反爬误报 3、本机网络误报 2、其余 20 条可达；报告落 `docs/LINK_AUDIT_REPORT.md`，附全量验证的 CI 化建议）
- [x] [体验] 侧栏精选标签阈值修复（新增于候选池并当轮完成）：实测 `featured-condition-size: 1` 使**全部 64 个标签**堆在每篇文章侧栏 FEATURED TAGS，「精选」名存实亡 → 阈值提到 10（侧栏收敛为 23 个真高频标签，语义与数量双恢复）；ruby YAML 解析验证，site.url 红线未触碰
- [x] [体验] media-ai-pages/ 孤儿子站审计（新增于候选池并当轮完成，✅ 2026-11-12：20 文件 200KB「媒体行业 AI 助手平台」方案子站，全仓零引用但 Pages 原样发布可直链访问；两个提醒——auth.js 为客户端密码（演示级保护）、零内部链接不可被发现；给作者三选一（保留挂入口/删除瘦身/移私有），报告落 `docs/MEDIA_AI_PAGES_AUDIT.md`，未动该目录任何文件）
- [x] [体验] `可复用提示词库.md` 孤儿页面复活（新增于候选池并当轮完成，✅ 2026-11-12：页面清点发现该文件**无 front matter**——Jekyll 当静态文件原样吐 markdown，9000 字提示词库没有 URL 不进导航；补 `layout: page` + title 三行 front matter，页面恢复渲染并自动回到导航栏，正文零改动）
- [x] [体验] offline.html 离线落地页完善（新增于候选池并当轮完成，✅ 2026-11-12：原页面头图之下完全空白，离线用户无路可走——对齐 404 卡片做法，加离线帮助卡（状态说明 + 🔄 重试按钮 + 🏠 回首页；首页与 offline.html 均在 SW 预缓存清单，离线点击真实可用，已核对 sw.js）；noindex 条件同步扩展至 offline 页；CTA 深蓝沿用对比度结论）
- [x] [体验] photo 相册页全链路核对（新增于候选池并当轮完成，✅ 2026-11-12：索引 photo.html.js（4 相册）→ 封面图 4/4 可达（作者自有 OSS 桶 jiatingshiguangxiangce）→ 中文文件名相册数据 CDN 可达（URL 编码正确）→ 详情页 photo/photo.html?name=… 4/4 返回 200；全链路健康，零改动）
- [x] [体验] photo 时间线封面图懒加载（新增于候选池并当轮完成，✅ 2026-11-12：巡检发现时间线 `<img>` 缺懒加载（alt 已有）；一行补 `loading="lazy" decoding="async"`；详情页 photo/photo.html 已自带 lazy 无需动，全站 101 张相册原图的加载路径核对完毕）
- [ ] [基建] master 合并上线后回访：确认 sitemap/robots/JSON-LD/搜索高亮在真实部署中的表现（需作者先合并 auto-opt → master；**本轮核实 master 仍停留 `e3af187`，未合并**，条目继续挂起）
