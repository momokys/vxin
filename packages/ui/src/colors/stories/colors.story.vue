<template>
  <Story title="Colors" :layout="{ type: 'grid', width: 400 }">
    <Variant title="playground">

    </Variant>
  </Story>
</template>
<script setup lang="ts">
import { inject } from 'vue'
import { THEME_KEY } from '@/_tokens'

const theme = inject(THEME_KEY)

</script>
