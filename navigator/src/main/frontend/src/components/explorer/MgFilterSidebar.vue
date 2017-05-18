<template>
  <div class="filter-sidebar">
    <div class="row settings">
      <div class="col-12">
        <i @click="advanced = !advanced" :class="'fa fa-' + (advanced ? 'compress' : 'expand') + ' pull-right'"></i>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <mg-filter-panel v-for="(filter, index) in filters" :key="filter.id" :filter="filter" :advanced="advanced" :expanded="index < 7"
                         @filterChange="onFilterChange"></mg-filter-panel>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import MgFilterPanel from './MgFilterPanel.vue'

  export default {
    name: 'mg-filter-sidebar',
    components: {MgFilterPanel},
    props: {
      entityType: {
        type: Object,
        required: true
      },
      query: {
        type: Object,
        'default': null
      }
    },
    computed: {
      ...mapGetters({
        aggregates: 'aggregates',
        refEntityTypes: 'refEntityTypes'
      }),
      filters: function () {
        let queries = {}
        if (this.query != null) {
          if (this.query.type === 'and') {
            queries = this.query.value.reduce(function (acc, cur) {
              acc[cur.id] = cur
              return acc
            }, {})
          } else {
            queries[this.query.id] = this.query
          }
        }
        // FIXME include compound attribute parts
        const aggregates = this.aggregates || {}
        return Object.keys(this.entityType.attributes)
          .map(attributeId => this.entityType.attributes[attributeId])
          .filter(this.includeFilter)
          .map(attribute => this.createFilter(attribute, queries[attribute.name], aggregates[attribute.name]))
      }
    },
    data: function () {
      return {
        advanced: false
      }
    },
    methods: {
      onFilterChange: function (newFilter) {
        const newFilters = this.filters.map(filter => filter.id === newFilter.id ? Object.assign({}, filter, {query: newFilter.query}) : filter)

        let query
        const queries = newFilters.filter(filter => filter.query != null).map(filter => Object.assign({id: filter.id}, filter.query))
        if (queries.length === 0) {
          query = null
        } else if (queries.length === 1) {
          query = queries[0]
        } else {
          query = {
            type: 'and',
            value: newFilters.filter(filter => filter.query != null).map(filter => Object.assign({id: filter.id}, filter.query))
          }
        }
        this.$emit('queryChange', {query: query})
      },
      includeFilter: function (attribute) {
        if (attribute.hidden) {
          return false
        }
        switch (attribute.fieldType) {
          case 'ONE_TO_MANY':
          case 'MREF':
          case 'COMPOUND':
          case 'STRING':
          case 'TEXT':
          case 'SCRIPT':
          case 'EMAIL':
          case 'HYPERLINK':
          case 'HTML':
            return false
          default:
            return true
        }
      },
      createFilter: function (attribute, query, aggregates) {
        // base filter
        let filter = {
          id: attribute.name,
          label: attribute.label,
          settings: {
            descriptions: aggregates,
            nullFilter: attribute.nillable
          },
          query: query
        }

        // update filter based on attribute type
        switch (attribute.fieldType) {
          case 'DATE':
            filter.type = 'date'
            break
          case 'DATE_TIME':
            filter.type = 'date'
            filter.settings.time = true
            break
          case 'CATEGORICAL':
          case 'CATEGORICAL_MREF':
            filter.type = 'option'
            if (this.refEntityTypes) {
              const refEntities = this.refEntityTypes[attribute.refEntity.hrefCollection]
              filter.settings.options = refEntities.items.map(refEntity => ({
                id: refEntity[refEntities.meta.idAttribute],
                label: refEntity[refEntities.meta.labelAttribute]
              }))
            } else {
              filter.settings.options = []
            }
            break
          case 'INT':
          case 'LONG':
          case 'DECIMAL':
            filter.type = 'number'
            break
          case 'ENUM':
            filter.type = 'option'
            filter.settings.options = attribute.enumOptions.map(option => ({
              id: option,
              label: option
            }))
            break
          case 'BOOL':
            filter.type = 'bool'
            break
          case 'XREF':
            filter.type = 'entity'
            filter.settings.entityCollectionHref = attribute.refEntity.hrefCollection
            break
        }
        return filter
      }
    },
    created () {
      this.$store.dispatch('getAggregates', {entityType: this.entityType, query: this.query})
      this.$store.dispatch('getRefEntityTypes', {entityType: this.entityType})
    },
    watch: {
      entityType: function (newEntityType) {
        this.$store.dispatch('getAggregates', {entityType: newEntityType, query: this.query})
        this.$store.dispatch('getRefEntityTypes', {entityType: newEntityType})
      },
      query: function (newQuery) {
        this.$store.dispatch('getAggregates', {entityType: this.entityType, query: newQuery})
      }
    }
  }
</script>

<style scoped>
  .filter-sidebar {
    background-color: #f5f5f5;
    padding: 0.5rem;
  }

  .settings {
    margin-bottom: 1rem;
  }

  i {
    cursor: pointer;
  }
</style>
