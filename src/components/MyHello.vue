<!-- <script >
  // option API 
  export default {
    data() {
      return {
        count: 0,
      };
    },
    methods: {
      increment() {
        this.count++;
      },
    },
  }
</script> -->

<!-- <template>
  <div class="some">
    <h1>{{ count }}</h1>
    <button @click="increment">+</button>
  </div>
</template> -->

<!-- <script setup>
  // composition API
  import { ref } from 'vue';

  const count = ref(0);

  function increment() {
    count.value++;
  }

  // function updateCount(event) {
  //   count.value = Number(event.target.value);
  // }

  function handleInput() {
    if (!Number.isNaN(Number(count.value))) {
        count.value = Number(count.value);
      } else {
        count.value = 0;
      }
  }
</script>

<template>
  <div class="some">
    <h1>{{ count }}</h1>
    <button @click="increment">+</button>
    <input @input="updateCount"/> -->
<!-- <input v-model="count" @input="handleInput"/>
  </div>
</template> -->

<script setup>
defineProps({
  title: String,
  price: Number
})
</script>

<template>
  <div class="product">
    <h2>Item: {{ title }}</h2>
    <h3>Cost: {{ price }}</h3>
    <slot></slot>
  </div>
</template>

<style scoped>
.product {
  border: 1px solid blue;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
