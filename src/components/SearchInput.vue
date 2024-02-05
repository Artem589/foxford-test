<template>
	<div class="flex items-center rounded-md relative">
		<SearchIcon @click="searchRepositories"/>
		<input type="text"
			   placeholder="search repositories"
			   v-model="searchQuery"
			   @keyup.enter="searchRepositories"
			   class="py-2 px-2 pl-9 w-full bg-inherit rounded-md outline-none border-none ring-1 ring-gray-300 focus:ring-blue-600 focus:ring-2"
		/>
	</div>
</template>

<script setup lang="ts">
import SearchIcon from "@/components/Icons/SearchIcon.vue";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/stores/store";

const store = useSearchStore();

const { searchQuery } = storeToRefs(store);
const { searchRepositories } = store;

</script>


<style scoped></style>
