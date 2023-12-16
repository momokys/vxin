<template>
  <Story title="Btn/Btn" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <v-btn v-bind="state" @click="logEvent('click', $event)" />
      <template #controls>
        <HstText title="label" v-model="state.label" />
        <HstSelect title="tag" v-model="state.tag" :options="['button', 'span', 'a']" />
        <HstText v-if="state.tag === 'a' || state.type === 'link'" title="href" v-model="state.href" />
        <HstSelect title="type" v-model="state.type" :options="['default', 'text', 'link', 'outline']" />
        <HstSelect
          title="status"
          v-model="state.status"
          :options="['default', 'primary', 'success', 'warning', 'danger']"
        />
        <HstSelect title="shape" v-model="state.shape" :options="['default', 'circle', 'round']" />
        <HstSelect title="size" v-model="state.size" :options="['mini', 'small', 'medium', 'large']" />
        <HstSelect title="icon" v-model="state.icon" :options="icons" />
        <HstCheckbox title="disabled" v-model="state.disabled" />
        <HstCheckbox title="loading" v-model="state.loading" />
        <HstSelect title="loading-icon" v-model="state.loadingIcon" :options="icons" />
        <HstColorSelect title="color" v-model="state.color" />
      </template>
    </Variant>
    <Variant title="type">
      <div>
        <v-btn label="Default" status="primary" type="default" />
        <v-btn label="Outline" status="primary" type="outline" />
        <v-btn label="Text" status="primary" type="text" />
        <v-btn label="Link" status="primary" type="link" />
      </div>
    </Variant>
    <Variant title="status">
      <div>
        <v-btn label="Primary" status="primary" type="default" />
        <v-btn label="Primary" status="primary" type="outline" />
        <v-btn label="Primary" status="primary" type="text" />
      </div>
      <div>
        <v-btn status="success" label="Success" type="default" />
        <v-btn status="success" label="Success" type="outline" />
        <v-btn status="success" label="Success" type="text" />
      </div>
      <div>
        <v-btn status="warning" label="Warning" type="default" />
        <v-btn status="warning" label="Warning" type="outline" />
        <v-btn status="warning" label="Warning" type="text" />
      </div>
      <div>
        <v-btn status="danger" label="Danger" type="default" />
        <v-btn status="danger" label="Danger" type="outline" />
        <v-btn status="danger" label="Danger" type="text" />
      </div>
    </Variant>
    <Variant title="icon">
      <v-btn label="Search" status="primary" icon="Search" />
      <v-btn status="danger"> Close <v-icon icon="Close" /></v-btn>
    </Variant>
    <Variant title="shape">
      <v-btn label="Default" shape="default" status="default" />
      <v-btn label="Round" shape="round" status="primary" />
      <v-btn status="danger" shape="circle" icon="Close" />
    </Variant>
    <Variant title="disabled">
      <v-btn label="Disabled" status="primary" disabled />
    </Variant>
    <Variant title="loading">
      <v-btn label="Loading" status="primary" loading />
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { logEvent } from 'histoire/client'
import * as Icons from '@vxin/icons'
import { VBtn, BtnProps, VIcon } from '@/components'

const state = reactive<BtnProps>({
  label: 'Button',
})

const icons = Object.keys(Icons)
</script>
