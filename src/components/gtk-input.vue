<template>
  <div class="gtk-input">
    <input :name="name" class="
    bg-gray-600
    rounded
    h-8
    py-4
    px-2
    border
    border-gray-900
    overflow-hidden
    focus:border-green-500
    outline-none
    " 
    type="text" 
    v-model="value"
    />
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'gtk-input',
  props: {
    name: {
      type: String,
      default: undefined
    },
    modelValue: {
      type: String,
      default: undefined
    }
  },
  // model: {
  //   prop: 'outValue',
  //   event: 'change'
  // },
  setup(props, context) {
    const value = ref(undefined)
    watch(value,(val) => {
      context.emit('update:modelValue', val)
    })
    const renderModelValue = computed(() => {
      return props.modelValue
    })
    watch(renderModelValue, (val ,pre) => {
      if(val !== pre) {
        value.value = val
      }
    })
    return {
      value
    }
  }
}
</script>

<style>

</style>