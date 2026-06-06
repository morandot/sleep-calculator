# 睡眠周期计算器

[English](./README.md) | 中文

基于科学的睡眠周期计算器，通过匹配约 90 分钟的自然睡眠周期，建议最佳的入睡和起床时间。采用温暖、无干扰的界面设计，适合夜间使用。

[![License: MIT](https://img.shields.io/badge/许可证-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Framework: Vite 5](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Language: TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Style: Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)
[![PWA: Ready](https://img.shields.io/badge/PWA-就绪-0052FF?logo=progressive-web-apps)](https://web.dev/progressive-web-apps/)

**[在线预览](https://sleep.nopress.net)**

---

## 核心特性

- **科学算法**：基于约 90 分钟的睡眠周期推算，预留 15 分钟入睡时间。
- **暗色/亮色主题**：温暖色调设计系统，自动检测系统偏好。
- **响应式布局**：移动端优先，适配手机、平板和桌面端。
- **多语言**：英文与简体中文即时切换，无需刷新页面。
- **PWA**：可安装到手机或桌面，通过 Workbox 提供离线支持。
- **无障碍**：正确的 ARIA 标签、键盘导航、语义化 HTML。
- **零运行时依赖**：纯 TypeScript，无框架 — 快速且轻量。

## 技术栈

- **构建**：[Vite 5](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **样式**：[Tailwind CSS 3](https://tailwindcss.com/) + CSS 自定义属性实现主题切换
- **PWA**：通过 [`vite-plugin-pwa`](https://vite-pwa-org.netlify.app/) 接入 [Workbox](https://developer.chrome.com/docs/workbox/)
- **测试**：[Vitest](https://vitest.dev/)
- **字体**：Georgia（标题），系统无衬线字体（正文）

## 快速开始

### 环境要求

- Node.js 18 或更高版本
- npm（或兼容的包管理器）

### 命令

```bash
# 克隆
git clone https://github.com/your-username/sleep-calculator.git
cd sleep-calculator

# 安装依赖
npm install

# 开发
npm run dev

# 运行测试
npm test

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```text
sleep-calculator/
├── src/
│   ├── main.ts        # 入口：主题初始化、i18n 引导
│   ├── app.ts         # UI 编排：事件绑定、渲染、视图切换
│   ├── sleep.ts       # 纯函数：睡眠周期计算
│   ├── i18n.ts        # 翻译字符串与语言管理
│   ├── state.ts       # 简单响应式状态（视图、主题、语言）
│   ├── types.ts       # 共享 TypeScript 类型
│   ├── style.css      # Tailwind 指令 + 主题变量 + 组件样式
│   └── __tests__/
│       ├── sleep.test.ts   # 睡眠计算测试
│       └── i18n.test.ts    # 国际化测试
├── public/
│   ├── icons/         # PWA 图标
│   ├── offline.html   # 离线回退页面
│   └── favicon.svg
├── index.html         # Vite 入口，语义化标记与 data-i18n 属性
├── CLAUDE.md          # 项目约定与架构决策
├── tailwind.config.js # 设计系统 token
├── postcss.config.js
└── vite.config.ts     # Vite + PWA + Vitest 配置
```

## 睡眠逻辑

每个睡眠周期约 **90 分钟**。应用建议在周期结束时醒来，额外预留约 **15 分钟**入睡时间。

- **6 个周期**：约 9 小时
- **5 个周期**：约 7.5 小时
- **4 个周期**：约 6 小时
- **3 个周期**：约 4.5 小时

## 设计系统

界面遵循温暖、无干扰的设计理念：

- **暖调中性色** — 无冷蓝灰色
- **衬线标题**（Georgia），字重 500-600 — 正文使用系统无衬线字体
- **圆角 ≥ 6px** 用于所有交互元素
- **无渐变背景**，无纯黑/纯白，无装饰性动画
- **CSS 自定义属性** 实现无缝明暗主题切换

完整的 设计 Token 参考请查看 `~/design.md`。

## 许可证

[MIT 许可证](https://opensource.org/licenses/MIT)。
