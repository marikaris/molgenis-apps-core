<template>
  <mg-boolean-filter v-if="filter.type === 'bool'"
                     :id="filter.id" :settings="filter.settings" :query="filter.query"
                     @filterChange="onFilterChange"></mg-boolean-filter>
  <mg-date-filter v-else-if="filter.type === 'date'"
                  :id="filter.id" :settings="filter.settings" :query="filter.query"
                  @filterChange="onFilterChange"></mg-date-filter>
  <mg-entity-filter v-else-if="filter.type === 'entity'"
                  :id="filter.id" :settings="filter.settings" :query="filter.query"
                  @filterChange="onFilterChange"></mg-entity-filter>
  <mg-number-filter v-else-if="filter.type === 'number'"
                    :id="filter.id" :settings="filter.settings" :query="filter.query"
                    @filterChange="onFilterChange"></mg-number-filter>
  <mg-option-filter v-else-if="filter.type === 'option'"
                    :id="filter.id"
                    :settings="filter.settings"
                    :query="filter.query"
                    @filterChange="onFilterChange"></mg-option-filter>
  <mg-text-filter v-else-if="filter.type === 'text'"
                    :id="filter.id"
                    :settings="filter.settings"
                    :query="filter.query"
                    @filterChange="onFilterChange"></mg-text-filter>
</template>

<script>
  import MgBooleanFilter from './type/MgBooleanFilter.vue'
  import MgDateFilter from './type/MgDateFilter.vue'
  import MgEntityFilter from './type/MgEntityFilter.vue'
  import MgNumberFilter from './type/MgNumberFilter.vue'
  import MgOptionFilter from './type/MgOptionFilter.vue'
  import MgTextFilter from './type/MgTextFilter.vue'

  export default {
    name: 'mg-generic-filter',
    components: {MgBooleanFilter, MgDateFilter, MgEntityFilter, MgNumberFilter, MgOptionFilter, MgTextFilter},
    props: {
      filter: {
        type: Object,
        required: true
      }
    },
    methods: {
      onFilterChange: function (e) {
        this.$emit('filterChange', e)
      }
    }
  }
</script>
