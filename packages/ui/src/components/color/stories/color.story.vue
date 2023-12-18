<template>
  <Story title="Color" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <v-space wrap>
        <div v-for="status in statusList" :key="status" class="color-board">
          <div :class="`color-board__master bg-${status}`" />
          <div class="color-board__list">
            <div v-for="level in 5" :key="level" :class="`item bg-${status}-${5 - level}`" />
          </div>
        </div>
      </v-space>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { VSpace } from '@/components'
const statusList = ['primary', 'success', 'warning', 'danger', 'secondary']
</script>

<style scoped lang="scss">
.color-board {
  &__master {
    width: 200px;
    height: 80px;
  }
  &__list {
    display: flex;
    .item {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
