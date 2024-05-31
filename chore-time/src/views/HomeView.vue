<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import {useUserStore} from "@/stores/users.js";
import Sidebar from "@/components/Sidebar.vue";
import { useRouter } from 'vue-router'

const router = useRouter()



const userStore = useUserStore()


</script>

<template>
<Sidebar></Sidebar>

</template>
