<template>
  <tbody>
  <package-table-row v-for="package in package_.children" :key="package.id" type="package" :id="package.id" :label="package.label"
                     :description="package.description" :selected="package.id === selectedPackageId"
                     v-on:selectPackage="handleSelectPackage"
                     v-on:openPackage="handleOpenPackage">
  </package-table-row>
  <package-table-row v-for="entityType in package_.entityTypes" :key="entityType.id" type="entity" :id="entityType.id"
                     :label="entityType.label" :description="entityType.description"
                     :selected="entityType.id === selectedEntityTypeId"
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
