<template>
  <Story title="Modal" :layout="{ type: 'grid', width: 800 }">
    <Variant title="playground">
      <template #default>
        <v-button label="模态框" type="primary" @click="open" />
        <v-modal v-model:visible="state.visible" v-bind="state">
          <div style="height: 200px">
            <h1 style="margin: 0">Hello world!</h1>
          </div>
        </v-modal>
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { VButton, VModal } from '@vxin/ui'

const state = reactive<Record<string, any>>({
  visible: false,
  width: 800,
  fullscreen: false,
})

const open = () => {
  state.visible = !state.visible
}
</script>
