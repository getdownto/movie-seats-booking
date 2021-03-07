import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './pages/HomePage'
import CreateMovie from './pages/CreateMovie'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SearchPage from './pages/SearchPage'
import DetailsPage from './pages/DetailsPage'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage},
        { path: '/login', component: LoginPage},
        { path: '/register', component: RegisterPage},
        { path: '/all', component: SearchPage},
        { path: '/details/:id', component: DetailsPage},
        { path: '/movie/create', component: CreateMovie}
    ]
})


export default router