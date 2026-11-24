<script setup lang="ts">
/**
 * 移动端的目录抽屉入口：放在 logo 左侧。
 * 复用 VitePress 左侧栏抽屉（含站点导航 + 页内目录），
 * 通过触发隐藏的 VPLocalNav「菜单」按钮打开。
 */
function openDrawer(event: MouseEvent): void {
  const menuButton = document.querySelector<HTMLButtonElement>('.VPLocalNav .menu')
  menuButton?.click()
  // 系统/浏览器会给聚焦的按钮画一层选中底色，触发后立即移除焦点
  ;(event.currentTarget as HTMLElement | null)?.blur()
}
</script>

<template>
  <button
    class="doc-drawer-button"
    type="button"
    aria-label="内容目录"
    @click.stop="openDrawer"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.6"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M5 7h14M5 12h14M5 17h14" />
    </svg>
  </button>
</template>
