<template>
  <mg-option-filter :id="id" :settings="optionFilterSettings" :query="query"
                    @filterChange="$emit('filterChange', $event)"></mg-option-filter>
</template>

<script>
  import {props} from '../FilterConstants.js'
  import MgOptionFilter from './MgOptionFilter.vue'

  export default {
    name: 'mg-boolean-filter',
    components: {MgOptionFilter},
    props: props,
    computed: {
      optionFilterSettings: function () {
        return Object.assign({}, this.settings, {options: [{id: 'true', label: 'True'}, {id: 'false', label: 'False'}]})
      }
    }
  }
</script>
