<script lang="ts" setup>
import { format } from 'date-fns';
import noBookCover from '../assets/image/no-book-cover.jpg';
import { type Book } from '../types/book';

const input = ref<string>('');
const searchedBook = ref<string>('');
const books = ref<Array<Book>>([]);
const foundBooksNumber = ref<number>(-1);
const currentPage = ref<number>(1);

const sliceString = (str: string, length: number) => {
  if (str.length <= length) {
    return str;
  }
  return str.slice(0, length) + '...';
};

async function fetchBooks(newFetch: boolean = true) {
  if (newFetch) {
    currentPage.value = 1;
  }
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchedBook.value}&maxResults=12&startIndex=${currentPage.value - 1}`,
  );
  const responseData = await response.json();
  books.value = [];
  if (newFetch) {
    foundBooksNumber.value = responseData.totalItems;
  }
  if (foundBooksNumber.value > 0) {
    for (const data of responseData.items) {
      books.value.push({
        id: Math.random(),
        img: data.volumeInfo.imageLinks?.thumbnail ?? noBookCover,
        title: sliceString(data.volumeInfo.title, 50) ?? 'Unknown',
        authors: data.volumeInfo.authors
          ? data.volumeInfo.authors.join(', ')
          : null,
        date: data.volumeInfo.publishedDate
          ? format(new Date(data.volumeInfo.publishedDate), 'PPP')
          : null,
        desc: data.volumeInfo.description
          ? sliceString(data.volumeInfo.description, 150)
          : null,
        language: data.volumeInfo.language ?? null,
      });
    }
  }
}

const updatePage = (newPage: number) => {
  currentPage.value = newPage;
  fetchBooks(false);
};

const submitForm = () => {
  searchedBook.value = input.value;
  fetchBooks();
};
</script>

<template>
  <div class="m-10">
    <form
      class="flex flex-row justify-center gap-2 mb-10"
      @submit.prevent="submitForm()"
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

    <div v-if="input && foundBooksNumber > 0">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="book in books"
          :key="book.id"
          class="flex flex-col items-center justify-between gap-2 p-5 shadow-lg border rounded-md duration-300 hover:shadow-sm"
        >
          <BookCard :book="book" />
        </article>
      </div>
      <BooksPagination
        :found-books-number="foundBooksNumber"
        :current-page="currentPage"
        :update-page="updatePage"
      />
    </div>
    <div
      v-else-if="input && foundBooksNumber === 0"
      class="text-center text-red-600"
    >
      <p>No books found!</p>
    </div>
  </div>
</template>
