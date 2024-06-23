<script setup>
import { ref, onMounted, watch } from 'vue';
import { useTodoStore } from '@/stores/useTodoStore';

const todoStore = useTodoStore();

watch(() => todoStore.todos, (newVal) => {
  todoStore.saveTodosToLocalStorage();
}, { deep: true });

watch(() => todoStore.name, (newVal) => {
  todoStore.saveNameToLocalStorage();
});

onMounted(() => {
  todoStore.name = localStorage.getItem('name') || '';
  todoStore.todos = JSON.parse(localStorage.getItem('todos')) || [];
});
</script>

<template>
  <main class="app">
    <section class="greeting">
      <h2 class="title">Helo Namira, Create your To do List Here!!</h2>
    </section>

    <section class="create-todo">
      <h3>What's on your to do list?</h3>
      <form @submit.prevent="todoStore.addTodo">
        <input type="text" v-model="todoStore.inputContent" />
        <h3>Pick a category</h3>
        <div class="options">
          <label>
            <input type="radio" name="category" value="School" v-model="todoStore.inputCategory" />
            <span class="bubble school"></span>
            <div>Study</div>
          </label>
          <label>
            <input type="radio" name="category" value="personal" v-model="todoStore.inputCategory" />
            <span class="bubble personal"></span>
            <div>Personal</div>
          </label>
        </div>
        <input type="submit" value="Add" />
      </form>
    </section>

    <section class="todo-list">
      <h3>TODO LIST</h3>
      <div class="list">
        <section class="filter">
          <button @click="todoStore.toggleShowOnlyIncomplete" :class="{ active: todoStore.showOnlyIncomplete }" style="margin-right: 10px;">
            Show incomplete todos
          </button>
          <button class="delete-all" @click="todoStore.deleteAll" style="background-color: red;">Delete All</button>
          <button class="undo" @click="todoStore.undoDelete" v-if="todoStore.deletedTodos.length > 0" style="margin-left: 10px;">Undo</button>
        </section>

        <div v-for="(todo, index) in todoStore.filteredTodos" :key="index" :class="`todo-item ${todo.done && 'done'}`">
          <label>
            <input type="checkbox" v-model="todo.done" />
            <span :class="`bubble ${todo.category}`"></span>
          </label>
          <div class="todo-content" v-if="!todo.isEditing">
            <span>{{ todo.content }}</span>
          </div>
          <div class="todo-content" v-else>
            <input type="text" :value="todo.content" @input="todoStore.updateTodoContent($event, todo)" />
          </div>
          <div class="actions">
            <button class="edit" @click="todoStore.toggleEdit(todo)">{{ todo.isEditing ? 'Save' : 'Edit' }}</button>
            <button class="delete" @click="todoStore.removeTodo(todo)">Delete</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
h2.title{
  position: relative;
  top: 20px;
}
.filter {
  margin-top: 20px;
}

.filter button {
  padding: 8px 16px;
  border: 1px solid #333333;
  background-color: #f0f0f0;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.filter button.active {
  background-color: #951818;
  color: #fff;
}

.filter button {
  padding: 8px 16px;
  border: none;
  border-radius: 0.5rem;
  background-color: #161698;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.filter button.active {
  background-color: #333;
  color: #fff;
}

.todo-list {
  margin-top: 20px;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ccc;
}

.todo-item.done {
  text-decoration: line-through;
  color: #888;
}

.todo-item .bubble {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
}

.todo-item .business {
  background-color: #ffcc00; 
}

.todo-item .personal {
  background-color: #3399ff; 
}

.todo-item input[type="text"] {
  flex: 1;
  margin-left: 8px;
  border: none;
  background-color: transparent;
}

.todo-item .actions {
  margin-left: auto;
}

.todo-item .actions button {
  padding: 4px 8px;
  background-color: #ccc;
  border: none;
  cursor: pointer;
}

.delete-all {
  padding: 8px 16px;
  background-color: #ff0000 ;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  margin-left: auto; /* Menggeser tombol ke sebelah kanan */
}

.delete-all:hover {
  background-color: #cc0000;
}

</style>
