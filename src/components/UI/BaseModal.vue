<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import BaseButton from './BaseButton.vue';
import type { BindingClass } from '@/types/BindingClass';

defineOptions({ inheritAttrs: false, disabledOnConfirm: false, disabledOnCancel: false });

defineProps<{
  isOpen: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  disabledOnConfirm?: boolean;
  disabledOnCancel?: boolean;
  danger?: boolean;
  fullScreen?: boolean;
  headerClass?: BindingClass;
  bodyClass?: BindingClass;
  footerClass?: BindingClass;
  isForm?: boolean;
}>();

defineEmits<{ close: [void] }>();
</script>

<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-10" @close="$emit('close')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/20 transition-opacity" />
      </TransitionChild>

      <TransitionChild as="template" leave="ease-in duration-200 !overflow-hidden">
        <div class="fixed inset-0 z-10 overflow-y-scroll">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                v-bind="$attrs"
                :as="isForm ? 'form' : 'div'"
                :class="[
                  'overflow-hidden rounded-lg bg-white sm:w-full',
                  fullScreen
                    ? 'min-w-fit gap-0 p-0 sm:max-w-[1088px]'
                    : 'relative flex flex-col gap-6 p-10 sm:my-8 sm:max-w-[469px]',
                ]"
                @submit.prevent="isForm && onConfirm ? onConfirm!() : null"
              >
                <h3 class="text-m" :class="headerClass">
                  <slot name="header"></slot>
                </h3>
                <section class="text-s" :class="bodyClass">
                  <slot name="body"></slot>
                </section>
                <slot name="footer" :class="footerClass">
                  <section class="grid grid-cols-2 gap-6">
                    <BaseButton
                      v-if="onCancel"
                      :disabled="disabledOnCancel"
                      color="green-outline"
                      :class="{ 'col-span-2': !onConfirm }"
                      type="button"
                      @click="onCancel"
                    >
                      <!-- :class="{ 'col-start-2': !onConfirm }" -->
                      <slot name="cancel-text"></slot>
                    </BaseButton>
                    <BaseButton
                      v-if="onConfirm"
                      :disabled="disabledOnConfirm"
                      :color="danger ? 'red' : 'green'"
                      :class="{ 'col-span-2': !onCancel }"
                      @click="isForm ? null : onConfirm!()"
                    >
                      <!-- :class="{ 'col-start-2': !onCancel }" -->
                      <slot name="confirm-text"></slot>
                    </BaseButton>
                  </section>
                </slot>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
