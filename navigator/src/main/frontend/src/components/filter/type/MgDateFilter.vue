<template>
  <mg-range-filter :id="id" :settings="rangeFilterSettings" :query="query"
                   @filterChange="$emit('filterChange', $event)"></mg-range-filter>
</template>

<script>
  import {props} from '../FilterConstants.js'
  import MgRangeFilter from './MgRangeFilter.vue'

  export default {
    name: 'mg-date-filter',
    components: {MgRangeFilter},
    props: props,
    computed: {
      rangeFilterSettings: function () {
        return Object.assign({}, this.settings, {type: 'date'})
      }
    }
  }
</script>
