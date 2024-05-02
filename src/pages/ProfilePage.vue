<script setup lang="ts">
import { useProfileStore } from '@/stores/ProfileStore';
import { useNameFormatter } from '@/helpers/nameFormatter';

import MainContentWrapper from '@/components/MainContentWrapper.vue';
import BaseContentBlock from '@/components/UI/BaseContentBlock.vue';
// import BaseInput from '@/components/UI/BaseInput.vue';

const profileStore = useProfileStore();
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
              <td class="font-extralight">Логин</td>
              <td>
                <!-- <BaseInput v-model="profileFormState.name" disabled :placeholder="'Введите имя'" /> -->
                <span>{{ profileStore.profileData.login }}</span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="font-extralight">Фамилия</td>
              <td>
                <!-- <BaseInput v-model="profileFormState.surname" :placeholder="'Введите фамилию'" /> -->
                <span>{{ useNameFormatter(profileStore.profileData.full_name, 'surname') }}</span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="font-extralight">Имя</td>
              <td>
                <!-- <BaseInput v-model="profileFormState.surname" :placeholder="'Введите фамилию'" /> -->
                <span>{{ useNameFormatter(profileStore.profileData.full_name, 'name') }}</span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="font-extralight">Отчество</td>
              <td>
                <!-- <BaseInput v-model="profileFormState.surname" :placeholder="'Введите фамилию'" /> -->
                <span>{{
                  useNameFormatter(profileStore.profileData.full_name, 'patronimyc')
                }}</span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="font-extralight">Телефон</td>
              <td>
                <!-- <BaseInput
                  v-model="profileFormState.patronymic"
                  :placeholder="'Введите отчество'"
                /> -->
                <span>{{ profileStore.profileData.phone }}</span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="font-extralight">Электронная почта</td>
              <td>
                <!-- <BaseInput
                  v-model="profileFormState.phone"
                  :placeholder="'Введите номер телефона'"
                /> -->
                <span>{{ profileStore.profileData.email }}</span>
              </td>
            </tr>
            <tr class="border-b">
              <td class="font-extralight">Роль</td>
              <td>
                <!-- <BaseInput
                  v-model="profileFormState.email"
                  :placeholder="'Введите электронную почту'"
                /> -->
                <span>{{
                  profileStore.profileData.role === 'ADMIN' ? 'Администратор' : 'Пользователь'
                }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </BaseContentBlock>
    </template>
  </MainContentWrapper>
</template>
