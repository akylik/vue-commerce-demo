<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean
})
</script>

<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="imageUrl" alt="Sneakers" />

    <div class="flex flex-col flex-1">
      <p>{{ title }}</p>

      <div class="flex justify-between mt-2">
        <b class="flex-1">{{ price }}</b>
        <img
          @click="() => emit('onClickRemove')"
          class="opacity-50 hover:opacity-100 transition cursor-pointer"
          src="/close.svg"
          alt="Close"
        />
      </div>
    </div>
  </div>
</template>
