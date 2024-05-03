<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue';

import { useApi } from '@/composables/api';

import { statementsStagesMap } from '@/constants/statementsStageMap';
import type { StatementData } from '@/types/StatementData';

import BaseButton from '@/components/UI/BaseButton.vue';
import BaseModal from '@/components/UI/BaseModal.vue';
import BaseInput from '@/components/UI/BaseInput.vue';
import MainContentWrapper from '../components/MainContentWrapper.vue';
import BaseContentBlock from '@/components/UI/BaseContentBlock.vue';

const { getProfileStatements, createStatement } = useApi();

const statements = ref<any>([]);
const isModalOpen = ref<boolean>(false);

const modalValues = reactive<StatementData>({
  vehicleRegistrationNumber: '',
  violationDescription: '',
});

function fetchStatements() {
  getProfileStatements().then((res) => {
    statements.value = res.data;
  });
}

function createStatementRow() {
  createStatement(modalValues).then(() => {
    fetchStatements();
    isModalOpen.value = false;
    modalValues.vehicleRegistrationNumber = '';
    modalValues.violationDescription = '';
  });
}

onBeforeMount(() => {
  fetchStatements();
});
</script>

<template>
  <MainContentWrapper>
    <template #content>
      <div class="flex h-full w-full flex-col gap-6">
        <BaseContentBlock
          class="flex items-center justify-between gap-6 rounded-md bg-gray-50 px-6 py-2 shadow-sm"
        >
          <span>Мои заявления</span>
          <BaseButton @click="isModalOpen = true">Добавить</BaseButton>
        </BaseContentBlock>
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
      </div>
    </template>
  </MainContentWrapper>

  <BaseModal
    :is-open="isModalOpen"
    :on-cancel="() => (isModalOpen = false)"
    :on-confirm="createStatementRow"
    is-form
    @close="isModalOpen = false"
  >
    <template #header> Оформление заявления </template>
    <template #body>
      <div class="flex flex-col gap-6">
        <BaseInput
          v-model="modalValues.vehicleRegistrationNumber"
          class="flex-grow"
          name="username"
          :label="'Номер машины'"
        />
        <BaseInput
          v-model="modalValues.violationDescription"
          class="flex-grow"
          name="username"
          :label="'Описание'"
        />
      </div>
    </template>
    <template #confirm-text>Добавить</template>
    <template #cancel-text>Отменить</template>
  </BaseModal>
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
