<template>
  <Story title="Input" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <v-input v-bind="state" v-model="state.modelValue" />
      <template #controls>
        <HstText title="modelValue" v-model="state.modelValue" />
        <HstButtonGroup title="type" v-model="state.type" :options="['text', 'password']" />
        <HstButtonGroup title="size" v-model="state.size" :options="['mini', 'small', 'medium', 'large']" />
        <HstText title="placeholder" v-model="state.placeholder" />
        <HstSlider title="max-len" v-model="state.maxLen" :step="1" :min="0" :max="100" />
        <HstCheckbox title="show-word-limit" v-model="state.showWordLimit" />
        <HstCheckbox title="allow-over" v-model="state.allowOver" />
        <HstCheckbox title="clearable" v-model="state.clearable" />
        <HstCheckbox title="readonly" v-model="state.readonly" />
        <HstCheckbox title="disabled" v-model="state.disabled" />
        <HstCheckbox title="error" v-model="state.error" />
      </template>
    </Variant>
    <Variant title="status">
      <div>
        <v-input v-model="state.modelValue" class="mb-1" full readonly />
        <v-input v-model="state.modelValue" class="mb-1" full disabled />
        <v-input v-model="state.modelValue" class="mb-1" full error />
      </div>
    </Variant>
    <Variant title="size">
      <div>
        <v-input v-model="state.modelValue" size="mini" class="mb-1" full />
        <v-input v-model="state.modelValue" size="small" class="mb-1" full />
        <v-input v-model="state.modelValue" size="medium" class="mb-1" full />
        <v-input v-model="state.modelValue" size="large" class="mb-1" full />
      </div>
    </Variant>
    <Variant title="word limit">
      <div>
        <v-input v-model="state.modelValue" :max-len="10" show-word-limit class="mb-1" full />
        <v-input v-model="state.modelValue" :max-len="10" show-word-limit allow-over class="mb-1" full />
      </div>
    </Variant>
    <Variant title="prefix or suffix">
      <div>
        <v-input v-model="state.modelValue" class="mb-1" full>
          <template #prefix>
            <span>+86</span>
          </template>
        </v-input>
        <v-input v-model="state.modelValue" class="mb-1" full>
          <template #suffix>
            <span>.00</span>
          </template>
        </v-input>
        <v-input v-model="state.modelValue" class="mb-1" full>
          <template #suffix>
            <v-btn icon="Search" type="text" shape="circle" size="mini" />
          </template>
        </v-input>
      </div>
    </Variant>
    <Variant title="password">
      <v-input v-model="state.modelValue" type="password" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
// import { logEvent } from 'histoire/client'
import { VBtn, VInput, InputProps } from '@/components'

const state = reactive<InputProps>({
  type: 'text',
  // modelValue: '',
  placeholder: '请输入',
  maxLen: 100,
})
</script>

<style scoped lang="scss">
.mb-1 {
  margin-bottom: 1rem;
}
</style>
