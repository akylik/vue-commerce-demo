<script setup>
import { inject } from 'vue';
import CartItem from './CartItem.vue';

const {cartItems, removeCartItems} = inject('cart')
</script>

<template>
  <div class="flex flex-col flex-1 gap-4 justify-between" v-auto-animate>
    <CartItem
      v-for="item in cartItems"
      :key="item.id"
      :id="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-added="item.isAdded"
      :is-favorite="item.isFavorite"
      @on-click-remove="() => removeCartItems(item)"
      />
    </div>
</template>