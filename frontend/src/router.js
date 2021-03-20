import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './pages/HomePage'
import CreateMovie from './pages/CreateMovie'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SearchPage from './pages/SearchPage'
import DetailsPage from './pages/DetailsPage'
import ProfilePage from './pages/ProfilePage'
import store from './store/index'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage},
        { path: '/login', component: LoginPage},
        { path: '/register', component: RegisterPage},
        { path: '/all', component: SearchPage},
        { path: '/details/:id', component: DetailsPage},
        { path: '/movie/create', component: CreateMovie},
        { path: '/user/profile', component: ProfilePage},
    ]
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters.isLoggedIn && store.getters.isLoggedIn;
    const isAdmin = store.getters.isAdmin && store.getters.isAdmin;
    console.log(isLoggedIn, 'in router');
    if ((to.path !== '/login' && to.path !== '/register' && to.path !== '/' && to.path !== '/all') && !isLoggedIn) next({ path: '/login' })
    else if ((to.path === '/login' || to.path === '/register') && isLoggedIn) next({ path: '/' })
    else if ((to.path === '/movie/create') && !isAdmin) next({ path: '/' })
    else next()
  })


export default router