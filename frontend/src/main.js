import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import BaseBtn from "./components/base/BaseBtn"

const app = createApp(App)

app.use(router)

app.component('base-btn', BaseBtn)

app.mount('#app')
