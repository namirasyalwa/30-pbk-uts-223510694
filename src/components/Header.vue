<template>
    <header class="header">
        <nav class="navbar">
            <router-link to="/" class="active">Todo List</router-link>
            <router-link to="/Posting">Post</router-link>
        </nav>
    </header>
</template>

<style scoped>
.navbar {
    display: flex;
    justify-content: center; 
    align-items: center; 
    width: 100%; 
}
  
.navbar a {
    font-size: 1.5rem;
    color: white;
    margin: 0 3rem; 
    font-weight: 700;
    text-decoration: none; 
}
  

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 2rem 0%;
    z-index: 1000; 
    background: rgb(255, 204, 212);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

</style>