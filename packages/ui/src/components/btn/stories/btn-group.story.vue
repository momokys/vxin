<template>
  <Story title="Btn/BtnGroup" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <v-btn-group v-bind="state">
        <v-btn label="Left" />
        <v-btn label="Center" />
        <v-btn label="Right" />
      </v-btn-group>
      <template #controls>
        <HstSelect title="size" v-model="state.size" :options="['mini', 'small', 'medium', 'large']" />
        <HstCheckbox title="disabled" v-model="state.disabled" />
      </template>
    </Variant>
    <Variant>
      <v-btn-group size="small">
        <v-btn label="Search" />
        <v-btn icon="Search" />
      </v-btn-group>
      <v-btn-group :disabled="true">
        <v-btn label="Close" />
        <v-btn icon="Close" />
      </v-btn-group>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { VBtnGroup, VBtn, BtnGroupProps } from '@/components'
import { reactive } from 'vue'

const state = reactive<BtnGroupProps>({
  size: 'small',
})
</script>
