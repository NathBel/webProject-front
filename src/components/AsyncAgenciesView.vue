<template>
    <div class="w-screen mt-8 ">
        <div class="flex justify-between mx-8 my-4">
            <h2 class="text-2xl font-medium">
                Nos {{ AgenciesDataLength }} Agences partout en France !
            </h2>
            <div class="flex items-center text-xl gap-2 text-lime-600 cursor-pointer" v-if="isAdmin === 1" @click="showAddAgency = true">
                <h3>Ajouter une agence</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <!-- Add agency box -->
            <div
                v-if="showAddAgency"
                class="fixed inset-0 flex items-center justify-center bg-black/20"
                >
                <div class="bg-white p-6 rounded shadow">
                    <h3 class="text-lg font-semibold mb-4 text-black">Créer une nouvelle agence</h3>
                    <div class="flex flex-col gap-4 m-6">
                        <input type="text" placeholder="Addresse Postale" v-model="newAgencyAddress" />
                        <input type="text" placeholder="Ville" v-model="newAgencyCity" />
                        <input type="text" placeholder="Code Postal" v-model="newAgencyZipCode" />
                        <input type="text" placeholder="Numéro de téléphone" v-model="newAgencyPhone" />
                    </div>
                    <div class="flex justify-end">
                        <button
                            @click="showAddAgency = false"
                            class="px-4 py-2 text-gray-500 bg-gray-100 rounded mr-2 hover:bg-gray-200"
                        >
                            Annuler
                        </button>
                        <button
                            @click="addAgency()"
                            class="px-4 py-2 bg-green-300 text-green-700 rounded hover:bg-green-500 hover:text-green-900"
                        >
                            Ajouter
                        </button>
                    </div>
                </div>
            </div>

        </div>
        <div class="grid grid-cols-3 bg-info mx-8 my-4">
            <div v-for="agency in AgenciesData" :key="agency.id_agency">
                <div class="bg-green-200 m-4">
                    <p v-if="modifyKey !== agency.id_agency">{{ agency.address }}</p>
                    <input v-if="modifyKey === agency.id_agency" type="text" placeholder="Nouvelle Adresse Postale" v-model="agencyAddress" />
                    <p v-if="modifyKey !== agency.id_agency">{{ agency.zip_code }}</p>
                    <input v-if="modifyKey === agency.id_agency" type="text" placeholder="Nouveau Code Postal" v-model="agencyZipCode" />
                    <p v-if="modifyKey !== agency.id_agency">{{ agency.city }}</p>
                    <input v-if="modifyKey === agency.id_agency" type="text" placeholder="Nouvelle ville" v-model="agencyCity" />
                    <p v-if="modifyKey !== agency.id_agency">{{ agency.phone }}</p>
                    <input v-if="modifyKey === agency.id_agency" type="text" placeholder="Nouveau Num Téléphone" v-model="agencyPhone" />

                    <div class="flex items-center justify-center gap-1" v-if="isAdmin === 1">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                             fill="none" viewBox="0 0 24 24" 
                             stroke-width="1.5" 
                             stroke="currentColor" 
                             class="w-7 h-7 text-sky-600 cursor-pointer" 
                             v-if="modifyKey !== agency.id_agency"
                             @click="showModifyInput(agency.id_agency)">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke-width="1.5" 
                            stroke="currentColor" 
                            class="w-7 h-7 text-lime-600 cursor-pointer"
                            @click="applyModificationAgency(agency.id_agency)"
                            v-if="modifyKey === agency.id_agency">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" 
                             fill="none" 
                             viewBox="0 0 24 24" 
                             stroke-width="1.5" 
                             stroke="currentColor" 
                             class="w-7 h-7 text-red-600 cursor-pointer"
                             @click="showConfirmation = true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </div>
                    <!-- Confirmation box -->
                    <div
                        v-if="showConfirmation"
                        class="fixed inset-0 flex items-center justify-center bg-black/20"
                        >
                        <div class="bg-white p-6 rounded shadow">
                            <h3 class="text-lg font-semibold mb-4">Êtes-vous sûrs de vouloir supprimer cet agence ?</h3>
                            <div class="flex justify-end">
                            <button
                                @click="showConfirmation = false"
                                class="px-4 py-2 text-gray-500 bg-gray-100 rounded mr-2 hover:bg-gray-200"
                            >
                                Annuler
                            </button>
                            <button
                                @click="deleteAgency(agency.id_agency)"
                                class="px-4 py-2 bg-red-300 text-red-700 rounded hover:bg-red-500 hover:text-red-900"
                            >
                                Supprimer
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
    import axios from 'axios';
    import jwtDecode from 'jwt-decode';
    import { ref } from 'vue';

    let showConfirmation = ref(false);
    let modifyKey = ref(-1);
    let showAddAgency = ref(false);


    const getAgenciesData = async() => {
        try {
            const responseAgencies = await axios.get(`http://localhost:8000/agency`);
            return responseAgencies.data;
        } catch (error) {
            console.error(error);
        }
    }

    let AgenciesData = await getAgenciesData();

    const AgenciesDataLength = AgenciesData.length;

    let id = null;
    let isAdmin = null;
    let firstName = null;
    let lastName = null;
    let email = null;

    const token = localStorage.getItem('token');

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

    const deleteAgency = async(id_agency) => {
        try {
            const response = await axios.delete(`http://localhost:8000/agency/${id_agency}`);
            showConfirmation.value = false;
            // Remove the deleted appointment from the appointmentData array
            AgenciesData = AgenciesData.filter((agency) => agency.id_agency !== id_agency);
        } catch (error) {
            console.error(error);
        }
    }
    let agencyCity = null;
    let agencyAddress = null;
    let agencyZipCode = null;
    let agencyPhone = null;

    const showModifyInput = (agencyId) => {
        modifyKey.value = agencyId;

        let i = 0;
        while(AgenciesData[i].id_agency != agencyId && i < AgenciesDataLength) {
            i++;
        }

        agencyCity = AgenciesData[i].city;
        agencyAddress = AgenciesData[i].address;
        agencyZipCode = AgenciesData[i].zip_code;
        agencyPhone = AgenciesData[i].phone;
    };

    const applyModificationAgency = async (agencyId) => {
        let i = 0;
        while(AgenciesData[i].id_agency != agencyId && i < AgenciesDataLength) {
            i++;
        }
        agencyCity = agencyCity !== null ? agencyCity : AgenciesData[i].city;
        agencyAddress = agencyAddress !== null ? agencyAddress : AgenciesData[i].address;
        agencyZipCode = agencyZipCode !== null ? agencyZipCode : AgenciesData[i].zip_code;
        agencyPhone = agencyPhone !== null ? agencyPhone : AgenciesData[i].phone;
        try {
            if (agencyCity && agencyAddress && agencyZipCode && agencyPhone) {
                const response = await axios.put(`http://localhost:8000/agency/${agencyId}`, {
                    address: agencyAddress,
                    city: agencyCity,
                    zip_code: agencyZipCode,
                    phone: agencyPhone,
                });
                // Update the appointmentData array
                AgenciesData = AgenciesData.map((agency) => {
                    if (agency.id_agency === agencyId) {
                        return {
                            ...agency,
                            adress: agencyAddress,
                            city: agencyCity,
                            zip_code: agencyZipCode,
                            phone: agencyPhone,
                        };
                    }
                    return agency;
                });
            }     
            modifyKey.value = -1;
        } catch (error) {
            console.error(error);
        }
    };

    let newAgencyCity = null;
    let newAgencyAddress = null;
    let newAgencyZipCode = null;
    let newAgencyPhone = null;

    const addAgency = async () =>{
        try {
            if (newAgencyCity && newAgencyAddress && newAgencyZipCode && newAgencyPhone) {
                const response = await axios.post(`http://localhost:8000/agency`, {
                    address: newAgencyAddress,
                    city: newAgencyCity,
                    zip_code: newAgencyZipCode,
                    phone: newAgencyPhone,
                });
                // Update the appointmentData array
                AgenciesData = [...AgenciesData, {
                    id_agency: response.data.id_agency,
                    address: newAgencyAddress,
                    city: newAgencyCity,
                    zip_code: newAgencyZipCode,
                    phone: newAgencyPhone,
                }];
            }     
            showAddAgency.value = false;
        } catch (error) {
            console.error(error);
        }
    };

</script>
