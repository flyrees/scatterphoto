<script setup lang="ts">
/**
 * 移动端的目录抽屉入口：放在 logo 左侧。
 * 复用 VitePress 左侧栏抽屉（含站点导航 + 页内目录），
 * 通过触发隐藏的 VPLocalNav「菜单」按钮打开。
 */
function openDrawer(): void {
  const menuButton = document.querySelector<HTMLButtonElement>('.VPLocalNav .menu')
  menuButton?.click()
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
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.4"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M3 6.5h18M3 12h18M3 17.5h18" />
    </svg>
  </button>
</template>
