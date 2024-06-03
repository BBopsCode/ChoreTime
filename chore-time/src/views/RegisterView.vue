<script setup>
import {reactive, ref} from 'vue'
import {useUserStore} from "@/stores/users.js";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

const router = useRouter()
const visible = ref(false)
const userStore = useUserStore()
const {errorMessage, loading, user} = storeToRefs(userStore)
const userCredentials = reactive({
  username: ''.toLowerCase(),
  first_name: '',
  last_name: '',
  email: ''.toLowerCase(),
  password: '',
  confirmPassword: ''
})

const handleRegister = async () => {
  // You might need to implement a handleRegister method in your user store
  await userStore.handleSignup(userCredentials)

  if (user.value) {
    router.push('/create-family')
  }
}
</script>

<template>
  <div style="min-width: 550px">
    <v-img
        class="mx-auto my-6"
        max-width="228"
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="500px"
        rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account Registration</div>

      <v-row>
        <v-col cols="6">
          <v-text-field
              density="compact"
              placeholder="Username"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              v-model="userCredentials.username"
              :tabindex="1"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
              density="compact"
              placeholder="Email address"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              v-model="userCredentials.email"
              :tabindex="2"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-text-field
              :tabindex="3"
              density="compact"
              placeholder="First Name"
              variant="outlined"
              v-model="userCredentials.first_name"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
              tabindex="4"
              density="compact"
              placeholder="Last Name"
              variant="outlined"
              v-model="userCredentials.last_name"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-text-field
              tabindex="5"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              v-model="userCredentials.password"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
              tabindex="6"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Confirm Password"
              variant="outlined"
              class="confirm-placeholder"
              @click:append-inner="visible = !visible"
              v-model="userCredentials.confirmPassword"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
      >
        <v-card-text v-if="errorMessage" class="text-medium-emphasis text-caption">
          ERROR: {{ errorMessage }}
        </v-card-text>
      </v-card>

      <v-btn
          :tabindex="7"
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="handleRegister"
      >
        Register
      </v-btn>

      <v-card-text class="text-center">
        <p class="text-blue text-decoration-none"
           @click="router.push('/login')"
        >

          Already have an account? Log in now <v-icon icon="mdi-chevron-right"></v-icon>
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
p:hover {
  cursor: pointer;
}
.confirm-placeholder .input{
  font-size: 3px
}
</style>