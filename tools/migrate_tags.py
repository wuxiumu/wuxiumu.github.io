#!/usr/bin/env python3
"""标签治理迁移：351 个碎片标签 → ~65 个规范标签。

规则：
1. SEEDS：使用频率 >= 3 的骨干标签（保留为规范标签，个别改名见 CANON_ALIAS）；
2. CLUSTER：其余标签逐个映射到规范标签；
3. 映射后去重；单篇文章若映射后标签为空，保留原第一个标签并在报告中提示。
用法：
  python3 migrate_tags.py /path/to/repo --dry-run   # 只看结果不动文件
  python3 migrate_tags.py /path/to/repo --apply     # 落盘
"""
import sys, os, re, json

# ---------- 规范标签（最终保留集合）由 SEEDS + CLUSTER 键构成 ----------

# 骨干标签：频率 >= 3，直接保留
SEEDS = {
    "AI加速", "AI协同开发", "AI", "php", "算法", "一人公司", "工具", "提示词模板",
    "产品思维", "终身成长", "规划", "认知升级", "极简创业", "数据库", "Redis",
    "AI编程", "个人成长", "方法论", "Agent", "产品", "Python", "读书笔记",
    "知识库", "大模型", "智能体", "MySql", "思维模型", "互联网边缘搬砖研究院",
    "组织变革", "知识管理", "领导力", "管理", "网络", "Palantir", "FDE", "知识",
    "创业", "教育", "效率提升", "Prompt工程", "AI智能体", "Golang", "内容创作", "孙宇晨",
}

# 骨干标签改名（拼写规范 / 命名统一）
CANON_ALIAS = {
    "AI加速": "AI",            # 主 AI 标签统一为 "AI"
    "AI协同开发": "AI协作",
    "提示词模板": "提示词工程",
    "Prompt工程": "提示词工程",
    "智能体": "Agent",
    "AI智能体": "Agent",
    "MySql": "MySQL",
    "知识库": "知识管理",
    "知识": "知识管理",
    "产品": "产品思维",
    "领导力": "团队管理",
    "管理": "团队管理",
    "创业": "极简创业",
    "AI编程": "AI编程",
}

