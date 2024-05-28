---
original: https://github.com/cruip/open-react-template
---
# Pink Mammoth Community

> web3 community, from chengdu university.

# 使用

## 配置 Aptos

```bash
cd contract
aptos init --network testnet
```

## 安装依赖

```bash
pnpm install 
```

# 文件结构

```bash
.
├── README.md  # 项目的说明文档。
├── app  # 主程序目录。
│   ├── (auth)  # 用户授权登录注册模块。
│   │   ├── layout.tsx  # 授权页面布局组件。
│   │   ├── reset-password  # 重置密码页面相关组件。
│   │   │   └── page.tsx  # 重置密码页面内容组件。
│   │   ├── signin  # 登录页面相关组件。
│   │   │   └── page.tsx  # 登录页面内容组件。
│   │   └── signup  # 注册页面相关组件。
│   │       └── page.tsx  # 注册页面内容组件。
│   ├── (default)  # 默认页面布局及内容。
│   │   ├── layout.tsx  # 默认页面布局组件。
│   │   └── page.tsx  # 默认页面内容组件。
│   ├── api  # 与后端 API 交互的代码。
│   │   └── hello  # 示例 API 路由模块。
│   │       └── route.ts  # hello API 路由处理逻辑。
│   ├── css  # CSS 样式文件目录。
│   │   ├── additional-styles  # 额外的样式文件目录。
│   │   │   ├── range-slider.css  # 滑动条样式文件。
│   │   │   ├── theme.css  # 主题样式文件。
│   │   │   ├── toggle-switch.css  # 开关样式文件。
│   │   │   └── utility-patterns.css  # 实用模式样式文件。
│   │   └── style.css  # 主样式文件。
│   └── layout.tsx  # 应用的整体布局组件。
├── components  # 可复用的 React 组件目录。
│   ├── banner.tsx  # 横幅组件。
│   ├── blocks.tsx  # 区块组件。
│   ├── features.tsx  # 特性展示组件。
│   ├── index.tsx  # 组件入口文件，可能用于导出所有组件。
│   ├── modal-video.tsx  # 视频模态框组件。
│   ├── newsletter.tsx  # 新闻通讯组件。
│   ├── page-illustration.tsx  # 页面插图组件。
│   ├── testimonials.tsx  # 用户评价组件。
│   ├── ui  # UI 相关的组件目录。
│   │   ├── footer.tsx  # 底部导航栏组件。
│   │   ├── header.tsx  # 顶部导航栏组件。
│   │   └── mobile-menu.tsx  # 移动端菜单组件。
│   └── zigzag.tsx  # 锯齿形排列组件。
├── next-env.d.ts  # Next.js 的类型声明文件。
├── next.config.js  # Next.js 的配置文件。
├── package-lock.json  # npm 的依赖版本锁定文件。
├── package.json  # npm 的配置文件，包含项目元数据和依赖信息。
├── pnpm-lock.yaml  # pnpm 的依赖版本锁定文件。
├── postcss.config.js  # PostCSS 的配置文件。
├── public  # 公共资源目录。
│   ├── favicon.ico  # 网站的图标文件。
│   ├── images  # 图片资源目录。
│   │   ├── features-03-image-01.png
│   │   ├── features-03-image-02.png
│   │   ├── features-03-image-03.png
│   │   ├── hero-image-01.jpg
│   │   ├── logo.svg
│   │   ├── testimonial-01.jpg
│   │   ├── testimonial-02.jpg
│   │   └── testimonial-03.jpg
│   └── videos  # 视频资源目录。
│       └── video.mp4
├── tailwind.config.js  # Tailwind CSS 的配置文件。
└── tsconfig.json  # TypeScript 的配置文件。

```
