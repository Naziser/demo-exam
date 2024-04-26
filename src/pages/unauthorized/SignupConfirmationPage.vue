<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from '@/components/UI/BaseButton.vue';

// import { useNotificationsStore } from '@/stores/NotificationsStore';
// import { useApi } from '@/composables/api';

import type { RouteName } from '@/types/RouteName';

// const { confirmSignUp } = useApi();
// const router = useRouter();
const route = useRoute();
// const notificationsStore = useNotificationsStore();

// const login = computed(() => route.query.login);
const name = computed(() => route.query.name);
// const hash = computed(() => route.query.hash as string);

// onBeforeMount(async () => {
//   if (hash.value) {
//     await confirmSignUp(hash.value)
//       .then(() => {
//         notificationsStore.createNotification({
//           type: 'success',
//           message: t('notifications.success.signup'),
//         });
//       })
//       .catch(() => {
//         notificationsStore.createNotification({
//           type: 'error',
//           message: t('notifications.error.generic'),
//         });
//       });
//     router.push({ name: 'login' satisfies RouteName });
//   } else if (!(login.value && name.value)) router.push({ name: 'not-found' satisfies RouteName });
// });
</script>
<template>
  <article class="flex max-w-lg flex-col items-center gap-8 text-center text-m">
    <p class="text-l">{{ name }}, благодарим за регистрацию!</p>
    <BaseButton router-link class="w-48" :to="{ name: 'login' satisfies RouteName }">
      Войти
    </BaseButton>
  </article>
</template>
