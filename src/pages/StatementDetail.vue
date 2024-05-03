<script setup lang="ts">
import { useRoute } from 'vue-router';

import MainContentWrapper from '@/components/MainContentWrapper.vue';
import BaseContentBlock from '@/components/UI/BaseContentBlock.vue';

const route = useRoute();

const statementId = route.query.id;

console.log(statementId);
</script>

<template>
  <MainContentWrapper>
    <template #content>
      <BaseContentBlock>
        <div>Информация о заявлении</div>
      </BaseContentBlock>
    </template>
  </MainContentWrapper>
</template>
