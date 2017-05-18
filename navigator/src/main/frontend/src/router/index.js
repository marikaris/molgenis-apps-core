import Vue from 'vue'
import Router from 'vue-router'
import Navigator from '../components/Navigator.vue'
import Explorer from '../components/Explorer.vue'
import Meta from '../components/Meta.vue'

Vue.use(Router)

const routes = [{path: '/navigator', name: 'navigator', component: Navigator}, {
  path: '/explorer/:entityTypeId?',
  name: 'explorer',
  component: Explorer
}, {
  path: '/meta/:entityTypeId?',
  name: 'meta',
  component: Meta
}]

// https://router.vuejs.org/en/essentials/getting-started.html
export default new Router({
  routes
})
