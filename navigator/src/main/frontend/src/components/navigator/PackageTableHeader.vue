<template>
  <thead class="thead-default">
  <tr>
    <package-table-header-cell v-for="header in headers" :key="header.id" :id="header.id" :label="header.label"
                               :sortable="header.sortable" :sortDirection="header.sortDirection"
                               v-on:sort="handleSort"></package-table-header-cell>
  </tr>
  </thead>
</template>

<script>
  import PackageTableHeaderCell from './PackageTableHeaderCell.vue'

  export default {
    name: 'package-table-header',
    components: {PackageTableHeaderCell},
    props: {
      headers: {
        type: Array,
        required: true
      }
    },
    methods: {
      handleSort: function (headerId, sortDirection) {
        this.$emit('sort', headerId, sortDirection)
      }
    }
  }
</script>
