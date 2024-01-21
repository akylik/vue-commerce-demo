<script setup>
import { computed, inject, ref } from 'vue'
import axios from 'axios'

import { BASE_URL } from '../../config'
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const { cartItems } = inject('cart')

const isCreatingOrderFetch = ref(false)
const orderId = ref(null)

const createOrder = async () => {
  try {
    isCreatingOrderFetch.value = true
    const { data } = await axios.post(`${BASE_URL}/orders`, {
      items: cartItems.value,
      totalPrice: props.totalPrice
    })

    cartItems.value = []

    orderId.value = data.id
    return data
  } catch (error) {
    console.error(error)
  } finally {
    isCreatingOrderFetch.value = false
  }
}

const buttonDisabled = computed(() => {
  return isCreatingOrderFetch.value || !cartItems.value.length
})
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 overflow-y-auto">
    <DrawerHead />

    <div v-if="!cartItems.length || orderId" class="flex h-full items-center">
      <InfoBlock
        v-if="!cartItems.length && !orderId"
        class="my-auto"
        title="Empty cart"
        description="Add an order"
        image-url="/package-icon.png"
      />

      <InfoBlock
        v-if="orderId"
        class="my-auto"
        title="Order placed"
        :description="`Your order №${orderId}  will soon be handed over to the courier delivery`"
        image-url="/order-success-icon.png"
      />
    </div>

    <div v-else class="">
      <CartItemList />

      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Total:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} $</b>
        </div>

        <div class="flex gap-2">
          <span>Tax 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} $</b>
        </div>

        <button
          :disabled="buttonDisabled"
          @click="createOrder"
          class="bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-300 cursor-pointer mt-4"
        >
          {{ isCreatingOrderFetch ? 'Order is being created...' : 'Place order' }}
        </button>
      </div>
    </div>
  </div>
</template>
