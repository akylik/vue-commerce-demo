<script setup>
import Card from './Card.vue'

defineProps({
  items: Array
});

const emit = defineEmits(['addToFavorites', 'addCartItems']);
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
      :onClickAdd="() => emit('addCartItems', item)"
      :onClickFavorite="() => emit('addToFavorites', item)"
    />
  </div>
</template>
