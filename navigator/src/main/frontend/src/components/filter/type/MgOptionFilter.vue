<template>
  <div>
    <checkbox-group :options="options" @selectionChange="onSelectionChange"></checkbox-group>
    <div v-if="truncate" class="more" @click="more = !more">
      <i :class="'fa fa-chevron-' + (more ? 'up' : 'down') + ' text-primary'"></i>
      <span class="text-primary">{{ more ? 'Less' : 'More' }}</span>
    </div>
  </div>
</template>

<script>
  import {props} from '../FilterConstants.js'
  import CheckboxGroup from '../../form/CheckboxGroup.vue'

  export default {
    name: 'mg-option-filter',
    components: {CheckboxGroup},
    props: props,
    data: function () {
      return {
        more: false
      }
    },
    computed: {
      values: function () {
        if (this.query == null) {
          return []
        }

        switch (this.query.type) {
          case 'eq':
            return [this.query.value]
          case 'or':
            return this.query.value.map(query => query.value)
          default:
            throw new Error('unexpected query type ' + this.query.type)
        }
      },
      options: function () {
        let options = this.more ? this.settings.options : this.settings.options.slice(0, 5)
        return options.map(option => ({
          value: option.id,
          label: option.label,
          description: this.getDescription(option.id),
          checked: this.values.indexOf(option.id) !== -1
        }))
      },
      truncate: function () {
        return this.settings.options.length > 5
      }
    },
    methods: {
      onSelectionChange: function (e) {
        let values = this.values.slice()
        for (let option of e.options) {
          const index = values.indexOf(option.value)
          if (option.checked) {
            if (index === -1) {
              values.push(option.value)
            }
          } else {
            if (index !== -1) {
              values.splice(values.indexOf(option.value), 1)
            }
          }
        }

        let query
        if (values.length === 0) {
          query = null
        } else if (values.length === 1) {
          query = {type: 'eq', value: values[0]}
        } else {
          query = {type: 'or', value: values.map(value => ({type: 'eq', value: value}))}
        }
        this.$emit('filterChange', {id: this.id, query: query})
      },
      getDescription: function (value) {
        return this.settings.descriptions ? this.settings.descriptions[value] : undefined
      }
    }
  }
</script>

<style scoped>
  i.fa {
    margin-right: 0.1rem
  }

  div.more {
    cursor: pointer
  }
</style>
