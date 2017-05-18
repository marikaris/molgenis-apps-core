<template>
  <div>
    <mg-generic-filter :filter="derivedFilter" @filterChange="onFilterChange"></mg-generic-filter>
    <checkbox value="null" label="No Value" :description="description" :checked="hasEqNullQuery(filter.query)"
              @toggle="onToggleNullFilter"></checkbox>
  </div>
</template>

<script>
  import MgGenericFilter from '../filter/MgGenericFilter.vue'
  import Checkbox from '../form/Checkbox.vue'

  export default {
    name: 'mg-null-filter',
    components: {MgGenericFilter, Checkbox},
    props: {
      filter: {
        type: Object,
        required: true
      }
    },
    computed: {
      derivedFilter: function () {
        if (this.hasEqNullQuery(this.filter.query)) {
          return Object.assign({}, this.filter, {query: this.removeEqNullQuery(this.filter.query)})
        } else {
          return this.filter
        }
      },
      description: function () {
        return this.filter.settings && this.filter.settings.descriptions ? this.filter.settings.descriptions[null] : null
      }
    },
    methods: {
      onFilterChange: function (e) {
        let newFilter
        if (this.hasEqNullQuery(this.filter.query)) {
          newFilter = Object.assign({}, e, {query: this.addEqNullQuery(e.query)})
        } else {
          newFilter = e
        }
        this.$emit('filterChange', newFilter)
      },
      onToggleNullFilter: function (e) {
        let newQuery = e.checked ? this.addEqNullQuery(this.filter.query) : this.removeEqNullQuery(this.filter.query)
        this.$emit('filterChange', {id: this.filter.id, query: newQuery})
      },
      /*
       before: null        after: eq(null)
       before: x           after: or(eq(null), x)
       before: or[x, y]    after: or(eq(null), x, y)
       */
      addEqNullQuery: function (query) {
        const nullQuery = {type: 'eq', value: null}
        if (query == null) {
          return nullQuery
        }

        switch (query.type) {
          case 'or':
            let newValue = query.value.slice()
            newValue.splice(0, 0, nullQuery)
            return {type: 'or', value: newValue}
          default:
            return {type: 'or', value: [nullQuery, query]}
        }
      },
      /*
       before: null               after: null
       before: eq(null)           after: null
       before: or[eq(null), x]    after: x
       before: or[eq(null), x, y] after: or[x, y]
       before: x                  after: x
       */
      removeEqNullQuery: function (query) {
        if (!this.hasEqNullQuery(query)) {
          return query
        }

        switch (query.type) {
          case 'eq':
            return null
          case 'or':
            let newValue = query.value.filter(query => !(query.type === 'eq' && query.value === null))
            if (newValue.length === 1) {
              return newValue[0]
            } else {
              return {type: query.type, value: newValue}
            }
          default:
            return query
        }
      },
      hasEqNullQuery: function (query) {
        let hasEqNullQuery
        if (query == null) {
          hasEqNullQuery = false
        } else {
          switch (query.type) {
            case 'eq':
              hasEqNullQuery = query.value === null
              break
            case 'or':
              hasEqNullQuery = query.value.some(query => query.type === 'eq' && query.value === null)
              break
            default:
              hasEqNullQuery = false
              break
          }
        }
        return hasEqNullQuery
      }
    }
  }
</script>
