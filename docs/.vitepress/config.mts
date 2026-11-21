import { defineConfig } from 'vitepress'

// 部署到 GitHub Pages 的项目站点时，路径会带仓库名（如 /scatterphoto/）。
// 工作流里会自动注入 BASE_PATH，本地开发时默认是 '/'。
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  lang: 'zh-CN',
  title: '片屿',
  description: '片屿隐私政策与用户协议',

  base,
  cleanUrls: true,       // 生成 /privacy 而不是 /privacy.html
  lastUpdated: true,     // 显示"最后更新于"（需要 git 仓库）
  srcExclude: ['**/README.md'],

  // 语言切换：中文在根路径，英文在 /en/
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: '片屿',
      description: '片屿隐私政策与用户协议',
      themeConfig: {
        siteTitle: '片屿',
        sidebar: [
          {
            text: '📄 法律条款',
            items: [
              { text: '隐私政策', link: '/privacy' },
              { text: '用户协议', link: '/terms' }
            ]
          }
        ],
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        langMenuLabel: '切换语言',
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        lastUpdated: { text: '最后更新于', formatOptions: { dateStyle: 'medium' } }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Pianyu',
      description: 'Pianyu Privacy Policy and User Agreement',
      link: '/en/',
      themeConfig: {
        siteTitle: 'Pianyu',
        sidebar: [
          {
            text: '📄 Legal',
            items: [
              { text: 'Privacy Policy', link: '/en/privacy' },
              { text: 'User Agreement', link: '/en/terms' }
            ]
          }
        ],
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        langMenuLabel: 'Change language',
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        lastUpdated: { text: 'Last updated', formatOptions: { dateStyle: 'medium' } }
      }
    }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: `${base}logo.png` }],
    ['meta', { name: 'theme-color', content: '#1E9BF0' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '片屿 · Pianyu' }],
    ['meta', { property: 'og:description', content: '片屿隐私政策与用户协议 · Privacy Policy & User Agreement' }],
    ['meta', { property: 'og:image', content: `${base}logo.png` }]
  ],

  themeConfig: {
    logo: '/logo.png',
    aside: false,
    outline: false
  }
})
