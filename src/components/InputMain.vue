<template>
	<search-input></search-input>
	<repository-item></repository-item>
	<Pagination v-if="isLoading"></Pagination>
</template>

<script setup lang="ts">
import SearchInput from "@/components/SearchInput.vue";
import RepositoryItem from "@/components/RepositoryItem.vue";
import Pagination from "@/components/Pagination.vue";
import { useSearchStore } from "@/stores/store";
import { storeToRefs } from "pinia";

const store = useSearchStore();

const { isLoading } = storeToRefs(store);

</script>

<style scoped>

</style>
