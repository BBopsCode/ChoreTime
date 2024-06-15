<script setup>
import { computed } from 'vue'
import { useFamilyStore } from "@/stores/families.js"
import { useUserStore } from "@/stores/users.js"

const familyStore = useFamilyStore()
const userStore = useUserStore()

// Ensure the family members data is reactive
const items = computed(() => familyStore.familyMembers)
</script>

<template>
  <h2>{{ familyStore.familyMembers }}</h2>
  <v-card
      class="mx-auto"
      max-width="500"
  >
    <v-card-title>
      Company Employee List
    </v-card-title>

    <v-divider></v-divider>

    <v-virtual-scroll
        :items="items"
        height="320"
        item-height="48"
    >
      <template v-slot:default="{ item }">
        <v-list-item
            :subtitle="`${item.username}`"
            :title="`${item.first_name} ${item.last_name}`"
        >
          <template v-slot:prepend>
            <v-icon class="bg-primary">mdi-account</v-icon>
          </template>

          <template v-slot:append>
            <v-btn
                icon="mdi-pencil"
                size="x-small"
                variant="tonal"
            ></v-btn>
          </template>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>
