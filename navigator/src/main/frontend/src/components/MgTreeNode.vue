<template>
  <li><checkbox :value="id" :label="label" @toggle="$emit('toggle', $event)"></checkbox>
  <ul v-if="children">
    <mg-tree-node v-for="child in children" :key="child.id" :id="child.id" :label="child.label" :children="child.children" @toggle="$emit('toggle', $event)"></mg-tree-node>
  </ul>
  </li>
</template>

<script>
  import Checkbox from './form/Checkbox.vue'

  export default {
    name: 'mg-tree-node',
    components: {Checkbox},
    props: {
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      children: {
        type: Array
      }
    }
  }
</script>

<style>
  ul {
    list-style-type: none;
  }
</style>
