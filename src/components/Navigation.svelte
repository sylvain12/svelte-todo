<script>
  import Button from './Button.svelte';
  import { createEventDispatcher } from 'svelte';

  export let todo;

  const dispatcher = createEventDispatcher();

  function showNext() {
    dispatcher('nextTodo', todo);
  }

  function showPrev() {
      dispatcher('prevTodo', todo);
  }
</script>

<style>
  .navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<div class="navigation">
  <Button on:click={showPrev} button_o><span>&#171;</span></Button>
  <Button on:click="{showNext}" button_o> <span>&#187;</span></Button>
</div>
