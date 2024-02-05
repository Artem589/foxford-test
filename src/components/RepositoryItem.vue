<template>
	<div class="mt-2 flex-col items-center justify-center">
		<div class="grid gap-4 mt-4">
			<div v-for="repo in repositories" :key="repo.id"
				 class="grid items-center border-solid border-2 rounded-xl border-gray-200 min-h-40 p-4">
				<div class="grid gap-2">
					<div class="flex gap-5 items-center">
						<img :src="repo.owner.avatar_url" alt="" class="w-5 h-5"/>
						<a :href="repo.html_url">
							<h3 class="text-blue-600">
								{{ repo.owner.login }} / {{ repo.name }}
							</h3>
						</a>
					</div>
					<div>
						<p>{{ repo.description }}</p>
					</div>
					
					<div class="flex items-center gap-5">
						<div v-if="repo.language" class="flex items-center gap-2">
                            <span class="w-2 h-2 rounded-3xl text-center"
								  :style="{ background: `${gitColors[repo.language]?.color}` }">
                            </span>
							<p>{{ repo.language }}</p>
						</div>
						
						<div
							class="flex items-center gap-1 cursor-pointer border-b-blue-500 fill-current
								   hover:underline-offset-2 hover:text-blue-600 hover:border-b">
							<StarIcon/>
							<a :href="linkStars(repo.owner.login,repo.name)"
							>{{ formatStars(repo.stargazers_count) }}</a>
						</div>
						<p>Updated on {{ convertDate(repo.updated_at) }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { convertDate, formatStars } from "@/utils/formatter";
import StarIcon from "@/components/Icons/StarIcon.vue";
import { useSearchStore } from "@/stores/store";
import { storeToRefs } from "pinia";

const store = useSearchStore();

const { gitColors, repositories } = storeToRefs(store);
const { languageColor, linkStars } = store;


languageColor();

</script>