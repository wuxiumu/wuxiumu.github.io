# 全站图片巡检报告（2026-11-12）

> auto-opt 自动化产出。**只报告不重压缩**——二进制修改由作者决定。

## 总览

| 指标 | 数值 | 结论 |
|---|---|---|
| 文章内 markdown 图片 | 51 张 | — |
| alt 缺失 | 1 张（已本轮修复） | 修复后 **0** |
| 引用但仓库缺失 | **0** | ✅ 无死图 |
| 超大图（>300KB） | 5 张 / 共 2.7MB | 见下表 |

## 超大图清单（建议作者择机压缩，不做强求）

| 文件 | 大小 | 建议 |
|---|---|---|
| `img/in-post/post-c-u-ali-team.png` | 898KB | PNG 截图转 JPEG 或 WebP 可减 60-80% |
| `img/blog-md-navbar.gif` | 782KB | GIF 转 MP4/WebM 嵌入可减 90%+ |
| `img/post-bg-css.jpg` | 410KB | 头图，压到 200KB 内肉眼无损 |
| `img/in-post/post-eleme-pwa/Architecture.png` | 349KB | 同首条 |
| `img/in-post/post-eleme-pwa/PRECACHE-future-routes.jpg` | 326KB | 同首条 |

> 注：前两张是主题遗留/老文章资源；新文章配图建议遵循「单图 <300KB，GIF 尽量不用」。

## 本轮已修复

- `_posts/2025-04-15-macOS本地化deepseek.md`：1 张外链图补 alt 文本（利于 SEO 与可访问性）。
