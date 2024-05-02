<script setup lang="ts">
import MainContentWrapper from '../components/MainContentWrapper.vue';
import BaseContentBlock from '@/components/UI/BaseContentBlock.vue';
</script>

<template>
  <MainContentWrapper>
    <template #content>
      <BaseContentBlock>
        <h1>Main Page</h1>
      </BaseContentBlock>
    </template>
  </MainContentWrapper>
</template>
