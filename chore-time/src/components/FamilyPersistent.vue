<script setup>
import {useUserStore} from "@/stores/users.js";
import {computed, ref} from "vue";
import {useFamilyStore} from "@/stores/families.js";
import InviteCodeCard from "@/components/InviteCodeCard.vue";

const familyStore = useFamilyStore()
const userStore = useUserStore()

const showAddMember = ref(false)

const currentFamily = familyStore.familyInfo[0]

console.log(familyStore.families[0])
console.log(familyStore.familyInfo)
const lastName = computed(() => {
  if (userStore.user) {
    return `${userStore.user.last_name}`
  } else {
    return 'Loading...'
  }
})

</script>

<template>
  <div class="user_has_family">
  <div class="border-b">
  <v-container class="family-bar">
    <v-row justify="center">
      <v-col cols="4" class="family-name">
        <div>
        <h1>{{currentFamily.family_name}}</h1>
          <v-btn prepend-icon="mdi-account-convert" class="account-change" density="comfortable" size="small">
            Change Family
          </v-btn>
        </div>
      </v-col>

      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-btn color="primary" @click="showAddMember = true">Add Member</v-btn>
      </v-col>
    </v-row>

    <v-row justify="center">
      <InviteCodeCard v-if="showAddMember" @close="showAddMember = false"></InviteCodeCard>
    </v-row>
  </v-container>
  </div>
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

.account-change{
  margin-left: 10px;

}
</style>