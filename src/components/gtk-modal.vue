<template>
<teleport to="body">
  <transition name="modal">
    <div v-if="isVisible" 
    class="
    gtk-modal 
    absolute 
    w-full
    h-full
    top-0
    left-0
    bg-black
    bg-opacity-50
    flex
    justify-center
    items-center
    text-gray-200
    text-sm
    ">
      <div class="
      modal-sub-container
      bg-gray-500
      w-3/4
      rounded-t-lg
      shadow-active
      overflow-hidden
      border
      border-gray-900
      ">
        <h3 class="
        modal-title 
        px-6
        py-4
        flex
        bg-gray-600
        justify-between
        items-center
        border-b
        border-gray-900
        shadow-normal
        ">
          <gtk-button @click="cancelHandler" class="modal-cancel">Cancel</gtk-button>
          <span class="modal-title-text text-lg">{{title}}</span>
          <gtk-button @click="confirmHanlder" class="modal-confirm">Confirm</gtk-button>
        </h3>
        <section class="modal-content-area p-4">
          <slot></slot>
        </section>
      </div>
    </div>
  </transition>
</teleport>
  
</template>

<script>
import gtkButton from './gtk-button.vue'

export default {
  name: 'gtk-modal',
  components: {
    gtkButton
  },
  props: {
    title: {
      type: String,
      default: "Title"
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    function cancelHandler() {
      context.emit('cancel')
    }
    function confirmHanlder() {
      context.emit('confirm')
    }
    return {
      cancelHandler,
      confirmHanlder
    }
  }
}
</script>

<style>
.gtk-modal {
  backdrop-filter: blur(0.5rem);
  
}
.modal-enter-active{
  transition: all 0.25s ease;
  /* transform: scale(0%, 0%) */
  backdrop-filter: blur(0rem);
}
.modal-enter-active .modal-sub-container{
  transition: all 0.25s ease;
  transform: scale(0%, 0%);
  opacity: 0;
}
.modal-enter-to .modal-sub-container{
  transform: scale(100%, 100%);
  opacity: 1;
}
.modal-leave-active{
  transition: all 0.25s ease;
  /* transform: scale(100%, 100%) */
  backdrop-filter: blur(0.5rem);
}
.modal-enter-to{
  /* transform: scale(100%, 100%) */
  backdrop-filter: blur(0.5rem);
}
.modal-leave-to{
  /* transform: scale(0%, 0%) */
  backdrop-filter: blur(0rem);
}

.modal-leave-active .modal-sub-container{
  transition: all 0.25s ease;
  transform: scale(100%, 100%);
  opacity: 1;
}
.modal-leave-to .modal-sub-container{
  transform: scale(0%, 0%);
  opacity: 0;
}

</style>