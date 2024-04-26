<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { ChevronDownIcon } from '@heroicons/vue/16/solid';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

// import { useApi } from '@/composables/api';
import { useProfileStore } from '@/stores/ProfileStore';

import BaseButton from '@/components/UI/BaseButton.vue';
// import { navigateToLocation } from '@/helpers/navigateToLocation';

const router = useRouter();

// const { signOut } = useApi();
const { profileData } = useProfileStore();

async function exitClick() {
  //   await signOut();
  router.push({ name: 'login' });
  //   navigateToLocation({ name: 'login' });
}
</script>
<template>
  <div class="flex items-center justify-between bg-gray-50 p-[16px] pe-[40px]">
    <span>Logo</span>
    <!-- <div class="h-6 border-r border-gray-200"></div> -->
    <div class="flex items-center gap-3">
      <span>{{ profileData!.initials }}</span>
      <Popover v-slot="{ open }" class="relative flex">
        <PopoverButton
          :class="{ 'rotate-180': open }"
          class="-mx-2 -my-2 rounded-full p-0 transition focus:ring-1 focus:ring-black"
        >
          <ChevronDownIcon class="h-5 w-5 text-green-700" />
        </PopoverButton>

        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-1 opacity-0"
        >
          <PopoverPanel
            class="absolute right-0 top-[1.5rem] z-10 flex flex-col gap-2 rounded bg-white p-2 shadow-md"
          >
            <BaseButton
              text-button
              class="w-full !rounded text-green-800"
              @click="router.push({ name: 'profile' })"
            >
              Профиль
            </BaseButton>
            <BaseButton text-button class="w-full !rounded text-red-800" @click="exitClick">
              Выйти
            </BaseButton>
          </PopoverPanel>
        </transition>
      </Popover>
    </div>
  </div>
</template>
