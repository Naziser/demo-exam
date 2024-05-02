<script setup lang="ts">
import BaseHeader from './BaseHeader.vue';
</script>
<template>
  <div class="flex h-full min-h-screen overflow-hidden">
    <div class="flex h-full w-full flex-col bg-gray-100">
      <BaseHeader />
      <div class="w-full flex-1 overflow-scroll p-[16px]">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
