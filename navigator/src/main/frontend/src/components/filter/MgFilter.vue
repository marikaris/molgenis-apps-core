<template>
  <div>
    <mg-light-switch v-if="advanced" :value="hasNotQuery(filter) ? 'off' : 'on'"
                     @toggle="onToggle"></mg-light-switch>
    <mg-null-filter v-if="isNullFilter"
                    :filter="derivedFilter"
                    @filterChange="onFilterChange"></mg-null-filter>
    <mg-generic-filter v-else
                       :filter="derivedFilter"
                       @filterChange="onFilterChange"></mg-generic-filter>
  </div>
</template>

<script>
  import MgLightSwitch from '../form/MgLightSwitch.vue'
  import MgNullFilter from './MgNullFilter.vue'
  import MgGenericFilter from './MgGenericFilter.vue'

  export default {
    name: 'mg-filter',
    components: {MgLightSwitch, MgNullFilter, MgGenericFilter},
    props: {
      filter: {
        type: Object,
        required: true
      },
      advanced: {
        type: [Boolean],
        required: true
      }
    },
    computed: {
      isNullFilter: function () {
        return this.filter.settings ? this.filter.settings.nullFilter === true : false
      },
      derivedFilter: function () {
        let derivedFilter = this.filter
        if (this.hasNotQuery(this.filter)) {
          derivedFilter = this.removeNotQuery(this.filter)
        }
        if (this.isNullFilter) {
          let newSettings = Object.assign({}, derivedFilter.settings)
          delete newSettings.nullFilter
          derivedFilter = Object.assign({}, derivedFilter, {settings: newSettings})
        }
        return derivedFilter
      }
    },
    methods: {
      onFilterChange: function (e) {
        let newFilter
        if (this.hasNotQuery(this.filter)) {
          newFilter = this.addNotQuery(e)
        } else {
          newFilter = e
        }
        this.$emit('filterChange', newFilter)
      },
      onToggle: function (e) {
        const newFilter = e.value === 'on' ? this.removeNotQuery(this.filter) : this.addNotQuery(this.filter)
        this.$emit('filterChange', newFilter)
      },
      addNotQuery: function (filter) {
        return Object.assign({}, this.filter, {query: {type: 'not', value: filter.query}})
      },
      removeNotQuery: function (filter) {
        if (filter.query == null) {
          return filter
        }
        return Object.assign({}, this.filter, {query: filter.query.value})
      },
      hasNotQuery: function (filter) {
        return filter.query != null && filter.query.type === 'not'
      }
    }
  }
</script>
