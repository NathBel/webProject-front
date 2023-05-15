<template>
    <div class="w-screen mt-8 mx-10">
        <div class="flex justify-between">
            <h2 class="text-2xl font-medium">
                {{ ResultDataLength }} Biens Trouvé(s)
            </h2>
            <div class="flex items-center text-xl gap-2 text-lime-600 cursor-pointer" v-if="isAdmin === 1" @click="showAddHousing = true">
                <h3>Ajouter un bien</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
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
                            <div><input type="radio" v-model="newHousingType" value="maison" name="housingType"  /> Maison</div>
                            <div><input type="radio" v-model="newHousingType" value="appartement" name="housingType"/> Appartement</div>
                            <div><input type="radio" v-model="newHousingType" value="terrain" name="housingType"/> Terrain</div>
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
                </div>
            </div>
        </div>
        <!-- Affichage des résultats -->
        <div class="grid bg-slate-300 mb-8">
            <div v-for="result in ResultData" :key="result.id_housing">
                <div class="flex cursor-pointer hover:bg-slate-500 bg-slate-400 m-16 p-4" @click.prevent="showHousing(result.id_housing)">
                    <div class="w-full h-full">
                        <div class="flex justify-center">
                            <div class="m-4">
                                <p>{{ result.photos }}</p>
                                <img :src="result.photos" alt="Image du logement" class="w-80 h-52 object-none">
                                
                            </div>
                            <div>
                                <div class="m-4 flex items-end w-80 gap-x-4">
                                    <p class="text-3xl font-extrabold">{{ result.price.toLocaleString() }} €</p>
                                    <p v-if="result.type !== 'terrain'" class="text-base italic">soit {{ Math.round(result.price / result.living_surface).toLocaleString() }} €/m²</p>
                                    <p v-else class="text-base italic">soit {{ Math.round(result.price / result.global_surface).toLocaleString() }} €/m²</p>
                                </div>
                                <p class=" m-4 text-xl">{{ result.type.charAt(0).toUpperCase() + result.type.slice(1) }}</p>
                                <div class="m-4 w-96">
                                    <p class="text-lg">{{ result.number_room }} pièces - {{ result.living_surface }}m² habitable - {{ result.global_surface }}m² de terrain</p>
                                </div>
                                <p class="m-4 text-xl">{{ result.city }} ({{ result.zip_code }}) </p>
                                <div class="flex justify-end items-end">
                                    <svg v-if="!likes.includes(result.id_housing)" @click.stop="addLike(result.id_housing)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer w-10 h-10">
                                        <path stroke-linecap="round" stroke-linejoin="round" 
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                    <svg v-if="likes.includes(result.id_housing)" @click.stop="removeLike(result.id_housing)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="cursor-pointer text-red-700 w-10 h-10">
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
    import { isEqual } from 'lodash';
    import jwtDecode from 'jwt-decode';
    import { ref } from 'vue';

    const token = localStorage.getItem('token');

    let id = null;
    let isAdmin = null;
    let firstName = null;
    let lastName = null;
    let email = null;
    let showAddHousing = ref(false);

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



    const route = useRoute();
    const router = useRouter();

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

    const getResultData = async() => {
        try {
            //Type of housing
            const responseType = [];

            if (route.query.house === 'true') {
                const response = await axios.get(`http://localhost:8000/housing/type/maison`);
                responseType.push(...response.data);
            }

            if (route.query.apartement === 'true') {
                const response = await axios.get(`http://localhost:8000/housing/type/appartement`);
                responseType.push(...response.data);
            }

            if (route.query.land === 'true') {
                const response = await axios.get(`http://localhost:8000/housing/type/terrain`);
                responseType.push(...response.data);
            }

            const getMinBudget = async()=>{
                const response = await axios.get(`http://localhost:8000/housing/min_price`);
                return response.data[0].min;
            }

            const getMaxBudget = async()=>{
                const response = await axios.get(`http://localhost:8000/housing/max_price`);
                return response.data[0].max;
            }

            const getMinSurface = async()=>{
                const response = await axios.get(`http://localhost:8000/housing/min_surface`);
                return response.data[0].min;
            }

            const getMaxSurface = async()=>{
                const response = await axios.get(`http://localhost:8000/housing/max_surface`);
                return response.data[0].max;
            }

            const getMinTerrain = async()=>{
                const response = await axios.get(`http://localhost:8000/housing/min_global_surface`);
                return response.data[0].min;
            }

            const getMaxTerrain = async()=>{
                const response = await axios.get(`http://localhost:8000/housing/max_global_surface`);
                return response.data[0].max;
            }

            let city = route.query.city === '' ? 'pourcentage' : req.query.city;
            let minBudget = route.query.minBudget === '' ? await getMinBudget() : req.query.minBudget;
            let maxBudget = route.query.maxBudget === '' ? await getMaxBudget() : req.query.maxBudget;
            let minSurface = route.query.minSurface === '' ? await getMinSurface() : req.query.minSurface;
            let maxSurface = route.query.maxSurface === '' ? await getMaxSurface() : req.query.maxSurface;
            let minTerrain = route.query.minTerrain === '' ? await getMinTerrain() : req.query.minTerrain;
            let maxTerrain = route.query.maxTerrain === '' ? await getMaxTerrain() : req.query.maxTerrain;
            
            let responseResearch = null;
            try{
                responseResearch = await axios.get(`http://localhost:8000/housing/research/${city}/${maxBudget}/${minBudget}/${maxTerrain}/${minTerrain}/${maxSurface}/${minSurface}`);
            }
            catch(error){
                console.log(error);
            }


            if(route.query.rent === 'true'){
                responseRent = await axios.get(`http://localhost:8000/housing/rent`);
            }

            if(route.query.sale === 'true'){
                responseSale = await axios.get(`http://localhost:8000/housing/sale`);
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

            HousingResults.forEach(async (element) => {
                try {
                    responsePhoto = await axios.get(`http://localhost:8000/photos/${element.id_housing}`);
                    console.log(responsePhoto.data[0].photo);
                
                    const imageData = responsePhoto.data[0].photo.data;
                    console.log(imageData);
                    const blob = new Blob([imageData], { type: 'image/jpeg' });
                    console.log(blob);
                    const blobURL = URL.createObjectURL(blob);
                    console.log(element.photos);
                    element.photos = blobURL;
                    console.log(element.photos);
    
                } catch (error) {
                    // Handle the error
                    // element.photos = '/src/assets/image/no-image.jpg';
                }
            });

            return HousingResults;

        }
        catch (err) {
            console.log(err);
        }
    }

    const showHousing = ((id_housing) => {
        // Use the retrieved values for further processing

        router.push({
            name: 'HousingView',
            query: {
                id_housing: id_housing
            }
        });
    });


    let ResultData = await getResultData();

    let ResultDataLength = ResultData.length;

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
                newHousingGlobalSurface && newHousingNumberRoom  !== null && newHousingDescription && newHousingRent !== null && newHousingSale !== null){
                    const response = await axios.post(`http://localhost:8000/housing`, {
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
                    
                });
                // Update the ResultData array
                ResultData = [...ResultData, {
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

                ResultDataLength = ResultData.length;

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
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getLikes = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/likes/user/${id}`);
            let likes = []; // Use a different variable name to avoid overwriting the array

            for (let item of response.data) {
                likes.push(item.id_housing); // Push the value into the `likes` array
            }
            return likes;
        } catch (err) {
            console.log(err);
        }
    }

    let likes = ref([]);
    likes.value = await getLikes(id);
    
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

