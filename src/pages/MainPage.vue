<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import { useApi } from '@/composables/api';

import { statementsStagesMap } from '@/constants/statementsStageMap';

import MainContentWrapper from '../components/MainContentWrapper.vue';
import BaseContentBlock from '@/components/UI/BaseContentBlock.vue';

const { getProfileStatements } = useApi();

const statements = ref<any>([]);

onBeforeMount(() => {
  getProfileStatements().then((res) => {
    console.log(res.data);
    statements.value = res.data;
  });
});
</script>

<template>
  <MainContentWrapper>
    <template #content>
      <BaseContentBlock
        class="flex min-h-full flex-1 flex-col gap-6 rounded-md bg-gray-50 px-6 py-2 shadow-sm"
      >
        <div class="grid-container px-2 py-3">
          <div class="font-extralight">Номер заявления</div>
          <div class="font-extralight">Номер машины</div>
          <div class="font-extralight">Описание</div>
          <div class="font-extralight">Статус</div>
        </div>
        <div class="flex-1 overflow-auto">
          <div
            v-for="statement in statements"
            :key="statement.id"
            class="grid-container mb-4 cursor-pointer rounded-md border px-3 py-4 transition-all duration-300 hover:bg-gray-100 [&>span]:self-center"
          >
            <span class="truncate text-m">Заявление#{{ statement.id }}</span>
            <span class="text-m">{{ statement.vehicle_registration_number }}</span>
            <span class="text-m">{{ statement.violation_description }}</span>
            <span
              class="max-w-fit whitespace-nowrap rounded-md px-3 py-[6px] text-s font-extralight"
              :class="statementsStagesMap.get(statement.status)!.colorClass"
            >
              {{ statementsStagesMap.get(statement.status)!.name }}
            </span>
          </div>
        </div>
      </BaseContentBlock>
    </template>
  </MainContentWrapper>
</template>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 390px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>
