import Vue from 'vue'
import * as types from '../mutation-types'
import RsqlMixin from '../../mixins/RsqlMixin'

const state = {
  entityType: null,
  refEntityTypes: null,
  aggregates: null
}

// getters
const getters = {
  entityType: state => state.entityType,
  refEntityTypes: state => state.refEntityTypes,
  aggregates: state => state.aggregates
}

// actions
const actions = {
  getEntityType ({commit}, entityTypeId) {
    return Vue.http.get('/api/v1/' + entityTypeId + '/meta?expand=attributes&molgenis-token=admin').then(response => {
      const entityType = response.body
      commit(types.SET_ENTITY_TYPE, {entityType})
    }, response => {
      throw new Error(response)
    })
  },
  getRefEntityTypes ({commit}, {entityType}) {
    const attributes = entityType.attributes
    const hrefCollections = Object.keys(attributes).map(attributeId => attributes[attributeId]).filter(attribute => attribute.fieldType === 'CATEGORICAL' || attribute.fieldType === 'CATEGORICAL_MREF').map(categoricalAttribute => categoricalAttribute.refEntity.hrefCollection).reduce(function (acc, cur) {
      acc[cur] = null
      return acc
    }, {})
    if (Object.keys(hrefCollections).length > 0) {
      const promises = Object.keys(hrefCollections).map(url => Vue.http.get(url + '?molgenis-token=admin'))
      Promise.all(promises).then(values => {
        let refEntityTypes = {}
        values.forEach(value => (refEntityTypes[value.body.href] = value.body))
        commit(types.SET_REF_ENTITY_TYPES, {refEntityTypes: refEntityTypes})
      })
    } else {
      commit(types.SET_REF_ENTITY_TYPES, {refEntityTypes: {}})
    }
  },
  getAggregates ({commit}, {entityType, query}) {
    let attrs = []
    const attributes = entityType.attributes
    Object.keys(attributes).forEach(function (id) {
      const attribute = attributes[id]
      if (!attribute.hidden && (attribute.fieldType === 'BOOL' || attribute.fieldType === 'ENUM' || ((attribute.fieldType === 'CATEGORICAL' || attribute.fieldType === 'CATEGORICAL_MREF') && attribute.nillable === false))) {
        attrs.push(attribute.name)
      }
    })

    let promises = attrs.map(attr => {
      let url = '/api/v2/' + entityType.name + '?aggs=x==' + attr + '&molgenis-token=admin'
      if (query) {
        url += '&q=' + RsqlMixin.methods.convertQueryToRsql(query)
      }
      return Vue.http.get(url)
    })
    Promise.all(promises).then(values => {
      let aggregates = {}
      for (let value of values) {
        let attr = value.body.xAttr.name
        let labels = value.body.aggs.xLabels
        if (value.body.xAttr.fieldType === 'BOOL') {
          labels = labels.map(label => label === 'T' ? true : (label === 'F' ? false : null))
        }

        let buckets = {}
        for (let i = 0; i < labels.length; ++i) {
          let label
          if (value.body.xAttr.fieldType === 'CATEGORICAL' || value.body.xAttr.fieldType === 'CATEGORICAL_MREF') {
            label = labels[i].value
          } else {
            label = labels[i]
          }

          let val = value.body.aggs.matrix[i][0]
          buckets[label] = val
        }

        aggregates[attr] = buckets
      }
      commit(types.SET_AGGREGATES, {aggregates})
    }).catch(reason => {
      throw new Error(reason)
    })
  }
}

// mutations
const mutations = {
  [types.SET_ENTITY_TYPE] (state, {entityType}) {
    state.entityType = entityType
  },
  [types.SET_REF_ENTITY_TYPES] (state, {refEntityTypes}) {
    state.refEntityTypes = refEntityTypes
  },
  [types.SET_AGGREGATES] (state, {aggregates}) {
    state.aggregates = aggregates
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
