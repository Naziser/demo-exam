<script setup lang="ts">
import { ref, computed, getCurrentInstance } from 'vue';

import type { BindingClass } from '@/types/BindingClass';

import PasswordEyeIcon from '@/assets/icons/PasswordEyeIcon.vue';
import HidePasswordEyeIcon from '@/assets/icons/HidePasswordEyeIcon.vue';
import SearchIcon from '@/assets/icons/SearchIcon.vue';

const instance = getCurrentInstance()!;

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    type?: string;
    name?: string;
    label?: string;
    inputClass?: BindingClass;
    disabled?: boolean;
    error?: boolean;
    withClearBtn?: boolean;
  }>(),
  {
    type: 'text',
    name: '',
    label: '',
    inputClass: '',
  }
);

const emit = defineEmits<{
  'update:error': [error: boolean];
  'update:modelValue': [modelValue: string | number];
  clickIcon: [void];
}>();
emit('update:error', !props.error);

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});

const isPasswordVisible = ref(false);
function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value;
}

const isClearBtnShown = computed(() => {
  if (!props.withClearBtn || props.disabled) return false;
  return inputValue.value.toString().length !== 0 ? true : false;
});

const paddingRightClass = computed(() => {
  let iconsCount = 0;
  // if (props.error) iconsCount++;
  // if (isCustomIconShown.value) iconsCount++;
  if (props.type === 'password' && !props.disabled) iconsCount++;
  if (isClearBtnShown.value) iconsCount++;
  switch (iconsCount) {
    case 0:
      return 'pr-4';
    case 1:
      return 'pr-12';
    case 2:
      return 'pr-20';
    case 3:
      return 'pr-28';
    default:
      return 'pr-36';
  }
});
</script>

<template>
  <div class="input-wrapper relative flex focus-within:z-10" v-bind="{ class: $attrs.class }">
    <input
      :id="`input-${name || instance.uid}`"
      v-model="inputValue"
      :type="type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type"
      v-bind="{ ...$attrs, class: inputClass }"
      class="form-control [input:search]:bg-gray-950 block w-full rounded border-0 px-4 py-2 text-s font-normal text-gray-950 opacity-100 ring-1 ring-gray-300 transition duration-300 placeholder:text-gray-600 placeholder:transition-colors placeholder:duration-300 focus:ring-1 focus:ring-green-700 disabled:text-gray-400 disabled:ring-gray-300 placeholder:disabled:text-gray-400"
      :class="[
        { 'ring-red-700 hover:ring-red-700 focus:ring-red-700': error },
        label ? 'mt-2' : '',
        withClearBtn ? 'pl-8' : '',
        paddingRightClass,
      ]"
      :disabled="disabled"
      :name="name"
    />
    <label
      v-if="label"
      :for="`input-${name || instance.uid}`"
      class="absolute left-3 top-0 inline-block w-11/12 max-w-min truncate rounded bg-white px-1 text-xs font-normal leading-none transition duration-300 [input:disabled+&]:text-gray-200"
      :class="[{ 'text-red-500': error }, withClearBtn ? 'ml-4' : '']"
      >{{ label }}</label
    >
    <span
      class="absolute bottom-0 left-2.5 z-10 flex items-center gap-2"
      :class="label ? 'top-2' : 'top-0'"
    >
      <div
        v-if="type == 'search'"
        type="button"
        class="flex-shrink-1 transition-colors duration-300"
      >
        <span class="sr-only">Очистить поле ввода</span>
        <SearchIcon class="fill-green-700 hover:fill-green-900 disabled:fill-gray-400" />
      </div>
    </span>
    <span
      class="absolute bottom-0 right-4 z-10 flex items-center gap-2"
      :class="label ? 'top-2' : 'top-0'"
    >
      <button
        v-if="type === 'password' && !disabled"
        class="stroke-green-700 transition hover:stroke-green-900"
        type="button"
        @click="togglePasswordVisibility"
      >
        <span class="sr-only">Видимость пароля вкл/выкл</span>

        <component
          :is="isPasswordVisible ? HidePasswordEyeIcon : PasswordEyeIcon"
          class="col-start-1 row-start-1 flex-shrink-0 duration-700"
        />
      </button>
    </span>
    <slot></slot>
  </div>
</template>

<style scoped>
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  display: none;
}
</style>
