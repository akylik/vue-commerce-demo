<script setup>
const emit = defineEmits(['openDrawer'])
defineProps({
  totalPrice: Number
})
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">The best sneakers store</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-10">
      <li
        @click="emit('openDrawer')"
        class="flex items-center cursor-pointer gap-2 text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b> {{ totalPrice }} $</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center cursor-pointer gap-2 text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="Heart" />
          <span>Bookmarks</span>
        </li>
      </router-link>
      <router-link to="/profile">
        <li class="flex items-center cursor-pointer gap-2 text-gray-500 hover:text-black">
          <img src="/profile.svg" alt="Profile" />
          <span>Profile</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>
