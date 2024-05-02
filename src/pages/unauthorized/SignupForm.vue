<script setup lang="ts">
import { reactive, computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import BaseInput from '@/components/UI/BaseInput.vue';
import BaseButton from '@/components/UI/BaseButton.vue';

import useVuelidate from '@vuelidate/core';
import { useApi } from '@/composables/api';
import { useValidationRules } from '@/composables/validationRules';
import { validateForm } from '@/helpers/validateForm';
import { useNotificationsStore } from '@/stores/NotificationsStore';

import type { RouteName } from '@/types/RouteName';
import type { SignupData } from '@/types/SignupData';

const router = useRouter();
const notificationsStore = useNotificationsStore();
const { signUp } = useApi();

const formState = reactive<SignupData>({
  login: '',
  full_name: '',
  email: '',
  phone: '',
  password: '',
});

const formElementsData = computed(() => {
  return [
    {
      component: BaseInput,
      name: 'username',
      model: 'login',
      label: 'Логин',
      type: 'text',
      placeholder: 'Введите логин',
    },
    {
      component: BaseInput,
      name: 'full-name',
      model: 'full_name',
      label: 'ФИО',
      type: 'text',
      placeholder: 'Укажите ваше ФИО',
    },
    {
      component: BaseInput,
      name: 'email',
      model: 'email',
      label: 'Электронная почта',
      type: 'text',
      placeholder: 'Укажите вашу электронную почту',
    },
    {
      component: BaseInput,
      name: 'phone',
      model: 'phone',
      label: 'Телефон',
      type: 'text',
      placeholder: 'Укажите ваш номер телефона',
    },
    {
      component: BaseInput,
      name: 'new-password',
      model: 'password',
      label: 'Пароль',
      type: 'password',
      placeholder: 'Придумайте пароль',
    },
  ] as const;
});

const rules = computed(() => {
  const { required } = useValidationRules();

  return {
    login: { required },
    full_name: { required },
    email: { required },
    phone: { required },
    password: { required },
  };
});

const v$ = useVuelidate(rules.value, { ...toRefs(formState) });

async function onSubmit() {
  const isFormCorrect = await validateForm(v$);
  if (!isFormCorrect) return;

  const signupParams: SignupData = {
    ...formState,
  };
  signUp(signupParams)
    .then(() => {
      notificationsStore.createNotification({
        type: 'success',
        message: 'Пользователь успешно зарегестрирован, можете войти в аккаунт.',
      });
      router.push({
        name: 'login' satisfies RouteName,
      });
    })
    .catch((error) => {
      let errorMessage = 'Что-то пошло не так';
      if (axios.isAxiosError(error)) {
        switch (error.response?.data.response.status) {
          case 400:
            errorMessage =
              'Пользователь уже существует. Авторизуйтесь либо используйте для регистрации другую электронную почту.';
            break;
        }
      }
      console.log(error);
      notificationsStore.createNotification({ type: 'error', message: errorMessage });
    });
}
</script>

<template>
  <form
    class="flex w-full max-w-md flex-grow flex-col justify-center gap-6"
    @submit.prevent="onSubmit"
  >
    <component
      :is="item.component"
      v-for="item of formElementsData"
      :id="item.name"
      :key="item.name"
      v-model="formState[item.model]"
      small
      v-bind="item"
      :error="v$[item.model].$error"
      :autocapitalize="item.component === BaseInput ? 'off' : null"
      :autocomplete="item.component === BaseInput ? item.name : null"
      :autocorrect="item.component === BaseInput ? 'off' : null"
    />
    <BaseButton type="submit">Создать аккаунт</BaseButton>
  </form>
</template>
