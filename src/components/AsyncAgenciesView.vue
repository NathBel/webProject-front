<template>
    <div class="w-screen mt-8">
        <div class="flex flex-col lg:flex-row justify-between mx-4 lg:mx-8 my-4">
            <h2 class="text-xl lg:text-2xl font-medium">
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
                    <div 
                    v-if="adding.emptyFields"
                    class="mt-6 bg-red-300 flex justify-center w-full rounded px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-red-700 shadow-[0_4px_9px_-4px_#3b71ca] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                        Veuillez saisir tous les champs !
                    </div>
                </div>
            </div>

        </div>

        <div class="mx-8">
            <div 
                v-if="adding.success"
                class="mt-6 w-full bg-green-300 flex justify-center rounded px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-green-700 shadow-[0_4px_9px_-4px_#3b71ca] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                Agence ajoutée avec succès !
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 mx-8 my-4">
            <div v-for="agency in AgenciesData" :key="agency.id_agency">
                <div class="flex flex-col items-center text-xl rounded-3xl border-2 border-sky-900 bg-slate-200 m-4 p-2">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <p v-if="modifyKey !== agency.id_agency">{{ agency.address }}</p>
                        <input v-if="modifyKey === agency.id_agency" type="text" placeholder="Nouvelle Adresse Postale" v-model="agencyAddress" />
                    </div>
                
                    <div class="flex items-center gap-2">   
                        <p v-if="modifyKey !== agency.id_agency">{{ agency.city }}</p>
                        <input v-if="modifyKey === agency.id_agency" type="text" class="w-48 m-2" placeholder="Nouvelle ville" v-model="agencyCity" />
                        <p v-if="modifyKey !== agency.id_agency">({{ agency.zip_code }})</p>
                        <input v-if="modifyKey === agency.id_agency" type="text" class="w-20" placeholder="Nouveau Code Postal" v-model="agencyZipCode" />
                    </div>


                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>

                        <p v-if="modifyKey !== agency.id_agency">{{ agency.phone }}</p>
                        <input v-if="modifyKey === agency.id_agency" type="text" placeholder="Nouveau Num Téléphone" v-model="agencyPhone" />
                    </div>

                    <div class="hidden lg:flex items-center justify-center gap-1" v-if="isAdmin === 1">
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
    import { ref, reactive } from 'vue';

    let showConfirmation = ref(false);
    let modifyKey = ref(-1);
    let showAddAgency = ref(false);

    const adding = reactive({
        success: false,
        error: false,
        emptyFields: false
    });

    const success = async () => {
        adding.success = true;

        // Set a timeout to change the variable to false after 3 seconds
        setTimeout(() => {
            adding.success = false;
        }, 3000);
    }

    const getAgenciesData = async() => {
        try {
            const responseAgencies = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/agency`);
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

    console.log(token);

    const deleteAgency = async(id_agency) => {
        try {
             const response = await axios.delete(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/agency/${id_agency}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach the token as "Bearer <token>"
                },
            });
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
                const response = await axios.put(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/agency/${agencyId}`, {
                    address: agencyAddress,
                    city: agencyCity,
                    zip_code: agencyZipCode,
                    phone: agencyPhone,
                    }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
        if(newAgencyCity === null || newAgencyAddress === null || newAgencyZipCode === null || newAgencyPhone === null) {
            adding.emptyFields = true;
            return;
        } else{
            try {
                if (newAgencyCity && newAgencyAddress && newAgencyZipCode && newAgencyPhone) {
                    const response = await axios.post(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/agency`, {
                        address: newAgencyAddress,
                        city: newAgencyCity,
                        zip_code: newAgencyZipCode,
                        phone: newAgencyPhone,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
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
                success();
            } catch (error) {
                console.error(error);
            }
        }
    };

</script>
