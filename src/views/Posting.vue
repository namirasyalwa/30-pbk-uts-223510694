<template>
  <div class="container">
    <div class="posts" id="posts">
      <h2>Posts</h2>
      <select v-model="postStore.selectedUser" class="selectModel" @change="postStore.fetchPosts">
        <option v-for="user in postStore.usersList" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>

      <div v-if="postStore.isLoading">
        <span class="loading-message">Loading posts...</span>
      </div>

      <ul v-if="!postStore.isLoading"> 
        <li v-for="(post, index) in postStore.postsList" :key="post.id">
          <h3><b><i>{{ index + 1 }}. {{ post.title }}</i></b></h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { usePostStore } from '@/stores/usePostStore';

const postStore = usePostStore();

onMounted(() => {
  postStore.fetchUsers();
});

watch(() => postStore.selectedUser, () => {
  postStore.posts = [];
  postStore.fetchPosts();
  postStore.setSelectedUser(postStore.selectedUser);
}, { immediate: true });
</script>


<style scoped>

/* Container styles */
.container {
    width: 100%;
    min-height: 100vh;
    background: pink;
    padding: 10px;
    margin-top: -10px;
    margin-left: -10px;
    margin-bottom: -10px;
}
  
.posts {
      width: 100%;
      max-width: 1200px;
      background: #fff;
      margin: 20vh auto;
      padding: 40px 30px 70px;
      border-radius: 10px;
}


  .loading-message {
    display: flex;
    justify-content:center;
    text-align: center;
    margin-bottom: 10px;
  }
  
  .selectModel {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    text-align:center;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
  }
  
  .selectModel:focus {
    outline: none;
    border-color: #4CAF50; 
  }
  
  .posts ul {
    list-style-type: none; 
    padding-left: 0; 
  }
  
  .posts li {
    margin-bottom: 20px; 
  }
  
  .posts h3, .posts p {
    text-align: left; 
  }
</style>