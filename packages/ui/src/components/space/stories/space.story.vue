<template>
  <Story title="Space" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <template #default>
        <v-space v-bind="state">
          <div class="box">1</div>
          <div class="box">2</div>
          <div class="box">3</div>
          <div class="box">4</div>
          <div class="box">5</div>
        </v-space>
      </template>
      <template #controls>
        <HstRadio
          v-model="state.direction"
          title="direction"
          :options="[
            { label: 'horizontal', value: 'horizontal' },
            { label: 'vertical', value: 'vertical' },
          ]"
        />
        <HstSelect
          v-model="state.justify"
          title="justify"
          :options="[
            'start',
            'end',
            'center',
            'space-around',
            'space-between',
            'space-evenly',
          ]"
        />
        <HstSelect
          v-model="state.align"
          title="align"
          :options="{
            start: 'start',
            end: 'end',
            center: 'center',
            baseline: 'baseline',
            stretch: 'stretch',
          }"
        />
        <HstSelect
          v-model="state.size"
          title="size"
          :options="['small','medium','large']"
        />
        <HstCheckbox v-model="state.inline" title="inline" />
        <HstCheckbox v-model="state.wrap" title="wrap" />
        <HstCheckbox v-model="state.reverse" title="reverse" />
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { VSpace } from '@/components'

const state = reactive<Record<string, any>>({
  direction: 'horizontal',
  wrap: false,
  reverse: false,
})
</script>

<style scoped lang="scss">
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 5px;
  font-size: 24px;
  color: #ffffff;
  background-color: var(--v-color-primary);
}
</style>
