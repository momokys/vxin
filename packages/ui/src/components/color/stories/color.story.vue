<template>
  <Story title="Color" :layout="{ type: 'single', iframe: true }">
    <!--    <div v-for="color in colorList" :key="color" class="list">-->
    <!--      <div v-for="(_, index) in seq" :key="index" class="item">-->
    <!--        <color-block :color="color" :index="index" />-->
    <!--        &lt;!&ndash;        <div :style="{ backgroundColor: `var(v-color-${color}-${index})` }" />&ndash;&gt;-->
    <!--        <span>{{ `v-color-${color}-${index}` }}</span>-->
    <!--      </div>-->
    <!--    </div>-->
    <div>
      <div v-for="(_, index) in seq" :key="index" class="item">
        <div :style="{ backgroundColor: `var(v-color-primary-${index})` }" />
        <span>{{ `v-color-primary-${index}` }}</span>
      </div>
    </div>
  </Story>
</template>

<script setup lang="ts">
// import { VSeq } from '@/components'
// import { ColorBlock } from './color-block'

// const colorList = ['primary', 'secondary', 'success', 'warning', 'error']

const seq = new Array(10)
</script>

<style scoped lang="scss">
.list {
  .item {
    display: flex;
    align-items: center;
    width: 300px;
    div {
      width: 100px;
      height: 40px;
      margin-right: 16px;
    }
  }
}
</style>
