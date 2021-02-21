import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './pages/HomePage'
import CreateMovie from './pages/CreateMovie'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage},
        { path: '/login', component: null},
        { path: '/movie/create', component: CreateMovie}
    ]
})


export default router