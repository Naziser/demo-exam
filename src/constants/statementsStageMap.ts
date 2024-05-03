import { computed } from 'vue';

export const statementsStagesMap = computed(
  () =>
    new Map([
      ['Pending', { name: 'Ожидает', colorClass: 'bg-yellow-100' }],
      ['Confirmed', { name: 'Подтверждено', colorClass: 'bg-green-100' }],
      ['Rejected', { name: 'Отклонено', colorClass: 'bg-red-100' }],
    ] as const)
);
