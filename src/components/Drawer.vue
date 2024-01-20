<script setup>
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import { computed, inject } from 'vue'
import InfoBlock from './InfoBlock.vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
  isCreatingOrderFetch: Boolean
})

const { cartItems } = inject('cart')

const buttonDisabled = computed(() => {
  return props.isCreatingOrderFetch || !cartItems.value.length
})

const emit = defineEmits(['createOrder'])
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <div v-if="!cartItems.length" class="flex h-full items-center">
      <InfoBlock
        class="my-auto"
        title="Корзина пустая"
        description="Добавте заказ"
        image-url="/package-icon.png"
      />
    </div>

    <div v-else>
      <CartItemList />
  
      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} $</b>
        </div>
  
        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} $</b>
        </div>
  
        <button
          :disabled="buttonDisabled"
          @click="emit('createOrder')"
          class="bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-300 cursor-pointer mt-4"
        >
          {{ isCreatingOrderFetch ? 'Заказ создается...' : 'Оформить заказ' }}
        </button>
      </div>
    </div>
  </div>
</template>
