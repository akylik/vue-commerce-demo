<script setup>

defineProps({
  description: String,
})
</script>

<template>
  <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 container" role="alert">
    <span class="font-medium">Error!</span> 
    <br>
    <span>{{ description }}</span>
  </div>
</template>

<style scoped>
  .container {
    width: 40%;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 5px;
    border: 2px solid red;
    background-color: #fbf1f1;
    color:red;
    text-align: center;
  }
</style>