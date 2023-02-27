<script setup lang="ts">
import TodoList from "./components/TodoList.vue";
</script>

<template>
  <div class="main-wrapper">
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <TodoList />
    </div>
  </div>

  <main></main>
</template>

<style scoped>
.main-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
header {
  line-height: 1.5;
}

.logo {
  display: flex;
  justify-content: center;
}
</style>
