<script>
  import Todo from './components/Todo.svelte';
  import NavBar from './components/NavBar.svelte';
  import AddTodo from './components/AddTodo.svelte';
  import Button from './components/Button.svelte';
  import TodoInfo from './components/TodoInfo.svelte';
  import {beforeUpdate, onMount} from 'svelte';
  import {LS} from './utils.js';

  let title;
  let checkAll = false;
  let todoTakenLength = 4;
  $: fourthTodos = [];
  $: showedTodo = 'all';
  $: filterShowTodo = []
  $: countActiveTodos = 0;
  $: countCompletedTodos = 0;
  $: countTotalTodos = 0;
  $: todosLength = todos.length;


  let todos = [];

  const ls =  new LS('todos',todos);

  /* Functions */

  const clearTitle = () => title = '';

  const handleAddTodo = (e) => {
    e.preventDefault();

    const lastTodo = todos.length ? todos[todos.length - 1] : 0
    const lastTodoId = todos.length ? lastTodo.id : 0;
    const todoId = todos.length ? lastTodoId + 1 : 0

    if(title) {
    const newTodo = {
      id:  todoId,
      title: title,
      completed: false,
    }
    todos = [...todos, newTodo];
    ls.saveToLS(newTodo);
    clearTitle();
    }

  }

  const handleRemoveTodo = (e) => {
    const todo = e.detail;
    todos = todos.filter(t => t.id !== todo.id);
    ls.removeFromLS(todo)
  }

  const handleTodoState = (e) => {
    const t = e.detail;
    todos = todos.map(todo => {
      if(todo.id === t.id) {
        todo.completed = !todo.completed;
      }
      return todo
    })

    ls.editStateFromLs(t);
  }

  const handleClearTodos = () => {
    todos = todos.filter(todo => !todo.completed);
    ls.removeCompletedTodoFromLS();
  }

/*
  const nextTodo = (e) => {
    todos = e;

    const lastTodo = fourthTodos[fourthTodos.length - 1];
    const lastTodoIndex = todos.indexOf(lastTodo);
    let [startTodo, stopTodo] = [lastTodoIndex + 1, lastTodoIndex + 4];
    
    fourthTodos = filterShowTodo.slice(startTodo, stopTodo + 1);
    console.log(fourthTodos, filterShowTodo, startTodo, stopTodo);
  }

  const prevTodo = (e) => {
    todos = e;
    const firstTodo = todos[0];
    const firstTodoIndex = filterShowTodo.indexOf(firstTodo);
    console.log(firstTodo, firstTodoIndex);
    return false;

    const [startTodo, stopTodo] = [lastTodoIndex + 1, lastTodoIndex + 4];
    fourthTodos = filterShowTodo.slice(4, 8);
    console.log(fourthTodos, filterShowTodo)
  }

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

  onMount(() => {
    todos = ls.getFromLS().sort((t1, t2) => t1.id - t2.id);
  });

  beforeUpdate(() => {
    if(showedTodo == 'active') {
      filterShowTodo = todos.filter(todo => !todo.completed)
      .sort((t1, t2) => t1.id - t2.id);
      fourthTodos = filterShowTodo.slice(0, 4);
    }else if(showedTodo == 'completed') {
      filterShowTodo = todos.filter(todo => todo.completed)
      .sort((t1, t2) => t1.id - t2.id);
      fourthTodos = filterShowTodo.slice(0, 4);
    }else {
      filterShowTodo = todos.sort((t1, t2) => t1.id - t2.id);;
      fourthTodos = filterShowTodo.slice(0, 4);
    }

    countActiveTodos = todos.filter(todo => !todo.completed).length;
    countCompletedTodos = todos.filter(todo => todo.completed).length;
    countTotalTodos = todos.length;
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

  .section-filter {
    display: flex;
    align-items: center;
  }

  .todo-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .todo-info p {
    justify-self: flex-end;
  }

  .todo-info p:not(:last-child) {
    margin-right: 1.5rem;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: stretch;
  }

  .sidebar {
    width: 30%;
    display: flex;
    justify-content: flex-end;
  }

  .main-content {
    flex: 2;
   /* display: flex;
    flex-direction: column;
    align-items: flex-start;
    */
  }

  .main-content h2 {
    text-align: center;
  }

  @media (max-width: 640px) {

    .todo-info p {
      justify-self: center;
    }
  }
</style>
<!-- {@debug filterShowTodo, fourthTodos} -->

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap" rel="stylesheet">
</svelte:head>

<NavBar />

<div class="container">

  <div class="wrapper">

    <!-- <div class="sidebar">
      <TodoInfo>
        <h1>Todos infos</h1>
        <p>{countActiveTodos} {#if countActiveTodos == 1}todo{:else}todos{/if} left</p>
      </TodoInfo>
    </div> -->

  <div class="main-content">
    <h2>Svelte TODO</h2>
    <section>
      <AddTodo bind:addTodoTitle={title} on:addTodo={handleAddTodo}/>
    </section>

    <section class="section-filter">
      <div class="button__filter-box">
          
        <input bind:group="{showedTodo}" type="radio" value="all" id="todo-all"> 
        <label for="todo-all">All</label>

        <input bind:group="{showedTodo}" type="radio" value="completed" id="todo-completed">
      <label for="todo-completed">Completed</label>

        <input id="todo-active" bind:group="{showedTodo}" type="radio" value="active">
        <label for="todo-active">Active</label>
    
      </div> 
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

        <p>Total: {countTotalTodos}</p>
        <p>Completed: {countCompletedTodos}</p>
        <p>Active: {countActiveTodos}</p>

        <!-- <p>{countTotalTodos} {#if countTotalTodos == 1}todo{:else}todos{/if} / </p>
        <p>{countCompletedTodos} {#if countCompletedTodos == 1}todo{:else}todos{/if} completed / </p>
        <p>{countActiveTodos} {#if countActiveTodos == 1}todo{:else}todos{/if} active</p> -->
      </div>

  <hr>
    </section>
  
    
    <section class="section-button-action">

      <!-- <Navigation on:nextTodo={nextTodo(fourthTodos)} on:prevTodo={prevTodo(fourthTodos)}/> -->

      <Button on:click={handleClearTodos}>Clear completed</Button>
    </section>
    </div>
  </div>
</div>
