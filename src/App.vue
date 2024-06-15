<script setup>
import {RouterLink, RouterView, useRoute, useRouter} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {useUserStore} from "@/stores/users.js";
import {useFamilyStore} from "@/stores/families.js";
import {onMounted, computed, ref} from "vue";
import Sidebar from "@/components/Sidebar.vue";
import FamilyPersistent from "@/components/FamilyPersistent.vue";

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const familyStore = useFamilyStore()
const showComponents = ref(false)
onMounted(async () => {
  await userStore.getUser();

  if (!userStore.user) {
    router.push('/login');
    console.log('User not logged in')
  }

  else if (userStore.user ) {
    await familyStore.getFamiliesForUser(userStore.user.id)
    await familyStore.getFamilyInfo(userStore.user.id)
    await familyStore.getFamily(familyStore.families[0].family_id);
    await familyStore.getFamilyMembers(familyStore.family.id)

    console.log('User logged in', userStore.user)
  }
  showComponents.value = true
});
if (userStore.user) {
  router.push('/')
}

const homePages = computed(() => {
  const SidebarRoutes = ['/', '/family', '/charts', '/savings'];
  if (userStore.user){
    return SidebarRoutes.includes(route.path);

    // Add any other routes where sidebar should not be shown
  }
});

</script>


<template>
  <div class="main-container" v-if="showComponents">
    <Sidebar v-if="homePages" />
    <div class="content" :class="{ 'with-sidebar': homePages }">
      <FamilyPersistent v-if="homePages"></FamilyPersistent>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
}

.content {
  flex: 1;
  padding: 20px;
}

.with-sidebar {
  margin-left: 200px; /* Same width as the sidebar */
}
</style>
