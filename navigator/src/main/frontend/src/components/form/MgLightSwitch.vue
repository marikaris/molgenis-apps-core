<template>
  <div class="btn-group form-group">
    <button type="button" :class="on ? 'btn btn-success active' : 'btn btn-secondary active'" @click="onToggle('on')">
      <span :class="off ? 'invisible' : null">Yes</span>
    </button>
    <button type="button" :class="off ? 'btn btn-danger active' : 'btn btn-secondary active'" @click="onToggle('off')">
      <span :class="on ? 'invisible' : null">No</span>
    </button>
  </div>
  <!--
  <div class="btn-group" data-toggle="buttons">
    <label :class="">
      <input type="radio" name="_uid" :checked="on" @input="onToggle('on')">
    </label>
    <label :class="off ? 'btn btn-success active' : 'btn btn-secondary active'">
      <input type="radio" name="_uid" :checked="off" @input="onToggle('off')"><span :class=" on ? 'invisible' :
      null">No</span>
    </label>
  </div>
  -->
</template>

<script>
  export default {
    name: 'mg-light-switch',
    props: {
      value: {
        type: [String],
        required: true,
        validator: function (value) {
          return value === 'on' || value === 'off'
        }
      }
    },
    computed: {
      on: function () {
        return this.value === 'on'
      },
      off: function () {
        return this.value === 'off'
      }
    },
    methods: {
      onToggle: function (value) {
        if (value !== this.value) {
          this.$emit('toggle', {value: value})
        }
      }
    }
  }
</script>

<style scoped>
  button {
    padding: 0rem 0.5rem;
  }
</style>
