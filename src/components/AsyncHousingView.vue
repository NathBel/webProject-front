<template>
    <div class="lg:flex">
        <div class="lg:w-[51rem] my-4 lg:my-8 lg:mx-8">
            <div class="flex justify-center lg:justify-center lg:mx-10 w-screen lg:w-[46rem] lg:h-[29rem]">
                <img :src="HousingData.photos" alt="Image du logement" class="object-fill lg:w-[46rem] lg:h-[29rem]">
            </div>
            <div class="flex flex-col lg:flex-row lg:items-center justify-between my-8 mx-4 lg:mx-10">
                <p class="text-2xl lg:text-3xl font-bold"><span v-if="!showModifyInput">{{ HousingData.type.charAt(0).toUpperCase() + HousingData.type.slice(1) }}</span>
                    <div v-if="showModifyInput" class="flex gap-3 text-lg font-medium">
                        <div><input type="radio" v-model="newHousingType" value="maison" name="housingType"  /> Maison</div>
                        <div><input type="radio" v-model="newHousingType" value="appartement" name="housingType"/> Appartement</div>
                        <div><input type="radio" v-model="newHousingType" value="terrain" name="housingType"/> Terrain</div>
                    </div>
        
                    <span v-if="HousingData.location == true && !showModifyInput"> à Louer</span>
                    <span v-if="HousingData.sale == true && !showModifyInput"> à Vendre</span></p>
                    <div class="flex gap-2">
                        <div class="lg:flex items-center justify-center gap-1 hidden" v-if="isAdmin === 1">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6 lg:w-7 lg:h-7 text-sky-600 cursor-pointer"
                                v-if="!showModifyInput"
                                @click="showModifyInput = true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6 lg:w-7 lg:h-7 text-lime-600 cursor-pointer"
                                @click="applyModificationHousing(HousingData.id_housing)"
                                v-if="showModifyInput">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6 lg:w-7 lg:h-7 text-red-600 cursor-pointer"
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
                                <h3 class="text-lg font-semibold mb-4">Êtes-vous sûr de vouloir supprimer ce bien ?</h3>
                                <div class="flex justify-end">
                                <button
                                    @click="showConfirmation = false"
                                    class="px-4 py-2 text-gray-500 bg-gray-100 rounded mr-2 hover:bg-gray-200"
                                >
                                    Annuler
                                </button>
                                <button
                                    @click="deleteHousing(HousingData.id_housing)"
                                    class="px-4 py-2 bg-red-300 text-red-700 rounded hover:bg-red-500 hover:text-red-900"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                <p v-if="!showModifyInput" class="flex items-end text-2xl lg:text-3xl font-bold">{{ HousingData.price.toLocaleString() }} €<p v-if="HousingData.location == true" class="ml-2 text-xl font-normal"> /mois</p></p>
                <input class="bg-slate-200" v-if="showModifyInput" type="number" placeholder="Prix" v-model="newHousingPrice" />
                </div>
            </div>
            <div v-if="showModifyInput" class="flex gap-3 items-center text-lg font-medium mx-10 mb-8">
                <label>Louer</label>
                <input type="checkbox" :checked="HousingData.location === 1" v-model="newHousingRent"/>
                <label>Vendre</label>
                <input type="checkbox" :checked="HousingData.sale === 1" v-model="newHousingSale"/>
            </div>
            <div class="mx-4 lg:mx-10 mb-8 font-medium">
                <p v-if="!showModifyInput" class="text-xl">{{ HousingData.number_room }} pièces • {{ HousingData.living_surface }}m² habitable • {{ HousingData.global_surface }}m² de terrain</p>
                <div v-if="showModifyInput"><input class="bg-slate-200" type="number" placeholder="Nombre de pièces" v-model="newHousingNumberRoom" /> • <input class="bg-slate-200" type="number" placeholder="Surface habitable" v-model="newHousingLivingSurface" />m² • <input class="bg-slate-200" type="number" placeholder="Surface du terrain" v-model="newHousingGlobalSurface" />m²</div>
            </div>
            <p v-if="!showModifyInput" class="mx-4 lg:mx-10 mb-8 font-medium text-xl">{{ HousingData.city }} ({{ HousingData.zip_code }}) </p>
            <div v-if="showModifyInput" class="mx-4 lg:mx-10 mb-8">
                <input class="bg-slate-200" type="text" placeholder="Ville" v-model="newHousingCity" />
                (<input class="bg-slate-200" type="text" placeholder="Code Postal" v-model="newHousingZipCode" />)
                <input class="bg-slate-200" type="text" placeholder="Addresse Postale" v-model="newHousingAddress" />
            </div>
            <div class="mx-4 lg:mx-10 my-2 flex gap-4 lg:gap-28 text-xl">
                <p class="font-medium w-1/2">Description : <span v-if="!showModifyInput" class="font-light">{{ HousingData.description }}</span>
                <textarea v-if="showModifyInput" placeholder="Description" v-model="newHousingDescription"></textarea></p>
                <div class="w-1/2">
                    <p class="font-medium">Diagnostic de Performance Energétique : </p>
                    <img v-if="!showModifyInput" class="" :src="HousingData.DPE" alt="Image DPE">
                    <div v-if="showModifyInput" class="flex gap-3 justify-center">
                        <div><input type="radio" v-model="newHousingEnergyClass" value="A" name="housingEnergyPerf"/> A</div>
                        <div><input type="radio" v-model="newHousingEnergyClass" value="B" name="housingEnergyPerf"/> B</div>
                        <div><input type="radio" v-model="newHousingEnergyClass" value="C" name="housingEnergyPerf"/> C</div>
                        <div><input type="radio" v-model="newHousingEnergyClass" value="D" name="housingEnergyPerf"/> D</div>
                        <div><input type="radio" v-model="newHousingEnergyClass" value="E" name="housingEnergyPerf"/> E</div>
                        <div><input type="radio" v-model="newHousingEnergyClass" value="F" name="housingEnergyPerf"/> F</div>
                        <div><input type="radio" v-model="newHousingEnergyClass" value="G" name="housingEnergyPerf"/> G</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="lg:sticky lg:top-0 h-max flex flex-col items-center lg:block mb-4">
            <div class="text-lg mt-8 mb-2 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                <h3>Prendre RDV</h3>
            </div>
            <div class="py-4 px-6 w-max h-min bg-slate-200 border-2 border-sky-900 rounded-3xl flex flex-col">
                <label>Date : </label>
                <input class="mb-2 px-2 h-8 border-2 border-sky-900 rounded-3xl" type="date" v-model="selectedDate" :min="minDate" :max="maxDate" />
                <label>Heure : </label>
                <select class="mb-2 px-2 h-8 border-2 border-sky-900 rounded-3xl bg-white" v-model="selectedTime">
                    <option v-for="time in timeOptions" :value="time.value" :key="time.value">
                        {{ time.label }}
                    </option>
                </select>
                <label>Agent Immobiler : </label>
                <select class="px-2 h-8 border-2 border-sky-900 rounded-3xl bg-white" v-model="agentId">
                    <option v-for="agent in agentsData" :value="agent.id_agent" :key="agent.id_agent">
                        {{ agent.firstname }} {{ agent.lastname }}
                    </option>
                </select>
                <input
                        type="submit" value="PRENDRE RDV" @click.prevent="addAppointment()"
                        class="cursor-pointer mt-4 uppercase inline-block rounded bg-blue-primary px-3 pb-2 pt-1.5 text-lg font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                <div
                    v-if="adding.emptyFields"
                    class="mt-6 bg-red-300 flex justify-center w-full rounded px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-red-700 shadow-[0_4px_9px_-4px_#3b71ca] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    Veuillez saisir tous les champs !
                </div>
                <div
                    v-if="adding.success"
                    class="mt-6 w-full bg-green-300 flex justify-center rounded px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-green-700 shadow-[0_4px_9px_-4px_#3b71ca] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    RDV ajouté !
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import jwtDecode from 'jwt-decode';
    import { ref, reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import { useRouter } from 'vue-router';

    const adding = reactive({
        success: false,
        error: false,
        emptyFields: false
    });

    const success = async () => {
        adding.success = true;
        adding.emptyFields = false;

        // Set a timeout to change the variable to false after 3 seconds
        setTimeout(() => {
            adding.success = false;
        }, 3000);
    }

    let showConfirmation = ref(false);
    let showModifyInput = ref(false);

    let id = null;
    let isAdmin = null;
    let firstName = null;
    let lastName = null;
    let email = null;
    

    const token = localStorage.getItem('token');

    if(token){
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
    }
    
    let timeOptions = ref([]);

    const generateTimeOptions = () =>{
      const startTime = 8; // Starting hour (e.g., 8 AM)
      const endTime = 18; // Ending hour (e.g., 6 PM)

      for (let hour = startTime; hour <= endTime; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          const timeLabel = `${hour}:${minute.toString().padStart(2, '0')}`;

          timeOptions.value.push({ value: time, label: timeLabel });
        }
      }
    }

    generateTimeOptions();

    const minDateCalc = () =>{
      const today = new Date();
      return today.toISOString().split('T')[0]; // Minimum date is today
    };

    let minDate = minDateCalc();

    const maxDateCalc = () =>{
      // Calculate the maximum date (e.g., 30 days from today)
      const today = new Date();
      const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
      return maxDate.toISOString().split('T')[0];
    };

    let maxDate = maxDateCalc();

    const route = useRoute();
    const router = useRouter();

    const getHousingData = async() => {
        try {
            let responseHousing = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing/id/${route.query.id_housing}`);
            responseHousing.data.DPE = '/src/assets/image/DPE/'+responseHousing.data.energy_performance+'.png';

            try{
                const responsePhoto = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/photos/${route.query.id_housing}`);
                
                const imageData = responsePhoto.data[0].photo;
        
                // Convert the blob data to a base64-encoded string
                const base64Data = btoa(String.fromCharCode(...imageData.data));
        
                // Assign the base64Data to a variable in your Vue component's data
                responseHousing.data.photos = `data:${responsePhoto.data[0].type};base64,${base64Data}`;
        
                return responseHousing.data;
            } catch (error) {
                responseHousing.data.photos = './src/assets/image/no-image3.jpg';
                console.error(error);
                return responseHousing.data;
            }

        } catch (error) {
            console.error(error);
        }
    }

    const HousingData = await getHousingData();

    const getAgentData = async () => {
        console.log(HousingData.id_agency);
        try {
            const responseAgent = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/agent/agency/${HousingData.id_agency}`);
            return responseAgent.data;
        } catch (error) {
            console.error(error);
        }
    }

    const agentsData = await getAgentData();
    console.log(agentsData);
    
    const deleteHousing = async(idHousing) => {
        try {
            const response = await axios.delete(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing/${idHousing}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            showConfirmation.value = false;
            router.push({ name: 'home' });
        } catch (error) {
            console.error(error);
        }
    }

    let newHousingType = HousingData.type;
    let newHousingCity = HousingData.city;
    let newHousingPrice = HousingData.price;
    let newHousingZipCode = HousingData.zip_code;
    let newHousingAddress = HousingData.address;
    let newHousingLivingSurface = HousingData.living_surface;
    let newHousingGlobalSurface = HousingData.global_surface;
    let newHousingNumberRoom = HousingData.number_room;
    let newHousingDescription = HousingData.description;
    let newHousingEnergyClass = HousingData.energy_performance;
    let newHousingRent  = HousingData.location === 1;
    let newHousingSale = HousingData.sale === 1;


    const applyModificationHousing = async (idHousing) => {
        try {
            const response = await axios.put(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing/${idHousing}`, {
                type: newHousingType,
                price: newHousingPrice,
                address: newHousingAddress,
                city: newHousingCity,
                zip_code: newHousingZipCode,
                global_surface: newHousingGlobalSurface,
                living_surface: newHousingLivingSurface,
                description: newHousingDescription,
                number_room: newHousingNumberRoom,
                energy_performance: newHousingEnergyClass,
                location: newHousingRent,
                sale: newHousingSale,
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Remove the deleted appointment from the appointmentData array
            showModifyInput.value = false;
            // Update the appointmentData array
            HousingData.price = newHousingPrice,
            HousingData.address = newHousingAddress,
            HousingData.city = newHousingCity,
            HousingData.zip_code = newHousingZipCode,
            HousingData.global_surface = newHousingGlobalSurface,
            HousingData.living_surface = newHousingLivingSurface,
            HousingData.description = newHousingDescription,
            HousingData.number_room = newHousingNumberRoom,
            HousingData.energy_performance = newHousingEnergyClass,
            HousingData.location = newHousingRent,
            HousingData.sale = newHousingSale
        } catch (error) {
            console.error(error);
        }
    }

    let selectedDate = ref(null);
    let selectedTime = ref(null);
    let agentId = null;

    const addAppointment = async () => {
        try {
            if(selectedDate.value === null || selectedTime.value === null || agentId === null){
                adding.emptyFields = true;
                return;
            } else {
                const response = await axios.post(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/appointment`, {
                    date: selectedDate.value,
                    time: selectedTime.value,
                    id_housing: HousingData.id_housing,
                    id_user: id,
                    id_agent: agentId
                });
                // Remove the deleted appointment from the appointmentData array
                showConfirmation.value = false;
                success();
            }
        } catch (error) {
            console.error(error);
        }
    }

</script>
