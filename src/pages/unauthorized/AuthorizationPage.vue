<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';

import BaseLogo from '@/assets/icons/BaseLogo.vue';

const route = useRoute();
</script>

<template>
  <div
    class="authorization-background-image flex min-h-screen items-center justify-center bg-white px-4 lg:bg-black lg:bg-[url('@/assets/images/half-page-cover.webp')] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:shadow-custom"
  >
    <div class="authorization-page-wrapper flex w-[400px] lg:h-[640px] lg:w-fit lg:self-center">
      <div
        class="hidden rounded-s-xl bg-green-900/90 px-[88px] pb-[434px] pt-[174px] backdrop-blur-sm lg:block"
      >
        <BaseLogo class="text-gray-50" />
      </div>
      <div
        class="relative flex flex-1 gap-8 bg-white lg:items-start lg:rounded-e-xl lg:px-[144px] lg:pt-[100px]"
      >
        <div class="flex w-full flex-1 flex-col items-center gap-8 lg:w-[292px]">
          <BaseLogo class="text-green-900 lg:hidden" />
          <div class="flex w-full">
            <RouterLink
              class="flex-1 border-b-2 px-4 py-3 text-center transition duration-300"
              :class="
                route.name === 'login'
                  ? 'border-green-700 text-green-700'
                  : 'border-gray-200 text-gray-400 hover:text-gray-600'
              "
              :to="{ name: 'login' }"
            >
              <span class="text-m font-medium">Войти</span>
            </RouterLink>
            <RouterLink
              class="flex-1 border-b-2 px-4 py-3 text-center transition duration-300"
              :class="
                route.name === 'signup' || route.name === 'signup-confirmation'
                  ? 'border-green-700 text-green-700'
                  : 'border-gray-200 text-gray-400 hover:text-gray-600'
              "
              :to="{ name: 'signup' }"
            >
              <span class="text-m font-medium">Создать</span>
            </RouterLink>
          </div>
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
