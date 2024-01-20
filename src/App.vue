<script setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'

// import MyHello from './components/MyHello.vue';
import { BASE_URL } from '../config.js'
import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])
const cartItems = ref([])
const drawerOpen = ref(false)
const isCreatingOrderFetch = ref(false)

const totalPrice = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.price, 0)
})

const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addCartItems = (item) => {
  cartItems.value.push(item)
  item.isAdded = true
}

const removeCartItems = (removedItem) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== removedItem.id)

  const foundItem = items.value.find((item) => item.id === removedItem.id)
  if (foundItem) {
    foundItem.isAdded = false
  }
}

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addCartItems(item)
  } else {
    removeCartItems(item)
  }
}

const onChangeSelect = (e) => {
  filters.sortBy = e.target.value
}
const onChangeSearchInput = (e) => {
  filters.searchQuery = e.target.value
}

const createOrder = async () => {
  try {
    isCreatingOrderFetch.value = true
    const { data } = await axios.post(`${BASE_URL}/orders`, {
      items: cartItems.value,
      totalPrice: totalPrice.value
    })

    cartItems.value = []
    drawerOpen.value = false

    return data
  } catch (error) {
    console.error(error)
  } finally {
    isCreatingOrderFetch.value = false
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
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)

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

const addToFavorites = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
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

onMounted(async () => {
  if (localStorage.getItem('cart')) {
    cartItems.value = JSON.parse(localStorage.getItem('cart'))
  }

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cartItems.value.find((cartItem) => cartItem.id === item.id)
  }))
})

watch(filters, async () => {
  await fetchItems()
  await fetchFavorites()
})

watch(
  cartItems,
  () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  },
  { deep: true }
)

provide('cart', { closeDrawer, openDrawer, cartItems, removeCartItems })
</script>

<template>
  <Drawer
    v-if="drawerOpen"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    @create-order="createOrder"
    :is-creating-order-fetch="isCreatingOrderFetch"
  />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">
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
        <CardList
          :items="items"
          @add-to-favorites="addToFavorites"
          @add-cart-items="onClickAddPlus"
        />
      </div>
    </div>
  </div>
</template>
