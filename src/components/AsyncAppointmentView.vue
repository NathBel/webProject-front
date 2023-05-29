<template>
    <div class="my-8 mx-4 lg:mx-10 w-screen">

        <h2 v-if="appointmentDataLength > 0" class="text-lg lg:text-2xl font-medium">
                Vos rendez-vous programmés
        </h2>

        <h3 class="text-lg lg:text-2xl font-medium" v-if="appointmentDataLength === undefined">
            Vous n'avez aucun rendez-vous programmé
        </h3>

        <div v-if="appointmentDataLength > 0" v-for="appointment in appointmentData" :key="appointment.id_appointment">
            <div class="lg:m-8 py-4 px-2 lg:p-4 flex justify-around border-b border-sky-900">
                <div class="flex flex-col items-center">
                    <div class="text-xs lg:text-lg flex item-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 lg:w-6 lg:h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>

                        <h4 v-if="modifyKey !== appointment.id_appointment">
                            {{ getDay(appointment.date) }}/{{ getMonth(appointment.date) }}/{{ getYear(appointment.date) }}
                        </h4>
                        <input v-if="modifyKey === appointment.id_appointment" type="date" v-model="selectedDate" :min="minDate" :max="maxDate" />
                    </div>
                    <div class="text-xs lg:text-lg flex item-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 lg:w-6 lg:h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 v-if="modifyKey !== appointment.id_appointment">
                            {{ getHour(appointment.time) }}h{{ getMinutes(appointment.time) }}
                        </h4>
                        <select v-if="modifyKey === appointment.id_appointment" v-model="selectedTime">
                            <option v-for="time in timeOptions" :value="time.value" :key="time.value">
                                {{ time.label }}
                            </option>
                        </select>

                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 lg:w-14 lg:h-14">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>

                    <div class="flex flex-col items-center">
                        <h4 class="text-xs lg:text-lg font-medium">
                            {{ appointment.housingData.address }}
                        </h4>
                        <h4 class="text-xs lg:text-lg font-medium">
                            {{ appointment.housingData.city }} ({{ appointment.housingData.zip_code }})
                        </h4>
                    </div>
                </div>

                <div class="flex flex-col items-center">
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 lg:w-6 lg:h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <h4 class="text-xs lg:text-lg item-center">
                            {{ appointment.agentData.firstname }} {{ appointment.agentData.lastname }}
                        </h4>
                    </div>

                    <div class="flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 lg:w-6 lg:h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>

                        <h4 class="text-xs lg:text-lg font-medium">
                            {{ appointment.agentData.phone }}
                        </h4>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                         fill="none" viewBox="0 0 24 24" 
                         stroke-width="1.5" 
                         stroke="currentColor" 
                         class="w-5 h-5 lg:w-6 lg:h-6 text-sky-600 cursor-pointer" 
                         @click="showModifyInput(appointment.id_appointment)"
                         v-if="modifyKey !== appointment.id_appointment">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" 
                         fill="none" 
                         viewBox="0 0 24 24" 
                         stroke-width="1.5" 
                         stroke="currentColor" 
                         class="w-5 h-5 lg:w-7 lg:h-7 text-lime-600 cursor-pointer"
                         @click="applyModificationAppointment(appointment.id_appointment, appointment.id_housing, appointment.id_agent)"
                         v-if="modifyKey === appointment.id_appointment">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>


                    <svg  xmlns="http://www.w3.org/2000/svg" 
                          fill="none" viewBox="0 0 24 24" 
                          stroke-width="1.5" 
                          stroke="currentColor" 
                          class="w-5 h-5 lg:w-7 lg:h-7 text-red-600 cursor-pointer"
                          @click="showConfirmation = true"
                          >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    <!-- Confirmation box -->
                    <div
                    v-if="showConfirmation"
                    class="fixed inset-0 flex items-center justify-center bg-black/20"
                    >
                        <div class="bg-white p-6 rounded shadow">
                            <h3 class="text-lg font-semibold mb-4">Êtes-vous sûrs de vouloir supprimer ce rendez-vous ?</h3>
                            <div class="flex justify-end">
                            <button
                                @click="showConfirmation = false"
                                class="px-4 py-2 text-gray-500 bg-gray-100 rounded mr-2 hover:bg-gray-200"
                            >
                                Annuler
                            </button>
                            <button
                                @click="deleteAppointment(appointment.id_appointment)"
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
    import jwtDecode from 'jwt-decode';
    import axios from 'axios';
    import { ref } from 'vue';

    let showConfirmation = ref(false);
    let modifyAppointment = ref(false);
    let modifyKey = ref(-1);

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

    const token = localStorage.getItem('token');

    let id = null;
    let isAdmin = null;
    let firstName = null;
    let lastName = null;
    let email = null;

    let selectedDate = ref(null);
    let selectedTime = ref(null);


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

    let appointmentData = null;

    const getAppointmentData = async () => {
        try {
            const response = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/user/${id}`);
            return response.data; // Update the ref value
        } catch (error) {
            console.error(error);
        }
    };


    const getAgentData = async (agentId) => {
        try {
            const response = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/agent/${agentId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const getHousingData = async (housingId) => {
        try {
            const response = await axios.get(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/id/${housingId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const getYear = (date) => {
        const utcDate = new Date(date);

        const localDateString = utcDate.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
        
        const words = localDateString.split('/');
        const year = words[2].split(' ')[0];
        return year;
    };

    const getMonth = (date) => {
        const utcDate = new Date(date);

        const localDateString = utcDate.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
        
        const words = localDateString.split('/');
        const month = words[1];
        return month;
    };

    const getDay = (date) => {
        const utcDate = new Date(date);

        const localDateString = utcDate.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

        const words = localDateString.split('/');
        const day = words[0];
        return day;
    };

    const getHour = (hourData) => {
        const hour = hourData.split(':')[0];
        return hour;
    };

    const getMinutes = (hour) => {
        const minutes = hour.split(':')[1];
        return minutes;
    };

    const deleteAppointment = async (appointmentId) => {
        try {
            //https://nathimmo-backend.cluster-ig3.igpolytech.fr
            const response = await axios.delete(`https://localhost:/appointment/${appointmentId}`, {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        });
            showConfirmation.value = false;
            // Remove the deleted appointment from the appointmentData array
            appointmentData = appointmentData.filter((appointment) => appointment.id_appointment !== appointmentId);
        } catch (error) {
            console.error(error);
        }
    };

    const showModifyInput = (appointmentId) => {
        modifyKey.value = appointmentId;
    };

    const applyModificationAppointment = async (appointmentId, housingId, agentId) => {
        try {
            if (selectedDate.value && selectedTime.value) {
                const response = await axios.put(`https://nathimmo-backend.cluster-ig3.igpolytech.fr/appointment/${appointmentId}`, {
                    date: selectedDate.value,
                    time: selectedTime.value,
                    id_user: id,
                    id_housing: housingId,
                    id_agent: agentId,
                });
                // Update the appointmentData array
                appointmentData = appointmentData.map((appointment) => {
                    if (appointment.id_appointment === appointmentId) {
                        return {
                            ...appointment,
                            date: selectedDate.value,
                            time: selectedTime.value,
                        };
                    }
                    return appointment;
                });
            }
            

            modifyKey.value = -1;
        } catch (error) {
            console.error(error);
        }
    };

    appointmentData = await getAppointmentData();
    const appointmentDataLength = appointmentData.length;

    if(appointmentDataLength > 0){
        for (const aptm of appointmentData) {
            const resHousingData = await getHousingData(aptm.id_housing);
            aptm.housingData = resHousingData;

            const resAgentData = await getAgentData(aptm.id_agent);
            aptm.agentData = resAgentData;
        };
    }

</script>

