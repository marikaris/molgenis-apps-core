<template>
  <tbody>
  <package-table-row v-for="package in package_.children" type="package" :id="package.fullName" :label="package.label"
                     :description="package.description" :selected="package.fullName === selectedPackageId"
                     v-on:selectPackage="handleSelectPackage"
                     v-on:openPackage="handleOpenPackage">
  </package-table-row>
  <package-table-row v-for="entityType in package_.entityTypes" type="entity" :id="entityType.fullName"
                     :label="entityType.label" :description="entityType.description"
                     :selected="entityType.fullName === selectedEntityTypeId"
                     v-on:selectEntityType="handleSelectEntityType" v-on:openEntityType="handleOpenEntityType"
                     v-on:showEntityTypeContextMenu="handleShowEntityTypeContextMenu">

  </package-table-row>
  <tr v-if="package_.children.length == 0 && package_.entityTypes.length == 0">
    <td colspan="2"><em>empty folder</em></td>
  </tr>
  </tbody>
</template>

<script>
  import PackageTableRow from './PackageTableRow.vue'

  export default {
    name: 'package-table-body',
    components: {PackageTableRow},
    props: {
      package_: {
        type: Object,
        required: true
      }
    },
    data: function () {
      return {
        selectedPackageId: undefined,
        selectedEntityTypeId: undefined
      }
    },
    methods: {
      handleSelectPackage: function (id) {
        this.selectedPackageId = id
        this.selectedEntityTypeId = undefined
//                this.$emit('selectPackage', id);
      },
      handleOpenPackage: function (id) {
        this.$emit('selectPackage', id)
      },
      handleSelectEntityType: function (id) {
        this.selectedPackageId = undefined
        this.selectedEntityTypeId = id
      },
      handleOpenEntityType: function (id) {
        this.$emit('selectEntityType', id)
      },
      handleShowEntityTypeContextMenu: function (id, coords) {
        this.selectedPackageId = undefined
        this.selectedEntityTypeId = id
        this.$emit('showEntityTypeContextMenu', id, coords)
      }
    }
  }
</script>

<style scoped>
</style>
