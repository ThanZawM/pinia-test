<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
        <i class="material-icons">delete</i>
        <i class="material-icons">favorite</i>
    </div>
    
  </div>
</template>

<script>
export default {
    props: ['task']
}
</script>

<style scoped>
  .task {
    padding: 6px 20px;
    background: #fff;
    margin-top: 20px;
    border-radius: 4px;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .task h3, .task .icons {
    display: inline-block;
  }
  .task .icons {
    text-align: right;
  }
  .task i {
    font-size: 1.4em;
    margin-left: 6px;
    cursor: pointer;
    color: #bbb;
  }
</style>