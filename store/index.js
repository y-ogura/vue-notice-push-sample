import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  header: {
    headers: {
      'Content-Type': 'application/json'
    }
  },
  account: {}
}

const mutations = {
  async setAccount (state, value) {
    state.account = value
    window.localStorage.setItem('account', JSON.stringify(value))
  }
}

const actions = {}

const createStore = () => new Vuex.Store({
  state,
  mutations,
  actions
})

export default createStore