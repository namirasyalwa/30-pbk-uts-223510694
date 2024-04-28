<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const todos = ref([])

const name = ref('')

const input_content = ref('')

const input_category = ref(null)

const todos_asc = computed(() => todos.value.sort((a, b) => {
  return b.createdAt - a.createdAt
}))

const showOnlyIncomplete = ref(false)

const filteredTodos = computed(() => {
  if (showOnlyIncomplete.value) {
    return todos_asc.value.filter(todo => !todo.done)
  }
  return todos_asc.value
})

const addTodo = () => {
  if (input_content.value.trim() === '' || input_category.value === null) {
    return
  }

  todos.value.push({
  content: input_content.value,
  category: input_category.value,
  done: false,
  isEditing: false, 
  createdAt: new Date().getTime()
})

  input_content.value = ''
  input_category.value = null
}

const toggleEdit = (todo) => {
  if (todo.isEditing) {
    todo.isEditing = false;
    saveTodoChanges(todo);
  } else {
    todo.isEditing = true;
  }
}

const saveTodoChanges = (todo) => {
  localStorage.setItem('todos', JSON.stringify(todos.value));
}

const updateTodoContent = (event, todo) => {
  todo.content = event.target.value;
}

const removeTodo = todo => {
  todos.value = todos.value.filter(t => t !== todo)
}

const toggleShowOnlyIncomplete = () => {
  showOnlyIncomplete.value = !showOnlyIncomplete.value
}

const deleteAllTodos = () => {
  todos.value = [];
}

const deletedTodos = ref([]); // Ref untuk menyimpan daftar yang dihapus

const deleteAll = () => {
  // Simpan daftar yang dihapus sebelum dihapus
  deletedTodos.value = [...todos.value];
  // Hapus semua todo
  todos.value = [];
}

const undoDelete = () => {
  // Kembalikan daftar yang dihapus
  todos.value = [...deletedTodos.value];
  // Kosongkan daftar yang dihapus
  deletedTodos.value = [];
}


watch(todos, newVal => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, { deep: true })

watch(name, (newVal) => {
  localStorage.setItem('name', newVal)
})

onMounted(() => {
  name.value = localStorage.getItem('name') || ''
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
})
</script>

<template>
  <main class="app">

    <section class="greeting">
      <h2 class="title">
        Helo Namira, Create your To do List Here!!
      </h2>
    </section>

    <section class="create-todo">
      <h3>What's on your to do list?</h3>

      <form @submit.prevent="addTodo">
        <input type="text" placeholder="" v-model="input_content" />

        <h3>Pick a category</h3>

        <div class="options">
          <label>
            <input type="radio" name="category" value="School" v-model="input_category" />
            <span class="bubble school"></span>
            <div>Study</div>
          </label>

          <label>
            <input type="radio" name="category" value="personal" v-model="input_category" />
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
  <button @click="toggleShowOnlyIncomplete" :class="{ active: showOnlyIncomplete }" style="margin-right: 10px;">
    Show incomplete todos
  </button>
  <button class="delete-all" @click="deleteAll" style="background-color: red;">Delete All</button>
  <button class="undo" @click="undoDelete" v-if="deletedTodos.length > 0" style="margin-left: 10px;">Undo</button>
</section>

        <div v-for="(todo, index) in filteredTodos" :key="index" :class="`todo-item ${todo.done && 'done'}`">
  <label>
    <input type="checkbox" v-model="todo.done" />
    <span :class="`bubble ${todo.category}`"></span>
  </label>
  <div class="todo-content" v-if="!todo.isEditing">
    <span>{{ todo.content }}</span>
  </div>
  <div class="todo-content" v-else>
    <input type="text" :value="todo.content" @input="updateTodoContent($event, todo)" />
  </div>
  <div class="actions">
    <button class="edit" @click="toggleEdit(todo)">{{ todo.isEditing ? 'Save' : 'Edit' }}</button>
    <button class="delete" @click="removeTodo(todo)">Delete</button>
  </div>
</div>



        </div>


    </section>

  </main>
</template>

<style scoped>
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
</style>

<style scoped>
.filter button {
  padding: 8px 16px;
  border: none;
  border-radius: 0.5rem;
  background-color: #161698;
;
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
