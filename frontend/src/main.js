import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import BaseBtn from "./components/base/BaseBtn"

const app = createApp(App)

app.use(router)
app.use(store)

app.component('base-btn', BaseBtn)

app.mount('#app')
