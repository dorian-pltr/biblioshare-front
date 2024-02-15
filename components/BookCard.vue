<script lang="ts" setup>
import { defineProps } from 'vue';
import { type Book } from '../types/book';

const props = defineProps<{
  book: Book;
}>();
</script>

<template>
  <h3 class="text-xl text-gray-900 text-center">
    {{ props.book.title }}
  </h3>
  <img
    :src="props.book.img"
    loading="lazy"
    :alt="props.book.title"
    class="h-52 w-36"
  />
  <div class="flex flex-col items-center">
    <span v-if="props.book.authors" class="block text-gray-900">{{
      props.book.authors
    }}</span>
    <span v-if="props.book.date" class="block text-gray-400 text-sm">{{
      props.book.date
    }}</span>
  </div>
  <p v-if="props.book.desc" class="text-gray-400 text-sm mt-1">
    {{ props.book.desc }}
  </p>
</template>
