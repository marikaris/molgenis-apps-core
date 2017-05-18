<template>
  <div>
    <package-table-controls :package_="package_" v-on:selectPackage="handleSelectPackage"></package-table-controls>
    <table class="table">
      <package-table-header
        :headers="[{id: 'name', label: 'Name', sortable: true, sortDirection: sortDirection},{id: 'desc', label:'Description'}]"
        v-on:sort="handleSort"></package-table-header>
      <package-table-body :package_="package_" v-on:selectPackage="handleSelectPackage"
                          v-on:selectEntityType="handleSelectEntityType"
                          v-on:showEntityTypeContextMenu="handleShowEntityTypeContextMenu"></package-table-body>
    </table>
    <context-menu v-if="entityTypeContextMenu" :entityTypeId="entityTypeContextMenu.id" :x="entityTypeContextMenu.x"
                  :y="entityTypeContextMenu.y"></context-menu>
  </div>
</template>

<script>
  import PackageTableControls from './PackageTableControls.vue'
  import PackageTableHeader from './PackageTableHeader.vue'
  import PackageTableBody from './PackageTableBody.vue'
  import ContextMenu from './ContextMenu.vue'

  export default {
    name: 'package-table',
    components: {PackageTableControls, PackageTableHeader, PackageTableBody, ContextMenu},
    props: {
      package_: {
        type: Object,
        required: true
      },
      sortDirection: {
        type: String,
        default: 'ascending'
      }
    },
    data: function () {
      return {entityTypeContextMenu: undefined}
    },
    created: function () {
      window.addEventListener('click', this.handleWindowClick)
    },
    methods: {
      handleSelectPackage: function (id) {
        this.entityTypeContextMenu = undefined
        this.$emit('selectPackage', id)
      },
      handleSelectEntityType: function (id) {
        this.entityTypeContextMenu = undefined
        this.$emit('selectEntityType', id)
      },
      handleShowEntityTypeContextMenu: function (id, coords) {
        this.entityTypeContextMenu = {id: id, x: coords.x, y: coords.y}
      },
      handleSort: function (headerId, sortDirection) {
        this.entityTypeContextMenu = undefined
        this.$emit('sort', headerId, sortDirection)
      },
      handleWindowClick: function () {
        this.entityTypeContextMenu = undefined
      }
    }
  }
</script>

<style scoped>
</style>
