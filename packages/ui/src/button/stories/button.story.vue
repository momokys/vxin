<template>
  <Story title="Button" :layout="{ type: 'grid', width: 400 }">
    <Variant title="playground">
      <v-button v-bind="state" @click="logEvent('click', $event)" />
      <template #controls>
        <HstText title="label" v-model="state.label" />
        <HstSelect
          title="type"
          v-model="state.type"
          :options="{
            default: 'default',
            primary: 'primary',
            success: 'success',
            warning: 'warning',
            danger: 'danger',
            info: 'info',
          }"
        />
        <HstSelect
          title="size"
          v-model="state.size"
          :options="{
            mini: 'mini',
            small: 'small',
            medium: 'medium',
            large: 'large',
          }"
        />
        <HstSelect title="icon" v-model="state.icon" :options="icons" />
        <HstSelect title="icon-placement" v-model="state.iconPlacement" :options="{ left: 'left', right: 'right' }" />
        <HstCheckbox title="circle" v-model="state.circle" />
        <HstCheckbox title="round" v-model="state.round" />
        <HstCheckbox title="text" v-model="state.text" />
        <HstCheckbox title="disabled" v-model="state.disabled" />
        <HstCheckbox title="loading" v-model="state.loading" />
        <HstText title="loading-label" v-model="state.loadingLabel" />
        <HstSelect title="loading-icon" v-model="state.loadingIcon" :options="icons" />
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { logEvent } from 'histoire/client'
import { VButton } from '..'
import { HstText, HstSelect, HstCheckbox } from '@histoire/controls'

const state = reactive<Record<string, any>>({
  label: '按钮',
})

const icons = {
  Search: 'Search',
}
</script>