# 聚类映射：其余标签 → 规范标签。值不在最终集合里的会再经 CANON_ALIAS 折叠。
CLUSTER = {
    # --- AI 大类 ---
    "AI浪潮": "AI", "AI趋势": "AI", "AI行业趋势": "AI", "AI技术": "AI",
    "AI技能": "AI", "AI工程": "AI", "AI地缘政治": "AI", "AI治理": "AI",
    "未来趋势": "AI", "推理时代": "AI",
    "AI工作流": "AI协作", "AI工具": "AI协作", "人机协作": "AI协作",
    "人机分工": "AI协作", "Agentic AI": "AI协作", "AI协作": "AI协作",
    "事实核对": "AI协作",
    "Cursor": "AI编程", "Codex": "AI编程", "Qoder": "AI编程",
    "编程助手": "AI编程", "VibeCoding": "AI编程", "开发民主化": "AI编程",
    "AI架构": "AI编程",
    "AI落地": "AI落地", "企业AI落地": "AI落地", "企业转型": "AI落地",
    "AI商业化": "AI落地", "行业OS": "AI落地", "dify": "AI落地", "自动化": "AI落地",
    "多智能体协作": "Agent", "语音Agent": "Agent", "Agent工程": "Agent",
    "Agent工程师": "Agent", "Agent最佳实践": "Agent", "DeepAgents": "Agent",
    "长任务架构": "Agent", "状态机": "Agent",
    "提示词优化": "提示词工程", "Context工程": "提示词工程", "上下文管理": "提示词工程",
    "Function Calling": "提示词工程", "函数调用": "提示词工程",
    "长期记忆": "提示词工程", "高级技巧": "提示词工程", "提取结构": "提示词工程",
    "RAG": "RAG", "检索增强": "RAG", "检索增强生成": "RAG",
    "LLM评估": "大模型", "deepseek": "大模型", "ollama": "大模型",
    "chatbox": "大模型", "OpenAI": "大模型", "Anthropic": "大模型",
    "Claude": "大模型", "Whisper": "大模型",
    # --- 半导体 / 行业观察 ---
    "存储超级周期": "半导体", "HBM": "半导体", "DRAM": "半导体",
    "半导体周期": "半导体", "Token资本": "半导体",
    # --- 后端 / 基础设施 ---
    "SQL": "数据库", "数据建模": "数据库", "数据库与数据分析": "数据库",
    "索引": "数据库", "优化": "数据库", "优化策略": "数据库",
    "Go": "Golang", "GO": "Golang",
    "PHP": "php",
    "Node.js": "后端开发",
    "小程序开发": "移动端开发", "Flutter": "移动端开发",
    "互联网": "网络",
    "运维DevOps": "运维", "运维": "运维", "IaC": "运维", "生产变更": "运维",
    "安全": "安全", "安全编码": "安全", "OWASP": "安全", "密钥管理": "安全",
    "隐私政策": "安全", "隐私计算": "安全",
    "架构师": "架构设计", "系统设计": "架构设计", "组件设计": "架构设计",
    "技术选型": "架构设计", "系统整合": "架构设计",
    "Middleware": "架构设计", "Distributed": "架构设计",
    "测试QA": "测试QA", "自动化测试": "测试QA", "性能测试": "测试QA",
    "质量保障": "测试QA",
    "Code Review": "研发规范", "研发规范": "研发规范", "技术文档": "研发规范",
    "文档工程": "研发规范", "版本控制": "研发规范", "技术笔记": "研发规范",
    "法务合规": "法务合规", "合同审查": "法务合规", "上架合规": "法务合规",
    "开源许可证": "法务合规",
    # --- 工具 ---
    "mac": "工具", "苹果": "工具", "jq": "工具", "环境配置": "工具",
    "命令": "工具", "Obsidian": "工具",
    # --- 数据 ---
    "数据架构": "数据库", "数据分析": "数据分析", "指标分析": "数据分析",
    "数据治理": "数据分析", "数据科技": "数据分析", "Ontology": "Palantir",
    # --- 商业 / 创业 ---
    "商业逻辑": "商业思维", "商业洞察": "商业思维", "商业模式": "商业思维",
    "护城河": "商业思维", "价值定位": "商业思维", "价值创造": "商业思维",
    "品牌溢价": "商业思维", "赚钱逻辑": "商业思维", "杠杆思维": "商业思维",
    "ToB": "商业思维", "中国ToB": "商业思维", "获客策略": "商业思维",
    "市场增长": "商业思维", "增长实验": "商业思维", "投放优化": "商业思维",
    "SEO": "商业思维", "A/B测试": "商业思维", "实验设计": "商业思维",
    "飞轮效应": "商业思维", "业务循环": "商业思维",
    "AI创业": "极简创业", "媒体创业": "极简创业", "副业": "极简创业",
    "兴趣变现": "极简创业", "超级个体": "极简创业", "融资": "极简创业",
    "风投": "极简创业", "表达自由": "内容创作",
    "财富增长": "财富思维", "财富思维": "财富思维", "财富自由": "财富思维",
    "投资心法": "财富思维", "投资哲学": "财富思维", "复利效应": "财富思维",
    "消费观": "财富思维", "消费心理": "财富思维", "消费主义": "财富思维",
    "社会分配": "财富思维", "共同富裕": "财富思维",
    # --- 产品 / 设计 ---
    "产品经理": "产品思维", "需求分析": "产品设计", "PRD": "产品设计",
    "产品设计": "产品设计", "智能交互": "产品设计", "AI设计": "产品设计",
    "思维设计": "产品设计", "设计系统": "产品设计", "视觉设计": "产品设计",
    "UIUX设计": "产品设计", "用户体验": "产品设计",
    # --- 组织 / 管理 ---
    "AI组织变革": "组织变革", "AI组织": "组织变革", "组织进化": "组织变革",
    "团队管理": "团队管理", "团队建设": "团队管理", "团队": "团队管理",
    "项目管理": "团队管理", "容错文化": "团队管理", "小公司管理": "团队管理",
    "人才战略": "人才招聘", "人才策略": "人才招聘", "招聘策略": "人才招聘",
    "小公司招聘": "人才招聘",
    "企业战略": "企业战略",
    "AI客服": "客服", "客服": "客服",
    # --- 成长 / 认知 ---
    "组件化开发": "架构设计", "模块化开发": "架构设计", "概念": "架构设计",
    "认知觉醒": "认知升级", "认知思维": "认知升级", "认知模型": "认知升级",
    "认知境界": "认知升级", "心智模型": "思维模型", "思维框架": "思维模型",
    "反直觉思维": "思维模型", "逆向思维": "思维模型", "最优解": "思维模型",
    "决策思维": "思维模型", "决策前置": "思维模型", "决策系统": "思维模型",
    "决策窗口": "思维模型", "战略思维": "思维模型", "正反馈": "思维模型",
    "自我提升": "个人成长", "成长": "个人成长", "男性成长": "个人成长",
    "五种爱好": "个人成长", "能动性": "个人成长", "人生破局": "个人成长",
    "核心能力": "个人成长", "能力": "个人成长", "能力杠杆": "个人成长",
    "能力模型": "个人成长", "女性创造力": "个人成长", "形象管理": "个人成长",
    "习惯": "习惯养成", "好习惯": "习惯养成", "微习惯": "习惯养成",
    "习惯养成": "习惯养成", "自律": "习惯养成",
    "自我管理": "个人成长",
    "职场": "职业发展", "职场智慧": "职业发展", "职场变革": "职业发展",
    "职业规划": "职业发展", "职业发展": "职业发展", "职业选择": "职业发展",
    "跳槽策略": "职业发展", "面试": "职业发展", "公务员": "职业发展",
    "岗位全景": "职业发展", "工程师定义": "职业发展", "Coworker": "职业发展",
    "全栈开发": "职业发展",
    "时间管理": "效率提升", "会议效率": "效率提升", "效率": "效率提升",
    "工作流": "效率提升",
    "沟通": "沟通表达", "人际沟通": "沟通表达", "表达力": "沟通表达",
    "社交": "沟通表达", "职场沟通": "沟通表达",
    "最佳实践": "方法论", "实践指南": "方法论", "日报方法论": "方法论",
    "避坑指南": "方法论", "急救指南": "方法论", "认真做": "方法论",
    "目标管理": "效率提升",
    "学习路线图": "规划", "通才培养": "规划", "技能提升": "规划",
    # --- 读书 / 人文 / 心理 ---
    "电影分析": "读书笔记", "豆豆三部曲": "读书笔记", "天幕红尘": "读书笔记",
    "见路不走": "读书笔记", "毛选": "读书笔记", "王晶": "读书笔记",
    "小成本电影": "读书笔记", "叙事结构": "读书笔记", "断章取义": "读书笔记",
    "人文素养": "人生智慧", "历史智慧": "人生智慧", "处世智慧": "人生智慧",
    "人生智慧": "人生智慧", "人性哲学": "人生智慧", "权力博弈": "人生智慧",
    "生存哲学": "人生智慧", "导航者": "人生智慧", "阶层分析": "人生智慧",
    "心理学": "心理学", "心理": "心理学", "心理边界": "心理学",
    "情绪管理": "心理学", "行为心理学": "心理学", "脑科学": "心理学",
    "大脑开发": "心理学",
    "潜能教育": "教育",
    "马斯克": "人物观察", "纳德拉": "人物观察",
    "内容运营": "内容创作", "自媒体": "内容创作",
    "系列导航": "知识管理", "MOC": "知识管理", "第二大脑": "知识管理",
    "知识汇总": "知识管理", "故事案例": "读书笔记",
    "福特主义": "财富思维",
    "G7": "AI", "宾夕法尼亚大学": "教育", "工业革命": "AI",
    "执行力": "个人成长", "技术发布": "大模型", "效率重塑": "效率提升",
    "极简生活": "个人成长", "语音识别": "大模型", "财富": "财富思维",
    "问题解决": "方法论",
    # --- 其余噪音，直接删除 ---
    "基础": None, "底层": None,
}

