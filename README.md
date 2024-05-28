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
├── README.md
├── app
│   ├── (auth)
│   │   ├── layout.tsx
│   │   ├── reset-password
│   │   │   └── page.tsx
│   │   ├── signin
│   │   │   └── page.tsx
│   │   └── signup
│   │       └── page.tsx
│   ├── (default)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api
│   │   └── hello
│   │       └── route.ts
│   ├── css
│   │   ├── additional-styles
│   │   │   ├── range-slider.css
│   │   │   ├── theme.css
│   │   │   ├── toggle-switch.css
│   │   │   └── utility-patterns.css
│   │   └── style.css
│   └── layout.tsx
├── components
│   ├── banner.tsx
│   ├── blocks.tsx
│   ├── features.tsx
│   ├── index.tsx
│   ├── modal-video.tsx
│   ├── newsletter.tsx
│   ├── page-illustration.tsx
│   ├── testimonials.tsx
│   ├── ui
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   └── mobile-menu.tsx
│   └── zigzag.tsx
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public
│   ├── favicon.ico
│   ├── images
│   │   ├── features-03-image-01.png
│   │   ├── features-03-image-02.png
│   │   ├── features-03-image-03.png
│   │   ├── hero-image-01.jpg
│   │   ├── logo.svg
│   │   ├── testimonial-01.jpg
│   │   ├── testimonial-02.jpg
│   │   └── testimonial-03.jpg
│   └── videos
│       └── video.mp4
├── tailwind.config.js
└── tsconfig.json
```

