# CDN 资源抽查报告（2026-11-12）

> auto-opt 自动化产出。**只报告不改配置**——`_config.yml` 的 `cdn_url` 是否更换由作者决策。

## 一、现状

- `_config.yml` → `cdn_url: "https://vbank8-test.oss-cn-beijing.aliyuncs.com/wuxiumu.github.io"`（**测试桶**， bucket 名含 `test`）；
- 引用机制：`_includes/asset.html` 统一分发——`cdn_url` 有值走 CDN，为空则回退 `site.baseurl` 本地路径。**回退逻辑已内建**，切换成本低；
- 引用点盘点：`head.html`（2 CSS + mermaid JS）+ `footer.html`（8 JS）共 **12 个核心静态资源**全部经 CDN 分发；另有 intro-header 等图片经 `img.html` 助手（同逻辑）。

## 二、抽查结果（14/14 全过）

抽验 CDN 上 12 个核心 JS/CSS + 2 张代表性图片，全部 HTTP 200：

```
/css/bootstrap.min.css  /css/hux-blog.min.css  /js/mermaid.min.js
/js/jquery.min.js  /js/bootstrap.min.js  /js/hux-blog.min.js
/js/simple-jekyll-search.min.js  /js/snackbar.js  /js/sw-registration.js
/js/jquery.tagcloud.js  /js/archive.js  /js/jquery.nav.js
/img/home-bg.jpg  /img/avatar-wqb.jpg
```

## 三、风险与应急预案

| 风险 | 影响 | 应急动作 |
|---|---|---|
| 测试桶到期/欠费/被清理 | 全站 CSS/JS 加载失败（12 个资源全在 CDN 上） | **一条命令应急回退**：`_config.yml` 的 `cdn_url` 置空 → asset.html 自动回退本地路径（本地资源与 CDN 内容同源同版本） |
| CDN 域名被墙（部分地区） | 页面裸结构、无样式 | 同上，置空回退 |
| 桶内资源与仓库不同步 | 样式/脚本版本错乱 | 重新全量同步 `css/ js/ img/` 到桶，或直接回退 |

## 四、给作者的建议（按需执行）

1. **短期**：现状可用（14/14 可达），不急；
2. **中期**：把桶从 `vbank8-test` 迁到正式命名桶（或直接置空 `cdn_url` 用 GitHub Pages 本地资源——国内访问 GitHub Pages 本就时快时慢，CDN 的加速收益建议用真实访问数据验证后再定）；
3. **长期**：若保留 CDN，建议在 CI 里加「同步静态资源到桶」步骤，避免桶与仓库版本漂移。

> 本报告未改动 `_config.yml` 与任何代码（协议：需作者决策项为报告制）。
