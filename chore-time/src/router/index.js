import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import ChartsView from "@/views/ChartsView.vue";
import FamilyView from "@/views/FamilyView.vue";
import SavingsView from "@/views/SavingsView.vue";

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
            path: '/charts',
            name: 'charts',
            component: ChartsView
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
