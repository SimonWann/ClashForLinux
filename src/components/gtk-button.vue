<template>
  <button class="
  gtk-button-container
  p-2
  rounded-md
  border-gray-900
  border
  shadow-normal
  bg-gray-500
  hover:shadow-active
  hover:bg-gray-400
  active:bg-gray-700
  transition-all
  outline-none
  ">
    <div class="gtk-button-sub-contai">
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  name: 'gtk-button',
  setup(props, context) {
    function clickHandler() {
      context.emit('click')
    }
    return {
      clickHandler
    }
  }
}
</script>

<style>

</style>