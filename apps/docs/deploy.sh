#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
bun run docs:build

# 切换到 gh-pages 分支
git checkout gh-pages

# 清空当前分支
git rm -rf .

# 将构建结果拷贝到当前分支
cp -r .vitepress/dist/* .

# 添加所有更改
git add .

# 提交更改
git commit -m "Update gh-pages"

# 推送到远程仓库
git push origin gh-pages

# 切换回主分支
git checkout main