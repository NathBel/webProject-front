<template>
    <div>
        <Header />
        <Suspense>
            <div class="flex">
                <div class="sticky top-0 h-max">
                    <VerticalSearchArea />
                </div>
                <AsyncHousingView />
            </div>
            <template #fallback>
                <p>Loading...</p>
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

