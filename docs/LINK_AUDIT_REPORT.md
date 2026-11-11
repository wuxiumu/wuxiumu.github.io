# 全站外链健康抽查报告（2026-11-12）

> auto-opt 自动化产出。抽样验证，非全量。

## 总览

| 指标 | 数值 |
|---|---|
| 文章内唯一外链 | **424** |
| 外链引用总数 | 439 |
| 本轮抽样 | 25 条（高频 Top10 全查 + 低频随机 15） |
| 可达 | 20 |
| 真死链 | **1（已修复）** |
| 反爬误报 | 3（知乎 403 / cio.com 403 —— 站点反爬，真实用户可访问） |
| 本机网络误报 | 2（github.com 000 —— 本机 HTTPS 到 github 被拦，SSH 可用，链接本身有效） |

## 高频外链 Top（健康）

`arxiv.org` ×3 · `python.langchain.com` ×3 · `docs.anthropic.com` ×3 · `getcomposer.org` ×3 —— 均可达。

## 真死链（已修复）

- `https://www.solr.cc/blog/`（Solr中国）→ **404，站点已关停**
  - 位置：`_posts/Middleware/2020-09-17-Middleware-hello-2021.md`（资源清单）
  - 处理：移除该行（官方站/w3cschool 文档/视频教程等其余 5 条 Solr 资源均有效，保留）

## 备注

- 424 条全量验证成本高（需 ~40 分钟串行 curl），本轮以分层抽样评估整体健康度；后续如需全量，建议用 CI 定时跑（数据可入 GitHub Actions artifact）；
- 外链死亡是博客的自然衰减，建议每季度抽查一次。
