<template>
  <Story title="Input/Input" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <v-input v-bind="state" v-model="state.modelValue" />
      <template #controls>
        <HstText title="modelValue" v-model="state.modelValue" />
        <HstText title="placeholder" v-model="state.placeholder" />
        <HstSlider title="maxLen" v-model="state.maxLen" :step="1" :min="0" :max="100" />
        <HstCheckbox title="clearable" v-model="state.clearable" />
        <HstCheckbox title="readonly" v-model="state.readonly" />
        <HstCheckbox title="disabled" v-model="state.disabled" />
        <HstCheckbox title="error" v-model="state.error" />
      </template>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
// import { logEvent } from 'histoire/client'
import { VInput, InputProps } from '@/components'

const state = reactive<InputProps>({
  modelValue: '',
  placeholder: '请输入',
  maxLen: 100,
})
</script>
