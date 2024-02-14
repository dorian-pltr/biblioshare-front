<script lang="ts" setup>
const year = ref(new Date().getFullYear());
</script>

<template>
  <footer class="text-white bg-gray-700 px-4 py-5">
    <div class="text-center">
      <p class="text-lg font-bold">Share your books, share your knowledge.</p>
      <p class="mt-4">
        You are using a freely accessible app designed to facilitate users in
        sharing their books.
      </p>
      <p class="mt-4">&copy; {{ year }} Biblioshare - All rights reserved.</p>
    </div>
  </footer>
</template>
