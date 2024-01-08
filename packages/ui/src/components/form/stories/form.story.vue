<template>
  <Story title="Form" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <VForm v-bind="state" v-model:data="data">
        <VField name="userName" label="Username">
          <VInput />
        </VField>
        <VField name="password" label="Password">
          <VInput type="password" />
        </VField>
        <VField label="Address">
          <VField name="country">
            <VInput placeholder="country" />
          </VField>
          <VField name="city">
            <VInput placeholder="city" />
          </VField>
        </VField>
      </VForm>
      <template #controls>
        <HstCheckbox title="readonly" v-model="state.readonly" />
        <HstCheckbox title="disabled" v-model="state.disabled" />
        <HstButtonGroup title="size" v-model="state.size" :options="['mini', 'small', 'medium', 'large']" />
        <HstNumber title="labelWidth" v-model="state.labelWidth" />
        <HstButtonGroup title="labelAlign" v-model="state.labelAlign" :options="['left', 'right', 'top']" />
      </template>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { VForm, VField, VInput, FormProps } from '@/components'

const state = reactive<FormProps>({
  size: 'medium',
  labelWidth: undefined,
  labelAlign: 'top',
  readonly: false,
  disabled: false,
})
const data = reactive({
  userName: '',
  password: '',
  country: '',
  city: '',
})

watch(
  () => data,
  () => {
    console.log(data)
  },
  { deep: true },
)
</script>