def canon(tag):
    """tag -> 规范标签；None 表示删除"""
    if tag in CLUSTER:
        c = CLUSTER[tag]
    elif tag in SEEDS:
        c = tag
    else:
        c = tag  # 未映射的骨干标签原样保留（理论上不应出现）
    if c is None:
        return None
    return CANON_ALIAS.get(c, c)

FM_RE = re.compile(r'^(---[ \t]*\r?\n)(.*?)(\r?\n---)', re.S)
TAGS_RE = re.compile(r'^tags[ \t]*:[ \t]*(.*)$', re.M)

def parse_tags(fm_text):
    m = TAGS_RE.search(fm_text)
    if not m:
        return []
    inline = m.group(1).strip()
    tags = []
    if inline and not inline.startswith('-'):
        return [t.strip().strip('"\'') for t in inline.strip('[]').split(',') if t.strip()]
    if inline.startswith('-'):
        tags.append(inline[1:].strip().strip('"\''))
    for tm in re.finditer(r'^[ \t]+-[ \t]*(.+?)[ \t]*$', fm_text[m.end():], re.M):
        tags.append(tm.group(1).strip('"\''))
    return [t for t in tags if t and t != 'tags:']

def render_tags_block(tags, indent="  "):
    return "tags:\n" + "".join(f"{indent}- {t}\n" for t in tags)

