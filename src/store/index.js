import Vue from 'vue'
import Vuex from 'vuex'

import active from './modules/active'
import screen from './modules/screen'
import mobile from './modules/mobile'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    active,
    screen,
    mobile
  }
})
