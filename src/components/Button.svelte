<script>
  export let button_o = false;
  export let button_d = false;
  export let button_o_danger = false;
</script>

<button
  class="button"
  on:click
  class:button_o
  class:button_d
  class:button_o_danger
>
  <slot></slot>
</button>

<style>
  .button {
    background-color: rgb(73, 73, 180);
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    font-family: 'Roboto Mono', monospace;
    cursor: pointer;
  }

  .button_o {
    background-color: transparent;
    color: rgb(73, 73, 180);
    border: 1px solid rgb(73, 73, 180);
    transition: all 0.2s;
  }

  .button_o:hover,
  .button_o:active {
    background-color: rgb(73, 73, 180);
    color: #fff;
  }

  .button_o_danger {
    background-color: transparent;
    color: rgb(178, 7, 7);
    border: 1px solid rgb(178, 7, 7);
    transition: all 0.2s;
  }

  .button_o_danger:hover,
  .button_o_danger:active {
    background-color: rgb(178, 7, 7);
    color: #fff;
  }

  .button_d {
    background-color: rgb(178, 7, 7);
    transition: all 0.2s;
  }

  .button_d:hover {
    background-color: transparent;
    color: rgb(178, 7, 7);
    border: 1px solid rgb(178, 7, 7);
  }
</style>
