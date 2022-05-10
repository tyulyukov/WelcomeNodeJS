<template>
  <h2>My first variable in store: {{myFirstVariable}}</h2>
  <input v-model="myVModel"/>
  <button @click='updateVariable'>Get from server</button>
</template>

<script>
import {useStore} from 'vuex'
import {computed, defineComponent} from "vue";

export default defineComponent( {
  name: "MyFirstVariable",
  setup() {
    const store = useStore()

    return {
      myFirstVariable: computed(() => store.getters.getMyFirstVariable),
      updateVariable: function () {
        store.dispatch('apiGetMyFirstVariable')
      },
      myVModel: computed({
        get () {
          return store.getters.getMyFirstVariable.toString()
        },
        set (data) {
          store.commit('setMyFirstVariable', data)
        }
      })
    }
  }
})
</script>

<style scoped>

</style>