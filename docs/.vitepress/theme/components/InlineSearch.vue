<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useData, useRouter } from 'vitepress'

/**
 * 导航栏内的搜索：点图标展开输入框，输入时在下方直接列出条款章节结果，
 * 点击结果跳到对应页面/章节，不再弹出 VitePress 的全屏搜索框。
 */
interface SearchEntry {
  page: string
  heading: string
  text: string
  href: string
}

const { site, lang } = useData()
const router = useRouter()

const open = ref(false)
const loaded = ref(false)
const query = ref('')
const index = ref<SearchEntry[]>([])
const inputEl = ref<HTMLInputElement | null>(null)

const base = computed(() => site.value.base || '/')
const isEn = computed(() => (lang.value || '').startsWith('en'))
const placeholder = computed(() => (isEn.value ? 'Search' : '搜索'))

async function loadIndex(): Promise<void> {
  if (loaded.value) {
    return
  }
  loaded.value = true
  const pages = isEn.value ? ['en/terms', 'en/privacy'] : ['terms', 'privacy']
  const entries: SearchEntry[] = []

  for (const page of pages) {
    try {
      const response = await fetch(`${base.value}${page}.html`)
      if (!response.ok) {
        continue
      }
      const html = await response.text()
      const doc = new DOMParser().parseFromString(html, 'text/html')
      const content = doc.querySelector('.vp-doc')
      if (!content) {
        continue
      }
      const pageTitle = content.querySelector('h1')?.textContent?.trim() || page
      const headings = Array.from(content.querySelectorAll('h2'))

      for (const heading of headings) {
        let text = ''
        let node = heading.nextElementSibling
        while (node && node.tagName !== 'H2') {
          text += ` ${node.textContent ?? ''}`
          node = node.nextElementSibling
        }
        entries.push({
          page: pageTitle,
          heading: heading.textContent?.trim() || '',
          text: text.replace(/\s+/g, ' ').trim().slice(0, 400),
          href: `${base.value}${page}#${heading.id}`
        })
      }
    } catch (err) {
      // 单个页面加载失败不影响整体搜索
    }
  }

  index.value = entries
}

const results = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  if (!keyword) {
    return []
  }
  return index.value
    .filter((entry) =>
      `${entry.heading} ${entry.text} ${entry.page}`.toLowerCase().includes(keyword)
    )
    .slice(0, 8)
})

async function show(): Promise<void> {
  open.value = true
  await loadIndex()
  await nextTick()
  inputEl.value?.focus()
}

function hide(): void {
  open.value = false
  query.value = ''
}

function go(entry: SearchEntry): void {
  hide()
  router.go(entry.href)
}

function onEnter(): void {
  if (results.value.length > 0) {
    go(results.value[0])
  }
}
</script>

<template>
  <div class="inline-search" :class="{ 'inline-search--open': open }">
    <button
      class="inline-search__toggle"
      type="button"
      :aria-label="placeholder"
      @click.stop="show"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m16.2 16.2 4.3 4.3" />
      </svg>
    </button>

    <template v-if="open">
      <div class="inline-search__overlay" @click="hide" />

      <div class="inline-search__panel">
        <div class="inline-search__box">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16.2 16.2 4.3 4.3" />
          </svg>
          <input
            ref="inputEl"
            v-model="query"
            class="inline-search__input"
            type="search"
            :placeholder="placeholder"
            @keydown.esc="hide"
            @keydown.enter="onEnter"
          />
        </div>

        <div v-if="results.length > 0" class="inline-search__results">
          <a
            v-for="entry in results"
            :key="entry.href"
            class="inline-search__result"
            :href="entry.href"
            @click.prevent="go(entry)"
          >
            <span class="inline-search__result-title">{{ entry.heading }}</span>
            <span class="inline-search__result-page">{{ entry.page }}</span>
          </a>
        </div>
        <div v-else-if="query.trim()" class="inline-search__empty">
          {{ isEn ? 'No results' : '没有找到相关结果' }}
        </div>
      </div>
    </template>
  </div>
</template>
