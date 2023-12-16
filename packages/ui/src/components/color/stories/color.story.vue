<template>
  <Story title="Color" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <div class="list">
        <div
          v-for="index in 10"
          :key="index"
          class="item"
          :style="style(index)"
        />
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
// import { VSeq } from '@/components'
// import { ColorBlock } from './color-block'

// const colorList = ['primary', 'secondary', 'success', 'warning', 'error']

const style = (level: number) => ({ 'background-color': `var(v-color-primary-${level})` })
</script>

<style scoped lang="scss">
.list {
  .item {
    display: flex;
    align-items: center;
    width: 100px;
    height: 40px;
    margin-right: 16px;
  }
}
</style>
