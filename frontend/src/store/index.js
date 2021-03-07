import { createStore } from 'vuex'
import moviesModule from './modules/movies'
import authModule from './modules/auth'

const store = createStore({
    modules: {
        movies: moviesModule,
        auth: authModule
    },
})

export default store