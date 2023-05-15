<template>
    <div class="font-DMsans">
        <Header />
        <Suspense>
            <div class="flex">
                <div class="sticky top-0 h-max">
                    <VerticalSearchArea />
                </div>
                <AsyncResultView />
            </div>
            <template #fallback>
                <p>Loading...</p>
            </template>
        </Suspense>
    </div>
    <Footer />
</template>

<script setup>
    import Header from '../components/Header.vue';
    import VerticalSearchArea from '../components/VerticalSearchArea.vue';
    import AsyncResultView from '../components/AsyncResultView.vue';
    import Footer from '../components/Footer.vue';
</script>
