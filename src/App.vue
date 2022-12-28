<template>
  <main>
    <header>
      <img alt="Pinia logo" src="./assets/pinia-logo.svg" />
      <h1>Pinia Tasks</h1>
    </header>  
    <div class="task-list">
      <div v-for="task in taskStore.tasks" :key="task.id">
        <Task :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import Task from './components/Task.vue'
import {useTaskStore} from './store/TaskStore'

export default {
  name: 'App',
  components: {
    Task
  },
  setup() {
    const taskStore = useTaskStore()
    return {taskStore}
  },
}
</script>

<style>
#app {
  background: pink;
}
.task-list {
  max-width: 640px;
  margin: 20px auto;
}
</style>
