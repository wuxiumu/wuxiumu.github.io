---
name: migrate-to-posts
description: Migrate markdown notes from any source directory to _posts/ in Jekyll blog format. Converts Chinese-titled notes with minimal frontmatter into fully-formed Jekyll posts with English slugs, proper frontmatter, and extracted subtitles.
whenToUse: When the user wants to migrate a directory of markdown notes to _posts/. Usage: "/migrate-to-posts <source-directory>"
---

# Migrate Markdown Notes → Jekyll _posts/

## Overview

This skill migrates markdown notes from **any source directory** into `_posts/` with proper Jekyll frontmatter. Claude executes the migration by generating English slugs and running an embedded Python helper.

## Source Format (expected)

Files named: `YYYY-MM-DD 中文标题.md` (date + space + title)

```yaml
---
created: 2026-06-14
tags: [标签1, 标签2]          # or YAML list form
status: ...                    # optional, will be dropped
type: ...                      # optional, will be dropped
source: ...                    # optional, will be dropped
---
# 中文标题
> 首段 blockquote 作为摘要
正文...
```

## Target Format

File: `_posts/YYYY-MM-DD-english-slug.md`

```yaml
---
layout: post
title: "中文原标题"
subtitle: "从首段 blockquote 精炼"
date: 2026-06-14
author: "WuQingBao"
header-img: "img/post-bg-2015.jpg"
tags:
  - 标签1
  - 标签2
---
# 中文原标题
> 首段 blockquote 作为摘要
正文（原样保留）...
```

## Execution Workflow

When invoked with `<source-dir>`:

### Step 1 — Scan source directory

```bash
ls <source-dir>/*.md
```

Verify files match `YYYY-MM-DD 标题.md` pattern. Report count to user.

### Step 2 — Generate slug map

For each file, read its first 5 lines (just enough for the title) and generate an English kebab-case slug:

- 2–5 words, lowercase, hyphens only, ASCII
- Translate/summarize the Chinese title meaningfully
- Check existing `_posts/` filenames for collisions — if same date+slug exists, append `-2`, `-3`, etc.
- If titles collide across different dates, same slug is OK (date prefix differs)

Write the slug map to a temp JSON file:

```bash
cat > /tmp/slug_map.json << 'EOF'
{
  "中文标题A": "english-slug-a",
  "中文标题B": "english-slug-b"
}
EOF
```

### Step 3 — Run the embedded migration script

Extract the Python script below to a temp file and execute:

```bash
python3 /tmp/_migrate_posts.py <source-dir> /tmp/slug_map.json _posts
```

### Step 4 — Report results

Show each file's mapping and final counts. Ask user if they want to delete source files.

### Step 5 — Cleanup

Remove `/tmp/_migrate_posts.py` and `/tmp/slug_map.json`.

---

## Embedded Python Script

Save this as `/tmp/_migrate_posts.py` before running:

