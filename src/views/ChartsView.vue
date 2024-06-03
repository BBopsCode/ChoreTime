<script setup>
import {ref} from "vue";
import ChoreChartCard from "@/components/ChoreChartCard.vue";
const choreCharts = ref([
  {
    id: 1,
    name: 'Chore Chart 1',
    description: 'This is the first chore chart',
    mandatory: true,

  },
  {
    name: 'Chore Chart 2',
    description: 'This is the second chore chart',
    mandatory: false,
    id: 2
  },
  {
    name: 'Chore Chart 3',
    description: 'This is the third chore chart',
    mandatory: true,
    id: 3
  }


])
</script>

<template>
  <v-container>
    <v-row>
      <v-col
          v-for="choreChart in choreCharts"
          cols="4"
      >
        <ChoreChartCard :choreChart="choreChart"></ChoreChartCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>