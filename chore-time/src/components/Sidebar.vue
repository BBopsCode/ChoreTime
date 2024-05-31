<script setup>
import { ref } from 'vue'
import {computed} from "vue";
import {useUserStore} from "@/stores/users.js";

const userStore = useUserStore()
const fullName = computed(() => {
  if (userStore.user) {
    return `${userStore.user.f_name} ${userStore.user.l_name}`
  } else {
    return 'Loading...'
  }
})

</script>
<template>
  <v-card
  width="">
    <v-layout>
      <v-navigation-drawer
          permanent
          width="200px"
          color="#171a1e"
      >
        <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/10.jpg"
            :title="userStore.user ? fullName : 'Loading..'"
            nav
        >
          <template v-slot:append>
            <v-btn
                variant="text"
                @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-table" title="Charts" value="charts" to="/charts"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group" title="My Family" value="family" to="/family"></v-list-item>
          <v-list-item prepend-icon="mdi-cash-multiple" title="Savings" value="savings" to="/savings"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>
