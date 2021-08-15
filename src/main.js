import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import axios from 'axios'
import api from './apiMap/api'

const clashBack = axios.create({
  baseURL: api.baseURL
})

const app = createApp(App)
app.provide('$axios', clashBack).mount('#app')
// console.log(app.provide)