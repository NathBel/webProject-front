<template>
    <div class="my-8 mx-10 w-screen">
        <h2 class="text-2xl font-medium">
            Vous avez {{ likesDataLength }} favoris
        </h2>
        <div class="grid bg-slate-300 mb-8">
            <div v-for="like in likesData" :key="like.id_like">
                <div class="flex cursor-pointer hover:bg-slate-500 bg-slate-400 m-16 p-4" @click.prevent="showHousing(result.id_housing)">
                    <div class="w-full h-full">
                        <div class="flex justify-center">
                            <div class="m-4">
                                <p>EN ATTENTE</p>
                                <img src="../assets/image/no-image.jpg" alt="Image du logement" class="w-80 h-52 object-none">
                                
                            </div>
                            <div>
                                <div class="m-4 flex items-end w-80 gap-x-4">
                                    <p class="text-3xl font-extrabold">{{ like.housingData.price.toLocaleString() }} €</p>
                                    <p class="text-base italic">soit {{ Math.round(like.housingData.price / like.housingData.living_surface).toLocaleString() }} €/m²</p>
                                </div>
                                <p class=" m-4 text-xl">{{ like.housingData.type.charAt(0).toUpperCase() + like.housingData.type.slice(1) }}</p>
                                <div class="m-4 w-96">
                                    <p class="text-lg">{{ like.housingData.number_room }} pièces - {{ like.housingData.living_surface }}m² habitable - {{ like.housingData.global_surface }}m² de terrain</p>
                                </div>
                                <p class="m-4 text-xl">{{ like.housingData.city }} ({{ like.housingData.zip_code }}) </p>
                                <div class="flex justify-end items-end">
                                    <svg v-if="!likes.includes(like.housingData.id_housing)" @click.stop="addLike(like.housingData.id_housing)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer w-10 h-10">
                                        <path stroke-linecap="round" stroke-linejoin="round" 
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                    <svg v-if="likes.includes(like.housingData.id_housing)" @click.stop="removeLike(like.housingData.id_housing)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="cursor-pointer text-red-700 w-10 h-10">
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
            const response = await axios.get(`http://localhost:8000/likes/user/${id}`);
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
            const response = await axios.get(`http://localhost:8000/housing/id/${housingId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const likesData = await getLikes();
    const likesDataLength = likesData.length;

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
            const response = await axios.post(`http://localhost:8000/likes`, {
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
            const response = await axios.delete(`http://localhost:8000/likes/${id}/${id_housing}`);
            likes.value.splice(likes.value.indexOf(id_housing), 1);
        } catch (err) {
            console.log(err);
        }
    }





</script>

