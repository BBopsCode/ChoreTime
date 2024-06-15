<script setup>
import {onMounted, ref, watch} from "vue";
import ChoreChartCard from "@/components/ChoreChartCard.vue";
import NewChoreChartCreate from "@/components/NewChoreChartCreate.vue";
import {useChartStore} from "@/stores/charts.js";
import {useFamilyStore} from "@/stores/families.js";
import {useUserStore} from "@/stores/users.js";

const choreCharts = ref([]);
const chartStore = useChartStore();
const familyStore = useFamilyStore();
const userStore = useUserStore();
const displayModal = ref(false);

const fetchChoreCharts = async () => {
  await chartStore.fetchCharts(familyStore.family.id);
  choreCharts.value = chartStore.charts;
};

onMounted(async () => {
  await familyStore.getFamilyInfo(userStore.user.id);
  await fetchChoreCharts();
});

const close = async () => {
  displayModal.value = false;
};

// Event handler for the chartCreated event
const handleChartCreated = async () => {
  console.log("Chart created");
  await fetchChoreCharts(); // Fetch the updated list of chore charts
};

watch(choreCharts, (newValue) => {
  console.log(newValue);
});

</script>

<template>
  <div class="justify-center align-center" style="display: flex">
    <NewChoreChartCreate @chart-created="handleChartCreated" />
    <v-btn @click="console.log(choreCharts)">Log Chore Charts</v-btn>
  </div>
  <v-container>
    <v-row>
      <v-col v-for="choreChart in choreCharts" :key="choreChart.id" cols="4">
        <ChoreChartCard :choreChart="choreChart" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
