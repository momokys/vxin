<template>
  <Story title="Icon" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <template #default>
        <v-icon v-bind="state" />
      </template>
      <template #controls>
        <HstSelect title="icon" v-model="state.icon" :options="icons" />
        <HstSlider title="size" v-model="state.size" :step="1" :min="12" :max="100" />
        <HstColorSelect title="color" v-model="state.color" />
      </template>
    </Variant>
    <Variant>
      <template #default>
        <v-space direction="horizontal" wrap>
          <div v-for="icon in icons" :key="icon" class="icon-box" @click="select(icon)">
            <v-icon :icon="icon" :size="40" />
            <span>{{ icon }}</span>
          </div>
        </v-space>
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { VIcon, VSpace, message } from '@/components'
import * as Icons from '@vxin/icons'
import { writeClipboard } from '@vxin/utils'

const icons = Object.keys(Icons).filter((item) => item !== 'default')
const state = reactive<Record<string, any>>({
  size: 24,
  icon: 'Search',
  color: '#000',
})
const select = async (icon: string) => {
  await writeClipboard(icon)
  message.success(`已复制图标：${icon}`)
}
</script>

<style scoped lang="scss">
.icon-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 160px;
  border-radius: 8px;
  background-color: var(--v-color-secondary-0);
  transition: all 0.3s;
  cursor: pointer;
  .v-icon {
    margin-bottom: 16px;
  }
  &:hover {
    background-color: var(--v-color-secondary-1);
  }
}
</style>
