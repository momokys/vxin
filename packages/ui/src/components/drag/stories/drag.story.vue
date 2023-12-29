<template>
  <Story title="Drag" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <div style="position: relative; width: 100%; height: 400px">
        <div class="box" :style="{ transform: matrix3d }" @mousedown="dnd.handler" />
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dnd, Transform, Vec2D } from '@vxin/utils'

const t = new Transform()
const matrix3d = ref<string>(t.rotateZ(Math.PI / 2).css())
const dnd = new Dnd().on('drag', (ev) => {
  matrix3d.value = t.translate(ev.diff.x, ev.diff.y).css()
})

const v = new Vec2D(1, 1)
console.log(Transform.translate(1).apply(v).toString())
</script>

<style scoped lang="scss">
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -50px;
  margin-left: -50px;
  width: 100px;
  height: 100px;
  transform-origin: 50% 50%;
  background-color: #3a7afe;
}
</style>
