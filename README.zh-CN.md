# 睡眠周期计算器

[English](./README.md) | 中文

基于科学、面向夜间使用的睡眠周期规划工具：在约 90 分钟的睡眠周期框架下，帮助你选择更合适的入睡或起床时间。

[![License: MIT](https://img.shields.io/badge/许可证-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Framework: Vite 5](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Language: TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Style: Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)
[![PWA: Ready](https://img.shields.io/badge/PWA-就绪-0052FF?logo=progressive-web-apps)](https://web.dev/progressive-web-apps/)

**[在线预览](https://sleep.nopress.net)**

---

## 核心特性

- **科学算法**：按约 90 分钟为一轮睡眠周期推算，并预留约 15 分钟入睡时间。
- **深度星空美学**：深色界面与玻璃拟态（Glassmorphism），适合夜间使用。
- **稳定布局**：输入与结果视图采用 CSS Grid 叠放，减少切换时的跳动。
- **PWA**：可安装到手机或桌面；通过 `vite-plugin-pwa` 与 Workbox 提供离线能力。
- **多语言**：英文与简体中文切换使用自定义下拉，无需整页刷新。

## 科学原理（工具内逻辑）

大脑在夜间会经历多轮睡眠周期，每轮大约 **90 分钟**。在周期中间被叫醒往往更昏沉，在周期结束时醒来通常更清醒。

本工具支持两类场景：

1. **现在入睡**：若你现在躺下，推算几点起床更贴近完整周期。
2. **定时起床**：若你必须在某个时刻起床，推算几点入睡更合理。

优先展示 **3、4、5 或 6** 个周期，对应约 **4.5h、6h、7.5h、9h** 的总睡眠时长（含入睡缓冲）。

## 技术栈

- **构建**：[Vite 5](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **样式**：[Tailwind CSS 3](https://tailwindcss.com/)（配合 PostCSS）
- **PWA**：通过 [`vite-plugin-pwa`](https://vite-pwa-org.netlify.app/) 接入 [Workbox](https://developer.chrome.com/docs/workbox/)
- **字体**：Inter（Google Fonts）
- **图标**：页面内联 SVG

## 快速开始

### 环境要求

- Node.js 18 或更高版本
- npm（或兼容的包管理器）

### 命令

1. **克隆仓库**
   ```bash
   git clone https://github.com/your-username/sleep-calculator.git
   cd sleep-calculator
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **生产构建**
   ```bash
   npm run build
   ```

5. **本地预览构建结果**
   ```bash
   npm run preview
   ```

## 项目结构

```text
sleep-calculator/
├── src/
│   ├── main.ts       # 入口、gtag、页面就绪逻辑
│   ├── ui.ts         # DOM 与语言下拉
│   ├── sleep.ts      # 周期计算
│   ├── i18n.ts       # 文案与语言状态
│   └── style.css     # Tailwind 与主题
├── public/
│   ├── icons/        # PWA 图标
│   ├── offline.html
│   └── favicon.svg
├── index.html        # Vite 入口与防闪屏标记
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts    # PWA 与构建配置
```

## 数据统计（Google Analytics）

项目已接入 Google Analytics（`gtag`）。若使用自己的衡量 ID，请在 **`index.html`**（脚本 URL）与 **`src/main.ts`**（`gtag('config', …)`）中替换当前的 `G-V4MRZL3F6K`。

## 许可证

采用 [MIT 许可证](https://opensource.org/licenses/MIT) 发布。
