<template>
  <Story title="Drag" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <div style="position: relative; width: 100%; height: 600px">
        <div ref="tarRef" style="width: 400px; height: 400px; background-color: #00c48f" />
        <div ref="srcRef" class="box" />
        <iframe />
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { isNil } from '@vxin/fns'

const srcRef = ref<HTMLDivElement>()
const tarRef = ref<HTMLDivElement>()
onMounted(() => {
  if (isNil(srcRef.value) || isNil(tarRef.value)) return
  const srcEl = srcRef.value!
  const tarEl = tarRef.value!
  srcEl.draggable = true
  srcEl.addEventListener('dragstart', (ev) => {
    console.log(ev.type)
  })
  srcEl.addEventListener('drag', (ev) => {
    console.log(ev.type)
  })
  srcEl.addEventListener('dragend', (ev) => {
    console.log(ev.type)
  })
  tarEl.addEventListener('dragenter', (ev) => {
    console.log(ev.type)
  })
  tarEl.addEventListener('dragover', (ev) => {
    ev.preventDefault()
    console.log(ev.type)
  })
  tarEl.addEventListener('dragleave', (ev) => {
    console.log(ev.type)
  })
  tarEl.addEventListener('drop', (ev) => {
    console.log(ev.type)
  })
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
