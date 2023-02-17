<template>
  <Story title="Icon" :layout="{ type: 'grid', width: 400 }">
    <Variant title="playground">
      <template #default>
        <v-icon v-bind="state" />
      </template>
      <template #controls>
        <HstNumber title="size" v-model="state.size" />
        <HstText title="color" v-model="state.color" />
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { VIcon } from '@/components'
import { HstNumber, HstText } from '@histoire/controls'

const state = reactive<Record<string, any>>({
  icon: 'Search',
  color: '#3a7afe',
})
</script>
