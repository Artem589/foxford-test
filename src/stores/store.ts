import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Item, RepoTypes } from "@/types/types";

export const useSearchStore = defineStore("search", () => {
	
	const totalPages = ref(0);
	const currentPage = ref(1);
	const perPage = ref(10);
	const gitColors = ref();
	const repositories = ref<Item[]>([]);
	const isLoading = ref(false);
	const searchQuery = ref("");
	
	const apiUrl: string = "https://api.github.com";
	const githubUrl = "https://github.com";
	const apiRepositoryUrl: string = `${apiUrl}/search/repositories`;
	const githubColorsUrl: string = "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json";
	const fetchRepositories = async () => {
		try {
			const response =
				await fetch(`${apiRepositoryUrl}?q=${searchQuery.value}&page=${currentPage.value}&per_page=${perPage.value}`);
			
			isLoading.value = true;
			
			const data: RepoTypes = await response.json();
			
			repositories.value = data.items;
			totalPages.value = Math.ceil(data.total_count / perPage.value);
		} catch (error) {
			console.error(error);
		}
	};
	
	const linkStars = (login: string, name: string) => {
		return `${githubUrl}/${login}/${name}/stargazers`;
	};
	
	const changePage = async (page: number | string) => {
		if(typeof page === "string") return;
		currentPage.value = page;
		await fetchRepositories();
	};
	
	const previousPage = async () => {
		if(currentPage.value > 1) {
			currentPage.value -= 1;
			await fetchRepositories();
		}
	};
	
	const nextPage = async () => {
		if(currentPage.value < totalPages.value) {
			currentPage.value += 1;
			await fetchRepositories();
		}
	};
	
	const searchRepositories = async () => {
		await fetchRepositories();
	};
	
	const languageColor = async () => {
		try {
			const fetchColors = await fetch(githubColorsUrl);
			gitColors.value = await fetchColors.json();
			
		} catch (e) {
			console.log(e);
		}
	};
	
	
	return {
		searchQuery,
		gitColors,
		repositories,
		fetchRepositories,
		languageColor,
		searchRepositories,
		nextPage,
		previousPage,
		changePage,
		isLoading,
		currentPage,
		totalPages,
		linkStars
	};
});
