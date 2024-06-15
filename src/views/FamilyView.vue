<script setup>
import {useFamilyStore} from "@/stores/families.js";
import {useUserStore} from "@/stores/users.js";
import {onBeforeMount} from "vue";
import FamilyList from "@/components/FamilyList.vue";

const familyStore = useFamilyStore()
const userStore = useUserStore()

onBeforeMount(async () => {
  await familyStore.getFamilyMembers(familyStore.families[0].family_id)
})
</script>

<template>
<h1>Family</h1>
  <h2>Family Members: {{familyStore.familyMembers.length}}</h2>
  <FamilyList></FamilyList>
</template>

<style scoped>

</style>