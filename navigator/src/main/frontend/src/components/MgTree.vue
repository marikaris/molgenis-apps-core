<template>
  <ul>
    <mg-tree-node v-for="node in nodes" :key="node.id" :id="node.id" :label="node.label" :children="node.children" @toggle="$emit('toggle', $event)"></mg-tree-node>
  </ul>
</template>

<script>
  import MgTreeNode from './MgTreeNode.vue'

  export default {
    name: 'mg-tree',
    components: {MgTreeNode},
    props: {
      nodes: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>
  ul {
    list-style-type: none;
  }
</style>
