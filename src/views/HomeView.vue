<template >
    <div class="font-DMsans bg-cover bg-center bg-[url('./bg-img/loctae_homepage.jpg')] w-screen h-screen">
          <Header />
            <div class="w-screen h-4/6 flex justify-center items-center">
              <div class="w-max">
                <Suspense>
                  <HorizontalHousingView />
                  <template #fallback>
                    <p>Loading...</p>
                  </template>
                </Suspense>
              </div>
            </div>
            <div class="flex justify-center text-white absolute inset-x-0 bottom-0">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import Header from '../components/Header.vue';
    import HorizontalHousingView from "../components/HorizontalSearchArea.vue";
  </script>
    
  <style lang="scss" scoped>
  
  </style>