<script setup>

defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
})

</script>

<template>
  <div
    class="flex flex-col justify-between relative bg-white border border-slate-200 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition">
    <div>
      <img v-if="onClickFavorite" @click="onClickFavorite" :src="isFavorite ? '/like-2.svg' : '/like-1.svg'" alt="Like"
        class="absolute top-8 left-8" />
      <img :src="imageUrl" alt="Sneakers 1" />
      <p class="mt-2">{{ title }}</p>
    </div>
    

    <div class="flex justify-between mt-5">
      <div class="flex flex-col ">
        <span class="text-slate-400">Cost</span>
        <b>{{ price }}</b>
      </div>

      <img v-if="onClickAdd" @click="onClickAdd()" :src="isAdded ? '/checked.svg' : '/plus.svg'" alt="Plus" />
    </div>
  </div>
</template>
