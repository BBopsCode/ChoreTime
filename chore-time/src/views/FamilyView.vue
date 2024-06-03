<script setup>
import {useFamilyStore} from "@/stores/families.js";
import {useUserStore} from "@/stores/users.js";
import {onBeforeMount} from "vue";

const familyStore = useFamilyStore()
const userStore = useUserStore()

onBeforeMount(async () => {
  console.log(familyStore.families[0].family_id)
  await familyStore.getFamilyMembers(familyStore.families[0].family_id)
  console.log(familyStore.familyMembers)
})
</script>

<template>
<h1>Family</h1>
  <h2>Family Members: {{familyStore.familyMembers.length}}</h2>
</template>

<style scoped>

</style>