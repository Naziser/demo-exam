<script setup lang="ts">
import { reactive, computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';
// import axios from 'axios';

import BaseInput from '@/components/UI/BaseInput.vue';
import BaseButton from '@/components/UI/BaseButton.vue';

import useVuelidate from '@vuelidate/core';
// import { useApi } from '@/composables/api';
import { useValidationRules } from '@/composables/validationRules';
import { validateForm } from '@/helpers/validateForm';
// import { useNotificationsStore } from '@/stores/NotificationsStore';

import type { RouteName } from '@/types/RouteName';
import type { SignupData } from '@/types/SignupData';

const router = useRouter();
// const notificationsStore = useNotificationsStore();
// const { signUp } = useApi();

const formState = reactive<Omit<SignupData, 'lang'>>({
  login: '',
  name: '',
  surname: '',
  password: '',
});

const formElementsData = computed(() => {
  return [
    {
      component: BaseInput,
      name: 'username',
      model: 'login',
      label: 'Электронная почта',
      type: 'text',
      placeholder: 'Введите электронную почту',
    },
    {
      component: BaseInput,
      name: 'given-name',
      model: 'name',
      label: 'Имя',
      type: 'text',
      placeholder: 'Укажите ваше имя',
    },
    {
      component: BaseInput,
      name: 'family-name',
      model: 'surname',
      label: 'Фамилия',
      type: 'text',
      placeholder: 'Укажите вашу фамилию',
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
  const { required, email, password, name, surname } = useValidationRules();

  return {
    login: { email, required },
    name: { name, required },
    surname: { surname, required },
    password: { password, required },
  };
});

const v$ = useVuelidate(rules.value, { ...toRefs(formState) });

async function onSubmit() {
  const isFormCorrect = await validateForm(v$);
  if (!isFormCorrect) return;

  router.push({
    name: 'signup-confirmation' satisfies RouteName,
    query: { login: formState.login, name: formState.name },
  });

  //   const signupParams: SignupData = {
  //     lang: locale.value === 'ru' ? 'rus' : 'eng',
  //     ...formState,
  //   };
  //   signUp(signupParams)
  //     .then(() => {
  //       router.push({
  //         name: 'signup-confirmation' satisfies RouteName,
  //         query: { login: signupParams.login, name: signupParams.name },
  //       });
  //     })
  //     .catch((error) => {
  //       let errorMessage = t('notifications.error.generic');
  //       if (axios.isAxiosError(error)) {
  //         switch (error.response?.data.response.status) {
  //           case 4002:
  //             errorMessage = t('notifications.error.userExists');
  //             break;
  //         }
  //       }
  //       console.log(error);
  //       notificationsStore.createNotification({ type: 'error', message: errorMessage });
  //     });
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
