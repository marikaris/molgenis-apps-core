<template>
  <li v-if="index === 0" :class="(active ? 'active ' : '') + 'breadcrumb-item'">
    <span @click="handleSelectItem">Home</span>
  </li>
  <li v-else class="breadcrumb-item">
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
