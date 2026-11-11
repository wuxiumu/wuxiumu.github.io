# GA 统计现状与 GA4 替换方案（报告 · 未改动任何代码）

> 2026-11-12 由 auto-opt 自动化产出。**结论先行：站点统计自 2023 年 7 月起就没有在收集任何数据**，修复需要作者提供一个 GA4 衡量 ID（`G-XXXXXXXXXX`）。

## 1. 现状核实

| 项 | 事实 |
|---|---|
| 配置位置 | `_config.yml:90` → `ga_track_id: 'UA-129669984-1'` |
| 加载位置 | `_includes/footer.html:148-160`，条件 `{% if site.ga_track_id %}`，用 `ga()` 命令队列加载 `google-analytics.com/analytics.js` |
| 失效原因 | `UA-*` 是 Universal Analytics 属性，Google 已于 **2023-07-01 停止处理数据**（标准属性），`analytics.js` 库也随之停用。当前页面照常发起请求，但**数据不被记录** |
| 影响 | 访问量统计为零已约 3 年；脚本本身仍随每个页面加载（一个小请求的浪费） |

## 2. 三个选项（作者二选一）

### 方案 A：升级 GA4（推荐，5 分钟）
1. 在 [Google Analytics](https://analytics.google.com) 创建 GA4 属性，得到衡量 ID `G-XXXXXXXXXX`；
2. 把 ID 发给自动化/或自行修改 `_config.yml`：
   ```yaml
   ga_track_id: 'G-XXXXXXXXXX'   # GA4 衡量 ID
   ```
3. 把 `_includes/footer.html:148-160` 的 `ga()` 代码块替换为 gtag.js 片段（一次性改动，约 10 行）。

### 方案 B：换成百度统计（国内访客为主时更准）
- 已核实 `_config.yml` 当前**没有**百度统计配置项——需新增一行 `baidu_analysis: '<site id>'` 并在 `footer.html` 加对应的 `hm.js` 代码块（改动量与方案 A 相当）。

### 方案 C：不做统计
- 把 `_config.yml` 的 `ga_track_id` 置空即可——`{% if site.ga_track_id %}` 会自动停止加载脚本，顺带减一个无效请求。

## 3. 红线说明

- 本次只产出报告，**未改动 `_config.yml` 与 `footer.html`**（协议：需作者决策项为报告制）；
- 作者提供 GA4 ID 后，可交给 auto-opt 下一轮执行方案 A 的代码改动（改动范围：`_config.yml` 1 行 + `footer.html` 1 个代码块）。
