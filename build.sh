#!/bin/bash

# 构建目录
BUILD_DIR="docs"

# 清理旧的构建目录
rm -rf $BUILD_DIR
mkdir -p $BUILD_DIR

# 复制核心文件
cp index.html $BUILD_DIR/
cp styles.css $BUILD_DIR/
cp app.js $BUILD_DIR/

# 复制依赖库
cp -r lib $BUILD_DIR/

# 生成版本信息
echo "Build time: $(date)" > $BUILD_DIR/version.txt
echo "Commit: $(git rev-parse --short HEAD)" >> $BUILD_DIR/version.txt

echo "✅ 构建完成！输出目录：$BUILD_DIR"
echo "📦 可以直接将docs目录部署到任意静态服务器，支持GitHub Pages"
