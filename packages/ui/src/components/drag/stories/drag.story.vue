<template>
  <Story title="Drag" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <div style="position: relative; width: 100%; height: 400px">
        <div class="box" :style="style" @mousedown="dnd.handler" />
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { computed, CSSProperties, reactive } from 'vue'
import { Dnd, Vec3D } from '@vxin/utils'

const vec = reactive<Vec3D>({ x: 0, y: 0, z: 0 })
const style = computed<CSSProperties>(() => ({
  transform: `translate3d(${vec.x}px, ${vec.y}px, ${vec.z}px)`,
}))
const dnd = new Dnd().on('drag', (ev) => {
  vec.x += ev.diff.x
  vec.y += ev.diff.y
})
</script>

<style scoped lang="scss">
.box {
  //position: absolute;
  width: 100px;
  height: 100px;
  background-color: #3a7afe;
}
</style>
