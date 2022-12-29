import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
  }),
  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav);
    },
    favCount() {
      return this.tasks.reduce((initialValue, currentValue) => {
        // initial value is number ( 0 )
        // current value is current object
        console.log(`initialValue = ${initialValue}`);
        console.log(`currentValue title = ${currentValue.title}`);
        return currentValue.isFav ? initialValue + 1 : initialValue;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
  actions: {
    async getTasks() {
      let self = this;
      self.loading = true;

      const res = await fetch("http://localhost:3000/tasks");
      // You can't leave 'await'
      const data = await res.json()
      self.tasks = data;

      setTimeout(() => {
        self.loading = false;
      }, 1500)
    },
    async addTask(task) {
      this.tasks.push(task);

      const res = await fetch(`http://localhost:3000/tasks`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {'Content-Type' : 'application/json'}
      })
      if(res.error) {
        console.log(res.error)
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((value) => value.id !== id);

      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
      })
      if(res.error) {
        console.log(res.error)
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((val) => val.id === id);
      task.isFav = !task.isFav;

      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({isFav: task.isFav}),
        headers: {'ContenT-type' : 'application/json'}
      })
      if(res.error) {
        console.log(res.error)
      }
    },
  },
});
