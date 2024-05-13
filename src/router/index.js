// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Todolist from '../views/Todolist.vue';
import Posting from '../views/Posting.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Todolist',
      component: Todolist
    },
    {
      path: '/Posting',
      name: 'Posting',
      component: Posting
    }
  ]
})

export default router
