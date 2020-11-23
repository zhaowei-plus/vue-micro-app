export default {
  namespaced: true,
  state: {
    active: undefined
  },
  mutations: {
    setActive (state, payload) {
      state.active = payload
    }
  }
}
