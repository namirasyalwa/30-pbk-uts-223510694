// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Todolist from '../views/Todolist.vue';
import Posting from '../views/Posting.vue';
<<<<<<< HEAD
=======
import AlbumAll from '@/views/AlbumAll.vue';
import AlbumClick from '@/views/AlbumClick.vue'
import MainLayout from '@/layout/MainLayout.vue';
>>>>>>> d433041 (Menambahkan Framework dan State Management)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
<<<<<<< HEAD
      path: '/',
      name: 'Todolist',
      component: Todolist
    },
    {
      path: '/Posting',
      name: 'Posting',
      component: Posting
    }
=======
      path:'/',
      component: MainLayout,
      children:[
        {
          path: '/',
          name: 'Todolist',
          component: Todolist
        },
        {
          path: '/posts',
          name: 'Posting',
          component: Posting
        },
        {
          path:'/Albums',
          name: 'AlbumAll',
          component: AlbumAll
        },
        {
          path: 'Albums/:photoId',
          component: AlbumClick, props:true
        }
      ]
    },
>>>>>>> d433041 (Menambahkan Framework dan State Management)
  ]
})

export default router
