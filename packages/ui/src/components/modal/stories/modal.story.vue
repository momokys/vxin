<template>
  <Story title="Modal" :layout="{ type: 'grid', width: 800 }">
    <Variant title="playground">
      <v-modal v-model:visible="state.visible" v-bind="state">
        <div style="height: 200px">
          <h1 style="margin: 0">Hello world!</h1>
        </div>
      </v-modal>
      <template #controls>
        <HstButtonGroup
          v-model="state.visible"
          title="visible"
          :options="[
            {
              label: 'true',
              value: true,
            },
            {
              label: 'false',
              value: false,
            },
          ]"
        />
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { VModal } from '@/components'

const state = reactive<Record<string, any>>({
  visible: false,
  width: 800,
  fullscreen: false,
})
</script>
