<template>
    <div>
        <Header />
        <Suspense>
            <div class="flex">
                <div class="sticky top-0 h-max">
                    <VerticalSearchArea />
                </div>
                <AsyncLikeView />
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
    import Footer from '../components/Footer.vue';
    import VerticalSearchArea from '../components/VerticalSearchArea.vue';
    import AsyncLikeView from '../components/AsyncLikeView.vue';
</script>
