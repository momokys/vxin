<template>
  <Story title="Ripple" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <div class="wrap" @click="onClick" />
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { ripple } from '@/utils'

const onClick = (ev: MouseEvent) => {
  const target = ev.target as HTMLElement
  const c = {
    x: ev.clientX,
    y: ev.clientY,
  }
  ripple(target, c, {
    color: 'var(--v-color-primary-1)',
    bezier: 'var(--v-bezier-ease-out)',
    duration: 300,
  })
}
</script>

<style lang="scss">
.wrap {
  position: relative;
  width: 400px;
  height: 400px;
  margin: auto;
  //background-color: var(--v-color-primary-0);
}
</style>
