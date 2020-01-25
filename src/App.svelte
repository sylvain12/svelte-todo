<script>
  import Todo from './Todo.svelte';
  import NavBar from './NavBar.svelte';
  import AddTodo from './AddTodo.svelte';

  let title;

  let todos = [
    {
      id:0,
      title: "Make an appointment",
      completed: true,
    },
    {
      id:1,
      title: "Go to Market",
      completed: false,
    },
    {
      id:2,
      title: "Visit my brother",
      completed: true,
    },
    {
      id:3,
      title: "Go to sport",
      completed: false,
    },
  ];

  $: todosLength = todos.length;
  /* Functions */

  const clearTitle = () => title = '';
  const handleAddTodo = (e) => {
    e.preventDefault();
    const lastTodoIndex = todos.lastIndexOf(todos[todosLength - 1]);
    const newTodo = {
      id: lastTodoIndex + 1,
      title: title,
      completed: false,
    }
    todos = [...todos, newTodo];
    clearTitle();
  }

  const handleRemoveTodo = (e) => {
    const title = e.detail.title;
    todos = todos.filter(todo => todo.title !== title);
  }

  const handleTodoState = (e) => {
    const id = e.detail.id;
    todos = todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo
    })
  }
</script>

<style>
  @media (min-width: 640px) {
  }
</style>



<NavBar />

<div class="container">

  <section>
    <AddTodo bind:addTodoTitle={title} on:addTodo={handleAddTodo}/>
  </section>
  
  <section>
    <hr>
  </section>

  <section>
    {#if todos.length === 0}
      <p>No todos</p>
    {:else}
      {#each todos as todo (todo.id)}
        <Todo todo="{todo}" on:changeTodoStatus={handleTodoState} on:removeTodo={handleRemoveTodo}/>
      {/each}
    {/if}

  </section>
   
</div>
