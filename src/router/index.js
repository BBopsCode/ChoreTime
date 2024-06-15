import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import ChartsView from "@/views/ChartsView.vue";
import FamilyView from "@/views/FamilyView.vue";
import SavingsView from "@/views/SavingsView.vue";
import RegisterView from "@/views/RegisterView.vue";
import CreateFamilyView from "@/views/createFamilyView.vue";
import JoinFamilyVue from "@/views/JoinFamilyVue.vue";
import choresView from "@/views/ChoresView.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/create-family',
            name: 'create-family',
            component: CreateFamilyView
        },
        {
            path: '/join-family',
            name: 'join-family',
            component: JoinFamilyVue
        },

        {
            path: '/charts',
            name: 'charts',
            component: ChartsView
        },
        {
            path: '/chores/:id',
            name: 'chores',
            component: choresView,
            props: true
        },

        {
            path: '/family',
            name: 'family',
            component: FamilyView
        },
        {
            path: '/savings',
            name: 'savings',
            component: SavingsView
        }
    ]
})

export default router
