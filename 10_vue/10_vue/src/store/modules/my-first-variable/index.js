export default {
  // namespaced: true,
  state: {
    myFirstVariable : 0
  },
  getters: {
    getMyFirstVariable (state) {
      return state.myFirstVariable
    }
  },
  mutations: {
    setMyFirstVariable (state, data) {
      state.myFirstVariable = data
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    apiGetMyFirstVariable ({state, commit, dispatch}) {
      // get from server
      commit('setMyFirstVariable', '000111010001001101010101')
    }
  },
}
