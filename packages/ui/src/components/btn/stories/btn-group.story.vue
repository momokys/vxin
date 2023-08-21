<template>
  <Story title="Btn/BtnGroup" :layout="{ type: 'grid', width: '100%' }">
    <Variant>
      <v-btn-group size="small">
        <v-btn label="Left" />
        <v-btn label="Center" />
        <v-btn label="Right" />
      </v-btn-group>
      <v-btn-group size="small">
        <v-btn label="Search" />
        <v-btn icon="Search" />
      </v-btn-group>
      <v-btn-group :disabled="true">
        <v-btn label="Close" />
        <v-btn icon="Close" />
      </v-btn-group>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { VBtnGroup, VBtn } from '@/components'
</script>
