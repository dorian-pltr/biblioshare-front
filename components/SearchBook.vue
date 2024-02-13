<script setup>
const input = ref("");
const books = ref([]);

async function fetchBooks() {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${input.value}`
  );
  const data = await response.json();
  books.value = data.items || [];
}
</script>

<template>
  <div class="mt-10">
    <form
      class="flex flex-row justify-center gap-2 mb-10"
      @submit.prevent="fetchBooks"
    >
      <input
        v-model="input"
        type="text"
        placeholder="Search a book..."
        required
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-3/6 ps-10 p-2"
      />
      <button
        type="submit"
        class="p-2 text-white bg-teal-700 hover:bg-teal-800 rounded-md"
      >
        Search
      </button>
    </form>

    <div v-for="book in books" :key="book.id" class="text-center">
      <p>{{ book.volumeInfo.title }}</p>
    </div>
    <div v-if="input && !books.length" class="text-center text-red-600">
      <p>No books found!</p>
    </div>
  </div>
</template>
