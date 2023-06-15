<template>
  <div>
    <h1 :title="title">你好</h1>
  </div>
</template>

<script setup lang="ts">
import { test } from '@/utils'
const title = '你好'
test()
console.log('测试')
</script>
