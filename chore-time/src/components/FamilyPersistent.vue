<script setup>
import {useUserStore} from "@/stores/users.js";
import {computed} from "vue";

const userStore = useUserStore()

const lastName = computed(() => {
  if (userStore.user) {
    return `${userStore.user.l_name}`
  } else {
    return 'Loading...'
  }
})

</script>

<template>
  <div class="border-b">
  <v-container class="family-bar">
    <v-row justify="center">
      <v-col cols="4" class="family-name">
        <h1>{{lastName}} Family</h1>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-btn color="primary">Add Member</v-btn>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<style scoped>
.family-name{
  display: flex;
  align-items: center;
  justify-content: right;
}
.family-name h1{
  font-size: 2rem;
}
.border-b{
  margin-bottom: 70px;
}
</style>