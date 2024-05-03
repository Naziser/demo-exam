<script setup lang="ts">
import { computed, watch } from 'vue';
import IconChevronDown24 from '@/assets/icons/IconChevronDown24.vue';

const props = defineProps<{
  totalPages: number;
  currentPage: number;
  itemsCount: number;
  itemsOffset: number;
}>();

const emit = defineEmits<{
  'update:current-page': [currentPage: number];
  'update:offset-items': [newOffsetItems: number];
}>();

const localCurrentPage = computed({
  get() {
    return props.currentPage;
  },
  set(newCurrentPage: number) {
    emit('update:current-page', newCurrentPage);
  },
});

watch(localCurrentPage, handlePageChange);

const localItemsOffset = computed({
  get() {
    return props.itemsOffset;
  },
  set(newOffsetItems: number) {
    emit('update:offset-items', newOffsetItems);
  },
});

const displayedPages = computed(() => {
  const totalPages = props.totalPages;
  const currentPage = localCurrentPage.value;

  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  } else if (currentPage >= totalPages - 2) {
    return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  } else {
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  }
});

function handlePageChange(pageNumber: number) {
  localItemsOffset.value = (pageNumber - 1) * props.itemsCount;
  localCurrentPage.value = pageNumber;
}
</script>

<template>
  <div class="flex select-none justify-center">
    <div v-if="totalPages > 1" class="items-end gap-2">
      <nav>
        <ul class="list-style-none flex gap-4 -space-x-px">
          <li
            :class="[
              localCurrentPage <= 1
                ? 'cursor-default fill-gray-500'
                : 'hover:bg-gray-100 hover:fill-green-500',
              'relative block cursor-pointer self-center rounded bg-gray-100 fill-gray-500 px-[8px] py-[10px] transition-all duration-300',
            ]"
            @click="localCurrentPage <= 1 ? null : handlePageChange(localCurrentPage - 1)"
          >
            <IconChevronDown24 class="rotate-90"></IconChevronDown24>
          </li>
          <div class="flex bg-gray-100">
            <li
              v-for="page of displayedPages"
              :key="page"
              :class="[
                'text-gray-600',
                page == localCurrentPage
                  ? 'bg-green-900 text-white ring-gray-900'
                  : ' hover:text-green-500',
                'relative block cursor-pointer self-center rounded bg-gray-100 fill-gray-500 px-[8px] py-[6px] text-xs transition-all duration-300',
              ]"
              @click="page === -1 ? null : handlePageChange(page)"
            >
              {{ page === -1 ? '...' : page }}
            </li>
          </div>

          <li
            :class="[
              localCurrentPage >= totalPages
                ? 'cursor-default fill-gray-500'
                : 'hover:bg-gray-100 hover:fill-green-500',
              'relative block cursor-pointer self-center rounded bg-gray-100 fill-gray-500 px-[8px] py-[10px] transition-all duration-300',
            ]"
            @click="localCurrentPage >= totalPages ? null : handlePageChange(localCurrentPage + 1)"
          >
            <IconChevronDown24 class="-rotate-90"></IconChevronDown24>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
