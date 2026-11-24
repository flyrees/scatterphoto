<script setup lang="ts">
/**
 * 移动端的目录抽屉入口：放在 logo 左侧。
 * 复用 VitePress 左侧栏抽屉（含站点导航 + 页内目录），
 * 通过触发隐藏的 VPLocalNav「菜单」按钮打开。
 */
function openDrawer(event: MouseEvent): void {
  // 按钮位于首页链接内部，避免点击时跳转首页
  event.preventDefault()
  event.stopPropagation()
  const menuButton = document.querySelector<HTMLButtonElement>('.VPLocalNav .menu')
  menuButton?.click()
}
</script>

<template>
  <button
    class="doc-drawer-button"
    type="button"
    aria-label="内容目录"
    @click="openDrawer"
  >
    <span class="vpi-align-left" />
  </button>
</template>
