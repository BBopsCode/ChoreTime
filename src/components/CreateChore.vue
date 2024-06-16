<script setup>
import {ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import MobileContainer from "@/components/MobileContainer.vue";
import {defineEmits} from "vue";
import {useUserStore} from "@/stores/users.js";
import {useFamilyStore} from "@/stores/families.js";
import {useChoreStore} from "@/stores/chores.js";
import {el} from "vuetify/locale";


const choreStore = useChoreStore()
const userStore = useUserStore();
const familyStore = useFamilyStore();
const route = useRoute();


const chartId = route.params.id;

const handleNewChore = async () => {
  errorMessage.value = "";
  choreDetails.value.value = parseFloat(choreDetails.value.value)
  await choreStore.addNewChore(choreDetails.value)
  closeModal(false);
}

const items = familyStore.familyMembers.map(familyMember => {
  return {text: familyMember.first_name, value: familyMember.id};
});

const frequencies = [
  {
    text: "Daily",
    value: 1
  },
  {
    text: "Bi-Weekly",
    value: 2
  },
  {
    text: "Weekly",
    value: 3
  }
]

const emit = defineEmits(["close"]);
const closeModal = (backButton) => {
  if (backButton) {
    emit("close", false);
    errorMessage.value = "";
  } else {
    if (!choreStore.errorMessage) {
      emit("close", true);
      errorMessage.value = "";
    }
  }
}

const router = useRouter();
const errorMessage = ref("");

const choreDetails = ref({
  name: "",
  occurence: "",
  is_complete: false,
  value: "0",
  difficulty_rating: 0,
  chart_id: chartId,
  category: 1,
  assignees: []
});
</script>

<template>
    <div>

      <v-card
          class="mx-auto pa-12 pb-8"
          elevation="8"
          width="400px"
          rounded="lg"
      >
        {{ choreDetails.assignees }}
        <div class="text-subtitle-1 text-medium-emphasis">Chore Creation</div>

        <v-row class="ma-2">
          <v-col class="pa-0" cols="12">
            <h2>Chore Name*</h2>

            <v-text-field
                density="compact"
                placeholder="Chore Name"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                :tabindex="1"
                v-model="choreDetails.name"
            ></v-text-field>
          </v-col>
          <v-col class="pa-0" cols="12">
            <h2>Chore Reward, leave blank if none*</h2>
            <v-text-field
                density="compact"
                placeholder="$0.00"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                :tabindex="2"
                v-model="choreDetails.value"
            ></v-text-field>
          </v-col>

          <v-col class="pa-0" cols="12">
            <h2>Assign Chore</h2>
            <v-select
                density="compact"
                placeholder="Person"
                multiple
                variant="outlined"
                :items="items"
                item-title="text"
                item-value="value"
                hide-details
                v-model="choreDetails.assignees"

            >
            </v-select>
            <div class="pa-2 mb-2">
              <p class="text-caption">
                Pick one or more people to assign this chore to </p>
            </div>

          </v-col>
          <v-col cols="12" class="pa-0">
            <h2>Frequency</h2>
            <v-select
                variant="outlined"
                density="compact"
                placeholder="Ex:Daily"
                v-model="choreDetails.occurence"
                :items="frequencies"
                item-value="value"
                item-title="text"
            >
            </v-select>
          </v-col>
        </v-row>


        <v-card
            class="mb-12"
            color="surface-variant"
            variant="tonal"
        >
          <v-card-text v-if="choreStore.errorMessage" class="text-medium-emphasis text-caption">
            ERROR: {{ choreStore.errorMessage }}
          </v-card-text>
        </v-card>

        <v-btn
            :tabindex="7"
            class="mb-8"
            color="blue"
            size="large"
            variant="tonal"
            block
            @click="handleNewChore"
        >
          Create Chore
        </v-btn>

        <v-card-text class="text-center">
          <p class="text-blue text-decoration-none"
             @click="closeModal(true)"
             style="cursor: pointer"
          >

            Back
            <v-icon icon="mdi-chevron-right"></v-icon>
          </p>
        </v-card-text>
      </v-card>
    </div>

</template>

<style scoped>

</style>