<template>
  <div class="form-check">
    <label class="form-check-label">
      <input type="checkbox" class="form-check-input" :value="value" :checked="checked" @click="onToggle($event.target.checked)">
      {{ label }}
    </label>
    <small v-if="description" class="text-muted">
      ({{ description }})
    </small>
  </div>
</template>

<script>
  export default {
    name: 'checkbox',
    props: {
      value: {
        type: [String, Number, Boolean],
        required: true
      },
      label: {
        type: String,
        required: true
      },
      description: {
        type: [String, Number] // TODO string only
      },
      checked: {
        type: Boolean,
        'default': false
      }
    },
    methods: {
      onToggle: function (checked) {
        this.$emit('toggle', {value: this.value, checked: checked})
      }
    }
  }
</script>

<style scoped>
  .form-check {
    margin-bottom: 0rem;
  }
</style>
