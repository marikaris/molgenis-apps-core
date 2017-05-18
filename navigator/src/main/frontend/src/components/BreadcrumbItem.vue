<template>
  <li v-if="index === 0">
    <span v-if="!active" class="glyphicon glyphicon-home" aria-hidden="true" @click="handleSelectItem"></span>
    <span v-else class="glyphicon glyphicon-home" aria-hidden="true"></span>&nbsp;
  </li>
  <li v-else>
    <a v-if="!active" @click="handleSelectItem">{{label}}</a>
    <span v-else>{{label}}</span>
  </li>
</template>

<script>
  export default {
    name: 'breadcrumb-item',
    props: {
      index: {
        type: Number,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      active: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      handleSelectItem: function () {
        this.$emit('selectItem', this.id)
      }
    }
  }
</script>

<style scoped>
  .glyphicon:hover, a:hover {
    cursor: pointer
  }
</style>
