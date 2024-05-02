<script setup lang="ts">
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/20/solid';

import { computed, onMounted, ref } from 'vue';
import type { Notification } from '@/types/Notification';

// Props for our component,
// these are the same as Notitfication interface.
const props = defineProps<Notification>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const timer = ref<NodeJS.Timeout>();
const startedAt = ref<number>(0);
const delay = ref<number>(0);

onMounted(() => {
  if (props.autoClose) {
    startedAt.value = Date.now();
    delay.value = props.duration * 1000;
    timer.value = setTimeout(close, delay.value);
  }
});

const toastIcon = computed(() => {
  switch (props.type) {
    case 'error':
      return { component: ExclamationCircleIcon, class: 'text-red-500' };
    case 'success':
      return { component: CheckCircleIcon, class: 'text-green-500' };
    default:
      return { component: InformationCircleIcon, class: 'text-blue' };
  }
});

// a method to close the
// notification and emit the action
const close = () => {
  emit('close');
};
</script>

<template>
  <div
    :ref="id"
    class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
  >
    <div class="p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <component
            :is="toastIcon.component"
            class="h-6 w-6"
            :class="toastIcon.class"
            aria-hidden="true"
          />
        </div>
        <div class="ml-4 w-0 flex-1 break-words pt-0.5">
          <p class="text-s text-gray-900">{{ message }}</p>
        </div>
        <div class="ml-4 flex flex-shrink-0">
          <button
            type="button"
            class="inline-flex text-gray-400 transition-colors duration-300 hover:text-gray-700 focus:text-gray-900"
            @click="close"
          >
            <span class="sr-only">Закрыть</span>
            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
