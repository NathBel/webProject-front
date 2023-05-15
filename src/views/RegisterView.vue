<template>
    <div>
        <Header />
        <Suspense>
            <div class="flex justify-center">
                <RegisterComponent />
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
    import RegisterComponent from '../components/RegisterComponent.vue';
</script>
