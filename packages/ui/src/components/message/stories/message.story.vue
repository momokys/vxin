<template>
  <Story title="Message" :layout="{ type: 'grid', width: 800, height: 500 }">
    <Variant title="playground">
      <template #default>
        <v-btn label="info" status="primary" @click="onClick('info')" />
        <v-btn label="success" status="success" @click="onClick('success')" />
        <v-btn label="warning" status="warning" @click="onClick('warning')" />
        <v-btn label="error" status="danger" @click="onClick('error')" />
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { VBtn } from '@/components/btn'
import { message, MessageType } from '@/components'

let count = 0
const onClick = (type: MessageType) => {
  message[type](`This is ${type} message（${count}）`)
  count = count + 1
}
</script>
