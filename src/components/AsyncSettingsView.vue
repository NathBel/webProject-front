<template>
    <div class="my-8 px-4 lg:px-10 w-full lg:w-8/12">
        <div class="flex justify-between w-full">
            <h2 class="text-xl lg:text-2xl font-medium">
                    Paramètres du compte
            </h2>
            <div class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    class="w-7 h-7 text-sky-600 cursor-pointer" 
                    @click="showModifyInput()"
                    v-if="!modifyUser">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    class="w-7 h-7 text-lime-600 cursor-pointer"
                    @click="applyModificationUser(responseUserData.data.id_user)"
                    v-if="modifyUser">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <svg  xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    class="w-7 h-7 text-red-600 cursor-pointer ml-4"
                    @click="modifyUser = false"
                    v-if="modifyUser"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>

        <div class="relative mt-6 mb-4 lg:mt-10 py-6 px-4 text-base lg:text-xl font-medium rounded-3xl border-2 border-sky-900">
            <div class="absolute -top-4 left-6">
                <h1 class="text-lg bg-white">Informations</h1>
            </div>
            <div class="flex justify-between mb-8">
                <h4>
                    Nom : 
                    <span>{{ responseUserData.data.lastname }}</span>
                </h4>
                <h4>
                    Prénom : 
                    <span>{{ responseUserData.data.firstname }}</span>
                </h4>
            </div>
            <h4 class="mb-8">
                Email : 
                <span v-if="!modifyUser">{{ responseUserData.data.email }}</span>
                <input class="italic" type="email" placeholder="Nouvelle Adresse Mail" v-if="modifyUser" v-model="newEmail">
            </h4>
            <h4 class="mb-8">
                Numéro de téléphone : 
                <span v-if="!modifyUser">{{ responseUserData.data.mobile_phone }}</span>
                <input class="italic" type="text" placeholder="Nouveau Num Téléphone" v-if="modifyUser" v-model="newPhone">
            </h4>
            <h4 class="mb-8">
                Adresse : 
                <span v-if="!modifyUser">{{ responseUserData.data.address }}</span>
                <input class="italic" type="text" placeholder="Nouvelle Adresse Postale" v-if="modifyUser" v-model="newAddress">
            </h4>
            <div class="flex justify-between">
                <h4>
                    Ville : 
                    <span v-if="!modifyUser">{{ responseUserData.data.city }}</span>
                    <input class="italic" type="text" placeholder="Nouvelle Ville" v-if="modifyUser" v-model="newCity">
                </h4>
                <h4>
                    Code postal : 
                    <span v-if="!modifyUser">{{ responseUserData.data.zip_code }}</span>
                    <input class="italic" type="text" placeholder="Nouveau Code Postal" v-if="modifyUser" v-model="newZipCode">
                </h4>
            </div>
        </div>
    </div>
</template>

<script setup>
    import jwtDecode from 'jwt-decode';
    import axios from 'axios';
    import { ref } from 'vue';

    let modifyUser = ref(false);

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

    const getUserData = async () => {
        try {
            const responseUserData = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/user/${id}`);
            return responseUserData;
        } catch (error) {
            console.error(error);
        }
    }

    const responseUserData = await getUserData();

    let newEmail = responseUserData.data.email;
    let newPhone = responseUserData.data.mobile_phone;
    let newAddress = responseUserData.data.address;
    let newCity = responseUserData.data.city;
    let newZipCode = responseUserData.data.zip_code;


    const showModifyInput = () => {
        modifyUser.value = true;
    }

    const applyModificationUser = async (idUser) => {
        newEmail = newEmail !== null ? newEmail : responseUserData.data.email;
        newPhone = newPhone !== null ? newPhone : responseUserData.data.mobile_phone;
        newAddress = newAddress !== null ? newAddress : responseUserData.data.address;
        newCity = newCity !== null ? newCity : responseUserData.data.city;
        newZipCode = newZipCode !== null ? newZipCode : responseUserData.data.zip_code;

        try{
            const response = await axios.put(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/user/${idUser}`, {
                firstname: responseUserData.data.firstname,
                lastname: responseUserData.data.lastname,
                mobile_phone: newPhone,
                address: newAddress,
                city: newCity,
                zip_code: newZipCode,
                email: newEmail,
            });
            console.log(response);

            //Update value
            responseUserData.data.email = newEmail;
            responseUserData.data.mobile_phone = newPhone;
            responseUserData.data.address = newAddress;
            responseUserData.data.city = newCity;
            responseUserData.data.zip_code = newZipCode;
        } catch (error) {
            console.error(error);
        }

        modifyUser.value = false;
    }


</script>
