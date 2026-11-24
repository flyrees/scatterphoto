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
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.8"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M4 6.5h16M4 12h16M4 17.5h16" />
    </svg>
  </button>
</template>
