<template>
  <Story title="Modal" :layout="{ type: 'grid', width: 800 }">
    <Variant title="playground">
      <template #default>
        <z-button label="模态框" type="primary" @click="open" />
        <z-modal v-model:visible="state.visible" v-bind="state">
          <div style="height: 200px">
            <h1 style="margin: 0">Hello world!</h1>
          </div>
        </z-modal>
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { ZButton, ZModal } from '@vxin/ui'

const state = reactive<Record<string, any>>({
  visible: false,
  width: 800,
  fullscreen: false,
})

const open = () => {
  state.visible = !state.visible
}
</script>
