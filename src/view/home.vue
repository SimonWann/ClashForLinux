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
            @click="updateProfile"
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
        provider-contaienr
        h-screen
        w-full
        ">
            <div 
            class="
            proxy-group-container
            w-full
            flex
            flex-col
            overflow-hidden
            cursor-pointer
            transition-all
            duration-500
            "
            :style="{
                height: val.isShow?'auto':'4rem',
                }"
            v-for="(val, key1) in renderProviders"
            :key="key1"
            >
                <h1
                class="
                text-gray-800
                text-lg
                mx-3
                px-4
                py-2
                my-4
                font-bold	
                border
                border-gray-900
                rounded
                bg-gray-300
                hover:bg-gray-200
                transition-all
                "
                
                @click="toggleList(key1)"
                >{{val.name}}</h1>
                <section
                class="
                width-full
                grid
                grid-cols-2
                items-center
                place-items-center
                "
                >
                    <proxy-node-card
                    class="
                    "
                    :item="val2"
                    :key="key2"
                    @click="pickCard(key1, key2, val2)"
                    :isActive="dataIndex === key2 && dataProvider === key1"
                    :delayCnt="delayCnt"
                    v-for="(val2,key2) in val.proxies"
                    ></proxy-node-card>
                </section>
            </div>
        </main>
        <profile
        :isVisible="profileVisble"
        @cancel="closeProfile"
        ></profile>
    </div>
</template>

<script>
import { ref,onMounted,inject, computed } from 'vue'
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
        const dataProvider = ref()
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
        async function updateProfile() {
            await window.ipcRenderer.invoke('updateProfile')
        }
        function openProfile() {
            profileVisble.value = true
        }
        function closeProfile() {
            profileVisble.value = false
        }
        function toggleList(key1) {
            if(!proxiesMenu.value.providers[key1].isShow) {
                proxiesMenu.value.providers[key1].isShow = false
            }
            proxiesMenu.value.providers[key1].isShow = !proxiesMenu.value.providers[key1].isShow
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
        const renderProviders = computed(() => {
            return proxiesMenu.value.providers ?? {} 
        })
        async function updateHandle() {
            // update subscripe config method
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
        function pickCard(key, val, val2) {
            dataIndex.value = val
            dataProvider.value = key
            $axios({
                url: `/proxies/${encodeURIComponent(key)}`,
                method: 'put',
                data: {
                    name: val2.name
                }
            })
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
            dataProvider,
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
            closeProfile,
            renderProviders,
            toggleList,
            updateProfile
        }
    }
}
</script>

<style>
.provider-contaienr{
    overflow-y: auto;
}
.home{
    
}

.provider-contaienr::-webkit-scrollbar{
    width: 0.6rem;
}
.provider-contaienr::-webkit-scrollbar-track{
    
}
.provider-contaienr::-webkit-scrollbar-thumb{
    background: rgba(75, 85, 99, 1);
    border-width: 0;
    border-radius:0.3rem;
}
</style>