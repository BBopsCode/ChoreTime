<script setup>
import {RouterLink, RouterView, useRoute, useRouter} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {useUserStore} from "@/stores/users.js";
import {onMounted, computed} from "vue";
import Sidebar from "@/components/Sidebar.vue";
import FamilyPersistent from "@/components/FamilyPersistent.vue";

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  await userStore.getUser();

  if (!userStore.user) {
    router.push('/login');
  } else {
    router.push('/')
  }
});
if (userStore.user) {
  router.push('/')
}

const homePages = computed(() => {
  const noSidebarRoutes = ['/login', '/register', '/about']; // Add any other routes where sidebar should not be shown
  return !noSidebarRoutes.includes(route.path);
});

</script>


<template>
  <div class="main-container">
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
