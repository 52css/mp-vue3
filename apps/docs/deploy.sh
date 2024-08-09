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
git commit -m 'deploy'

# 如果你是要部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# 如果你是要部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:52css/base-vue.git master:gh-pages
git push -f https://github.com/52css/mp-vue3.git main:gh-pages

# cd -
