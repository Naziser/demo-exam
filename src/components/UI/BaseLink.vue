<script setup lang="ts">
import { RouterLink } from 'vue-router';

const props = withDefaults(
  defineProps<{
    routerLink?: boolean;
    button?: boolean;
    underlined?: boolean;
    color?: 'green';
  }>(),
  {
    color: 'green',
  }
);
</script>

<template>
  <component
    :is="routerLink ? RouterLink : button ? 'button' : 'a'"
    class="-mb-px cursor-pointer whitespace-nowrap text-s text-green-700 transition-colors duration-300 hover:text-green-900"
    :class="props.underlined ? 'underline' : 'no-underline'"
  >
    <slot></slot>
  </component>
</template>
