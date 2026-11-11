# auto-opt 分支产出盘点（44 轮 · 截至 2026-11-12）

> 供合并前 review 使用。**51 个 commit，215 文件，+2090/-589 行**，全部在 `auto-opt` 分支，master 未动一字。

## 一、结构性改动（影响全站，重点 review）

| 项 | 内容 | 风险 |
|---|---|---|
| 标签治理 | 351→64 个规范标签，173 篇文章 front matter 重写，映射表 `tools/migrate_tags.py` | 低（映射表可查，tag_guard 守门） |
| Archive 页 | 标签按 5 域分组可折叠 + Show All 角标注明篇数 + 年份吸顶锚点条 | 低（过滤 JS 未动） |
| 文章页 | 相关文章推荐（共享标签）/ 阅读时长 / 代码块复制 / JSON-LD / AI 协作说明（10+3 篇） | 低（增量插入） |
| 首页 | FDE 精选置顶区 + Hero 数字带（Liquid 真值 + 滚动动画） | 低 |
| About | 顶部 FDE 一页纸卡 + 英文版工作台入口 | 低 |
| 404 / offline | 重做为导航/帮助卡片（CTA 深蓝对比度 4.8:1） | 低 |
| SEO | sitemap.xml（252 URL）+ robots.txt + 404/offline noindex | 纯新增 |
| 搜索 | 关键词高亮（HTML 防护）+ 空态中文化 | 中（templateMiddleware 逻辑，6 组单测） |
| PWA | sw 白名单清理（缓存策略无变化） | 低 |
| 配置 | `featured-condition-size` 1→10（侧栏 64→23）+ 友链挂自有项目 ×2 + feed limit 10→50 | 低 |
| 页面复活 | `可复用提示词库.md` 补 front matter 回归导航 | 低 |

## 二、报告类产出（`docs/`，含待你决策项）

| 报告 | 待决策 |
|---|---|
| GA4_MIGRATION_REPORT | 三选一：GA4（需你给 `G-` ID）/ 百度统计 / 置空停用 |
| IMAGE_AUDIT_REPORT | 5 张超大图（2.7MB）是否压缩 |
| CDN_AUDIT_REPORT | 测试桶是否迁正式桶或置空回退 |
| LINK_AUDIT_REPORT | （真死链 1 已修，无需决策） |
| MEDIA_AI_PAGES_AUDIT | `media-ai-pages/` 三选一：挂入口 / 删除 / 移私有 |

## 三、内容产出

- **企业管理方法论 ×5**（你直接约稿，`_posts/`）：OKR / SOP / 授权 / 复盘 / 人才梯队——mermaid 图文 + 内链 + SEO 标题副题
- **工作台证据线草稿 ×5**（`_drafts/`，未发布）：运维 / 增长 / 客户成功 / Agent 观测 / 财务——**效果数字留占位待你填真实值**

## 四、合并前待办（作者清单）

1. ☐ Review 本清单 → 合并 `auto-opt` → `master`（触发部署）
2. ☐ 部署后提交 sitemap 到 Google Search Console
3. ☐ 5 篇 `_drafts/` 填真实数字后自行发布
4. ☐ 5 份 `docs/` 报告中的决策项逐个拍板
5. ☐ （可选）GA4 ID 提供给自动化执行替换

## 五、验证基线

每轮均通过：`tools/tag_guard.py`（257 篇 / 64 标签 ≤150）· 液态模板配对断言 · JS `node --check` · 红线核查（master/CNAME/url/site.posts 未触碰）。红线条目在 [OPTIMIZATION_ROADMAP.md](../OPTIMIZATION_ROADMAP.md) 顶部。
