#!/usr/bin/env python3
"""标签数量守门：扫描 _posts front matter，唯一标签数超过阈值则退出码 1。

纯标准库实现，CI 与本地均可直接运行：
  python3 tools/tag_guard.py            # 阈值默认 150
  python3 tools/tag_guard.py --max 60   # 自定义阈值
"""
import sys, os, re
from collections import Counter

MAX_TAGS = 150
POSTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "_posts")
FM_RE = re.compile(r'^---[ \t]*\r?\n(.*?)\r?\n---', re.S)
TAGS_RE = re.compile(r'^tags[ \t]*:[ \t]*(.*)$', re.M)


def parse_tags(fm_text):
    m = TAGS_RE.search(fm_text)
    if not m:
        return []
    inline = m.group(1).strip()
    if inline and not inline.startswith('-'):
        return [t.strip().strip('"\'') for t in inline.strip('[]').split(',') if t.strip()]
    tags = []
    if inline.startswith('-'):
        tags.append(inline[1:].strip().strip('"\''))
    for tm in re.finditer(r'^[ \t]+-[ \t]*(.+?)[ \t]*$', fm_text[m.end():], re.M):
        tags.append(tm.group(1).strip('"\''))
    return [t for t in tags if t and t != 'tags:']


def main():
    max_tags = MAX_TAGS
    if '--max' in sys.argv:
        max_tags = int(sys.argv[sys.argv.index('--max') + 1])

    counter = Counter()
    posts = 0
    offenders = []
    for dirpath, _, files in os.walk(POSTS_DIR):
        for f in files:
            if not f.endswith(('.md', '.markdown')):
                continue
            posts += 1
            text = open(os.path.join(dirpath, f), encoding='utf-8', errors='replace').read()
            fm = FM_RE.match(text)
            tags = parse_tags(fm.group(1)) if fm else []
            if not tags:
                offenders.append(f"[no-tag] {os.path.relpath(os.path.join(dirpath, f), POSTS_DIR)}")
            for t in tags:
                counter[t] += 1

    print(f"posts: {posts}, tag-pairs: {sum(counter.values())}, unique-tags: {len(counter)} (limit {max_tags})")
    if len(counter) > max_tags:
        print(f"FAIL: unique tags {len(counter)} > limit {max_tags}")
        print("新增标签前请先合并旧标签，或确认阈值需要调整（tools/tag_guard.py --max N）")
        sys.exit(1)
    for o in offenders:
        print("WARN:", o)
    print("PASS: tag count within limit")


if __name__ == '__main__':
    main()
