<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

/**
 * 抽屉里的页内目录：当前页标题 + 二级标题列表。
 * 仅在移动端抽屉中显示（桌面端由 CSS 隐藏）。
 */
const { page } = useData()

const headers = computed(() => {
  const list = page.value.headers ?? []
  return list.filter((header) => header.level === 2)
})

function closeDrawer(): void {
  const backdrop = document.querySelector<HTMLElement>('.VPBackdrop')
  backdrop?.click()
}
</script>

<template>
  <div v-if="headers.length" class="doc-toc">
    <p class="doc-toc__title">{{ page.title }}</p>
    <a
      v-for="header in headers"
      :key="header.link"
      class="doc-toc__link"
      :href="header.link"
      @click="closeDrawer"
    >
      {{ header.title }}
    </a>
  </div>
</template>
