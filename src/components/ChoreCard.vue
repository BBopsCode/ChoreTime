<script setup>
const props = defineProps(['chore']);
</script>
<template>
  <v-card
      class="mx-auto"
      max-width="600"
  >
      <v-list-item
      >
        <template v-slot:prepend>
          <v-avatar color="#484a50">
            <v-icon color="white">mdi-broom</v-icon>
          </v-avatar>
        </template>
          <v-list-item-title>{{ chore.name }}</v-list-item-title>

        <template v-slot:append>
          ${{chore.value}}
        </template>
      </v-list-item>
  </v-card>
</template>
