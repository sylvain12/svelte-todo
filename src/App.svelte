<script>
  import Todo from './components/Todo.svelte';
  import NavBar from './components/NavBar.svelte';
  import AddTodo from './components/AddTodo.svelte';
  import Button from './components/Button.svelte';
  import {beforeUpdate, onMount} from 'svelte';

  let title;
  let checkAll = false;
  $: showedTodo = 'all';
  $: filterShowTodo = []
  $: countActiveTodos = 0;

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

  const handleClearTodos = () => {
    todos = todos.filter(todo => !todo.completed);
  }
  /*
  const handleCheckUncheckAll = () => {
    if(checkAll == true) {
    todos = todos.map(todo => {
      todo.completed = false;
      return todo;
    });
    }else if(checkAll == false) {
    todos = todos.map(todo => {
      todo.completed = true;
      return todo;
    });
    }
   checkAll = !checkAll;
  }
  */

  /* Funcions for lifecycle*/
  beforeUpdate(() => {
    if(showedTodo == 'active') {
      filterShowTodo = todos.filter(todo => !todo.completed)
    }else if(showedTodo == 'completed') {
      filterShowTodo = todos.filter(todo => todo.completed)
    }else {
      filterShowTodo = todos;
    }

    countActiveTodos = todos.filter(todo => !todo.completed).length;
  })
</script>

<style>

  .button__filter-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button__filter-box input[type="radio"] {
    display: none;
  }

  .button__filter-box label {
    padding: .5rem .8rem;
    border: 1px solid rgb(73, 73, 180);
    cursor: pointer;
    color: rgb(73, 73, 180);
  }

  .button__filter-box label:nth-of-type(2) {
    border-right: none;
    border-left: none;
  }

  .button__filter-box input[type="radio"]:checked  + label {
    background: rgb(73, 73, 180);
    color: #fff;
  } 

  .todo-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .todo-info p {
    justify-self: flex-end;
  }

  @media (min-width: 640px) {
  }
</style>



<NavBar />

<div class="container">

  <section>
    <AddTodo bind:addTodoTitle={title} on:addTodo={handleAddTodo}/>
  </section>
  

  <section>
    {#if filterShowTodo.length === 0}
      <p>No todos</p>
    {:else}
      {#each filterShowTodo as todo (todo.id)}
        <Todo todo="{todo}" on:changeTodoStatus={handleTodoState} on:removeTodo={handleRemoveTodo}/>
      {/each}
    {/if}

  </section>

  <section>  
  <hr>
    <div class="todo-info">
      <!-- <label for="todos-check-all">
        <input on:click="{handleCheckUncheckAll}" type="checkbox" bind:value="{checkAll}" id="todos-check-all"> {#if !checkAll}Check{:else}Uncheck{/if} All
      </label> -->

      <p>{countActiveTodos} {#if countActiveTodos == 1}todo{:else}todos{/if} left</p>
    </div>

 <hr>
  </section>
 
  
  <section class="section-button-action">
    <div class="ddd">
      <div class="button__filter-box">
        
        <input bind:group="{showedTodo}" type="radio" value="all" id="todo-all"> 
        <label for="todo-all">All</label>

        <input bind:group="{showedTodo}" type="radio" value="completed" id="todo-completed">
       <label for="todo-completed">Completed</label>
  
        <input id="todo-active" bind:group="{showedTodo}" type="radio" value="active">
        <label for="todo-active">Active</label>
     
      </div> 
    </div>
    <Button on:click={handleClearTodos}>Clear completed</Button>
  </section>
   
</div>
