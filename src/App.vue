<script setup>
import { computed, onMounted, provide, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router';

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const router = useRouter();
const route = useRoute();
const isHeaderVisible = ref(true);

/* Basket */
const cartItems = ref([])
const drawerOpen = ref(false)

const totalPrice = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.price, 0)
})

const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addCartItems = (item) => {
  cartItems.value.push(item)
}

const removeCartItems = (removedItem) => {
  removedItem.isAdded = false
  cartItems.value = cartItems.value.filter((item) => item.id !== removedItem.id)
}

onMounted(async () => {
  if (localStorage.getItem('cart')) {
    cartItems.value = JSON.parse(localStorage.getItem('cart'))
  }
  if (!localStorage.getItem('token')) {
    router.push('/login');
  }
})

watchEffect(() => {
  isHeaderVisible.value = route.meta.showHeader !== false;
});

watch(
  cartItems,
  () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  },
  { deep: true }
)

provide('cart', { closeDrawer, openDrawer, cartItems, removeCartItems, addCartItems })
</script>

<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header v-if="isHeaderVisible" :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
