<template>
  <Story title="Message" :layout="{ type: 'grid', width: 800, height: 500 }">
    <Variant title="playground">
      <template #default>
        <v-btn label="消息" status="primary" @click="onClick" />
        <!--        <div style="height: 200px">-->
        <!--          <z-message :type="'success'" :icon="Close" :content="'提交成功'" :visible="visible" />-->
        <!--        </div>-->
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { VBtn } from '@/components/button'
import { message } from '@/components'
import { Close } from '@vxin/icons'

const onClick = () => {
  message({
    type: 'success',
    icon: Close,
    msg: '提交成功',
  })
}
</script>
