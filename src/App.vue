<template>
  <main>
    <!-- heading -->
    <header>
      <img alt="Pinia logo" src="./assets/pinia-logo.svg" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'fav'">Fav Tasks</button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="loading">
      Loading tasks ...
    </div>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} tasks left to do.</p>
      <div v-for="task in tasks" :key="task.id">
        <Task :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'fav'">
      <p>You have {{ favCount }} fav tasks left to do.</p>
      <div v-for="task in favs" :key="task.id">
        <Task :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">reset state</button>
  </main>
</template>

<script>
import { ref } from '@vue/reactivity'
import Task from './components/Task.vue'
import TaskForm from './components/TaskForm.vue'
import {useTaskStore} from './store/TaskStore'
import { storeToRefs } from 'pinia'

export default {
  name: 'App',
  components: {
    Task, TaskForm
  },
  setup() {
    const taskStore = useTaskStore()

    const { tasks, loading, favs, favCount, totalCount } = storeToRefs(taskStore)

    // fetch tasks
    taskStore.getTasks()
    const filter = ref('all')
    return { taskStore, filter, tasks, loading, favs, favCount, totalCount }
  },
}
</script>

<style>
#app {
  border: 1px solid pink;
}
.task-list {
  max-width: 640px;
  margin: 20px auto;
}
.filter {
  width: 640px;
  margin: 10px auto;
  text-align: right;
}
.filter button{
  display: inline-block;
  margin-left: 10px;
  background: #fff;
  border: 2px solid #555;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 1em;
}
.new-task-form {
  background: #e7e7e7;
  padding: 20px 0;
}
form {
  max-width: 400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 10px;
}
form button {
  background: #ffd859;
  border: 0;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
}
form input {
  color: #555;
  border: 0;
  padding: 10px;
  border-radius: 6px;
  font-size: 1em;
}
.loading {
  max-width: 640px;
  border: 1px solid #ffd859;
  background: #ffe9a0;
  color: #3a3a3a;
  padding: 5px 0;
  text-align: center;
  margin: 30px auto;
}
</style>
