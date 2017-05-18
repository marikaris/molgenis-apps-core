import Vue from 'vue'
import * as types from '../mutation-types'

const state = {
  package_: null,
  entityTypes: null
}

// getters
const getters = {
  package_: state => state.package_,
  entityTypes: state => state.entityTypes
}

// actions
const actions = {
  getPackage_ ({commit}, packageId) {
    // MOLGENIS package are not part of a root package, so lets fake one:
    const baseChild = {
      '_href': '/api/v2/sys_md_Package/base',
      'id': 'base',
      'label': 'Default'
    }
    const sysChild = {
      '_href': '/api/v2/sys_md_Package/sys',
      'id': 'sys',
      'label': 'System'
    }
    const fakeRootPackage = {
      '_href': '/api/v2/sys_md_Package/root',
      'id': 'root',
      'name': 'root',
      'label': 'Root',
      'description': 'Root package',
      'children': [baseChild, sysChild],
      entityTypes: []
    }

    const sortDirection = 'ascending' // FIXME state.route.query.sortDirection

    // MOLGENIS fetch can not be expressed recursively, so lets copy-paste up unto a certain depth
    if (packageId && packageId !== 'root') {
      const uri = '/api/v2/sys_md_Package/' + packageId + '?attrs=*,parent(id,label,description,parent(id,label,description,parent(id,label,description,parent))),children(id,label,description),entityTypes(id,label,description)&molgenis-token=admin'
      Vue.http.get(uri).then(
        (response) => {
          if (sortDirection) {
            // MOLGENIS REST API does not support sorting on mref attributes, perform sorting here
            response.body.children.sort(function (a, b) {
              return sortDirection === 'ascending' ? a.label > b.label : a.label < b.label
            })
            response.body.entityTypes.sort(function (a, b) {
              return sortDirection === 'ascending' ? a.label > b.label : a.label < b.label
            })
          }

          // // MOLGENIS package are not part of a root package, so lets inject fake root package
          let item = response.body
          while (item.parent) {
            item = item.parent
          }
          item.parent = fakeRootPackage

          commit(types.SET_PACKAGE, {package_: response.body})
        }
      )
    } else {
      if (sortDirection && sortDirection === 'descending') {
        fakeRootPackage.children = fakeRootPackage.children.reverse()
      }
      commit(types.SET_PACKAGE, {package_: fakeRootPackage})
    }
  },
  getEntityTypes ({commit}) {
    return Vue.http.get('/api/v2/sys_md_EntityType?attrs=~id,label,isAbstract&molgenis-token=admin').then(response => {
      const entityTypes = response.body.items.filter(entityType => !entityType.isAbstract).map(entityType => ({
        id: entityType.id,
        label: entityType.label
      })).sort((a, b) => a.label < b.label ? -1 : 1)
      commit(types.SET_ENTITY_TYPES, {entityTypes})
    }, response => {
      throw new Error(response) // TODO handle differently
    })
  }
}

// mutations
const mutations = {
  [types.SET_PACKAGE] (state, {package_}) {
    state.package_ = package_
  },
  [types.SET_ENTITY_TYPES] (state, {entityTypes}) {
    state.entityTypes = entityTypes
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
