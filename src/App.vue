<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useApi } from './composables/api';

const { testRequest } = useApi();

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const posts = ref<Post[]>([]);

onMounted(() => {
  testRequest().then((res) => {
    posts.value = res.data;
  });
});
</script>

<template>
  <div>
    <ul class="flex flex-col gap-3">
      <li v-for="post in posts" :key="post.id" class="flex gap-3">
        <span>ID: {{ post.id }}</span>
        <span>Post title: {{ post.title }}</span>
        <span>Post body: {{ post.body }}</span>
      </li>
    </ul>
  </div>
</template>
