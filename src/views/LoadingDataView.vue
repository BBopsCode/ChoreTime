<script setup>
import { ref } from 'vue';
import { useUserStore} from "@/stores/users.js";
import { useRouter } from "vue-router";
import {useFamilyStore} from "@/stores/families.js";
import {useChartStore} from "@/stores/charts.js";

const userStore = useUserStore()
const familyStore = useFamilyStore()
const chartStore = useChartStore()
const router = useRouter()

const loading = ref(false)

const loadFamilyData = async () => {
  loading.value = true
  await familyStore.fetchFamily()
  loading.value = false
}

const loadChartData = async () => {
  loading.value = true
  await chartStore.fetchCharts()
  loading.value = false
}

const loadUserData = async () => {
  loading.value = true
  await userStore.fetchUser()
  loading.value = false
}

const loadData = async () => {
  await Promise.all([
    loadFamilyData(),
    loadChartData(),
    loadUserData()
  ])

  if (!familyStore.family.id) {
    router.push({name: "CreateFamily"})
  }

  router.push(('/charts'))
}

loadData()


</script>

<template>

</template>

<style scoped>

</style>