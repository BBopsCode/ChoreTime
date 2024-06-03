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
  email:''.toLowerCase(),
  password:''
})
const handleLogin = async ()=>{
  await userStore.handleLogin(userCredentials)

  console.log(user.value)
  
  if (user.value){
    router.push('/')
  }



}
</script>
<template>
  <div style="min-width: 500px">
    <v-img
        class="mx-auto my-6"
        max-width="228"
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="userCredentials.email"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
        >
          Forgot login password?</a>
      </div>

      <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="userCredentials.password"
      ></v-text-field>

      <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
      >
        <v-card-text v-if="errorMessage" class="text-medium-emphasis text-caption">
         ERROR: {{
            errorMessage
          }}
        </v-card-text>
      </v-card>

      <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="handleLogin"
      >
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <p
            class="text-blue text-decoration-none"
            @click="router.push('/register')"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>
<style scoped>
p{
  cursor: pointer;
}
</style>