<template >
  <div class="snap-y snap-mandatory overflow-y-scroll overflow-hidden h-screen font-DMsans">
    <section class="bg-cover bg-center bg-[url('./bg-img/locate_homepage.jpg')] w-screen h-screen snap-start">
            <Header />
              <div class="w-screen min-[350px]:h-4/6 flex justify-center items-center">
                <div class="w-max">
                  <Suspense>
                    <HorizontalHousingView />
                    <template #fallback>
                        <div class="h-screen flex justify-center items-center">
                            <div
                                class="text-sky-600 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status">
                                <span
                                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                    >Loading...</span
                                >
                            </div>
                        </div>

                    </template>
                  </Suspense>
                </div>
              </div>
                <div class="hidden min-[350px]:flex justify-center text-white relative bottom-0 w-screen">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
    </section>
    <section class="bg-cover bg-center bg-[url('./bg-img/maison1-1.jpg')] w-screen h-screen snap-start flex items-end">
      <div>
        <div class="flex justify-center lg:block">
          <div class="bg-header-footer text-white lg:m-16 text-lg lg:text-3xl font-DMsans rounded-xl px-4 lg:px-8 py-2 w-max">
            <p>Villa • Hôpitaux-Facultés, Montpellier</p>
            <p>1 365 000€</p>
          </div>
        </div>
        <div class="flex justify-center text-white relative inset-x-0 bottom-0 w-screen">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
    </section>
    <section class="bg-cover bg-center bg-[url('./bg-img/locate_homepage.jpg')] w-screen h-screen snap-start flex items-end">
      <div>
        <div class="flex justify-center lg:block">
          <div class="bg-header-footer text-white lg:m-16 text-lg lg:text-3xl font-DMsans rounded-xl px-4 lg:px-8 py-2 w-max">
            <p>Loft • Port Marianne, Montpellier</p>
            <p>895 000€</p>
          </div>
        </div>
        <div class="flex justify-center text-white relative inset-x-0 bottom-0 w-screen">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </section>
    <section class="bg-cover bg-center bg-[url('./bg-img/maison3-1.jpg')] w-screen h-screen snap-start flex items-end">
      <div>
        <div class="w-screen flex justify-center mb-16 lg:block">
          <div class="bg-header-footer text-white lg:m-16 text-lg lg:text-3xl font-DMsans rounded-xl px-4 lg:px-8 py-2 w-max">
            <p>Appartement • Port Marianne, Montpellier</p>
            <p>605 000€</p>
          </div>
        </div>
      </div>
    </section>
  </div>
  </template>
  
  <script setup lang="ts">
    import Header from '../components/Header.vue';
    import HorizontalHousingView from "../components/HorizontalSearchArea.vue";
    import Footer from '../components/Footer.vue';
  </script>
    
  <style lang="scss" scoped>
  
  </style>