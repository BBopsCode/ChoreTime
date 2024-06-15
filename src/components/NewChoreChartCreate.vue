<script setup>
import {reactive, ref, shallowRef} from 'vue';
import {useChartStore} from "@/stores/charts";
import {useFamilyStore} from "@/stores/families.js";

const props = defineProps(['isLogin']);
const emit = defineEmits(['close', 'chartCreated']);

const familyStore = useFamilyStore();
const chartStore = useChartStore();

const errorMessage = ref("");
const loading = ref(false);
const dialog = shallowRef(false);
const showOver = ref(true);


const chartCredentials = reactive({
  name: "",
  description: "",
  is_mandatory: false,
  family_id: null
});

const handleOkay = async () => {
  if (!chartCredentials.name) {
    errorMessage.value = "Please enter a name for the chart";
    return;
  }
  if (!familyStore.family.id){
    errorMessage.value = "Please select a family";
    return;
  }

  errorMessage.value = "";
  dialog.value = false;
  chartCredentials.family_id = familyStore.family.id;

  await chartStore.createChart(chartCredentials);
  emit('chartCreated'); // Emit event

  chartCredentials.name = "";
  chartCredentials.description = "";
  chartCredentials.is_mandatory = false;
};

const closeDialog = () => {
  dialog.value = false;
  chartCredentials.name = "";
  chartCredentials.description = "";
  chartCredentials.is_mandatory = false;
  errorMessage.value = "";
};

const handleDialogUpdate = (value) => {
  if (!value) {
    closeDialog();
  }
};
</script>

<template>
  <v-overlay>
    <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
  </v-overlay>

  <v-dialog @update:modelValue="handleDialogUpdate" v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn text="Create New Chart" v-bind="activatorProps" class="nav-auth-button"></v-btn>
    </template>

    <v-card prepend-icon="mdi-spray-bottle" title="New Chore Chart">
      <div class="input-container">
        <v-card-text v-if="!loading">
          <v-text-field label="Chart Name*" required v-model="chartCredentials.name"></v-text-field>

          <v-row dense>
            <v-col cols="12" sm="12">
              <v-textarea label="Short Description" counter maxlength="25" v-model="chartCredentials.description"></v-textarea>
            </v-col>
            <v-col cols="12" sm="6">
              <v-checkbox label="Is this chart mandatory?" v-model="chartCredentials.is_mandatory"></v-checkbox>
            </v-col>
          </v-row>
          <div class="ma-3"></div>
          <small class="text-caption text-medium-emphasis">*indicates required field</small>
          <div>
            <small class="text-red" v-if="errorMessage">ERROR:{{ errorMessage }}</small>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions v-if="!loading">
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="closeDialog"></v-btn>
          <v-btn color="primary" text="Create Chart" variant="tonal" @click="handleOkay"></v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.input-container {
  min-height: 200px;
  max-height: 700px;
}
</style>
