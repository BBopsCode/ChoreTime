<script setup>
import {onBeforeMount, onMounted, ref, watch} from 'vue'
import {computed} from "vue";
import {useUserStore} from "@/stores/users.js";
import router from "@/router/index.js";

const userStore = useUserStore()
const fullName = computed(() => {
  if (userStore.user) {
    return `${userStore.user.first_name} ${userStore.user.last_name}`
  } else {
    return 'Loading...'
  }
})
onBeforeMount(async () => {
  await userStore.getUser()
})


const handleLogout = () => {
  userStore.handleLogout()
  router.push('/login')
}

</script>
<template>
  <v-card
  width="">
    <v-layout>
      <v-navigation-drawer
          permanent
          color="#171a1e"
          style="max-width: 200px"
      >

        <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/10.jpg"
            :title="userStore.user ? fullName : 'Loading..'"
            nav
        >

        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-table" title="Charts" value="charts" to="/charts"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group" title="My Family" value="family" to="/family"></v-list-item>
          <v-list-item prepend-icon="mdi-cash-multiple" title="Savings" value="savings" to="/savings"></v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="handleLogout">
              Logout
            </v-btn>
          </div>

        </template>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>
<style scoped>

</style>