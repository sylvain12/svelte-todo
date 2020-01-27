<script>
  import Button from './Button.svelte';
  import { createEventDispatcher } from 'svelte';

  export let addTodoTitle;

  const dispatcher = createEventDispatcher();

  function addTodo() {
    dispatcher('addTodo', addTodoTitle);
  }
</script>

<style>
  form {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }

  input[type='text'] {
    flex: 1;
    margin-right: 1.5rem;
    padding: 0.5rem 1rem;
    font-family: 'Roboto Mono', monospace;
  }

  ::placeholder {
    color: #cecece;
  }

  @media (max-width: 640px) {
    form {
      flex-direction: column;
    }

    input[type='text'] {
      width: 100%;
      margin-bottom: 1.5rem;
    }
  }
</style>

<form on:submit|preventDefault>
  <input
    bind:value="{addTodoTitle}"
    type="text"
    placeholder="Enter your todo"
  />
  <Button on:click="{addTodo}">Add Todo</Button>
</form>
