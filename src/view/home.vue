<template>
    <div class="
    home
    bg-gray-50
    flex
    justify-start
    flex-col
    items-center
    h-screen
    ">
        <gtk-modal
        class="sub-conf"
        :isVisible="subConfVisible"
        @cancel="closeSubConfVisible"
        @confirm="updateHandle"
        >
            <div class="input-container">
                <div class="normal-input-container flex items-center">
                    <label for="subConf">{{confText}}</label>
                    <gtk-input v-model="subUrl" class="ml-4" name="subConf"></gtk-input>
                </div>
                
                <div class="text-red-300 mt-4" v-if="subError">{{subError}}</div>
            </div>
        </gtk-modal>
        <nav
        class="
        nav-tool
        flex
        items-center
        self-end
        bg-gray-500
        w-screen
        p-3
        pl-10
        shadow-innerNormal
        "
        >
            <gtk-button
            @click="getDelayAll"
            ><speed-one
            :fill="'#fff'"
            :size="'1.2rem'"
            ></speed-one></gtk-button> 
            <gtk-button
            class="
            subConfButton
            ml-20
            "
            @click="openSubConfVisible"
            >
                <link-one 
                :fill="'#fff'"
                :size="'1.2rem'"
                ></link-one>
            </gtk-button>
            <gtk-button
            class="ml-4"
            >
                <transfer-data :fill="'#fff'"
                :size="'1.2rem'"
                />
            </gtk-button>
            <gtk-button class="ml-4" @click="openProfile">
                <dataServer :fill="'#fff'"
                :size="'1.2rem'" />
            </gtk-button>
        </nav>
            
        <main 
        class="
        proxy-container
        w-full
        grid
        grid-cols-2
        pt-4
        justify-items-center
        ">
            <proxy-node-card
            :item="val"
            :key="key"
            @click="pickCard(key)"
            :isActive="dataIndex === key"
            :delayCnt="delayCnt"
            v-for="(val,key) in proxiesItems.proxies"
            ></proxy-node-card>
        </main>
        <profile
        :isVisible="profileVisble"
        @cancel="closeProfile"
        ></profile>
    </div>
</template>

<script>
import { ref,onMounted,inject } from 'vue'
import api from '../apiMap/api'
import proxyNodeCard from '../components/proxy-node-card.vue'
import {SpeedOne, LinkOne, TransferData, DataServer} from '@icon-park/vue-next';
import gtkButton from '../components/gtk-button.vue'
import gtkModal from '../components/gtk-modal.vue'
import gtkInput from '../components/gtk-input.vue'
import profile from '../components/profile.vue'

export default {
    name: '',
    components: {
        proxyNodeCard,
        SpeedOne,
        gtkButton,
        LinkOne,
        TransferData,
        gtkModal,
        gtkInput,
        profile,
        DataServer
    },
    setup(props, context) {
        const version = ref()
        const proxiesItems = ref({})
        const proxiesMenu = ref({})
        const delayCnt = ref(0)
        const subUrl = ref(undefined)
        const $axios = inject('$axios')
        const dataIndex = ref()
        const confText = ref('Subscript URL:')
        const profileVisble = ref(false)
        const subError = ref(undefined)
        const subConfVisible = ref(false)
        function openSubConfVisible() {
            subConfVisible.value = true
        }
        function closeSubConfVisible() {
            subConfVisible.value = false
        }
        function openProfile() {
            profileVisble.value = true
        }
        function closeProfile() {
            profileVisble.value = false
        }
        async function getVersion() {
            return await getData(api.version)
        }
        async function getProxiesItems() {
            return await getData(api.proxies)
        }
        async function getProxiesMenu() {
            return await getData(api.proxies2)
        }
        async function getData(url) {
            return await $axios({
                url
            })
        }
        function getDelayAll() {
            console.log('click')
            delayCnt.value++
        }
        async function updateHandle() {
            const data = {name: 'subUrl', value: subUrl.value}
            let result = await window.ipcRenderer.invoke('updateSub', JSON.stringify(data))
            if(result != 200) {
                subError.value = 'Error'
                setTimeout(() => {
                    subError.value = undefined
                }, 3000);
                throw Error('sub update Error')
            }
            closeSubConfVisible()
        }
        function pickCard(val) {
            dataIndex.value = val
        }
        onMounted(async () => {
            try{
                version.value = (await getVersion()).data
                proxiesItems.value = (await getProxiesItems()).data
                proxiesMenu.value = (await getProxiesMenu()).data
            } catch(err) {
                console.error(err)
            }
            
        })
        return {
            version,
            proxiesItems,
            proxiesMenu,
            dataIndex,
            pickCard,
            getDelayAll,
            delayCnt,
            subConfVisible,
            openSubConfVisible,
            closeSubConfVisible,
            confText,
            subUrl,
            updateHandle,
            subError,
            profileVisble,
            openProfile,
            closeProfile
        }
    }
}
</script>

<style>
.proxy-container{
    width: 45rem;
    overflow-y: auto;
}
.home{
    
}

.proxy-container::-webkit-scrollbar{
    width: 0.6rem;
}
.proxy-container::-webkit-scrollbar-track{
    
}
.proxy-container::-webkit-scrollbar-thumb{
    background: rgba(75, 85, 99, 1);
    border-width: 0;
    border-radius:0.3rem;
}
</style>