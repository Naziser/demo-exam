<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
// import axios from 'axios';

import BaseButton from '@/components/UI/BaseButton.vue';
import BaseInput from '@/components/UI/BaseInput.vue';

// import { useNotificationsStore } from '@/stores/NotificationsStore';
// import { useApi } from '@/composables/api';
import { useValidationRules } from '@/composables/validationRules';
import { validateForm } from '@/helpers/validateForm';

const router = useRouter();
const route = useRoute();
// const notificationsStore = useNotificationsStore();
// const { signIn } = useApi();

const formState = reactive({ login: '', password: '' });

if (route.query.login) {
  formState.login = route.query.login.toString();
}

const loginFormRules = computed(() => {
  const { required, email } = useValidationRules();

  return {
    login: { email, required },
    password: { required },
  };
});

const loginV$ = useVuelidate(loginFormRules.value, formState);

// const signInAction = (action: any) => {
//   action(formState)
//     .then(() => {
//       const routeName = route.path.includes('/admin') ? 'admin-projects' : 'main';
//       router.push({ name: routeName });
//     })
//     .catch((error: any) => {
//       let errorMessage = 'Что-то пошло не так.';
//       if (axios.isAxiosError(error)) {
//         switch (error.response?.data.response.status) {
//           case 4003:
//             errorMessage = 'Не удалось войти. Вы ввели неверный логин или пароль.';
//             break;
//         }
//       }
//       console.log(error);
//       notificationsStore.createNotification({ type: 'error', message: errorMessage });
//     });
// };

async function onLoginFormSubmit() {
  if (!(await validateForm(loginV$))) return;
  // Тут надо будет дернуть запрос signIn и если все хорошо, то в then перенаправлять на main страницу
  router.push({ name: 'main' });
}
</script>
<template>
  <form class="flex w-full flex-col gap-6" @submit.prevent="onLoginFormSubmit">
    <div class="flex flex-col gap-6">
      <BaseInput
        id="username"
        v-model="formState.login"
        :error="loginV$.login ? loginV$.login.$error : false"
        name="username"
        :label="'Электронная почта'"
        :placeholder="'Введите электронную почту'"
        autocapitalize="off"
        autocomplete="email"
        autocorrect="off"
      />
      <BaseInput
        id="current-password"
        v-model="formState.password"
        :error="loginV$.password ? loginV$.password.$error : false"
        name="current-password"
        :label="'Пароль'"
        :placeholder="'Введите пароль'"
        autocapitalize="off"
        autocomplete="password"
        autocorrect="off"
        type="password"
      />
    </div>
    <BaseButton type="submit">Войти</BaseButton>
  </form>
</template>
