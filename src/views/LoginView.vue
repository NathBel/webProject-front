<template>
    <div>
        <Header />
        <Suspense>
            <LoginComponent />
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
    import LoginComponent from '../components/LoginComponent.vue';
</script>
