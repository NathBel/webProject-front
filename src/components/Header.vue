<template>
    <header id="header">
        <div class="bg-header-footer text-neutral-50 text-lg w-screen h-40 flex items-center justify-around space-x-10 > * + *">
            <RouterLink :to="{name: 'home'}">
                <div class="flex flex-col items-center" @click="changePage('sale')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10  self-center">
                        <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <h1>Nath'Immo</h1>
                </div>
            </RouterLink>
            <div class="flex items-center gap-16">
                <div class="flex gap-8">
                    <RouterLink :to="{name: 'home'}" @click="changePage('sale')">
                        <div class="flex flex-col items-center cursor-pointer">
                            <h2>Acheter</h2>
                            <div v-if="state.activePage === 'sale'" class="rounded-full bg-blue-primary w-2 h-2"></div>
                        </div>
                    </RouterLink>
                    <RouterLink :to="{name: 'home'}"  @click="changePage('rent')">
                        <div class="flex flex-col items-center cursor-pointer">
                            <h2>Louer</h2>
                            <div v-if="state.activePage === 'rent'" class="rounded-full bg-blue-primary w-2 h-2"></div>
                        </div>
                    </RouterLink>
                    <RouterLink :to="{name: 'AgenciesView'}">
                        <div class="flex flex-col items-center cursor-pointer" @click="changePage('agencies')">
                            <h2>Nos agences</h2>
                            <div v-if="state.activePage === 'agencies'" class="rounded-full bg-blue-primary w-2 h-2"></div>
                        </div>
                    </RouterLink>
                </div>
                <div class="flex items-center  gap-6">
                    <RouterLink :to="{name: 'LoginView'}">
                        <button
                            v-if="!state.connected"
                            type="button"
                            class="inline-block rounded bg-blue-primary px-4 pb-2.5 pt-2 text-lg font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                        <h2>Se Connecter</h2>
                        </button>
                    </RouterLink>

                    <div class="relative" v-if="state.connected">
                        <button
                        @click="toggleDropdown"
                        class="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Bonjour {{ firstName }}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" ml-4 w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>

                        </button>

                        <!-- Dropdown content -->
                        <div
                        v-if="state.isDropdownOpen"
                        class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
                        >
                        <div class="">
                            <RouterLink :to="{name: 'LikeView'}">
                                <div
                                class="flex items-center px-4 py-2 rounded-md  text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                    Likes
                                </div>
                            </RouterLink>
                            <RouterLink :to="{name: 'AppointmentView'}">
                                <div
                                class="flex items-center px-4 py-2 rounded-md  text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                </svg>
                                Rendez-vous
                                </div>
                            </RouterLink>
                            <RouterLink :to="{name: 'SettingsView'}">
                                <div
                                class="flex items-center px-4 py-2 rounded-md  text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Paramètres compte
                            </div>
                            </RouterLink>
                            <button
                            @click="logout()"
                            class="w-full flex justify-center rounded-md  px-4 py-2 text-sm text-danger-800 bg-danger-400 hover:bg-danger-500 hover:text-danger-900"
                            >
                            Se déconnecter
                            </button>
                        </div>
                        </div>
                    </div>
                       
                    <RouterLink :to="{name: 'LikeView'}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round" 
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </RouterLink>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
    import { RouterLink } from 'vue-router'
    import { reactive } from 'vue'; 
    import { ref } from 'vue';
    import jwtDecode from 'jwt-decode';

    let id = null;
    let isAdmin = null;
    let firstName = null;
    let lastName = null;
    let email = null;


    const state = reactive({
        activePage: localStorage.getItem('activePage') || 'sale',
        connected: false,
        isDropdownOpen: false,
    });

    const changePage = (page) => {
        state.activePage = page;
        localStorage.setItem('activePage', page);
    };

    const token = localStorage.getItem('token');

    if (token) {
        state.connected = true;

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
        console.log(id, isAdmin, firstName, lastName, email)
    }

    const logout = () => {
        localStorage.removeItem('token');
        state.connected = false;
    }

    const toggleDropdown = () => {
        state.isDropdownOpen = !state.isDropdownOpen;
    }

</script>