# Cursor Search Frontend - 项目概览

## 📌 项目简介

这是一个基于 Astro 和 React 构建的现代化 Web 应用，为 Cursor AI 编辑器提供版本搜索和下载功能。

## 🎯 核心功能

### 1. 版本搜索
- 实时搜索框，支持模糊匹配
- 高亮显示匹配的版本号
- 即时过滤结果

### 2. 平台筛选
- Windows (x64, ARM64, User/System)
- macOS (Universal, Intel, Apple Silicon)
- Linux (x64, ARM64)

### 3. 智能排序
- 按版本号排序（语义版本）
- 按发布日期排序
- 支持升序/降序

### 4. 美观展示
- 卡片式版本展示
- 平台图标（Monitor Apple Terminal）
- 响应式网格布局
- 悬停动画效果

## Building 技术架构

```
前端架构
├── Astro (静态站点生成)
│   ├── SSR/SSG 支持
│   ├── 零 JS 默认
│   └── Islands 架构
│
└── React (交互组件)
    ├── TypeScript 类型安全
    ├── 状态管理 (useState, useEffect, useMemo)
    └── 组件化设计
```

## 📁 文件结构详解

### 核心文件

```
src/
├── pages/
│   └── index.astro          # 首页，入口点
│
├── layouts/
│   └── BaseLayout.astro     # 基础布局，包含样式
│
├── components/
│   ├── VersionSearch.tsx    # 主搜索组件（React）
│   ├── VersionCard.tsx      # 版本卡片组件（React）
│   ├── SearchFilters.astro  # 搜索过滤器（静态组件）
│   └── VersionCard.astro    # 版本卡片（静态组件）
│
└── types/
    └── index.ts             # TypeScript 类型定义
```

### 数据文件

```
public/
├── version-history.json     # 版本数据（93 个版本）
├── README.md               # 项目文档
└── favicon.svg             # 网站图标
```

## 🔧 关键技术

### Astro 配置
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  output: 'static'
});
```

### React 状态管理
```typescript
const [filters, setFilters] = useState<FilterOptions>({
  query: '',
  platform: '',
  sortBy: 'version',
  sortOrder: 'desc'
});
```

### 性能优化
- **useMemo**: 缓存过滤和排序结果
- **客户端加载**: `client:load` 指令
- **静态生成**: 预构建页面
- **代码分割**: 自动分割 JS 包

## BarChart 构建统计

构建输出：
```
✓ 1 pages built in 818ms

dist/_astro/index.Cd_vQiNd.js            7.85 kB │ gzip:  3.05 kB
dist/_astro/VersionSearch.zX3ZZi3e.js   13.05 kB │ gzip:  3.67 kB
dist/_astro/client.BfPWZUkF.js         186.62 kB │ gzip: 58.53 kB
```

## 🎨 设计系统

### 颜色变量
```css
:root {
  --color-primary: #6366f1;        /* 靛蓝色 */
  --color-primary-dark: #4f46e5;
  --color-bg: #ffffff;
  --color-bg-secondary: #f9fafb;
  --color-text: #111827;
  --color-text-secondary: #6b7280;
}
```

### 响应式断点
- 桌面：≥ 768px
- 平板：768px
- 手机：< 768px

## Rocket 部署选项

### Vercel (推荐)
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod --dir=dist
```

### 静态托管
直接上传 `dist/` 目录到任何静态托管服务

## 📈 性能指标

- **首屏加载**: < 1s
- **JavaScript 包**: 186.62 kB (gzip: 58.53 kB)
- **组件加载**: Islands 架构，按需加载
- **SEO 友好**: 静态生成，预渲染 HTML

## Search 功能演示

### 搜索功能
输入 "1.5" → 显示所有 1.5.x 版本

### 筛选功能
选择 "darwin-arm64" → 仅显示 Apple Silicon Mac 版本

### 排序功能
选择 "Newest First" → 最新版本排在最前面

## 📝 开发命令

```bash
# 开发模式
npm run dev          # http://localhost:4321

# 构建生产版本
npm run build        # 输出到 dist/

# 预览构建结果
npm run preview      # http://localhost:4321
```

## 🐛 已知问题

暂无

## 🔮 未来计划

- [ ] 添加暗黑模式支持
- [ ] 实现无限滚动加载
- [ ] 添加版本详情页面
- [ ] 支持收藏功能
- [ ] 添加版本比较功能

## 📞 支持与反馈

如有问题或建议，请在 GitHub 仓库中提交 Issue。

---

最后更新：2025-10-28
