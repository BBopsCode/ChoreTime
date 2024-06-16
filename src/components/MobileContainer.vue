<script setup>
import { ref } from "vue";
import BottomAppNav from "@/components/BottomAppNav.vue";
import ChoresView from "@/views/ChoresView.vue";

const currentView = ref(ChoresView);

const changeView = (view) => {
  currentView.value = view;
};

</script>

<template>
  <div class="container">
    <Component :is="currentView"></Component>
    <BottomAppNav></BottomAppNav>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 820px;
  height: 100%;
  margin: 0 auto;
  border-bottom: 1px solid black;
  padding: 10px;
  box-sizing: border-box;
}

@media (max-width: 1200px) {
  .container {
    max-width: 90%;
  }
}

@media (max-width: 992px) {
  .container {
    max-width: 80%;
  }
}

@media (max-width: 768px) {
  .container {
    max-width: 100%;
    padding: 20px;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 15px;
  }
}
</style>