```python
#!/usr/bin/env python3
"""Generic markdown → Jekyll post migrator.
Usage: python3 migrate.py <src_dir> <slug_map.json> <dst_dir>
"""
import os, re, sys, json
from datetime import datetime

def load_slug_map(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def parse_frontmatter(content):
    """Parse simple YAML frontmatter without pyyaml dependency.
    Handles both inline arrays `[a, b]` and multi-line YAML lists:
        tags:
          - a
          - b
    """
    if not content.startswith('---'):
        return {}, content
    parts = content.split('---', 2)
    if len(parts) < 3:
        return {}, content

    fm = {}
    current_key = None
    current_list = None

    for line in parts[1].split('\n'):
        # Detect list continuation: `  - item`
        m_list = re.match(r'^\s+-\s+(.+)', line)
        if m_list and current_key is not None:
            if current_list is None:
                current_list = []
            current_list.append(m_list.group(1).strip().strip('"').strip("'"))
            continue

        # Flush any pending list before processing next key
        if current_list is not None:
            fm[current_key] = current_list
            current_key, current_list = None, None

        line = line.strip()
        if not line or ':' not in line:
            continue
        key, _, value = line.partition(':')
        key, value = key.strip(), value.strip()
        if not value:
            # Key with no value — might be followed by a YAML list on next lines
            current_key = key
            continue

        if value.startswith('[') and value.endswith(']'):
            fm[key] = [i.strip().strip('"').strip("'") for i in value[1:-1].split(',') if i.strip()]
        elif len(value) >= 2 and value[0] == value[-1] and value[0] in ('"', "'"):
            fm[key] = value[1:-1]
        else:
            try:
                fm[key] = datetime.strptime(value, '%Y-%m-%d').date()
            except ValueError:
                fm[key] = value

    # Flush trailing list if any
    if current_list is not None:
        fm[current_key] = current_list

    return fm, parts[2].lstrip('\n')

def extract_subtitle(body):
    """Pull first blockquote as subtitle, cleaned up."""
    collected = []
    for line in body.split('\n'):
        if line.startswith('>'):
            text = line[1:].strip()
            text = re.sub(r'^\[!\w+\]\s*', '', text)            # [!abstract] etc.
            text = re.sub(r'[💡🔍⚡🤝🔄📌🎯]', '', text)         # decorative emoji
            text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)         # bold
            collected.append(text)
            if len(collected) >= 2 or len(' '.join(collected)) > 60:
                break
        elif collected:
            break
    subtitle = ' '.join(collected).strip()
    if len(subtitle) > 80:
        subtitle = subtitle[:77] + '...'
    return subtitle

def convert_tags(tags):
    if isinstance(tags, list):
        return [str(t) for t in tags]
    if isinstance(tags, str):
        s = tags.strip()
        if s.startswith('[') and s.endswith(']'):
            return [t.strip().strip('"').strip("'") for t in s[1:-1].split(',') if t.strip()]
        return [s] if s else []
    return []

def migrate_one(src_path, slug, dst_dir):
    filename = os.path.basename(src_path)
    m = re.match(r'(\d{4}-\d{2}-\d{2})\s+(.+)\.md$', filename)
    if not m:
        return None, f"bad filename pattern: {filename}"
    date_str, raw_title = m.groups()

    with open(src_path, 'r', encoding='utf-8') as f:
        content = f.read()

    fm, body = parse_frontmatter(content)
    subtitle = extract_subtitle(body)
    tags = convert_tags(fm.get('tags', []))
    date_value = fm.get('created', date_str)
    if hasattr(date_value, 'strftime'):
        date_value = date_value.strftime('%Y-%m-%d')

    # Escape for YAML double-quoted strings
    esc = lambda s: s.replace('\\', '\\\\').replace('"', '\\"')

    fm_lines = ['---', 'layout: post']
    fm_lines.append(f'title: "{esc(raw_title)}"')
    fm_lines.append(f'subtitle: "{esc(subtitle)}"')
    fm_lines.append(f'date: {date_value}')
    fm_lines.append('author: "WuQingBao"')
    fm_lines.append('header-img: "img/post-bg-2015.jpg"')
    if tags:
        fm_lines.append('tags:')
        for t in tags:
            fm_lines.append(f'  - {t}')
    fm_lines.append('---')
    fm_lines.append('')

    new_content = '\n'.join(fm_lines) + body
    dst_filename = f"{date_str}-{slug}.md"
    dst_path = os.path.join(dst_dir, dst_filename)

    if os.path.exists(dst_path):
        return None, f"collision: {dst_filename} already exists"

    with open(dst_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return dst_filename, None

def main():
    if len(sys.argv) != 4:
        print("Usage: migrate.py <src_dir> <slug_map.json> <dst_dir>")
        sys.exit(1)
    src_dir, slug_map_path, dst_dir = sys.argv[1], sys.argv[2], sys.argv[3]

    if not os.path.isdir(src_dir):
        print(f"❌ Source dir not found: {src_dir}")
        sys.exit(1)
    os.makedirs(dst_dir, exist_ok=True)

    slug_map = load_slug_map(slug_map_path)
    files = sorted(f for f in os.listdir(src_dir) if f.endswith('.md'))

    print(f"Migrating {len(files)} files: {src_dir}/ → {dst_dir}/\n")

    ok, skip = 0, 0
    for filename in files:
        # Extract title the same way as filename parser
        m = re.match(r'\d{4}-\d{2}-\d{2}\s+(.+)\.md$', filename)
        if not m:
            print(f"⚠ Skip (bad filename): {filename}")
            skip += 1
            continue
        raw_title = m.group(1)
        slug = slug_map.get(raw_title)
        if not slug:
            print(f"⚠ Skip (no slug for): {raw_title}")
            skip += 1
            continue

        result, err = migrate_one(os.path.join(src_dir, filename), slug, dst_dir)
        if err:
            print(f"⚠ Skip ({err}): {filename}")
            skip += 1
        else:
            print(f"✓ {filename}  →  {result}")
            ok += 1

    print(f"\n{'='*60}")
    print(f"✓ Migrated: {ok}/{len(files)}")
    if skip:
        print(f"⚠ Skipped: {skip}")

if __name__ == '__main__':
    main()
```

---

## Edge Cases

- **Filename with special chars** (`"`, `:`, `/`, `？`): title is double-quoted with `\"` escaping
- **Title collision across dates**: same slug is OK because date prefix differs
- **Same-date slug collision**: script appends `-2`, `-3` etc. (Claude should generate unique slugs proactively)
- **Empty tags**: omit the `tags:` field entirely
- **No blockquote**: subtitle becomes empty string
- **Filename date vs `created` mismatch**: prefer `created`; warn user in report
- **No frontmatter**: body becomes the whole file; date falls back to filename

## Example Invocation

User: `/migrate-to-posts _site/0615`

Claude:
1. `ls _site/0615/*.md` → 8 files found
2. Reads each file's title, generates slug map JSON
3. Writes `/tmp/slug_map.json` and `/tmp/_migrate_posts.py`
4. Runs `python3 /tmp/_migrate_posts.py _site/0615 /tmp/slug_map.json _posts`
5. Reports results to user
6. Cleans up temp files

## Notes

- **Source files are never deleted** — Claude asks user after migration if they want to clean up
- Script has **zero external dependencies** (stdlib only: os, re, sys, json, datetime)
- The script is stateless and idempotent (collisions cause skip, not overwrite)
- Claude generates slugs meaningfully — not pinyin transliteration
