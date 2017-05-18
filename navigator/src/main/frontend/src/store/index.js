import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import navigator from './modules/navigator'
import explorer from './modules/explorer'
import report from './modules/report'

Vue.use(Vuex)
Vue.use(VueResource)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    navigator,
    explorer,
    report
  },
  strict: debug
})
