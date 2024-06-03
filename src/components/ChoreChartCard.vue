<script setup>
import { ref } from 'vue';

const { choreChart } = defineProps(['choreChart']);
</script>

<template>
  <v-card
      class="mx-auto"
      height="180"
      color="surface-variant"
      image="https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg"
      max-width="400"
  >
    <template v-slot:actions>
      <div class="card">
        <v-row class="card-details mt-2" align="center" justify="space-between">
          <v-col cols="auto">
            <h1>{{ choreChart.name }}</h1>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-chip>
              {{ choreChart.mandatory ? 'Mandatory' : 'Optional' }}
            </v-chip>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="font-weight-light mb-1">
              {{ choreChart.description }}
            </p>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-row>
          <v-col>
            <v-btn
                append-icon="mdi-chevron-right"
                color="red-lighten-2"
                text="View Chart"
                variant="outlined"
                block
                class="mt-3"
            ></v-btn>
          </v-col>
        </v-row>
      </div>
    </template>
  </v-card>
</template>

<style scoped>
.card {
  width: 100%;
}
.card-details h1 {
  font-size: 1.5rem;
  font-weight: 500;
}
.card-details {
  justify-content: space-between; /* Ensures proper spacing between items */
}
</style>
