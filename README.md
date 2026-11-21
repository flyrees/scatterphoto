# 片屿 · 隐私政策与用户协议

用 [VitePress](https://vitepress.dev) 搭建的静态站点，承载片屿 App 的：

- 隐私政策（`/privacy`）
- 用户协议（`/terms`）

线上地址：<https://flyrees.github.io/scatterphoto/>

所有内容都是 Markdown，构建后是纯静态 HTML，部署在 GitHub Pages。

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 产物在 docs/.vitepress/dist
npm run preview  # 预览构建结果
```

## 目录结构

```
docs/
├── .vitepress/config.mts    # 站点配置：标题、导航、logo
├── .vitepress/theme/        # 字体与配色
├── public/logo.png          # 片屿 logo（App 图标）
├── index.md                 # 首页
├── privacy.md               # 隐私政策
├── terms.md                 # 用户协议
└── en/                      # 英文版
.github/workflows/deploy.yml # 推送 main 自动部署到 Pages
```

## 改内容

| 想改什么 | 改哪里 |
| --- | --- |
| 隐私政策 | `docs/privacy.md` |
| 用户协议 | `docs/terms.md` |
| 站点标题、描述 | `docs/.vitepress/config.mts` 里的 `title` / `description` |
| 顶部导航 | `config.mts` 的 `nav` |
| Logo / 图标 | 替换 `docs/public/logo.png`（同时是网页图标） |

改完直接 `git push`，Actions 会自动重新构建部署。

## 配色

样式在 `docs/.vitepress/theme/custom.css`：

| 元素 | 值 |
| --- | --- |
| 页面底色 | `#f5f7f9` 浅冷灰 |
| 内容卡片 | 纯白，圆角 12px，柔和投影 |
| 主色 | `#1e9bf0` 亮蓝（取自 App 图标；正文链接用 `#0b6bcc` 保证对比度） |
| 正文 | `#1f2329`，行高 1.7 |
| 字体 | Lato（拉丁）+ PingFang SC |

改主题色换 `:root` 里的 `--vp-c-brand-*` 变量；深色模式在 `.dark` 块里单独一套值。字体用 `@fontsource/lato` 本地打包，不依赖 Google Fonts。

## 部署

推送到 `main` 后由 `.github/workflows/deploy.yml` 自动构建并发布到 GitHub Pages。默认地址为 `https://<用户名>.github.io/<仓库名>/`；绑定自定义域名时，在仓库 Settings → Secrets and variables → Actions → Variables 里添加 `BASE_PATH=/`。

## 注意

- App 内的“隐私政策”“用户协议”直接打开本站在线页面，修改文案后 App 无需发版。
- 隐私政策内容要与 App 实际收集的信息、第三方服务保持一致。
