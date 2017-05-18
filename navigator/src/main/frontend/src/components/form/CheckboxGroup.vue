<template>
  <div>
    <checkbox v-for="option in options" :key="option.value"
              :value="option.value" :label="option.label" :description="option.description" :checked="option.checked"
              @toggle="onToggle"></checkbox>
  </div>
</template>

<script>
  import Checkbox from '../form/Checkbox.vue'

  export default {
    name: 'checkbox-group',
    components: {Checkbox},
    props: {
      options: {
        type: Array,
        required: true
      }
    },
    methods: {
      onToggle: function (e) {
        this.$emit('selectionChange', {
          options: this.options.map(function (option) {
            return e.value === option.value ? Object.assign({}, option, {checked: e.checked}) : option
          })
        })
      }
    }
  }
</script>
