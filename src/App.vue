<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import BaseToast from './components/UI/BaseToast.vue';

import { useProfileStore } from '@/stores/ProfileStore';
import { useNotificationsStore } from '@/stores/NotificationsStore';
import { checkRequiresAuth } from './helpers/checkRequiresAuth';

import type { RouteName } from '@/types/RouteName';

const profileStore = useProfileStore();
const notificationsStore = useNotificationsStore();

const route = useRoute();

const hasCommonLayout = computed(() => {
  const uncommonLayoutPages: RouteName[] = ['login', 'signup', 'signup-confirmation'];
  if (uncommonLayoutPages.includes(route.name as RouteName)) {
    return false;
  }
  return true;
});
</script>

<template>
  <div
    v-if="profileStore.isAuthenticatedLoaded"
    class="grid h-full min-h-screen grid-cols-1 grid-rows-[auto_1fr_auto]"
  >
    <main
      v-if="profileStore.profileData || !checkRequiresAuth(route.name as RouteName)"
      :class="{ 'self-center': !hasCommonLayout, 'bg-gray-50': hasCommonLayout }"
    >
      <RouterView />
    </main>

    <div
      aria-live="assertive"
      class="pointer-events-none fixed inset-0 z-50 flex items-end overflow-hidden whitespace-pre-line px-4 py-6 sm:items-start sm:p-6"
    >
      <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        <transition-group
          move-class="transition-all duration-300"
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-1/4 opacity-0 sm:translate-y-0 sm:translate-x-1/4"
          enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
          leave-active-class="transition absolute ease-in duration-300"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0 sm:translate-x-1/4"
        >
          <BaseToast
            v-for="notification of notificationsStore.notifications"
            :id="notification.id"
            :key="notification.id"
            :type="notification.type"
            :message="notification.message"
            :auto-close="notification.autoClose"
            :duration="notification.duration"
            @close="notificationsStore.removeNotification(notification.id)"
          ></BaseToast>
        </transition-group>
      </div>
    </div>
  </div>
  <div v-else></div>
</template>

<style>
.overflow-y-scroll {
  overflow-y: auto !important;
}
</style>
