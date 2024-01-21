import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import App from './App.vue'
import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import Profile from './pages/Profile.vue'
import Login from './pages/Login.vue'
import Auth from './pages/Auth.vue'

const app = createApp(App)

export const routes = [
  { path: '/', name: 'Home', component: Home, meta: { showHeader: true }},
  { path: '/favorites', name: 'Favorites', component: Favorites, meta: { showHeader: true }},
  { path: '/profile', name: 'Profile', component: Profile, meta: { showHeader: true }},
  { path: '/login', name: 'Login', component: Login, meta: { showHeader: false }},
  { path: '/auth', name: 'Auth', component: Auth, meta: { showHeader: false }},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(autoAnimatePlugin)
app.use(router)

app.mount('#app')
