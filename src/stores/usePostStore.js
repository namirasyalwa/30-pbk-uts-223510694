import { defineStore } from 'pinia';

export const usePostStore = defineStore('post', {
  state: () => ({
    isLoading: false,
    selectedUser: null,
    selectedUserName: '',
    users: [],
    posts: []
  }),
  actions: {
    async fetchUsers() {
      try {
        this.isLoading = true;
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchPosts() {
      if (!this.selectedUser) return;
      this.isLoading = true;
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
        const data = await response.json();
        this.posts = data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        this.isLoading = false;
      }
    },
    setSelectedUser(userId) {
      this.selectedUser = userId;
      const selectedUserObject = this.users.find(user => user.id === userId);
      this.selectedUserName = selectedUserObject ? selectedUserObject.name : '';
    }
  },
  getters: {
    postsList: (state) => state.posts,
    usersList: (state) => state.users
  }
});