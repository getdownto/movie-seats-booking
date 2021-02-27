import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './pages/HomePage'
import CreateMovie from './pages/CreateMovie'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage},
        { path: '/login', component: LoginPage},
        { path: '/register', component: RegisterPage},
        { path: '/movie/create', component: CreateMovie}
    ]
})


export default router