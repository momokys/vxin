<template>
  <Story title="Carousel" :layout="{ type: 'grid', width: '100%' }">
    <Variant title="playground">
      <div class="container">
        <div class="carousel" @mousedown="dnd.handler">
          <div class="view" :style="style">
            <div v-for="index in 6" :key="index" class="card">{{ index }}</div>
          </div>
        </div>
      </div>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { invoke, Dnd } from '@vxin/utils'

const rad = ref(0)
const style = computed(() => ({
  // transform: `rotateX(-15deg) rotateY(${rad.value}deg)`,
}))
const dnd = new Dnd().on('drag', (ev) => {
  rad.value += (ev.diff.x / 1000) * 360
  rad.value %= 360
  rad.value = Math.round(rad.value)
})
invoke(function render() {
  rad.value += 1
  rad.value %= 360
  requestAnimationFrame(render)
})
for (let i = 0; i < 6; i++) {
  const rad = i * (Math.PI / 3) + Math.PI / 2
  console.log(`translate3d(${Math.round(Math.cos(rad) * 300)}px, 0, ${Math.round(Math.sin(rad) * 300)}px)`)
}
</script>

<style scoped lang="scss">
.container {
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .carousel {
    width: 300px;
    height: 150px;
    position: relative;
    perspective: 1000px;
    transform-style: preserve-3d;
    transform: rotateX(-15deg);
    transform-origin: center;
    .view {
      width: 100%;
      height: 100%;
      background-color: #f44336;
      transform-style: preserve-3d;
      animation: plane-rotate 10s infinite;

      @keyframes plane-rotate {
        //@each $index in (0, 1, 2, 3, 4, 5) {
        //  #{$index * 20}% {
        //    transform: rotateY(-#{$index * 72}deg);
        //  }
        //}
        0% {
          transform: rotateY(0) scaleZ(0.5);
        }
        100% {
          transform: rotateY(360deg) scaleZ(0.5);
        }
      }

      .card {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 24px;
        text-align: center;
        line-height: 100px;
        color: #ffffff;
        background-color: #3a7afe;

        @each $index in (1, 2, 3, 4, 5, 6) {
          &:nth-child(#{$index}) {
            //transform: rotateY(#{($index - 1) * 60}deg) translateZ(300px);
            animation: self-action-#{$index} 10s infinite;

            @keyframes self-action-#{$index} {
              0% {
                //transform: scaleZ(2) rotateY(#{($index - 1) * 60}deg) translateZ(300px);
                transform: translateZ(300px) scaleZ(2) rotateY(#{($index - 1) * 60}deg);
              }
              100% {
                //transform: scaleZ(2) rotateY(#{($index - 1) * 60 - 360}deg) translateZ(300px);
                transform: translateZ(300px) scaleZ(2) rotateY(#{($index - 1) * 60 - 360}deg);
              }
            }
          }
        }
      }
    }
  }
}
</style>
