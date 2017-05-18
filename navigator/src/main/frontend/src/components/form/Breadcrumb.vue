<template>
  <ol class="breadcrumb">
    <breadcrumb-item v-for="(item,index) in items" :key="item.id" :index="index" :id="item.id" :label="item.label"
                     :active="index === (items.length-1)" v-on:selectItem="handleSelectItem"></breadcrumb-item>
  </ol>
</template>

<script>
  import BreadcrumbItem from './BreadcrumbItem.vue'

  export default {
    name: 'breadcrumb',
    components: {BreadcrumbItem},
    props: {
      items: Array,
      required: true
    },
    methods: {
      handleSelectItem: function (itemId) {
        this.$emit('selectItem', itemId)
      }
    }
  }
</script>

<style scoped>
  .breadcrumb {
    margin-bottom: 0rem;
    background-color: white;
  }
</style>
