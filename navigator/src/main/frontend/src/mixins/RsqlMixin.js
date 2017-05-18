export default {
  methods: {
    convertRsqlToQuery: function (entityType, rsql) {
      if (rsql == null) {
        return rsql
      }

      // TODO typed values
      // TODO replace with real RSQL parser based on EBNF grammer
      let queries = []
      let parts = rsql.split(';')
      for (let part of parts) {
        // TODO rsql null could result in value null or string value null. how to deal with this?
        if (part.indexOf('=q=') !== -1) {
          const tokens = part.split('=q=')
          queries.push({type: 'search', value: tokens[1]})
        } else if (part.indexOf('==') !== -1) {
          const tokens = part.split('==')
          let value = tokens[1]
          if (value === 'null') {
            value = null
          }
          queries.push({id: tokens[0], type: 'eq', value: value})
        } else if (part.indexOf('=ge=') !== -1) {
          const tokens = part.split('=ge=')
          const attrId = tokens[0]
          let value = tokens[1]
          if (entityType.attributes[attrId].fieldType === 'INT' || entityType.attributes[attrId].fieldType === 'DECIMAL' || entityType.attributes[attrId].fieldType === 'BOOL') {
            value = JSON.parse(value)
          }
          queries.push({id: attrId, type: 'rng', from: value})
        } else if (part.indexOf('=le=') !== -1) {
          const tokens = part.split('=le=')
          queries.push({id: tokens[0], type: 'rng', to: tokens[1]})
        } else if (part.indexOf('=rng=') !== -1) {
          const tokens = part.split('=rng=')
          const from = tokens[1].split(',')[0].substring(1)
          let toToken = tokens[1].split(',')[1]
          const to = toToken.substring(0, toToken.length - 1)
          queries.push({id: tokens[0], type: 'rng', from: from, to: to})
        } else {
          throw new Error('unsupported query ' + part)
        }
      }
      return queries.length === 1 ? queries[0] : {type: 'and', value: queries}
    },
    convertQueryToRsql: function (query, invert = false) {
      if (query == null) {
        return query
      }

      switch (query.type) {
        case 'search':
          return '*=q=' + query.value
        case 'eq':
          if (invert) {
            return query.id + '!=' + query.value
          } else {
            return query.id + '==' + query.value
          }
        case 'ge':
          if (invert) {
            return query.id + '=lt=' + query.from
          } else {
            return query.id + '=ge=' + query.from
          }
        case 'le':
          if (invert) {
            return query.id + '=gt=' + query.to
          } else {
            return query.id + '=le=' + query.to
          }
        case 'rng':
          if (query.from && query.to === undefined) {
            return query.id + '=ge=' + query.from
          } else if (query.to && query.from === undefined) {
            return query.id + '=le=' + query.to
          } else if (query.from && query.to) {
            return query.id + '=rng=(' + query.from + ',' + query.to + ')'
          } else {
            return null
          }
        case 'not':
          return this.convertQueryToRsql(query.value, !invert)
        case 'and':
          return query.value.map(value => this.convertQueryToRsql(value)).join(';')
        case 'or':
          return query.value.map(value => this.convertQueryToRsql(value)).join(',')
        default:
          throw new Error('unknown operator ' + query.type)
      }
    }
  }
}
