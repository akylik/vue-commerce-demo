<script setup>
import axios from 'axios'
import { inject, onMounted, reactive, ref, watch } from 'vue'
import debounce from 'lodash.debounce'
import { BASE_URL } from '../../config'

import CardList from '../components/CardList.vue'

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const { cartItems, addCartItems, removeCartItems } = inject('cart')

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    item.isAdded = true
    addCartItems(item)
  } else {
    removeCartItems(item)
  }
}

const onChangeSelect = (e) => {
  filters.sortBy = e.target.value
}

const onChangeSearchInput = debounce((e) => {
  filters.searchQuery = e.target.value
}, 300)

const addToFavorites = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }
      item.isFavorite = true
      const { data } = await axios.post(`${BASE_URL}/favorites`, obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`${BASE_URL}/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`${BASE_URL}/items`, {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false,
      favoriteId: null
    }))
  } catch (error) {
    console.error(error)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`${BASE_URL}/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  console.log('import.meta.env.VITE_BASE_URL', import.meta.env.VITE_BASE_URL)
  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cartItems.value.find((cartItem) => cartItem.id === item.id)?.isAdded || false
  }))
})

watch(filters, async () => {
  await fetchItems()
  await fetchFavorites()
})

watch(
  cartItems,
  () => {
    items.value = items.value.map((item) => ({
      ...item,
      isAdded: cartItems.value.find((cartItem) => cartItem.id === item.id)?.isAdded || false
    }))
  },
  { deep: true }
)
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Все кросовки</h2>

    <div class="flex gap-4">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
        <option value="title">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>

      <div class="relative">
        <img class="absolute left-4 top-3" alt="Search" src="/search.svg" />
        <input
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
          placeholder="Поиск..."
          @input="onChangeSearchInput"
        />
      </div>
    </div>
  </div>

  <div class="mt-10">
    <CardList :items="items" @add-to-favorites="addToFavorites" @add-cart-items="onClickAddPlus" />
  </div>
</template>
