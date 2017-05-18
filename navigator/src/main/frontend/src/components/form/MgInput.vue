<template>
  <input class="form-control" :type="type" :value="value" @input="onValueChange($event.target)">
</template>

<script>
  export default {
    name: 'mg-input',
    props: {
      type: {
        type: String,
        required: true
      },
      value: {
        type: [String, Number]
      }
    },
    methods: {
      onValueChange: function (target) {
        const value = this.type === 'number' ? target.valueAsNumber : target.value
        this.$emit('valueChange', value)
      }
    }
  }
</script>
