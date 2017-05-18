<template>
  <div>
    <breadcrumb :items="breadcrumbItems" v-on:selectHome="handleSelectHome"
                v-on:selectItem="handleSelectPackage"></breadcrumb>
  </div>
</template>

<script>
  import Breadcrumb from '../form/Breadcrumb.vue'

  export default {
    name: 'package-table-controls',
    components: {Breadcrumb},
    props: {
      package_: Object,
      required: true
    },
    computed: {
      breadcrumbItems: function () {
        let path = []
        let package_ = this.package_
        while (package_ != null) {
          path.push({id: package_.id, label: package_.label})
          package_ = package_.parent
        }
        return path.reverse()
      }
    },
    methods: {
      handleSelectHome: function () {
        this.$emit('selectPackage', null)
      },
      handleSelectPackage: function (packageId) {
        this.$emit('selectPackage', packageId)
      }
    }
  }
</script>
