# 吴庆宝的个人博客

> 路漫漫其修远兮，吾将上下而求索。

🌐 在线地址：[https://wuxiumu.github.io](https://wuxiumu.github.io)

## 项目简介

这是一个基于 **[Jekyll](https://jekyllrb.com/)** 构建的个人技术博客，托管于 [GitHub Pages](https://pages.github.com/)。主题基于 [Hux Blog](https://github.com/Huxpro/huxpro.github.io) 二次开发。

博主 **吴庆宝**（@wuxiumu），十年全栈工程师，博客内容涵盖：

- **后端开发**：PHP (Laravel/Swoole)、Golang (Gin/gRPC)、Node.js、Java
- **前端开发**：Vue 2/3、React、TypeScript、Vite、小程序
- **基础设施**：MySQL、Redis、Docker、K8s、CI/CD、监控
- **AI / LLM**：Agent 开发、RAG、Prompt Engineering、Dify、Cursor
- **架构与安全**：微服务、DDD、JWT/OAuth2、性能调优

## 快速开始

### 环境要求

- [Ruby](https://www.ruby-lang.org/en/) (≥ 2.7)
- [Bundler](https://bundler.io/)
- [Jekyll](https://jekyllrb.com/)

### 安装 & 运行

```bash
# 1. 安装依赖
bundle install

# 2. 本地启动开发服务器，访问 http://localhost:4000
bundle exec jekyll serve
```

### 创建新文章

```bash
rake post title="文章标题" subtitle="副标题"
```

生成的文件位于 `_posts/` 目录，Markdown 格式，包含 Jekyll Front Matter。

## 目录结构

```
├── _config.yml          # Jekyll 站点配置
├── _posts/              # 博客文章（按日期命名）
├── _includes/           # 可复用 HTML 片段（导航、页脚、侧栏等）
├── _layouts/            # 页面模板
├── css/                 # 样式文件（Less 编译输出）
├── less/                # Less 源码
├── js/                  # 前端脚本
├── img/                 # 图片资源
├── knowledge.markdown   # 全栈知识地图
├── package.json         # Node 依赖（Grunt 任务）
├── Gemfile              # Ruby 依赖
└── Rakefile             # Rake 任务（生成文章模板）
```

## 功能特性

- 响应式设计，移动端适配
- 侧边栏 & 标签云
- 文章目录（TOC）自动生成
- 代码语法高亮（Rouge）
- 站内搜索
- 分页浏览
- PWA 支持（Service Worker）
- Disqus 评论 / 网易云跟帖
- Google Analytics & 百度统计
- MathJax 公式渲染

## 开发

```bash
# 开发模式（监听 Less 变动 + Jekyll 热更新）
npm run dev
```

## 部署

推送到 `master` 分支即可，GitHub Pages 自动构建发布。

```bash
git push origin master
```

## 许可证

[MIT License](LICENSE)
