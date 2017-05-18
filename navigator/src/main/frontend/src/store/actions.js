import Vue from 'vue'
import VueResource from 'vue-resource'
import {SET_PACKAGE, SET_TOKEN} from './mutations'

export const GET_PACKAGE = 'GET_PACKAGE'
export const LOGIN = 'LOGIN'

Vue.use(VueResource)

// Server URL can be found in webpack.config.js ->  devServer: { proxy: [] }
// Run MOLGENIS docker on 8081 for great success
export default {
  [GET_PACKAGE] ({commit, state}) {
    // MOLGENIS package are not part of a root package, so lets fake one:
    const baseChild = {
      '_href': '/api/v2/sys_md_Package/base',
      'fullName': 'base',
      'label': 'Default'
    }
    const sysChild = {
      '_h ref': '/api/v2/sys_md_Package/sys',
      'fullName': 'sys',
      'label': 'System'
    }
    const fakeRootPackage = {
      '_href': '/api/v2/sys_md_Package/root',
      'fullName': 'root',
      'name': 'root',
      'label': 'Root',
      'description': 'Root package',
      'children': [baseChild, sysChild],
      entityTypes: []
    }

    if (state.route.query.packageId && state.route.query.packageId !== 'root') {
      // MOLGENIS fetch can not be expressed recursively, so lets copy-paste up unto a certain depth
      const uri = '/api/v2/sys_md_Package/' + state.route.query.packageId + '?attrs=*,parent(fullName,label,description,parent(fullName,label,description,parent(fullName,label,description,parent))),children(fullName,label,description),entityTypes(fullName,label,description)'

      const sortDirection = state.route.query.sortDirection
      Vue.http.headers.common['x-molgenis-token'] = state.token
      Vue.http.get(uri).then(
        (response) => {
          if (sortDirection) {
            // MOLGENIS REST API does not support sorting on mref attributes, perform sorting here
            response.body.children.sort(function (a, b) {
              return state.route.query.sortDirection === 'ascending' ? a.label > b.label : a.label < b.label
            })
            response.body.entityTypes.sort(function (a, b) {
              return state.route.query.sortDirection === 'ascending' ? a.label > b.label : a.label < b.label
            })
          }

          // // MOLGENIS package are not part of a root package, so lets inject fake root package
          let item = response.body
          while (item.parent) {
            item = item.parent
          }
          item.parent = fakeRootPackage

          commit(SET_PACKAGE, response.body)
        }
      )
    } else {
      if (state.route.query.sortDirection && state.route.query.sortDirection === 'descending') {
        fakeRootPackage.children = fakeRootPackage.children.reverse()
      }
      commit(SET_PACKAGE, fakeRootPackage)
    }
  },
  [LOGIN] ({commit, dispatch}) {
    // Hack login credentials for now
    const login = {
      'username': 'admin',
      'password': 'admin'
    }
    Vue.http.post('/api/v1/login', login).then((response) => {
      commit(SET_TOKEN, response.body.token)
      dispatch(GET_PACKAGE)
    })
  }
}
