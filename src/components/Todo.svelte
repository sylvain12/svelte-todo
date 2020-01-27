<script>
  import Button from './Button.svelte';
  import { createEventDispatcher } from 'svelte';

  export let todo;

  const dispatcher = createEventDispatcher();

  function removeTodo() {
    dispatcher('removeTodo', todo);
  }

  function changeTodoStatus() {
    dispatcher('changeTodoStatus', todo);
  }
</script>

<style>
  .card {
    width: 100%;
    box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.26);
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card:not(:last-child) {
    margin-bottom: 2.5rem;
  }

  input[type='checkbox'] {
    margin-right: 0.5rem;
  }

  p {
    flex: 1;
    justify-self: flex-start;
    text-align: left;
  }

  .completed {
    text-decoration: line-through;
    color: #ccc;
  }
</style>

<div class="card">
  <input
    type="checkbox"
    checked="{todo.completed}"
    on:click="{changeTodoStatus}"
  />
  <p class:completed="{todo.completed}">{todo.title}</p>
  <div class="btn__action">
    <!-- <Button>edit</Button> -->
    <Button on:click="{removeTodo}" button_o_danger>X</Button>
  </div>
</div>
