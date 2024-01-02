<template>
  <Story title="Modal" :layout="{ type: 'grid', width: 800 }">
    <Variant title="playground">
      <v-modal v-model:visible="state.visible" v-bind="state">
        <div style="height: 200px">
          <h1 style="margin: 0">Hello world!</h1>
        </div>
      </v-modal>
      <VBtn label="模态窗" @click="state.visible = true" />
      <template #controls>
        <HstText v-model="state.title" title="title" />
        <HstNumber v-model="state.height" title="height" />
        <HstNumber v-model="state.width" title="width" />
        <HstCheckbox title="shade" v-model="state.shade" />
        <HstCheckbox title="fullscreen" v-model="state.fullscreen" />
        <HstCheckbox title="fullscreenEnabled" v-model="state.fullscreenEnabled" />
        <HstCheckbox title="draggable" v-model="state.draggable" />
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { VBtn, VModal, ModalProps } from '@/components'

const state = reactive<ModalProps>({
  title: 'Title',
  visible: false,
  width: 800,
  height: 400,
  shade: true,
  fullscreen: false,
  fullscreenEnabled: true,
  draggable: true,
})
</script>
