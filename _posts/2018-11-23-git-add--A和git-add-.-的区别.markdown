---
layout:     post
title:      "git add -A 和 git add . 的区别"
subtitle:   " \"The difference between git add -A and git add .\""
date:       2018-11-23 14:01:00
author:     "吴庆宝"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 工具
---
> “谁用 git commit -m 打断谁的腿即可 --来自知乎网友的评论”


**git add -A和 git add . git add -u在功能上看似很相近，但还是存在一点差别***

- git add . ：他会监控工作区的状态树，使用它会把工作时的所有变化提交到暂存区，包括文件内容修改(modified)以及新文件(new)，但不包括被删除的文件。
- git add -u ：他仅监控已经被add的文件（即tracked file），他会将被修改的文件提交到暂存区。add -u 不会提交新文件（untracked file）。（git add --update的缩写）
- git add -A ：是上面两个功能的合集（git add --all的缩写）

下面是具体操作例子，方便更好的理解（Git version 1.x）：

复制代码
```
git init
echo Change me > change-me
echo Delete me > delete-me
git add change-me delete-me
git commit -m initial

echo OK >> change-me
rm delete-me
echo Add me > add-me

git status
# Changed but not updated:
#   modified:   change-me
#   deleted:    delete-me
# Untracked files:
#   add-me

git add .
git status

# Changes to be committed:
#   new file:   add-me
#   modified:   change-me
# Changed but not updated:
#   deleted:    delete-me

git reset

git add -u
git status

# Changes to be committed:
#   modified:   change-me
#   deleted:    delete-me
# Untracked files:
#   add-me

git reset

git add -A
git status

# Changes to be committed:
#   new file:   add-me
#   modified:   change-me
#   deleted:    delete-me
```
复制代码
总结：

- git add -A  提交所有变化
- git add -u  提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)
- git add .  提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件