def replace_tags_block(fm_text, new_tags):
    m = TAGS_RE.search(fm_text)
    # 找到 tags 块的结束行：连续的列表项行
    lines = fm_text.splitlines(keepends=True)
    start = next(i for i, l in enumerate(lines) if re.match(r'^tags[ \t]*:', l))
    end = start + 1
    while end < len(lines) and re.match(r'^[ \t]+-[ \t]', lines[end]):
        end += 1
    eol = "\r\n" if lines[start].endswith("\r\n") else "\n"
    # 原最后一条 tag 行若自带行尾换行则保留，否则块尾不加换行（避免在 --- 前多出空行）
    last_had_eol = lines[end - 1].endswith("\n")
    parts = ["tags:" + eol] + [f"  - {t}{eol}" for t in new_tags]
    if not last_had_eol:
        parts[-1] = parts[-1].rstrip("\r\n")
    return "".join(lines[:start]) + "".join(parts) + "".join(lines[end:])

def main():
    root = sys.argv[1]
    apply = "--apply" in sys.argv
    posts_dir = os.path.join(root, "_posts")
    changed, empty_after = [], []
    before_tags, after_tags = set(), set()
    for dirpath, _, files in os.walk(posts_dir):
        for f in files:
            if not f.endswith((".md", ".markdown")):
                continue
            path = os.path.join(dirpath, f)
            # newline="" 保留原行尾（CRLF/LF 混用时不会被 Python 统一改写）
            text = open(path, encoding="utf-8", newline="").read()
            fm = FM_RE.match(text)
            if not fm:
                continue
            fm_text = fm.group(2)
            orig = parse_tags(fm_text)
            new = []
            for t in orig:
                c = canon(t)
                before_tags.add(t)
                if c and c not in new:
                    after_tags.add(c)
                    if c not in new:
                        new.append(c)
            if not orig or new == orig:
                # 无变化（含本来就没有 tags 的文件）
                if not orig:
                    empty_after.append((os.path.relpath(path, posts_dir), orig, new))
                continue
            if not new:
                empty_after.append((os.path.relpath(path, posts_dir), orig, new))
            changed.append((path, orig, new))
            if apply:
                new_fm = replace_tags_block(fm_text, new)
                text = text[:fm.start(2)] + new_fm + text[fm.end(2):]
                open(path, "w", encoding="utf-8", newline="").write(text)

    print(f"模式: {'APPLY' if apply else 'DRY-RUN'}")
    print(f"改动文件数: {len(changed)}")
    print(f"唯一标签: {len(before_tags)} -> {len(after_tags)}")
    print(f"映射后为空的文章: {len(empty_after)}")
    for p, o, n in empty_after:
        print(f"  [空] {p}: {o} -> {n}")
    print("\n--- 最终标签集 ---")
    for t in sorted(after_tags):
        print(" ", t)
    if apply:
        json.dump(sorted(after_tags), open("/tmp/blog-tools/final_tags.json", "w"), ensure_ascii=False, indent=1)

if __name__ == "__main__":
    main()
