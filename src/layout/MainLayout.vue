<template>
    <q-layout view="lHr lpR lfr">
      <q-header class="header">
        <q-toolbar>
          <q-tabs align="center" class="navbar">
            <q-route-tab to="/" label="Todo List" class="nav-link" />
            <q-route-tab to="/posts" label="Post" class="nav-link" />
            <q-route-tab to="/Albums" label="Album" class="nav-link" />
          </q-tabs>
        </q-toolbar>
      </q-header>
      <q-page-container style="padding: 0;">
        <router-view />
      </q-page-container>
    </q-layout>
</template>
  
<script setup>
</script>
  
<style scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: rgb(255, 204, 212);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
  .nav-link {
    font-size: 1.5rem;
    color: white;
    margin: 0 3rem;
    font-weight: 700;
    text-decoration: none;
  }
  
  
  .q-toolbar {
    padding: 0 75px !important;
  }
  
  .q-tab {
    padding: 0 20px !important;
    min-height: 75px !important;
  }
</style>
  