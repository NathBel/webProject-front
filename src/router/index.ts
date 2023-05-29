import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ResultView from '../views/ResultView.vue';
import AgenciesView from '../views/AgenciesView.vue';
import HousingView from '../views/HousingView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import AppointmentView from '../views/AppointmentView.vue';
import SettingsView from '../views/SettingsView.vue';
import LikeView from '../views/LikeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/results',
            name: 'ResultView',
            component: ResultView
        },
        {
            path: '/agencies',
            name: 'AgenciesView',
            component: AgenciesView
        },
        {
            path: '/housing',
            name: 'HousingView',
            component: HousingView
        },
        {
            path: '/login',
            name: 'LoginView',
            component: LoginView
        },
        {
            path: '/register',
            name: 'RegisterView',
            component: RegisterView
        },
        {
            path: '/appointments',
            name: 'AppointmentView',
            component: AppointmentView
        },
        {
            path: '/settings',
            name: 'SettingsView',
            component: SettingsView
        },
        {
            path: '/like',
            name: 'LikeView',
            component: LikeView
        },
    ]
});

export default router;