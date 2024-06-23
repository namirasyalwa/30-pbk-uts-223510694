import './assets/main.css'

import { createApp } from 'vue'
<<<<<<< HEAD
=======
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
>>>>>>> d433041 (Menambahkan Framework dan State Management)
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
<<<<<<< HEAD

app.use(createPinia())
app.use(router)
=======
const pinia = createPinia();
app.use(pinia)
app.use(router)
app.use(Quasar, {
    plugins:{},
})
>>>>>>> d433041 (Menambahkan Framework dan State Management)

app.mount('#app')
