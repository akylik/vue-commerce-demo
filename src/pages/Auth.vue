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

const delay = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, milliseconds)
  })
}

const auth = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = 'Please enter username and password'
    username.value = ''
    password.value = ''

    await delay(2500)
    errorMessage.value = ''
    return
  }

  try {
    const params = {
      username: username.value,
      password: password.value
    }

    const { data } = await axios.get(`${BASE_URL}/users`, {
      params
    })

    if (data.length) {
      localStorage.setItem('token', data)
      router.push('/')
    } else {
      errorMessage.value = 'Incorrect username or password'
      await delay(2500)
      errorMessage.value = ''
    }
  } catch (error) {
    console.log('error', error)
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center bg-gray-100 p-8 relative" v-auto-animate>
    <CustomAlert v-if="errorMessage" :description="errorMessage" class="absolute top-50 left-50" />
    <h2 class="block text-gray-500 text-sm font-bold mb-2">Authentication</h2>
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4 mb-4 mx-auto my-auto"
      @submit.prevent="auth"
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
        <router-link to="/login" class="block text-blue-500 text-sm mt-2 hover:underline">
          <span class="text-gray-400">Create account?</span>
          <span class="text-gray-500">Login</span>
        </router-link>
        <button
          class="bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-300 cursor-pointer mt-4"
          type="submit"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
</template>
