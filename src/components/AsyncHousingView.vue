<template>
    <div class=" w-screen my-8 mx-8 w-[51rem]">
        <div class="mx-10">
            <img :src="HousingData.photos" alt="Image du logement" class="object-fill w-[51rem] h-[29rem]">
        </div>
        <div class="flex items-center justify-between my-8 mx-10">
            <p class="text-3xl font-bold">{{ HousingData.type.charAt(0).toUpperCase() + HousingData.type.slice(1) }} à 
                <span v-if="HousingData.location == true">Louer</span> 
                <span v-if="HousingData.sale == true">Vendre</span></p>
            <p class="flex items-end text-3xl font-bold">{{ HousingData.price.toLocaleString() }} €<p v-if="HousingData.location == true" class="ml-2 text-xl font-normal"> /mois</p></p> 
        </div>
        <div class="mx-10 mb-8 font-medium">
            <p class="text-xl">{{ HousingData.number_room }} pièces - {{ HousingData.living_surface }}m² habitable - {{ HousingData.global_surface }}m² de terrain</p>
        </div>
        <p class="mx-10 mb-8 font-medium text-xl">{{ HousingData.city }} ({{ HousingData.zip_code }}) </p>
        <div class="mx-10 my-2 flex gap-28 text-xl">
            <p class="font-medium w-1/2">Description : <span class="font-light">{{ HousingData.description }}</span></p>
            <div class="w-1/2">
                <p class="font-medium">Diagnostic de Performance Energétique : </p>
                <img class="" :src="HousingData.DPE" alt="Image DPE">
            </div>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const getHousingData = async() => {
        try {
            const responseHousing = await axios.get(`http://localhost:8000/housing/id/${route.query.id_housing}`);
            responseHousing.data.photos = '/src/assets/image/no-image.jpg';
            responseHousing.data.DPE = '/src/assets/image/DPE/'+responseHousing.data.energy_performance+'.png';
            return responseHousing.data;
        } catch (error) {
            console.error(error);
        }
    }

    const HousingData = await getHousingData();
    console.log(HousingData);
</script>
