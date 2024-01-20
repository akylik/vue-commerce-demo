<script setup>
// import { inject } from 'vue';

// import MyHello from './components/MyHello.vue';
import Card from './Card.vue'

defineProps({
  items: Array
});

const onClickAdd = (prop) => {
  console.log("Add", prop);
  // emit('addToFavorites', )
};

const emit = defineEmits(['addToFavorites']);
// const addToFavorites = inject('addToFavorites')
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-added="item.isAdded"
      :is-favorite="item.isFavorite"
      :onClickAdd="onClickAdd"
      :onClickFavorite="() => emit('addToFavorites', item)"
    />
  </div>
</template>
