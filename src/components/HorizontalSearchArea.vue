<template>
    <div class="bg-search-area text-lg p-10 rounded-3xl">

        <form>
            <div class="flex justify-center">
                <label class="flex gap-8 py-2">
                    <span class="flex items-center gap-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                        </svg>
                        <h4>Type de bien</h4>
                    </span>
                    <div class="flex items-center">
                        <label
                            class="relative flex cursor-pointer items-center rounded-full p-3"
                            for="checkbox-8"
                            data-ripple-dark="true"
                        >
                            <input
                            id="house"
                            type="checkbox"
                            checked
                            v-model="house"
                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                            />
                            <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                            >
                                <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                                ></path>
                            </svg>
                            </div>
                        </label>
                        <label
                            class="mt-px cursor-pointer select-none font-light text-gray-700"
                            for="login"
                        >
                            Maison, villa
                        </label>

                        <label
                            class="relative flex cursor-pointer items-center rounded-full p-3"
                            for="checkbox-8"
                            data-ripple-dark="true"
                        >
                            <input
                            id="house"
                            type="checkbox"
                            checked
                            v-model="apartement"
                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                            />
                            <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                            >
                                <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                                ></path>
                            </svg>
                            </div>
                        </label>
                        <label
                            class="mt-px cursor-pointer select-none font-light text-gray-700"
                            for="login"
                        >
                            Appartement
                        </label>

                        <label
                            class="relative flex cursor-pointer items-center rounded-full p-3"
                            for="checkbox-8"
                            data-ripple-dark="true"
                        >
                            <input
                            id="house"
                            type="checkbox"
                            checked
                            v-model="land"
                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                            />
                            <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                            >
                                <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                                ></path>
                            </svg>
                            </div>
                        </label>
                        <label
                            class="mt-px cursor-pointer select-none font-light text-gray-700"
                            for="login"
                        >
                            Terrain
                        </label>
                        </div>
                </label>
            </div>

            <div class="flex gap-16 justify-center">
                <label class="flex gap-8 py-2">
                    <span class="flex items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <h4>Lieux</h4>
                    </span>
                    <input type="text" v-model="searchQuery" @input="getSearchResults"
                        class="text-base border-slate-200 placeholder:italic placeholder:text-slate-400 placeholder:text-sm contrast-more:border-slate-400 contrast-more:placeholder-slate-500" placeholder="Où ? ex: ville, code postal..."/>
                    <ul class="absolute py-2 px-1 bg-danger" v-if="citySearchResults">
                        <li v-for="searchResult in citySearchResults" :key="searchResult.id" class="py-2 cursor-pointer">{{ searchResult.city }}</li>
                    </ul>
                    
                    </label>

                <label class="flex gap-8 py-2">
                    <span class="flex items-center gap-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>
                    <h4>Budget</h4>
                    </span>
                    <input v-model="minBudget" class="w-28 border-slate-200 text-base placeholder:italic placeholder:text-slate-400 placeholder:text-sm contrast-more:border-slate-400 contrast-more:placeholder-slate-500" type="number" placeholder="Min"/>
                    <input v-model="maxBudget" class="w-28 border-slate-200 text-base placeholder:italic placeholder:text-slate-400 placeholder:text-sm contrast-more:border-slate-400 contrast-more:placeholder-slate-500" type="number" placeholder="Max"/>
                </label>
            </div>

            <div class="flex gap-16 justify-center">
                <label class="flex gap-8 py-2">
                    <span class="flex items-center gap-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                        </svg>
                        <h4>Terrain</h4>
                    </span>
                    <input v-model="minTerrain" class="w-24 border-slate-200 text-base placeholder:italic placeholder:text-slate-400 placeholder:text-sm contrast-more:border-slate-400 contrast-more:placeholder-slate-500" type="number" placeholder="Min"/>
                    <input v-model="maxTerrain" class="w-24 border-slate-200  text-base placeholder:italic placeholder:text-slate-400 placeholder:text-sm contrast-more:border-slate-400 contrast-more:placeholder-slate-500" type="number" placeholder="Max"/>
                </label>


                <label class="flex gap-8 py-2">
                    <span class="flex items-center gap-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                        </svg>
                        <h4>Surface</h4>
                    </span>
                    <input v-model="minSurface" class="w-24 border-slate-200 text-base placeholder:italic placeholder:text-slate-400 placeholder:text-sm contrast-more:border-slate-400 contrast-more:placeholder-slate-500" type="number" placeholder="Min"/>
                    <input v-model="maxSurface" class="w-24 border-slate-200 text-base placeholder:italic placeholder:text-slate-400 placeholder:text-sm contrast-more:border-slate-400 contrast-more:placeholder-slate-500" type="number" placeholder="Max"/>
                </label>
            </div>

            <div class="flex justify-end p-2">
                <input
                    type="submit" value="Rechercher" @click.prevent="searchHousing()"
                    class="uppercase inline-block rounded bg-blue-primary px-4 pb-2.5 pt-2 text-lg font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
            </div>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import  { useRouter } from 'vue-router';

    const router = useRouter();
    const searchQuery = ref('');
    const minBudget = ref('');
    const maxBudget = ref('');
    const minSurface = ref('');
    const maxSurface = ref('');
    const minTerrain = ref('');
    const maxTerrain = ref('');
    const land = ref(true);
    const house = ref(true);
    const apartement = ref(true);

    const searchHousing = (() => {
    // Use the retrieved values for further processing
    
    const rent = (localStorage.getItem('activePage') === 'rent');
    const sale = (localStorage.getItem('activePage') === 'sale');


    router.push({
        name: 'ResultView',
        query: {
            city: searchQuery.value,
            minBudget: minBudget.value,
            maxBudget: maxBudget.value,
            minSurface: minSurface.value,
            maxSurface: maxSurface.value,
            minTerrain: minTerrain.value,
            maxTerrain: maxTerrain.value,
            rent: rent,
            sale: sale,
            land: land.value,
            house: house.value,
            apartement: apartement.value
        }
    });
});

    
    const queryTimeout = ref(null);
    const citySearchResults = ref(null);
    const searchError = ref(null);

    const getSearchResults = () => {
    clearTimeout(queryTimeout.value);
    queryTimeout.value = setTimeout(async () => {
        if (searchQuery.value !== "") {
            try{
                const result = await axios.get(`http://localhost:8000/housing/startCity/${searchQuery.value}`);
                citySearchResults.value = result.data;
            } catch {
                searchError.value = true;
            }
            return;
        }
        citySearchResults.value = null;
    }, 300);
};
</script>