import Vue from 'vue'
import * as types from '../mutation-types'
import RsqlMixin from '../../mixins/RsqlMixin'

const state = {
  entities: null
}

// getters
const getters = {
  entities: state => state.entities
}

// actions
const actions = {
  getEntities ({ commit }, { entityTypeId, query }) {
    let url = '/api/v2/' + entityTypeId + '?num=0&molgenis-token=admin' // FIXME remove num=0
    if (query) {
      url += '&q=' + RsqlMixin.methods.convertQueryToRsql(query)
    }
    return Vue.http.get(url).then(response => {
      const entities = response.body
      commit(types.SET_ENTITIES, {entities})
    }, response => {
      throw new Error(response) // TODO
    })
  }
}

// mutations
const mutations = {
  [types.SET_ENTITIES] (state, {entities}) {
    state.entities = entities
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
