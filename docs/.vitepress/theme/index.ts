import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import NavDrawerButton from './components/NavDrawerButton.vue'
import PageOutline from './components/PageOutline.vue'
import '@fontsource/lato/latin-400.css'
import '@fontsource/lato/latin-700.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    // logo 左侧的目录按钮，点击展开左侧抽屉
    'nav-bar-title-before': () => h(NavDrawerButton),
    // 抽屉底部追加当前页的页内目录
    'sidebar-nav-after': () => h(PageOutline)
  })
}
