<script setup>
import { ref } from 'vue';
import { useFamilyStore } from "@/stores/families.js";

const familyStore = useFamilyStore();
const buttonText = ref("Copy To Clipboard");

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(familyStore.familyInfo[0].uuid);
    buttonText.value = "Code Copied!";
    setTimeout(() => {
      buttonText.value = "Copy To Clipboard";
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};
</script>

<template>
  <v-card
      class="mx-auto"
      max-width="374"
      position="fixed"
      elevation="12"
      style="z-index: 99;"
  >
    <v-row class="pa-1">
      <v-col cols="10">
        <v-card-title>
          <span class="headline">Invite Code</span>
        </v-card-title>
      </v-col>
      <v-col>
        <v-btn color="red" @click="$emit('close')" icon="mdi-close" size="small"></v-btn>

      </v-col>
    </v-row>

    <v-card-text style="padding-bottom: 0px">
      <p>Share this code with your family members to invite them to your family.</p>
    </v-card-text>
    <v-card-text>
      <v-text-field
          dis
          :model-value="familyStore.familyInfo[0].uuid"
          outlined
      ></v-text-field>
      <v-row>
        <v-col cols="9">
          <v-btn color="blue" @click="copyToClipboard">
            {{ buttonText }}
          </v-btn>
        </v-col>
        <v-col cols="auto">
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>