<template>
  <Story title="Form" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <VForm>
        <VFormItem field="userName" label="Username" label-width="100px">
          <VInput v-model="model.userName" />
        </VFormItem>
        <VFormItem field="password" label="Password" label-width="100px">
          <VInput v-model="model.password" type="password" />
        </VFormItem>
        <VFormItem label="Address" label-width="100px">
          <VFormItem field="country">
            <VInput v-model="model.country" placeholder="country" />
          </VFormItem>
          <VFormItem field="city">
            <VInput v-model="model.city" placeholder="city" />
          </VFormItem>
        </VFormItem>
      </VForm>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { VForm, VFormItem, VInput } from '@/components'

const model = reactive({
  userName: '',
  password: '',
  country: '',
  city: '',
})
</script>
