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
const familyData = reactive({
  family_name: '',
  role: ''
})
const fetchData = async () => {
  try {
    await familyStore.getFamily(familyStore.families[0].family_id);
  } finally {
    if (familyStore.families) {
      router.push('/charts')
    }
  }
};

const userStore = useUserStore()
const createFamily = async () => {
  await familyStore.addFamilyForUser(userStore.user.id, familyData)

  await fetchData()




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
      <h2 style="font-size: larger">Lets set up your family!</h2>
      <br/>
      <div class="text-subtitle-1 text-medium-emphasis">Family Name</div>

      <v-text-field
          density="compact"
          placeholder="Family Name"
          prepend-inner-icon="mdi-account-group"
          variant="outlined"
          v-model="familyData.family_name"
      ></v-text-field>
      <v-select
          v-model="familyData.role"
          label="I am a .."
          :items="['Parent', 'Child']"
      >

      </v-select>
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
          @click="createFamily"
      >
        Create Family
      </v-btn>

      <v-card-text class="text-center">
        <p
            class="text-blue text-decoration-none"
            @click="router.push('/join-family')"
        >
          Already have a family? Join here
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