<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import axios from 'axios';

import BaseButton from '@/components/UI/BaseButton.vue';
import BaseInput from '@/components/UI/BaseInput.vue';

import { useNotificationsStore } from '@/stores/NotificationsStore';
import { useApi } from '@/composables/api';
import { useValidationRules } from '@/composables/validationRules';
import { validateForm } from '@/helpers/validateForm';
import { useProfileStore } from '@/stores/ProfileStore';

const router = useRouter();
const route = useRoute();
const notificationsStore = useNotificationsStore();
const profileStore = useProfileStore();
const { signIn } = useApi();

const formState = reactive({ login: '', password: '' });

if (route.query.login) {
  formState.login = route.query.login.toString();
}

const loginFormRules = computed(() => {
  const { required, password } = useValidationRules();

  return {
    login: { required },
    password: { password, required },
  };
});

const loginV$ = useVuelidate(loginFormRules.value, formState);

async function onLoginFormSubmit() {
  if (!(await validateForm(loginV$))) return;

  signIn(formState)
    .then((res) => {
      profileStore.token = res.data.token;
      router.push({ name: 'main' });
    })
    .catch((error: any) => {
      let errorMessage = 'Что-то пошло не так.';
      if (axios.isAxiosError(error)) {
        switch (error.response?.data.response.status) {
          case 400:
            errorMessage = 'Ошибка авторизации';
            break;
          case 403:
            errorMessage = 'Не удалось войти. Вы ввели неверный логин или пароль.';
            break;
        }
      }
      console.log(error);
      notificationsStore.createNotification({ type: 'error', message: errorMessage });
    });
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
        :label="'Логин'"
        :placeholder="'Введите логин'"
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
