import Vue from 'vue'
import Router from 'vue-router'
import Explorer from 'components/explorer/MgExplorer'
import Navigator from 'components/navigator/MgNavigator'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/navigator'},
    {path: '/navigator/:packageId?', name: 'navigator', component: Navigator}, /* TODO props: true */
    {path: '/explorer/:entityTypeId?', name: 'explorer', component: Explorer, props: (route) => ({ search: route.query.search, filter: route.query.filter })}
  ]
})
