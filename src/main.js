import './assets/main.css'

import { createApp } from 'vue'
import { Quasar } from 'quasar'
import 'quasar/src/css/index.sass'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia();
app.use(pinia)
app.use(router)
app.use(Quasar, {
    plugins:{},
})

app.mount('#app')
