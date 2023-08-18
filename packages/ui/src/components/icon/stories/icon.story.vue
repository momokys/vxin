<template>
  <Story title="Icon" :setup-app="setupApp" :layout="{ type: 'grid', width: 400 }">
    <Variant title="playground">
      <template #default>
        <v-icon v-bind="state" />
      </template>
      <template #controls>
        <HstSelect title="icon" v-model="state.icon" :options="icons" />
        <HstSlider title="size" v-model="state.size" :step="1" :min="12" :max="100" />
        <HstColorSelect title="color" v-model="state.color" />
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { VIcon } from '@/components'
import * as Icons from '@vxin/icons'

const icons = Object.keys(Icons)
function setupApp({ app }: any) {
  app.use(Icons.default)
}

const state = reactive<Record<string, any>>({
  size: 24,
  icon: 'Search',
  color: '#000',
})
</script>
