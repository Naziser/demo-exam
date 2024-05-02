<script setup lang="ts">
import MainContentWrapper from '@/components/MainContentWrapper.vue';
import BaseContentBlock from '@/components/UI/BaseContentBlock.vue';
// import BaseInput from '@/components/UI/BaseInput.vue';
import { reactive } from 'vue';

const profileFormState = reactive({
  surname: 'Рындин',
  name: 'Сергей',
  patronymic: 'Иванович',
  phone: '+ 7 918 603 63 91',
  email: 'SeregaSwapp@mail.ru',
  login: 'Naziser',
});
</script>

<template>
  <MainContentWrapper>
    <template #content>
      <BaseContentBlock class="flex min-h-screen flex-col gap-6">
        <div class="flex items-center justify-center">
          <h2 class="text-h-s font-bold text-gray-950">Профиль</h2>
        </div>
        <div class="w-full border-b border-gray-200"></div>
        <div class="text-s font-extralight text-gray-700">Персональные данные</div>

        <table class="text-s text-gray-950 [&_td]:py-4 first:[&_td]:pe-6 [&_tr]:border-gray-100">
          <tbody>
            <tr class="border-b">
              <td class="font-extralight">Фамилия</td>
              <td>
                <!-- <BaseInput v-model="profileFormState.surname" :placeholder="'Введите фамилию'" /> -->
                <span>{{ profileFormState.surname }}</span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="font-extralight">Имя</td>
              <td>
                <!-- <BaseInput v-model="profileFormState.name" disabled :placeholder="'Введите имя'" /> -->
                <span>{{ profileFormState.name }}</span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="font-extralight">Отчество</td>
              <td>
                <!-- <BaseInput
                  v-model="profileFormState.patronymic"
                  :placeholder="'Введите отчество'"
                /> -->
                <span>{{ profileFormState.patronymic }}</span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="font-extralight">Телефон</td>
              <td>
                <!-- <BaseInput
                  v-model="profileFormState.phone"
                  :placeholder="'Введите номер телефона'"
                /> -->
                <span>{{ profileFormState.phone }}</span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="font-extralight">Электронная почта</td>
              <td>
                <!-- <BaseInput
                  v-model="profileFormState.email"
                  :placeholder="'Введите электронную почту'"
                /> -->
                <span>{{ profileFormState.email }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </BaseContentBlock>
    </template>
  </MainContentWrapper>
</template>
