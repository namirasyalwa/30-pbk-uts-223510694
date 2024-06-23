// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Todolist from '../views/Todolist.vue';
import Posting from '../views/Posting.vue';
import AlbumAll from '@/views/AlbumAll.vue';
import AlbumClick from '@/views/AlbumClick.vue'
import MainLayout from '@/layout/MainLayout.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
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
  ]
})

export default router
