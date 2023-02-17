<template>
  <Story title="Scrollbar/Horizontal" :layout="{ type: 'grid', width: 400 }">
    <Variant title="playground">
      <template #default>
        <div style="height: 46px">
          <v-scrollbar v-bind="state">
            <div class="scrollbar-demo-list row">
              <div v-for="item in list" :key="item" class="scrollbar-demo-item">{{ item }}</div>
            </div>
          </v-scrollbar>
        </div>
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
// import { hstEvent } from 'histoire/client'
import { VScrollbar } from '@/components'

const state = reactive<Record<string, any>>({
  gap: true,
})
const list = reactive<number[]>(generateItems(100))

function generateItems(total: number) {
  const items: number[] = []
  for (let i = 1; i <= total; i++) {
    items.push(i)
  }
  return items
}
</script>

<style scoped lang="scss">
.scrollbar-demo-list {
  display: flex;
  .scrollbar-demo-item {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    background-color: var(--v-color-primary);
    font-size: 16px;
    color: #ffffff;
  }
  &.row {
    flex-direction: row;
    .scrollbar-demo-item {
      height: 36px;
      width: 100px;
    }
    & > .scrollbar-demo-item ~ .scrollbar-demo-item {
      margin-left: 16px;
    }
  }
  &.col {
    flex-direction: column;
    .scrollbar-demo-item {
      height: 36px;
      width: 100%;
    }
    & > .scrollbar-demo-item ~ .scrollbar-demo-item {
      margin-top: 16px;
    }
  }
}
</style>
