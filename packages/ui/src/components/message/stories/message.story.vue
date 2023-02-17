<template>
  <Story title="Message" :layout="{ type: 'grid', width: 800, height: 500 }">
    <Variant title="playground">
      <template #default>
        <v-button label="消息" type="primary" @click="onClick" />
<!--        <div style="height: 200px">-->
<!--          <z-message :type="'success'" :icon="Close" :content="'提交成功'" :visible="visible" />-->
<!--        </div>-->

      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { VButton } from '@/components/button'
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
