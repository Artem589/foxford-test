<template>
	<div class="flex justify-center gap-3 my-6">
		<div class="flex items-center gap-2 hover:bg-gray-200 rounded-md px-2 cursor-pointer"
			 @click="previousPage">
			<ArrowIcon v-if="currentPage > 1"/>
			<button :disabled="currentPage === 1"
					class="text-blue-600 rounded-md"
					:class="{ 'text-gray-500': currentPage === 1 }">
				Previous
			</button>
		</div>
		<div class="flex items-end space-x-2"
			 v-for="pageNumber in displayedPages"
			 :key="pageNumber">
			<button :disabled="pageNumber === '...'"
					:class="currentButtonClasses(pageNumber)"
					class="px-4 py-2 rounded-md"
					@click="changePage(pageNumber)">
				{{ pageNumber }}
			</button>
		</div>
		<div class="flex items-center gap-2 hover:bg-gray-200 rounded-md px-2 cursor-pointer"
			 @click="nextPage">
			<button :disabled="currentPage === totalPages"
					class="text-blue-600 rounded-md"
					:class="{ 'text-gray-500': currentPage === totalPages }">
				Next
			</button>
			<ArrowIcon v-if="currentPage < 100" class="rotate-180"/>
		</div>
	</div>

</template>

<script setup lang="ts">
import ArrowIcon from "@/components/Icons/ArrowIcon.vue";
import { computed } from "vue";
import { useSearchStore } from "@/stores/store";
import { storeToRefs } from "pinia";

const pagesToDisplay = 5;

const store = useSearchStore();

const { currentPage, totalPages } = storeToRefs(store);
const { nextPage, previousPage, changePage } = store;


const currentButtonClasses = (page: number | string) => {
	return {
		"bg-blue-600 text-white": currentPage.value === page,
		"text-black hover:bg-gray-200": currentPage.value !== page && page !== "..."
	};
};

const displayedPages = computed(() => {
	const pageCount = totalPages.value > 100 ? 100 : totalPages.value;
	const pages = pagesToDisplay;
	let startPage = 1;
	let endPage = pageCount;
	if(pageCount > pages) {
		const middle = Math.floor(pages / 2);
		if(currentPage.value > middle && currentPage.value < pageCount - middle) {
			startPage = currentPage.value - middle;
			endPage = currentPage.value + middle;
		} else if(currentPage.value <= middle) {
			startPage = 1;
			endPage = pages;
		} else {
			startPage = pageCount - pages + 1;
			endPage = pageCount;
		}
	}
	
	const pagesArray: (string | number)[] = Array(endPage - startPage + 1)
	.fill(0)
	.map((_, index) => startPage + index);
	
	if(startPage > 1) {
		pagesArray.unshift(1, "...");
	}
	if(endPage < pageCount) {
		pagesArray.push("...", pageCount);
	}
	
	return pagesArray;
});
</script>

<style scoped>

</style>