<template>
  <Story title="Form" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <VForm v-bind="state" v-model:model="model">
        <VField name="userName" label="Username">
          <VInput v-model="model.userName" />
        </VField>
        <VField name="password" label="Password">
          <VInput v-model="model.password" type="password" />
        </VField>
        <VField label="Address">
          <VField name="country">
            <VInput v-model="model.country" placeholder="country" />
          </VField>
          <VField name="city">
            <VInput v-model="model.city" placeholder="city" />
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
import { reactive } from 'vue'
import { VForm, VField, VInput, FormProps } from '@/components'

const state = reactive<FormProps>({
  size: 'medium',
  labelWidth: undefined,
  labelAlign: 'left',
  readonly: false,
  disabled: false,
})
const model = reactive({
  userName: '',
  password: '',
  country: '',
  city: '',
})
</script>
