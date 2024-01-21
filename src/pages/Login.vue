<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

import { BASE_URL } from '../../config'
import CustomAlert from '../components/CustomAlert.vue'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

const login = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = 'Please enter username and password'
    username.value = ''
    password.value = ''

    setTimeout(() => {
      errorMessage.value = ''
    }, 2500)
    return
  }

  try {
    const { data } = await axios.post(`${BASE_URL}/users`, {
      username: username.value,
      password: password.value
    })

    localStorage.setItem('token', data.username)
    router.push('/')
  } catch (error) {
    console.log('error', error)
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center bg-gray-100 p-8">
    <CustomAlert v-if="errorMessage" :description="errorMessage" class="absolute top-0 left-50" />
    <h2 class="block text-gray-500 text-sm font-bold mb-2">Create account</h2>
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4 mb-4 mx-auto my-auto"
      @submit.prevent="login"
    >
      <div class="mb-4">
        <label class="block text-gray-500 text-sm font-bold mb-2" for="username"> Username </label>
        <input
          v-model="username"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight outline-none focus:border-gray-400 rounded-md"
          id="username"
          type="text"
          placeholder="Enter your username"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-500 text-sm font-bold mb-2" for="password"> Password </label>
        <input
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight outline-none focus:border-gray-400 rounded-md"
          id="password"
          type="password"
          placeholder="********"
        />
      </div>
      <div class="flex flex-col">
        <router-link to="/auth" class="block text-blue-500 text-sm mt-2 hover:underline">
          <span class="text-gray-400">Do you have an account?</span>
          <span class="text-gray-500">Auth</span>
        </router-link>
        <button
          class="bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-300 cursor-pointer mt-4"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>
