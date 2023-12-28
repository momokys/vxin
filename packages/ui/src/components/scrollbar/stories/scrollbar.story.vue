<template>
  <Story title="Scrollbar" :layout="{ type: 'grid', width: 800 }">
    <Variant title="vertical">
      <v-scrollbar :embed="state.embed" :height="state.height">
        <div class="scrollbar-demo-list col">
          <div v-for="index in 100" :key="index" class="scrollbar-demo-item">{{ index }}</div>
        </div>
      </v-scrollbar>
    </Variant>
    <Variant title="maxHeight">
      <v-btn-group>
        <v-btn label="Add Item" status="success" @click="state.itemCount++" />
        <v-btn label="Delete Item" status="danger" @click="state.itemCount--"/>
      </v-btn-group>
      <v-scrollbar :embed="state.embed" :max-height="state.maxHeight">
        <div class="scrollbar-demo-list col">
          <div v-for="index in state.itemCount" :key="index" class="scrollbar-demo-item">{{ index }}</div>
        </div>
      </v-scrollbar>
    </Variant>
    <Variant title="horizontal">
      <v-scrollbar :embed="state.embed">
        <div class="scrollbar-demo-list row">
          <div v-for="index in 10" :key="index" class="scrollbar-demo-item">{{ index }}</div>
        </div>
      </v-scrollbar>
    </Variant>
    <template #controls>
      <HstCheckbox title="embed" v-model="state.embed" />
      <HstSlider title="height" v-model="state.height" :step="1" :min="100" :max="400" />
      <HstSlider title="max-height" v-model="state.maxHeight" :step="1" :min="100" :max="400" />
    </template>
  </Story>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { VBtnGroup, VBtn, VScrollbar, ScrollbarProps } from '@/components'

const state = reactive<ScrollbarProps & { itemCount: number }>({
  embed: false,
  height: 200,
  maxHeight: 200,
  itemCount: 3,
})
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
