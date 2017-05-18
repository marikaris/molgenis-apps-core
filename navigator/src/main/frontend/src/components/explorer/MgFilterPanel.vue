<template>
  <div class="filter-container">
    <h6 @click="expandedOverwrite = expandedOverwrite === null ? !expanded : !expandedOverwrite">
      {{ filter.label }}<i :class="'fa fa-chevron-' + (expandFilter() ? 'up' : 'down') + ' pull-right'"></i>
    </h6>
    <hr/>
    <mg-filter v-if="expandFilter()" class="filter" :filter="filter" :advanced="advanced"
               @filterChange="$emit('filterChange', $event)"></mg-filter>
  </div>
</template>

<script>
  import MgFilter from '../filter/MgFilter.vue'

  export default {
    name: 'mg-filter-container',
    components: {MgFilter},
    props: {
      filter: {
        type: Object,
        required: true
      },
      advanced: {
        type: Boolean,
        'default': false
      },
      expanded: {
        type: Boolean,
        'default': true
      }
    },
    data: function () {
      return {
        expandedOverwrite: null
      }
    },
    methods: {
      expandFilter: function () {
        return this.expandedOverwrite === null ? this.expanded : this.expandedOverwrite
      }
    }
  }
</script>

<style scoped>
  h6 {
    cursor: pointer
  }

  hr {
    margin-top: 0rem;
    margin-bottom: 0.5rem;
    box-sizing: border-box;
  }

  .filter-container {
    margin-bottom: 0.75rem;
  }

  .filter {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
</style>
