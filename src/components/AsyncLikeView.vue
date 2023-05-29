<template>
    <div class="w-screen mt-8 mx-4 lg:mx-10">
        <h2 v-if="likesDataLength > 0" class="text-lg lg:text-2xl font-medium mx-4 lg:mx-16">
            Vous avez {{ likesDataLength }} favoris
        </h2>
        <h2 v-if="likesDataLength == 0" class="text-lg lg:text-2xl font-medium mx-4 lg:mx-16">
            Vous n'avez aucun favoris
        </h2>
        <div v-if="likesDataLength > 0" class="grid pt-2">
            <div v-for="like in likesData" :key="like.id_like">
                <div class="flex cursor-pointer lg:rounded-3xl lg:border-2 border-b border-sky-900 hover:bg-slate-200 lg:mx-16 mb-8 p-4" @click.prevent="showHousing(result.id_housing)">
                    <div class="w-full h-full">
                        <div class="lg:flex justify-center">
                            <div class="w-full h-1/2 lg:w-80 lg:h-52 lg:m-4 flex justify-center">
                                <img :src="like.housingData.photos" alt="Image du logement" class="object-none">
                                
                            </div>
                            <div>
                                <div class="m-2 lg:m-4 flex items-end gap-x-4">
                                    <p class="text-3xl font-extrabold">{{ like.housingData.price.toLocaleString() }} €</p>
                                    <p v-if="like.housingData.type !== 'terrain'" class="text-base italic">soit {{ Math.round(like.housingData.price / like.housingData.living_surface).toLocaleString() }} €/m²</p>
                                    <p v-else class="text-base italic">soit {{ Math.round(like.housingData.price / like.housingData.global_surface).toLocaleString() }} €/m²</p>
                                </div>
                                <p class="m-2 lg:m-4 text-lg lg:text-xl">{{ like.housingData.type.charAt(0).toUpperCase() + like.housingData.type.slice(1) }}</p>
                                <div class="m-2 lg:m-4 lg:w-96">
                                    <p class="text-lg">{{ like.housingData.number_room }} pièces - {{ like.housingData.living_surface }}m² habitable - {{ like.housingData.global_surface }}m² de terrain</p>
                                </div>
                                <p class="m-2 lg:m-4 text-lg lg:text-xl">{{ like.housingData.city }} ({{ like.housingData.zip_code }}) </p>
                                <div class="flex justify-end items-end">
                                    <svg v-if="!likes.includes(like.housingData.id_housing)" @click.stop="addLike(like.housingData.id_housing)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer w-7 h-7 lg:w-10 lg:h-10">
                                        <path stroke-linecap="round" stroke-linejoin="round" 
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                    <svg v-if="likes.includes(like.housingData.id_housing)" @click.stop="removeLike(like.housingData.id_housing)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="cursor-pointer text-red-700 w-7 h-7 lg:w-10 lg:h-10">
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
                                </div>     
                            </div>    
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import jwtDecode from 'jwt-decode';
    import axios from 'axios';
    import { ref } from 'vue';

    const token = localStorage.getItem('token');
    let id = null;
    let isAdmin = null;
    let firstName = null;
    let lastName = null;
    let email = null;

    try {
        // Decode the token
        const decoded = jwtDecode(token);

        id = decoded.dataId;
        isAdmin = decoded.dataIsAdmin;
        firstName = decoded.dataFirstname;
        lastName = decoded.dataLastname;
        email = decoded.dataEmail;


    } catch (error) {
        console.error('Failed to decode token:', error);
    }

    let likes = ref([]);

    const getLikes = async () => {
        try{
            const response = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/user/${id}`);
            if(response.data[0] == undefined || response.data[0].likes == null){
                return [];
            }
            for (let item of response.data) {
                likes.value.push(item.id_housing); // Push the value into the `likes` array
            }
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const getHousingData = async (housingId) => {
        try {
            const response = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing/id/${housingId}`);
            try{
                const responsePhoto = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/photos/${housingId}`);
                const imageData = responsePhoto.data[0].photo;
                const base64Data = btoa(String.fromCharCode(...imageData.data));
                response.data.photos = `data:${responsePhoto.data[0].type};base64,${base64Data}`;
            } catch {
                response.data.photos = '../assets/image/no-image.jpg';
            }
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    let likesData = [];
    likesData = await getLikes();
    const likesDataLength = likesData.length;

    console.log(likesData);
    console.log(likesDataLength);

    const getLikesTab = (likesData) => {
        for (let item of likesData) {
            likes.push(item.id_housing); // Push the value into the `likes` array
        }
        return likes;
    }

    for (const like of likesData) {
        const resHousingData = await getHousingData(like.id_housing);
        like.housingData = resHousingData;
    };


    const addLike = async (id_housing) => {
        try {
            const response = await axios.post(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/likes`, {
                id_housing: id_housing,
                id_user: id
            });
            likes.value.push(id_housing);
        } catch (err) {
            console.log(err);
        }
    }

    const removeLike = async (id_housing) => {
        try {
            const response = await axios.delete(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/likes/${id}/${id_housing}`);
            likes.value.splice(likes.value.indexOf(id_housing), 1);
        } catch (err) {
            console.log(err);
        }
    }





</script>

