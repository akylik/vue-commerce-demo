<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { BASE_URL } from '../../config'
import CardList from '@/components/CardList.vue'

const router = useRouter()
const items = ref([])

const fetchItems = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/orders`)
    items.value = data
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  if (!localStorage.getItem('token')) {
    router.push('/login')
  }

  await fetchItems()
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Purchase history</h2>

  <div v-for="item in items" :key="item.id" class="mb-8 p-4 border-2 border-slate-300 rounded-3xl">
    <CardList :items="item.items" :is-hide-favorites="true" />
    <h2 class="mt-4 text-xl font-bold text-slate-400">Order amount: {{ item.totalPrice }} $</h2>
  </div>
</template>
