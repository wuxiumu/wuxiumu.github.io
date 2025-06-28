[
  {
    "id": 1,
    "title": "智能内容管理系统（CMS）",
    "category": "web",
    "categoryName": "企业建站",
    "image": "https://picsum.photos/id/26/800/600",
    "description": "为多个中小企业和自媒体定制开发的CMS系统，支持多端内容发布、Markdown编辑、权限管理、数据备份和搜索引擎友好优化。",
    "technologies": ["PHP7.4", "Vue3", "MySQL", "Redis", "Composer", "JWT"],
    "details": "项目采用PHP自研高性能接口服务，前端Vue3+ElementPlus。支持文章标签、分类、评论、点赞、附件上传等模块。实现了基于Redis的缓存与消息队列，大幅提升高并发下的响应速度。支持自定义站点配置和多语言。项目部署自动化（Git+WebHook+容器），显著提升运维效率。"
  },
  {
    "id": 2,
    "title": "域名/服务器/站点一体化管理平台",
    "category": "web",
    "categoryName": "运维管理",
    "image": "https://picsum.photos/id/160/800/600",
    "description": "一站式管理平台，涵盖域名、服务器、网站、流量/IP统计、SSL到期提醒、资源分组与批量运维。",
    "technologies": ["Go", "PHP", "Vue3", "MySQL", "Redis", "Docker"],
    "details": "后端Go实现流量埋点服务，PHP负责业务管理与API，前端Vue3自适应大屏。支持多租户、权限细分、资源关联。高并发数据采集采用Golang原生协程与Redis异步队列。流量统计与安全风控支持自定义规则和告警推送。产品已在实际项目落地，实现数十万数据点稳定采集。"
  },
  {
    "id": 3,
    "title": "AI GPT 智能助手平台（php-gpt-assistant）",
    "category": "ai",
    "categoryName": "AI 应用",
    "image": "https://picsum.photos/id/170/800/600",
    "description": "基于大模型（GPT）与自研接口，打造一站式AI问答、代码生成和文档批量处理SaaS服务。",
    "technologies": ["PHP", "OpenAI API", "Vue3", "Redis", "WebSocket"],
    "details": "实现用户自助绑定API Key、上下文管理、多模型接入（如通义千问等）、任务队列与WebSocket实时推送。内置AI内容生成、批量文本处理、知识库导入。架构支持API限流、用户自定义Prompt和权限分级。项目开源并获开发者社区关注。"
  },
  {
    "id": 4,
    "title": "JetJob 分布式任务调度系统",
    "category": "web",
    "categoryName": "后台工具",
    "image": "https://picsum.photos/id/184/800/600",
    "description": "自研Go+PHP混合架构的定时/异步任务调度平台，适配多语言worker，支持节点健康监控和WebSocket实时日志。",
    "technologies": ["Golang", "PHP", "Redis", "WebSocket", "MySQL", "Docker"],
    "details": "系统支持节点动态注册、健康检查、任务分发和优雅重试，WebSocket 实时推送日志到前端，API 全部 JWT 鉴权。广泛用于定时同步、批量邮件、文件清洗等场景。"
  },
  {
    "id": 5,
    "title": "教育SaaS - 学生成长/德育评价系统",
    "category": "app",
    "categoryName": "教育产品",
    "image": "https://picsum.photos/id/201/800/600",
    "description": "面向中小学打造的SaaS云平台，涵盖学生请假、德育评价、成长档案等刚需场景，一站式助力数字校园。",
    "technologies": ["Laravel", "Vue3", "MySQL", "Redis", "阿里云OSS"],
    "details": "负责系统整体架构和核心模块开发，前端响应式支持PC和移动端。支持多学校、多角色权限，家校互动，德育评价灵活配置，成长档案图片/视频一键归档，数据安全合规。"
  },
  {
    "id": 6,
    "title": "B站/视频号自动化工具",
    "category": "automation",
    "categoryName": "自动化脚本",
    "image": "https://picsum.photos/id/241/800/600",
    "description": "使用PyQt和PyAutoGUI自研视频互动自动化工具，实现批量点赞、定时任务、智能鼠标路径模拟。",
    "technologies": ["Python", "PyQt", "PyAutoGUI", "Tkinter"],
    "details": "主要支持视频号/B站等平台批量自动点赞和定时交互。界面可视化、支持自定义任务队列、自动位置识别。已服务个人内容增长和企业账号运营降本增效。"
  }
,  {
    "id": 7,
    "title": "多商户B2B2C商城系统",
    "category": "ecommerce",
    "categoryName": "商城电商",
    "image": "https://picsum.photos/id/299/800/600",
    "description": "自主设计开发的多商户商城平台，支持入驻、分佣、拼团、秒杀、分销等核心电商功能，支持支付/物流/订单全流程。",
    "technologies": ["PHP", "Golang", "Vue3", "MySQL", "Redis", "RabbitMQ", "支付宝/微信支付SDK"],
    "details": "系统后端采用PHP+Go混合架构，订单/交易模块Go编写确保高并发稳定，PHP负责后台和CMS管理。内置权限体系、商家入驻、商品多规格、营销活动、库存管理、售后、数据大屏。对接微信/支付宝/物流等主流API，支持多终端响应式。已为多家企业定制上线。"
  },
  {
    "id": 8,
    "title": "企业级内容营销与智能分发平台",
    "category": "marketing",
    "categoryName": "内容营销",
    "image": "https://picsum.photos/id/233/800/600",
    "description": "帮助企业自媒体自动采集、分发内容到多平台，并智能分析数据，提升内容曝光与营销转化。",
    "technologies": ["PHP", "Golang", "Vue3", "Elasticsearch", "MySQL", "Kafka", "AI-NLP"],
    "details": "项目支持一键同步微信公众号、知乎、头条号等，定时采集热文并智能摘要。AI模块做内容分类和热点推荐。集成数据统计大屏，自动生成内容报告。支持自定义分发规则、敏感词过滤和批量账号管理，显著提升企业内容团队生产力。"
  },
  {
    "id": 9,
    "title": "医院设备与耗材智能管理平台",
    "category": "medical",
    "categoryName": "医院管理",
    "image": "https://picsum.photos/id/391/800/600",
    "description": "服务于多家三甲医院的设备/耗材全流程管理系统，实现采购、领用、维修、报废、库存、台账、报警等闭环数字化管理。",
    "technologies": ["PHP", "Vue3", "MySQL", "Redis", "物联网(IoT)", "微信小程序"],
    "details": "支持科室、设备、耗材多层级管理和数据权限分隔，集成条码/RFID设备扫码。设备全生命周期监控，自动生成台账和预警，定制报表。移动端小程序辅助科室随时扫码领用/报修，提升医院管理效率。已在多家医院投入实际使用。"
  }
  ,
  {
    "id": 10,
    "title": "无人机社区与航拍内容平台",
    "category": "community",
    "categoryName": "无人机社区",
    "image": "https://picsum.photos/id/184/800/600",
    "description": "专注于无人机爱好者的社区平台，集航拍作品分享、飞手互动、设备交流和赛事活动于一体。",
    "technologies": ["PHP", "Vue3", "MySQL", "OSS", "WebSocket", "FFmpeg"],
    "url": "",
    "details": "平台支持航拍图片/视频上传、转码和云端存储，支持多分辨率预览和分享。社区模块有实时私信、话题讨论、赛事报名等。后台支持内容审核、举报机制，保障社区氛围。已聚集数千名航拍爱好者，线上线下活动活跃。"
  },
  {
    "id": 11,
    "title": "在线智能客服与点餐系统（西安面馆）",
    "category": "ai",
    "categoryName": "智能客服",
    "image": "https://picsum.photos/id/355/800/600",
    "description": "为西安连锁面馆开发的智能客服与在线点餐平台，AI自动回复、点餐、支付和门店自助管理一体化。",
    "technologies": ["PHP", "OpenAI API", "Vue3", "微信支付", "LBS定位"],
    "url": "",
    "details": "接入AI客服（FAQ、引导、投诉），提升顾客体验。点餐系统支持桌号扫码下单、微信支付、菜品库存、分店管理。后台实时查看订单和客户评价，大幅提升门店运营效率。"
  },
  {
    "id": 12,
    "title": "无人咖啡机优惠券小程序",
    "category": "app",
    "categoryName": "小程序",
    "image": "https://picsum.photos/id/463/800/600",
    "description": "针对无人咖啡机开发的微信小程序，用户扫码下单、自动领取优惠券和积分，实时促销与设备状态监控。",
    "technologies": ["微信小程序", "PHP", "Redis", "物联网(IoT)", "支付宝支付"],
    "url": "",
    "details": "用户通过小程序扫码，自动定位设备，领取专属优惠券。系统对接物联网平台，实时获取设备状态和饮品库存。支持积分兑换、促销推送和多种支付方式。后台数据大屏监控运营情况。"
  },
  {
    "id": 13,
    "title": "K12智能作业与家校互动平台",
    "category": "education",
    "categoryName": "智慧教育",
    "image": "https://picsum.photos/id/517/800/600",
    "description": "服务于K12阶段师生的智能作业批改、错题本、家校互动、家长通知和成长档案管理系统。",
    "technologies": ["Laravel", "Vue3", "MySQL", "Redis", "AI批改"],
    "url": "",
    "details": "平台自动采集学生作业数据，支持AI智能批改和错题归纳。教师端可一键下发作业、分析成绩，家长端推送通知与成长评语。成长档案自动归档并支持图片、视频资料上传，便于后续追溯。"
  }
]