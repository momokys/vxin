<template>
  <Story title="Icon" :layout="{ type: 'grid', width: 400 }">
    <Variant title="playground">
      <template #default>
        <v-icon v-bind="state" />
      </template>
      <template #controls>
        <HstSlider title="size" v-model="state.size" :step="1" :min="12" :max="100" />
        <HstColorSelect title="color" v-model="state.color" />
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { VIcon } from '@/components'

const state = reactive<Record<string, any>>({
  size: 12,
  icon: 'Search',
  color: '#3a7afe',
})
</script>
