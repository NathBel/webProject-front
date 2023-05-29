<template>
    <div class="w-screen mt-8 mx-4 lg:mx-10">
        <div class="flex justify-between lg:mx-16">
            <h2 class="text-lg lg:text-2xl font-medium">
                {{ ResultDataLength }} Biens Trouvé(s)
            </h2>
            <div class="flex items-center text-lg lg:text-xl gap-2 text-lime-600 cursor-pointer" v-if="isAdmin === 1" @click="showAddHousing = true">
                <h3>Ajouter un bien</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 lg:w-7 lg:h-7">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <!-- Add housing box -->
            <div
                v-if="showAddHousing"
                class="fixed inset-0 flex items-center justify-center bg-black/20"
                >
                <div class="bg-white p-6 rounded shadow">
                    <h3 class="text-lg font-semibold mb-4 text-black">Ajouter un nouveau bien</h3>
                    <div class="flex flex-col gap-4 m-6">
                        <div class="flex gap-3">
                            <div class="flex gap-2">
                                <input type="radio" v-model="newHousingType" value="maison" name="housingType" /> Maison
                                <input type="radio" v-model="newHousingType" value="appartement" name="housingType"/> Appartement
                                <input type="radio" v-model="newHousingType" value="terrain" name="housingType"/> Terrain
                            </div>
                        </div>
                        <input type="number" placeholder="Prix" v-model="newHousingPrice" />
                        <input type="text" placeholder="Addresse Postale" v-model="newHousingAddress" />
                        <input type="text" placeholder="Ville" v-model="newHousingCity" />
                        <input type="text" placeholder="Code Postal" v-model="newHousingZipCode" />
                        <input type="number" placeholder="Surface Habitable" v-model="newHousingLivingSurface" />
                        <input type="number" placeholder="Surface Totale" v-model="newHousingGlobalSurface" />
                        <input type="number" placeholder="Nombre de pièces" v-model="newHousingNumberRoom" />
                        <textarea placeholder="Description" v-model="newHousingDescription"></textarea>
                        <div class="flex gap-3 justify-center">
                            <div><input type="radio" v-model="newHousingEnergyClass" value="A" name="housingEnergyPerf"/> A</div>
                            <div><input type="radio" v-model="newHousingEnergyClass" value="B" name="housingEnergyPerf"/> B</div>
                            <div><input type="radio" v-model="newHousingEnergyClass" value="C" name="housingEnergyPerf"/> C</div>
                            <div><input type="radio" v-model="newHousingEnergyClass" value="D" name="housingEnergyPerf"/> D</div>
                            <div><input type="radio" v-model="newHousingEnergyClass" value="E" name="housingEnergyPerf"/> E</div>
                            <div><input type="radio" v-model="newHousingEnergyClass" value="F" name="housingEnergyPerf"/> F</div>
                            <div><input type="radio" v-model="newHousingEnergyClass" value="G" name="housingEnergyPerf"/> G</div>
                        </div>
                        <div class="flex gap-3 justify-center">
                            <label>A Louer</label>
                            <input type="checkbox" v-model="newHousingRent"/>
                            <label>A Vendre</label>
                            <input type="checkbox" v-model="newHousingSale"/>
                        </div>
                        <div class="flex gap-3 justify-center">
                            <label>Photos</label>
                            <input type="file" name="photos"/>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <button
                            @click="showAddHousing = false"
                            class="px-4 py-2 text-gray-500 bg-gray-100 rounded mr-2 hover:bg-gray-200"
                        >
                            Annuler
                        </button>
                        <button
                            @click="addHousing()"
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

        <div 
            v-if="adding.success"
            class="my-6 w-full bg-green-300 flex justify-center rounded px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-green-700 shadow-[0_4px_9px_-4px_#3b71ca] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
            Bien ajouté avec succès !
        </div>

        <!-- Affichage des résultats -->
        <div class="grid pt-2">
            <div v-for="result in ResultData" :key="result.id_housing">
                <div class="flex cursor-pointer lg:rounded-3xl lg:border-2 border-b border-sky-900 hover:bg-slate-200 lg:mx-16 mb-8 p-4" @click.prevent="showHousing(result.id_housing)">
                    <div class="w-full h-full">
                        <div class="lg:flex justify-center">
                            <div class="w-full h-1/2 lg:w-80 lg:h-52 lg:m-4 flex justify-center">
                                <img :src="result.photos" alt="Image du logement" class="object-fill lg:w-80 lg:h-52">                             
                            </div>
                            <div>
                                <div class="m-2 lg:m-4 flex items-end gap-x-4 justify-between">
                                    <p class="text-3xl font-extrabold">{{ result.price.toLocaleString() }} €</p>
                                    <p v-if="result.type !== 'terrain'" class="text-base italic">soit {{ Math.round(result.price / result.living_surface).toLocaleString() }} €/m²</p>
                                    <p v-else class="text-base italic">soit {{ Math.round(result.price / result.global_surface).toLocaleString() }} €/m²</p>
                                </div>
                                <p class="m-2 lg:m-4 text-lg blg:text-xl">{{ result.type.charAt(0).toUpperCase() + result.type.slice(1) }}</p>
                                <div class="m-2 lg:m-4 lg:w-96">
                                    <p class="text-lg">{{ result.number_room }} pièces - {{ result.living_surface }}m² habitable - {{ result.global_surface }}m² de terrain</p>
                                </div>
                                <p class="m-2 lg:m-4 text-lg blg:text-xl">{{ result.city }} ({{ result.zip_code }}) </p>
                                <div class="flex justify-end items-end">
                                    <svg v-if="!likes.includes(result.id_housing)" @click.stop="addLike(result.id_housing)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer w-7 h-7 lg:w-10 lg:h-10">
                                        <path stroke-linecap="round" stroke-linejoin="round" 
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                    <svg v-if="likes.includes(result.id_housing)" @click.stop="removeLike(result.id_housing)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="cursor-pointer text-red-700 w-7 h-7 lg:w-10 lg:h-10">
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
    import axios from 'axios';
    import { useRoute, useRouter } from 'vue-router';
    import isEqual from 'lodash/isEqual';
    import jwtDecode from 'jwt-decode';
    import { ref, watch, reactive } from 'vue';

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

    const token = localStorage.getItem('token');

    let id;
    let isAdmin;
    let firstName;
    let lastName;
    let email;

    let responseCity = null;
    let MinBudget = null;
    let MaxBudget = null;
    let MinSurface = null;
    let MaxSurface = null;
    let MinTerrain = null;
    let MaxTerrain = null;
    let responseRent = null;
    let responseSale = null;
    let responsePhoto;
    let arrays;
    let responseTypeHouse = null;
    let responseTypeApartement = null;
    let responseTypeLand = null;
    let responseResearch = null;

    let showAddHousing = ref(false);

    const route = useRoute();
    const router = useRouter();

    console.log(route.query);

    if(token){
        try {
        // Decode the token
        const decoded = jwtDecode(token);
        console.log(token);

        // Assign the values
        id = decoded.dataId;
        isAdmin = decoded.dataIsAdmin;
        firstName = decoded.dataFirstname;
        lastName = decoded.dataLastname;
        email = decoded.dataEmail;
        

        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    }

    const getResultData = async() => {
        try {
            //Type of housing
            const responseType = [];

            try{
                if (route.query.house === 'true') {
                const response = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing/type/maison`);
                responseType.push(...response.data);
                }
            } catch (error) {
                console.log(error);
            }
            

            try{
                if (route.query.apartement === 'true') {
                const response = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing/type/appartement`);
                responseType.push(...response.data);
                }
            } catch (error) {
                console.log(error);
            }

            try{
                if (route.query.land === 'true') {
                const response = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing/type/terrain`);
                responseType.push(...response.data);
                }
            } catch (error) {
                console.log(error);
            }

            const getMinBudget = async()=>{
                try{
                    const response = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing/min_price`);
                    return response.data[0].min;
                } catch (error) {
                    console.log(error);
                }
            }

            const getMaxBudget = async()=>{
                try{
                    const response = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing/max_price`);
                    return response.data[0].max;
                } catch (error) {
                    console.log(error);
                }
            }

            const getMinSurface = async()=>{
                try {
                    const response = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing/min_surface`);
                    return response.data[0].min;
                } catch (error) {
                    console.log(error);
                }
            }

            const getMaxSurface = async()=>{
                try{
                    const response = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing/max_surface`);
                    return response.data[0].max;
                } catch (error) {
                    console.log(error);
                }
            }

            const getMinTerrain = async()=>{
                try {
                    const response = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing/min_global_surface`);
                    return response.data[0].min;
                } catch (error) {
                    console.log(error);
                }
            }

            const getMaxTerrain = async()=>{
                try{
                    const response = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing/max_global_surface`);
                    return response.data[0].max;
                } catch (error) {
                    console.log(error);
                }
            }

            let city = null;
            let minBudget = null;
            let maxBudget = null;
            let minSurface = null;
            let maxSurface = null;
            let minTerrain = null;
            let maxTerrain = null;

            city = route.query.city === '' ? 'pourcentage' : route.query.city;
            minBudget = route.query.minBudget === '' ? await getMinBudget() : route.query.minBudget;
            maxBudget = route.query.maxBudget === '' ? await getMaxBudget() : route.query.maxBudget;
            minSurface = route.query.minSurface === '' ? await getMinSurface() : route.query.minSurface;
            maxSurface = route.query.maxSurface === '' ? await getMaxSurface() : route.query.maxSurface;
            minTerrain = route.query.minTerrain === '' ? await getMinTerrain() : route.query.minTerrain;
            maxTerrain = route.query.maxTerrain === '' ? await getMaxTerrain() : route.query.maxTerrain;

            
            try{
                responseResearch = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing/research/${city}/${maxBudget}/${minBudget}/${maxTerrain}/${minTerrain}/${maxSurface}/${minSurface}`);
            }
            catch(error){
                console.log(error);
            }


            if(route.query.rent === 'true'){
                responseRent = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing/rent`);
            }

            if(route.query.sale === 'true'){
                responseSale = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing/sale`);
            }

            arrays = [
                    responseResearch.data,
                    responseType
            ];


            responseRent !== null ? arrays.push(responseRent.data) : null;

            responseSale !== null ? arrays.push(responseSale.data) : null;
            

            const HousingResults = arrays.reduce((accumulator, currentArray) => {
                return accumulator.filter(element => currentArray.some(arr => isEqual(arr, element)));
            });

 
            const photoPromises = HousingResults.map(async (element) => {
                try {
                    //https://nathimmo-backend.cluster-ig3.igpolytech.fr
                    //http://localhost:5000
                    const responsePhoto = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/photos/${element.id_housing}`);
                    const imageData = responsePhoto.data[0].photo;
                    const base64Data = btoa(String.fromCharCode(...imageData.data));
                    element.photos = `data:${responsePhoto.data[0].type};base64,${base64Data}`;
                
                } catch (error) {
                    element.photos = '/src/assets/image/no-image3.jpg';
                }
            });

            await Promise.all(photoPromises);

            return HousingResults;

        }
        catch (err) {
            console.log(err);
        }
    }

    const showHousing = ((id_housing, photos) => {
        // Use the retrieved values for further processing

        router.push({
            name: 'HousingView',
            query: {
                id_housing: id_housing,
            }
        });
    });

    let newHousingType = null;
    let newHousingCity = null;
    let newHousingPrice = null;
    let newHousingZipCode = null;
    let newHousingAddress = null;
    let newHousingLivingSurface = null;
    let newHousingGlobalSurface = null;
    let newHousingNumberRoom = null;
    let newHousingDescription = null;
    let newHousingEnergyClass = null;
    let newHousingRent  = null;
    let newHousingSale = null;


    const addHousing = async () =>{
        newHousingRent = newHousingRent === null ? 0 : 1;
        newHousingSale = newHousingSale === null ? 0 : 1;
        try{
            if(newHousingAddress && newHousingType && newHousingCity && newHousingPrice && newHousingZipCode && newHousingLivingSurface !== null &&
                newHousingGlobalSurface && newHousingNumberRoom !== null && newHousingDescription && newHousingRent !== null && newHousingSale !== null){
                    const response = await axios.post(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/housing`, {
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
                    sale: newHousingSale,
                    location: newHousingRent,
                    id_agency: 6
                    
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Update the ResultData array
                ResultData.value = [...ResultData.value, {
                    id_housing: response.data.id_housing,
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
                    sale: newHousingSale,
                    location: newHousingRent,
                }];

                ResultDataLength.value = ResultData.value.length;

                // Reset the values
                newHousingType = null;
                newHousingCity = null;
                newHousingPrice = null;
                newHousingZipCode = null;
                newHousingAddress = null;
                newHousingLivingSurface = null;
                newHousingGlobalSurface = null;
                newHousingNumberRoom = null;
                newHousingDescription = null;
                newHousingEnergyClass = null;
                newHousingRent  = null;
                newHousingSale = null;

                // Hide the modal
                showAddHousing.value = false;
                success();
            } else {
                adding.emptyFields = true;
            }
        } catch (err) {
            console.log(err);
        }
    }

    let likesData = [];

    const getLikes = async (id) => {
        try {
            const response = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/likes/user/${id}`);
            if(!response.data){
                return [];
            } else{
                for (let item of response.data) {
                    likesData.push(item.id_housing); // Push the value into the `likes` array
                }
                return likesData;
            }
        } catch (err) {

            console.log(err);
        }
    }

    let likes = ref([]);
    if(token){
        likes.value = await getLikes(id);
        if(!likes.value){
            likes.value = [];
        }
    }
    
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

    let ResultData = ref([]);
    ResultData.value = await getResultData();
    let ResultDataLength = ref(0);
    ResultDataLength.value = ResultData.value.length;

    // Watch the route for changes
    watch(route, async (to, from) => {
        try {
            const response = await getResultData();
            ResultData.value = response;
            ResultDataLength.value = ResultData.value.length;
        } catch (err) {
            console.log(err);
        }
    }, { immediate: true });
</script>

