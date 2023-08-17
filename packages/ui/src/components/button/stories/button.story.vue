<template>
  <Story title="Button" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <v-button v-bind="state" :icon="icons[state.icon]" @click="logEvent('click', $event)" />
      <template #controls>
        <HstText title="label" v-model="state.label" />
        <HstSelect title="type" v-model="state.type" :options="['default', 'text', 'link', 'outline']" />
        <HstSelect
          title="status"
          v-model="state.status"
          :options="['default', 'primary', 'success', 'warning', 'danger', 'error']"
        />
        <HstSelect title="shape" v-model="state.shape" :options="['default', 'circle', 'round']" />
        <HstSelect title="size" v-model="state.size" :options="['mini', 'small', 'medium', 'large']" />
        <HstSelect title="icon" v-model="state.icon" :options="Object.keys(Icons)" />
        <HstCheckbox title="disabled" v-model="state.disabled" />
        <HstCheckbox title="loading" v-model="state.loading" />
        <HstSelect title="loading-icon" v-model="state.loadingIcon" :options="icons" />
        <HstColorSelect title="color" v-model="state.color" />
      </template>
    </Variant>
    <Variant title="type">
      <div>
        <v-button label="Default" status="primary" type="default" />
        <v-button label="Outline" status="primary" type="outline" />
        <v-button label="Text" status="primary" type="text" />
        <v-button label="Link" status="primary" type="link" />
      </div>
    </Variant>
    <Variant title="status">
      <div>
        <v-button label="Primary" status="primary" type="default" />
        <v-button label="Primary" status="primary" type="outline" />
        <v-button label="Primary" status="primary" type="text" />
      </div>
      <div>
        <v-button status="success" label="Success" type="default" />
        <v-button status="success" label="Success" type="outline" />
        <v-button status="success" label="Success" type="text" />
      </div>
      <div>
        <v-button status="warning" label="Warning" type="default" />
        <v-button status="warning" label="Warning" type="outline" />
        <v-button status="warning" label="Warning" type="text" />
      </div>
      <div>
        <v-button status="danger" label="Danger" type="default" />
        <v-button status="danger" label="Danger" type="outline" />
        <v-button status="danger" label="Danger" type="text" />
      </div>
    </Variant>
    <Variant title="icon">
      <v-button label="Search" status="primary" :icon="icons['Search']" />
      <v-button status="danger"> Close <v-icon :icon="icons['Close']" /></v-button>
    </Variant>
    <Variant title="shape">
      <v-button label="Default" shape="default" status="default" />
      <v-button label="Round" shape="round" status="primary" />
      <v-button status="danger" shape="circle" :icon="icons['Close']" />
    </Variant>
    <Variant title="loading">
      <v-button label="Loading" status="primary" loading />
    </Variant>
    <Variant title="disabled">
      <v-button label="Disabled" status="primary" disabled />
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { Component, reactive } from 'vue'
import { logEvent } from 'histoire/client'
import * as Icons from '@vxin/icons'
import { VButton, ButtonProps, VIcon } from '@/components'
// import { useTheme } from '@/hooks'

// useTheme()
const state = reactive<ButtonProps>({
  label: 'Button',
  // type: 'default',
  // shape: 'square',
  // size: 'medium',
  // color: 'normal',
})

const icons = Object.entries(Icons).reduce((res, [key, icon]) => {
  if (key !== 'default') {
    res[key] = icon
  }
  return res
}, {} as Record<string, Component>)
</script>
