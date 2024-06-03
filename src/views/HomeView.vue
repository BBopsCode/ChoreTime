<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import {useUserStore} from "@/stores/users.js";
import Sidebar from "@/components/Sidebar.vue";
import { useRouter } from 'vue-router'
import {onBeforeMount} from "vue";
import {useFamilyStore} from "@/stores/families.js";

const router = useRouter()

const familyStore = useFamilyStore()

onBeforeMount(async () => {
  await familyStore.getFamiliesForUser(userStore.user.id)
  if (!userStore.user) {
    router.push('/login')
  }

  if (familyStore.families.length === 0) {
    router.push('/create-family')
  }
})


const userStore = useUserStore()

</script>

<template>
<Sidebar></Sidebar>

</template>
