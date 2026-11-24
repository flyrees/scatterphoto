import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import InlineSearch from './components/InlineSearch.vue'
import NavDrawerButton from './components/NavDrawerButton.vue'
import PageOutline from './components/PageOutline.vue'
import '@fontsource/lato/latin-400.css'
import '@fontsource/lato/latin-700.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    // 目录按钮独立于 logo 链接，点击只高亮按钮本身；搜索为导航内联输入框
    'nav-bar-content-before': () => [h(NavDrawerButton), h(InlineSearch)],
    // 抽屉底部追加当前页的页内目录
    'sidebar-nav-after': () => h(PageOutline)
  })
}
