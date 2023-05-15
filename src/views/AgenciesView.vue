<template>
    <div>
        <Header />
        <Suspense>
            <AsyncAgenciesView />
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
    import AsyncAgenciesView from '../components/AsyncAgenciesView.vue';
</script>
