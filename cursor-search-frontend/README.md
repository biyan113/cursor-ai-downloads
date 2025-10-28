# Cursor Download Hub

一个现代化的、响应式的 Web 应用，用于搜索和下载 Cursor AI 编辑器的所有历史版本。

## ✨ 功能特性

- Search **实时搜索** - 按版本号快速搜索
- Target **平台筛选** - 按操作系统和架构筛选（Windows、macOS、Linux）
- BarChart **智能排序** - 按版本号或发布日期排序（升序/降序）
- Palette **美观界面** - 现代化的 Material Design 风格
- Smartphone **响应式设计** - 完美适配桌面、平板和手机
- Zap **快速加载** - 基于 Astro 的静态生成，性能卓越

## Rocket 在线演示

访问 [Cursor Download Hub](https://cursor.uuid.site) 立即体验！

## Wrench 技术栈

- **框架**: Astro 5.x
- **组件**: React 19 + TypeScript
- **样式**: 原生 CSS 变量
- **构建**: Vite
- **部署**: 静态生成，支持任何静态托管服务

## 📋 系统要求

- Node.js 18+ 或更高版本
- npm 或 yarn

## Building 项目结构

```
cursor-search-frontend/
├── public/
│   ├── version-history.json      # 版本数据
│   └── favicon.svg               # 网站图标
├── src/
│   ├── components/
│   │   ├── VersionSearch.tsx     # 主搜索组件
│   │   └── VersionCard.tsx       # 版本卡片组件
│   ├── layouts/
│   │   └── BaseLayout.astro      # 基础布局
│   ├── pages/
│   │   └── index.astro           # 首页
│   └── types/
│       └── index.ts              # TypeScript 类型定义
├── astro.config.mjs              # Astro 配置
├── package.json
└── tsconfig.json
```

## Rocket 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

开发服务器将在 http://localhost:4321 启动

### 3. 构建生产版本

```bash
npm run build
```

构建文件将输出到 dist/ 目录

### 4. 预览生产构建

```bash
npm run preview
```

## BarChart 数据来源

版本数据来自 version-history.json 文件，该文件包含所有 Cursor 版本的下载链接。

### 更新数据

将最新的 version-history.json 文件复制到 public/ 目录：

```bash
cp path/to/latest/version-history.json public/version-history.json
```

然后重新构建项目。

## 🎯 使用指南

### 搜索版本

- 在搜索框中输入版本号（如：1.5.0）
- 支持模糊搜索，会高亮匹配的文本

### 筛选平台

从下拉菜单中选择平台：
- **Windows**: x64、ARM64（支持用户/系统安装）
- **macOS**: Universal、Intel、Apple Silicon
- **Linux**: x64、ARM64

### 排序

- **按版本**: 使用语义版本号排序
- **按日期**: 按发布日期排序
- **顺序**: 新版本优先或旧版本优先

## 🎨 自定义样式

项目使用 CSS 变量定义主题颜色，可以在 src/layouts/BaseLayout.astro 中修改。

## 📦 部署

项目可以部署到任何静态托管服务：

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3

构建完成后，将 dist/ 目录上传即可。

## 📄 许可证

本项目采用 MIT 许可证。

---

**注意**: 本项目仅提供 Cursor 官方下载链接的搜索和展示功能，不存储或托管任何文件。
