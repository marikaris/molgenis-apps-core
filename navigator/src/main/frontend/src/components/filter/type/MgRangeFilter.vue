<template>
  <div>
    <div class="form-group row">
      <label class="col-2 col-form-label">From</label>
      <div class="col-10">
        <mg-input :type="type" :value="from" @valueChange="onMinValueChange"></mg-input>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-2 col-form-label">To</label>
      <div class="col-10">
        <mg-input :type="type" :value="to" @valueChange="onMaxValueChange"></mg-input>
      </div>
    </div>
  </div>
</template>

<script>
  import {props} from '../FilterConstants.js'
  import MgInput from '../../form/MgInput.vue'

  export default {
    name: 'mg-range-filter',
    components: {MgInput},
    props: props,
    computed: {
      type: function () {
        return this.settings.type === 'date' ? (this.settings.time ? 'datetime-local' : 'date') : this.settings.type
      },
      from: function () {
        return this.query !== null ? this.query.from : null
      },
      to: function () {
        return this.query !== null ? this.query.to : null
      }
    },
    methods: {
      onMinValueChange: function (value) {
        let query = {type: 'rng'}
        if (value) {
          query.from = value
        }
        if (this.to) {
          query.to = this.to
        }
        this.onQueryChange(query)
      },
      onMaxValueChange: function (value) {
        let query = {type: 'rng'}
        if (this.from) {
          query.from = this.from
        }
        if (value) {
          query.to = value
        }
        this.onQueryChange(query)
      },
      onQueryChange: function (query) {
        this.$emit('filterChange', {id: this.id, query: query})
      }
    }
  }
</script>

<style scoped>
  .form-group {
    margin-bottom: 0.5rem;
  }
</style>
