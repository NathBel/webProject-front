<template>
    <footer id="footer" class="flex-grow-1">
        <div class="bg-header-footer text-neutral-50 w-screen h-40">
            <div class="flex flex-col lg:flex-row justify-around items-center h-32 text-sm lg:text-lg">
                    <p class="cursor-pointer">Mentions légales</p>
                    <p class="cursor-pointer">Conditions générales</p>
                    <p class="cursor-pointer">Paramètres cookies</p>
                    <p class="cursor-pointer">Nous contacter</p>
            </div>
            <p class="text-center text-base lg:text-lg">© 2023 - NathImmo.com</p>
        </div>
    </footer>
</template>

<script setup>
    import { RouterLink } from 'vue-router'
</script>