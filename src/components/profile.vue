<template>
  <div class="profile">
    <gtk-modal
    :isVisible="isVisible"
    @cancel="cancel"
    @confirm="confirm"
    >
      <div class="profile-container">
        <div class="profile-sub flex flex-col">
          <section 
          v-for="val in profile"
          :key="val"
          :class="{
            'profile-item': true,
            'flex': true,
            'mb-4': true,
            'justify-center': true, 
            'items-center': true,
            'overflow-ellipsis': true,
            'bg-gray-700': true, 
            'w-full': true, 
            'h-16': true,
            'p-4': true,
            'shadow-normalD': true,
            'rounded-lg': true,
            'hover:shadow-activeD': true,
            'hover:bg-gray-600': true,
            'transition-all': true,
            'border-gray-900': true,
            'truncate': true,
            'border': true,
            'cursor-pointer': true
          }"
          
          >
          <span class="text-gray-100">{{val}}</span>
          </section>
        </div>
      </div>
    </gtk-modal>
  </div>
</template>

<script>
import gtkModal from './gtk-modal.vue'
import { onMounted, ref } from 'vue'

export default {
  name: 'profile',
  components: {
    gtkModal
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    function cancel() {
      context.emit('cancel')
    }
    function confirm() {
      context.emit('confirm')
    }
    const profile = ref([])
    onMounted(async () => {
      let result = await window.ipcRenderer.invoke('profile', JSON.stringify({name: 'profile', value: undefined}))
      profile.value = JSON.parse(result)
    })
    return {
      cancel,
      confirm,
      profile
    }
  }
}
</script>

<style>

</style>