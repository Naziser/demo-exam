<script setup lang="ts">
import { onBeforeMount } from 'vue';

import { useApi } from '@/composables/api';
import MainContentWrapper from '../components/MainContentWrapper.vue';

const { testRequest } = useApi();

onBeforeMount(() => {
  testRequest().then((req) => {
    console.log(req.data);
  });
});
</script>

<template>
  <MainContentWrapper>
    <template #content>
      <div>MAIN PAGE</div>
    </template>
  </MainContentWrapper>
</template>
