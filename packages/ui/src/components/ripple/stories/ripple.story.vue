<template>
  <Story title="Ripple" :layout="{ type: 'grid', width: 800 }">
    <Variant title="playground">
      <template #default>
        <div class="wrap" @click="onClick">
          <span :class="`v-ripple ${ active ? 'play' : '' }`"></span>
        </div>
      </template>
    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { VRipple } from '@/components'

const active = ref(false)

const onClick = () => {
  active.value = !active.value
}

</script>

<style lang="scss">
.wrap {
  position: relative;
  width: 600px;
  height: 600px;
  background-color: var(--v-color-primary-0);
  .v-ripple {
    --v-ripple-r: 100px;
    --v-ripple-l: calc(var(--v-ripple-r) * 2);
    --v-ripple-d: calc(0px - var(--v-ripple-r));
    --v-ripple-x: 300px;
    --v-ripple-y: 300px;
    display: inline-block;
    position: absolute;
    top: var(--v-ripple-y);
    left: var(--v-ripple-x);
    width: var(--v-ripple-l);
    height: var(--v-ripple-l);
    border-radius: var(--v-ripple-r);
    margin-top: var(--v-ripple-d);
    margin-left: var(--v-ripple-d);
    background-color: var(--v-color-primary-1);
    transform: scale(0);
    transition: all .2s;

    &.play {
      transform: scale(1);
    }
  }
}
</style>
