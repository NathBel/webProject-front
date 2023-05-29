<template>
    <div>
        <Header />
        <Suspense>
            <div class="flex">
                <div class="sticky top-0 h-max hidden lg:block">
                    <VerticalSearchArea />
                </div>
                <AsyncHousingView />
            </div>
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
        <Footer />
    </div>
</template>

<script setup>
    import Header from '../components/Header.vue';
    import VerticalSearchArea from '../components/VerticalSearchArea.vue';
    import AsyncHousingView from '../components/AsyncHousingView.vue';
    import Footer from '../components/Footer.vue';
</script>

