<template>
  <mg-input type="search" :value="value" @valueChange="onValueChange"></mg-input>
</template>

<script>
  import {props} from '../FilterConstants.js'
  import MgInput from '../../form/MgInput.vue'

  export default {
    name: 'mg-text-filter',
    components: {MgInput},
    props: props,
    computed: {
      value: function () {
        return this.query !== null ? this.query.value : null
      }
    },
    methods: {
      onValueChange: function (value) {
        const query = value ? {type: 'eq', value: value} : null
        this.$emit('filterChange', {id: this.id, query: query})
      }
    }
  }
</script>
