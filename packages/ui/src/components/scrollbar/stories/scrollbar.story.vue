<template>
  <Story title="Scrollbar" :layout="{ type: 'grid', width: 800 }">
    <Variant title="vertical">
      <v-scrollbar v-bind="state">
        <div class="scrollbar-demo-list col">
          <div v-for="index in 100" :key="index" class="scrollbar-demo-item">{{ index }}</div>
        </div>
      </v-scrollbar>
    </Variant>
    <Variant title="horizontal">
      <v-scrollbar :embed="state.embed">
        <div class="scrollbar-demo-list row">
          <div v-for="index in 100" :key="index" class="scrollbar-demo-item">{{ index }}</div>
        </div>
      </v-scrollbar>
    </Variant>
    <template #controls>
      <HstCheckbox title="embed" v-model="state.embed" />
    </template>
  </Story>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { VScrollbar } from '@/components'

const state = reactive({
  embed: false,
  style: {
    height: '300px',
  },
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
