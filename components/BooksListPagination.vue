<script lang="ts" setup>
const props = defineProps<{
  foundBooksNumber: number;
  currentPage: number;
  updatePage: (newPage: number) => void;
}>();

const foundBooksNumber = ref(props.foundBooksNumber);
const currentPage = ref(props.currentPage);
const inactivePageStyle =
  'px-3 py-2 rounded-lg duration-150 hover:text-teal-800 hover:bg-teal-50';
const activePageStyle =
  'px-3 py-2 rounded-lg duration-150 hover:text-teal-800 hover:bg-teal-50 bg-teal-50 text-teal-800 font-medium';

const handlePageChange = (page: number) => {
  if (page > totalPages.value) {
    page = totalPages.value;
  } else if (page < 1) {
    page = 1;
  }
  currentPage.value = page;
  props.updatePage(page);
};

watch(
  () => [props.foundBooksNumber, props.currentPage],
  ([newFoundBooksNumber, newCurrentPage]) => {
    foundBooksNumber.value = newFoundBooksNumber;
    currentPage.value = newCurrentPage;
  },
);

const totalPages = computed(() => Math.round(foundBooksNumber.value / 9));
</script>

<template>
  <div
    v-if="totalPages > 1"
    class="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8"
  >
    <div
      class="hidden items-center justify-between sm:flex gap-1"
      aria-label="Pagination"
    >
      <a
        class="hover:text-teal-800 flex items-center gap-x-2"
        @click="handlePageChange(currentPage - 1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
            clip-rule="evenodd"
          />
        </svg>
        Previous
      </a>
      <ul class="flex items-center gap-1">
        <div>
          <li class="text-sm">
            <a
              aria-current="page"
              :class="currentPage === 1 ? activePageStyle : inactivePageStyle"
              @click="handlePageChange(1)"
            >
              1
            </a>
          </li>
        </div>
        <div v-if="currentPage < 4" class="flex items-center gap-1">
          <div v-for="n in 4" :key="n">
            <li class="text-sm">
              <a
                aria-current="page"
                :class="
                  currentPage === n + 1 ? activePageStyle : inactivePageStyle
                "
                @click="handlePageChange(n + 1)"
              >
                {{ n + 1 }}
              </a>
            </li>
          </div>
          <li class="text-sm">
            <div>...</div>
          </li>
        </div>

        <div
          v-if="currentPage >= 4 && currentPage <= totalPages - 3"
          class="flex items-center gap-1"
        >
          <li class="text-sm">
            <div>...</div>
          </li>
          <div v-for="n in 3" :key="n">
            <li class="text-sm">
              <a
                aria-current="page"
                :class="
                  currentPage === currentPage + n - 2
                    ? activePageStyle
                    : inactivePageStyle
                "
                @click="handlePageChange(currentPage + n - 2)"
              >
                {{ currentPage + n - 2 }}
              </a>
            </li>
          </div>
          <li class="text-sm">
            <div>...</div>
          </li>
        </div>

        <div
          v-if="currentPage > totalPages - 3"
          class="flex flex-row-reverse items-center gap-1"
        >
          <div v-for="n in 4" :key="n">
            <li class="text-sm">
              <a
                aria-current="page"
                :class="
                  currentPage === totalPages - n
                    ? activePageStyle
                    : inactivePageStyle
                "
                @click="handlePageChange(totalPages - n)"
              >
                {{ totalPages - n }}
              </a>
            </li>
          </div>
          <li class="text-sm">
            <div>...</div>
          </li>
        </div>

        <li class="text-sm">
          <a
            :class="
              currentPage === totalPages ? activePageStyle : inactivePageStyle
            "
            @click="handlePageChange(totalPages)"
          >
            {{ totalPages }}
          </a>
        </li>
      </ul>
      <a
        class="hover:text-teal-800 flex items-center gap-x-2"
        @click="handlePageChange(currentPage + 1)"
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>
    <!-- On mobile version -->
    <div
      class="flex items-center justify-between text-sm text-gray-600 font-medium sm:hidden"
    >
      <a class="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
        >Previous</a
      >
      <div class="font-medium">Page 1 of 9</div>
      <a class="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
        >Next</a
      >
    </div>
  </div>
</template>
