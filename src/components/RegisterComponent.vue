<template>
    <div class="my-4 min-[350px]:my-16 md:w-8/12 lg:ml-6 lg:w-5/12">
        <h2 class="mb-6 text-2xl">Créer mon compte</h2>
        <form>
            <div class="flex gap-36" data-te-input-wrapper-init>
                <div class="relative mb-6">
                    <input
                        v-model="firstname"
                        type="text"
                        class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput3"
                        placeholder="Prénom" />
                    <label
                        for="exampleFormControlInput3"
                        :class="{ 'translate-y-[-1.15rem] scale-[0.8] text-primary': firstname }"
                        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Prénom
                    </label>
                </div>
                <div class="relative mb-6">
                    <input
                        v-model="lastname"
                        type="text"
                        class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput3"
                        placeholder="Nom" />
                    <label
                        for="exampleFormControlInput3"
                        :class="{ 'translate-y-[-1.15rem] scale-[0.8] text-primary': lastname }"
                        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Nom
                    </label>
                </div>
            </div>

            <div class="relative mb-6">
                <input
                    v-model="phone"
                    type="tel"
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput3"
                    placeholder="N° Téléphone" />
                <label
                    for="exampleFormControlInput3"
                    :class="{ 'translate-y-[-1.15rem] scale-[0.8] text-primary': phone }"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >N° Téléphone
                </label>
            </div>

            <div class="relative mb-6">
                <input
                    v-model="address"
                    type="text"
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput3"
                    placeholder="Adresse postale" />
                <label
                    for="exampleFormControlInput3"
                    :class="{ 'translate-y-[-1.15rem] scale-[0.8] text-primary': address }"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Adresse postale
                </label>
            </div>

            <div class="flex gap-36" data-te-input-wrapper-init>
                <div class="relative mb-6">
                    <input
                        v-model="zipcode"
                        type="text"
                        class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput3"
                        placeholder="Code Postal" />
                    <label
                        for="exampleFormControlInput3"
                        :class="{ 'translate-y-[-1.15rem] scale-[0.8] text-primary': zipcode }"
                        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Code Postal
                    </label>
                </div>
                <div class="relative mb-6">
                    <input
                        v-model="city"
                        type="text"
                        class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput3"
                        placeholder="Ville" />
                    <label
                        for="exampleFormControlInput3"
                        :class="{ 'translate-y-[-1.15rem] scale-[0.8] text-primary': city }"
                        class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Ville
                    </label>
                </div>
            </div>

            <div class="relative mb-6">
                <input
                    v-model="mail"
                    type="email"
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput3"
                    placeholder="Adresse Mail" />
                <label
                    for="exampleFormControlInput3"
                    :class="{ 'translate-y-[-1.15rem] scale-[0.8] text-primary': mail }"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Adresse Mail
                </label>
            </div>

            <div class="relative mb-6">
                <input
                    v-model="password"
                    type="password"
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput3"
                    placeholder="Mot de Passe" />
                <label
                    for="exampleFormControlInput3"
                    :class="{ 'translate-y-[-1.15rem] scale-[0.8] text-primary': password }"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Mot de Passe
                </label>
            </div>

            <!-- Submit button -->
            <button
                type="submit"
                class="bg-blue-primary inline-block w-full rounded px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                @click.prevent="createAccount()">
                Créer mon compte
            </button>

            <div 
            v-if="register.errorField || register.errorAccountAlreadyExists"
            class="mt-6 bg-red-300 flex justify-center w-full rounded px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-red-700 shadow-[0_4px_9px_-4px_#3b71ca] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                <p v-if="register.errorField">Veuillez remplir tous les champs !</p>
                <p v-if="register.errorAccountAlreadyExists">Compte déjà existant, veuillez-vous connecter</p>
                <p v-if="register.passwordTooShort">Le mot de passe doit faire 6 caractères minimum</p>
                <p v-if="register.emailNotValid">Veuillez entrer un email valide</p>
                <p v-if="register.zipcodeNotValid">Veuillez entrer un code postal valide</p>
                <p v-if="register.phoneNotValid">Veuillez entrer un numéro de téléphone valide</p>
            </div>

            <RouterLink :to="{name: 'LoginView'}">
                <a class="mt-4 flex justify-center cursor-pointer text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">
                    Déjà un compte ? Connectez-vous
                </a>
            </RouterLink>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { reactive } from 'vue';
    import  { useRouter } from 'vue-router';
    import CryptoJS from 'crypto-js';

    const router = useRouter();

    const firstname = ref('');
    const lastname = ref('');
    const phone = ref('');
    const address = ref('');
    const zipcode = ref('');
    const city = ref('');
    const mail = ref('');
    const password = ref('');

    const register = reactive({
        errorField: false,
        errorAccountAlreadyExists: false,
        emailNotValid: false,
        passwordTooShort: false,
        zipcodeNotValid: false,
        phoneNotValid: false,
    });

    const createAccount = async() => {
        try{
            //Check if all fields are filled
            if(firstname.value == '' || lastname.value == '' || phone.value == '' || address.value == '' || zipcode.value == '' || city.value == '' || mail.value == '' || password.value == ''){
                register.passwordTooShort = false;
                register.emailNotValid = false;
                register.zipcodeNotValid = false;
                register.phoneNotValid = false;
                register.errorField = true;
                return;
            }
            if(password.value.length < 6){
                register.errorField = false;
                register.emailNotValid = false;
                register.zipcodeNotValid = false;
                register.phoneNotValid = false;
                register.passwordTooShort = true;
                return;
            }
            if(!mail.value.includes('@')){
                register.passwordTooShort = false;
                register.errorField = false;
                register.zipcodeNotValid = false;
                register.phoneNotValid = false;
                register.emailNotValid = true;
                return;
            }

            if(zipcode.value.length != 5){
                register.passwordTooShort = false;
                register.emailNotValid = false;
                register.errorField = false;
                register.phoneNotValid = false;
                register.zipcodeNotValid = true;
                return;
            }

            if(phone.value.length != 10){
                register.passwordTooShort = false;
                register.emailNotValid = false;
                register.zipcodeNotValid = false;
                register.errorField = false;
                register.phoneNotValid = true;
                return;
            }
            //Check if account already exists
            try{ const response = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/user/email/${mail.value}`);
                if(response.data !== null){
                    register.errorAccountAlreadyExists = true;
                    return;
                }
            } catch (error) {
                console.log(error);
            }

            // Encrypt key
            const encryptionKey = 'RMN7lA3UAtmRB+K8xI+Nde2zySywV5ZscXaNuD2Cxzr3zV5u+P0TUz2sBCjg2VT';

            // Encrypt using AES encryption
            const encryptedPassword = CryptoJS.AES.encrypt(password.value, encryptionKey).toString();


            //Create account
            const data = {
                firstname: firstname.value,
                lastname: lastname.value,
                mobile_phone: phone.value,
                address: address.value,
                city: city.value,
                zip_code: zipcode.value,
                email: mail.value,
                password: encryptedPassword,
                isAdmin: 0,
            }

            await axios.post('https://nathimmo-backend.cluster-ig3.igpolytech.fr/user/register', data);
            router.push({name: 'LoginView'});

        } catch (error) {
            register.error = 'true';
        }
    }

</script>
