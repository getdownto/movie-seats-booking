import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './pages/HomePage'
import CreateMovie from './pages/CreateMovie'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SearchPage from './pages/SearchPage'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage},
        { path: '/login', component: LoginPage},
        { path: '/register', component: RegisterPage},
        { path: '/search', component: SearchPage},
        { path: '/movie/create', component: CreateMovie}
    ]
})


export default router