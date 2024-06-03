<script setup xmlns="http://www.w3.org/1999/html">
import {reactive, ref} from 'vue'
import {useFamilyStore} from "@/stores/families.js";
import {useUserStore} from "@/stores/users.js";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

const router = useRouter()
const visible = ref(false)
const familyStore = useFamilyStore()
const {errorMessage, loading, families} = storeToRefs(familyStore)
const inviteCode = ref('')
const userStore = useUserStore()
const createFamily = async () => {
  await familyStore.joinFamilyForUser(userStore.user.id, inviteCode)

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
      <h2 style="font-size: larger">Lets get you to your family!</h2>
      <br/>
      <div class="text-subtitle-1 text-medium-emphasis">Family Invite Code</div>

      <v-text-field
          density="compact"
          placeholder="Paste the code here!"
          prepend-inner-icon="mdi-account-group"
          variant="outlined"
          v-model="inviteCode"
      ></v-text-field>

        <v-card-text v-if="errorMessage" class="text-medium-emphasis text-caption">
          ERROR: {{
            errorMessage
          }}
        </v-card-text>
      <v-btn
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="createFamily"
      >
       Join Family
      </v-btn>

      <v-card-text class="text-center">
        <p
            class="text-blue text-decoration-none"
            @click="router.push('/create-family')"
        >
          Don't have a family with ChoreTime yet? Create one!
          <v-icon icon="mdi-chevron-right"></v-icon>
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>
<style scoped>
p {
  cursor: pointer;
}
</style>