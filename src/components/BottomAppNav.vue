<script setup>
import {ref} from "vue";

const value = ref(1);
</script>
<template>

  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation
        v-model="value"
        color="primary"
        horizontal
        grow
        style="min-height: 75px"
    >
      <v-btn
          @click="$emit('changeView', 'ChoresView')"
      >
        <v-icon class="icon">mdi-home</v-icon>

        Home
      </v-btn>

      <v-btn
          @click="$emit('changeView', 'CreateChore')"
      >
        <v-icon
            class="icon">mdi-plus-box
        </v-icon>

        Edit Chores
      </v-btn>

      <v-btn
          @click="$emit('changeView', 'ChoresView')"
      >
        <v-icon
            class="icon">mdi-format-list-checks
        </v-icon>

        Chores
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<style scoped>
  .icon {
    font-size: 30px;
  }
</style>
