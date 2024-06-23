// src/stores/todoStore.js
import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    name: localStorage.getItem('name') || '',
    inputContent: '',
    inputCategory: null,
    showOnlyIncomplete: false,
    deletedTodos: []
  }),
  getters: {
    todosAsc: (state) => state.todos.sort((a, b) => b.createdAt - a.createdAt),
    filteredTodos(state) {
      if (state.showOnlyIncomplete) {
        return state.todosAsc.filter(todo => !todo.done);
      }
      return state.todosAsc;
    }
  },
  actions: {
    addTodo() {
      if (this.inputContent.trim() === '' || this.inputCategory === null) {
        return;
      }
      this.todos.push({
        content: this.inputContent,
        category: this.inputCategory,
        done: false,
        isEditing: false,
        createdAt: new Date().getTime()
      });
      this.inputContent = '';
      this.inputCategory = null;
      this.saveTodosToLocalStorage();
    },
    toggleEdit(todo) {
      if (todo.isEditing) {
        todo.isEditing = false;
        this.saveTodosToLocalStorage();
      } else {
        todo.isEditing = true;
      }
    },
    saveTodoChanges(todo) {
      this.saveTodosToLocalStorage();
    },
    updateTodoContent(event, todo) {
      todo.content = event.target.value;
    },
    removeTodo(todo) {
      this.todos = this.todos.filter(t => t !== todo);
      this.saveTodosToLocalStorage();
    },
    toggleShowOnlyIncomplete() {
      this.showOnlyIncomplete = !this.showOnlyIncomplete;
    },
    deleteAll() {
      this.deletedTodos = [...this.todos];
      this.todos = [];
      this.saveTodosToLocalStorage();
    },
    undoDelete() {
      this.todos = [...this.deletedTodos];
      this.deletedTodos = [];
      this.saveTodosToLocalStorage();
    },
    saveTodosToLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    saveNameToLocalStorage() {
      localStorage.setItem('name', this.name);
    }
  }
});
