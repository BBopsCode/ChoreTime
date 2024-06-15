<script setup>

</script>

<template>
  <div class="container">
    <slot></slot>
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
