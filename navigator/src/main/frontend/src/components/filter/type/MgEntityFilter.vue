<template>
  <select v-if="options" class="form-control" multiple @change="onChange($event.target.selectedOptions)">
    <option v-for="option in options" :key="option.value" :value="option.value" :selected="option.selected">{{ option.label }}</option>
  </select>
</template>

<script>
  import {props} from '../FilterConstants.js'

  export default {
    name: 'mg-entity-filter',
    props: props,
    data () {
      return {
        entities: null
      }
    },
    computed: {
      options: function () {
        const values = this.toValues(this.query)
        return this.entities ? this.entities.items.map(item => ({
          value: item[this.entities.meta.idAttribute],
          label: item[this.entities.meta.labelAttribute],
          selected: values.indexOf(item[this.entities.meta.idAttribute]) !== -1
        })) : null
      },
      multiple: function () {
        return this.settings.multiple
      }
    },
    methods: {
      fetchEntityCollection: function (entityCollectionHref) {
        return this.$http.get(entityCollectionHref + '?molgenis-token=admin').then(response => {
          this.entities = response.body
        }, response => {
          throw new Error(response)
        })
      },
      onChange: function (selectedOptions) {
        const values = [].slice.call(selectedOptions).map(option => option.value)
        this.$emit('filterChange', {id: this.id, query: this.toQuery(values)})
      },
      toQuery: function (values) {
        let query
        if (values.length === 0) {
          query = null
        } else if (values.length === 1) {
          query = {id: this.id, type: 'eq', value: values[0]}
        } else {
          query = {id: this.id, type: 'or', value: values.map(value => ({id: this.id, type: 'eq', value: value}))}
        }
        return query
      },
      toValues: function (query) {
        let values
        if (query === null) {
          values = []
        } else if (query.type === 'eq') {
          values = [query.value]
        } else if (query.type === 'or') {
          values = query.value.map(query => query.value)
        }
        return values
      }
    },
    created () {
      this.fetchEntityCollection(this.settings.entityCollectionHref)
    }
  }
</script>
