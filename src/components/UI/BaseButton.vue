<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import ArrowIcon from '@/assets/icons/ArrowIcon.vue';

const props = withDefaults(
  defineProps<{
    color?:
      | 'green'
      | 'red'
      | 'yellow'
      | 'green-light'
      | 'red-light'
      | 'yellow-light'
      | 'green-outline'
      | 'red-outline'
      | 'yellow-outline';
    disabled?: boolean;
    small?: boolean;
    textButton?: boolean;
    routerLink?: boolean;
    arrowLeft?: boolean;
    arrowRight?: boolean;
  }>(),
  {
    color: 'green',
  }
);

const buttonClass = computed(() => {
  let colorClasses = '';
  switch (props.color) {
    case 'green':
      colorClasses =
        'bg-green-900 text-gray-50 active:bg-green-800 hover:[&:not([disabled])]:bg-green-800';
      break;
    case 'green-light':
      colorClasses =
        'bg-green-100 text-green-900 active:bg-green-200 hover:[&:not([disabled])]:bg-green-200';
      break;
    case 'green-outline':
      colorClasses =
        'border border-green-800 text-green-800 active:bg-green-50 hover:[&:not([disabled])]:bg-green-50';
      break;
    case 'red':
      colorClasses =
        'bg-red-950 text-gray-50 active:bg-red-900 hover:[&:not([disabled])]:bg-red-900';
      break;
    case 'red-light':
      colorClasses =
        'bg-red-100 text-red-950 active:bg-red-200 hover:[&:not([disabled])]:bg-red-200';
      break;
    case 'red-outline':
      colorClasses =
        'border border-red-800 text-red-800 active:bg-red-50 hover:[&:not([disabled])]:bg-red-50';
      break;
    case 'yellow':
      colorClasses =
        'bg-yellow-700 text-gray-50 active:bg-yellow-600 hover:[&:not([disabled])]:bg-yellow-600';
      break;
    case 'yellow-light':
      colorClasses =
        'bg-yellow-100 text-yellow-700 active:bg-yellow-200 hover:[&:not([disabled])]:bg-yellow-200';
      break;
    case 'yellow-outline':
      colorClasses =
        'border border-yellow-700 text-yellow-700 active:bg-yellow-50 hover:[&:not([disabled])]:bg-yellow-50';
      break;
  }

  const fontSizeClass = props.small ? 'text-xs' : 'text-s';

  return [colorClasses, fontSizeClass];
});

const textButtonClass = computed(() => {
  let textClass = '!rounded-full !px-2 py-2 !ring-offset-0';

  return [textClass];
});
</script>

<template>
  <component
    :is="routerLink ? RouterLink : 'button'"
    :class="textButton ? textButtonClass : buttonClass"
    :disabled="disabled || null"
    class="flex select-none items-center justify-center gap-2.5 rounded-md px-6 py-2 text-center font-normal outline-none ring-gray-950 ring-offset-4 transition duration-300 focus-visible:ring-1 disabled:bg-gray-300 [&>*]:flex-shrink-0"
  >
    <ArrowIcon v-show="props.arrowLeft" />
    <slot>*No text*</slot>
    <ArrowIcon v-show="props.arrowRight" class="rotate-180" />
  </component>
</template>

<style scoped></style>
