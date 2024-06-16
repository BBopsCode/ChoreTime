<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/users.js";
import { useFamilyStore } from "@/stores/families.js";
import { useChoreStore } from "@/stores/chores.js";
import { useRoute } from "vue-router";
import MobileContainer from "@/components/MobileContainer.vue";
import ChoreCard from "@/components/ChoreCard.vue";
import CreateChore from "@/components/CreateChore.vue";

const route = useRoute();
const userStore = useUserStore();
const familyStore = useFamilyStore();
const choreStore = useChoreStore();

const family = computed(() => familyStore.family);
const overlay = ref(false);
const isLoading = ref(true);
const chores = ref([]);

const fetchChores = async () => {
  overlay.value = false;
  await choreStore.GetChores(route.params.id);
  chores.value = choreStore.allChores;
};

onMounted(async () => {
  await familyStore.getFamilyInfo(userStore.user.id);
  await choreStore.GetChores(route.params.id);
  await fetchChores();
  isLoading.value = false;
});
</script>

<template>
    <h1 style="font-size: 1.7em">Chores</h1>

    <div class="scroller">
      <v-virtual-scroll :max-height="500" :items="chores">
        <template v-slot:default="{ item }">
          <div v-if="isLoading">Loading...</div>
          <ChoreCard v-else :chore="item"></ChoreCard>
        </template>
      </v-virtual-scroll>
    </div>

    <div class="button-setup">
      <v-btn color="primary" @click="overlay = true">Create Chore</v-btn>
    </div>
    <v-overlay v-model="overlay" class="justify-center">
      <CreateChore v-if="overlay" @close="fetchChores"></CreateChore>
    </v-overlay>
</template>

<style scoped>
.scroller {
  margin-top: 20px;
  border-radius: 5px;
  background-color: white;
  padding: 5px;
}
.button-setup {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
