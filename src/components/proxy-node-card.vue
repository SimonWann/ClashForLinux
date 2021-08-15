<template>
  <div :class="{
  'proxy-node-card': true,
  'w-80': true,
  'h-24': true,
  'bg-gray-500': true,
  'hover:bg-gray-400': !isActive,
  'transition': true,
  'rounded-md': true,
  'border': true,
  'border-gray-900': true,
  'mb-5': true,
  'shadow-normal': true,
  'hover:shadow-active': !isActive,
  'inline-flex': true,
  'justify-center': true,
  'pl-4': true,
  'cursor-pointer': true,
  'bg-gray-800': isActive,
  'shadow-active': isActive,
  'active:bg-gray-900': true,
  }"
  @click="changeProxyNode"
  >
    <div class="
    proxy-node-card-container
    flex
    flex-col
    justify-center
    w-10/12
    truncate
    font-sans
    ">
      <section class="
      type-tag
      text-sm
      text-gray-50
      inline-flex
      justify-between
      ">
      <span class="type-text">{{renderItem.type}}</span>
      <span class="delay">{{delay}}</span>
      </section>
      <span class="
      name
      text-lg
      text-gray-50
      ">{{renderItem.name}}</span>
    </div>
  </div>
</template>

<script>
import { ref,watch ,inject , toRefs, onMounted, computed } from 'vue'
import api from '../apiMap/api'

export default {
  name: 'proxy-node-card',
  props: {
    item: {
      type: Object,
      defualt: function () {
        return {}
      }
    },
    isActive: {
      type: Boolean,
      default: false
    },
    delayCnt: {
      type: Number,
      defualt: 0
    }
  },
  setup(props, context) {
    const $axios = inject('$axios')
    const renderItem = computed(() => {
      return props.item
    })
    const renderDelay = computed(() => {
      return props.delayCnt
    })
    const delay = ref()
    async function getDelay() {
      return await $axios({
        url: `/proxies/${encodeURIComponent(renderItem?.value.name)}/delay`,
        params: {
          timeout: 5000,
          url: 'http://www.gstatic.com/generate_204'
        }
      })
    }
    watch(renderDelay, async (val, pre) => {
      try{
        let temp = (await getDelay())?.data?.delay
        delay.value = temp?`${temp}ms`:'Timeout'
      } catch(err) {
        console.error(err)
      }
    })
    async function changeProxyNode() {
      $axios({
        url: `/proxies/default`,
        method: 'put',
        data: {
          name: renderItem?.value.name
        }
      })
    }
    return {
      renderItem,
      delay,
      changeProxyNode
      // name,
      // type,
      // udp
    }
  }
}
</script>

<style>

</style>