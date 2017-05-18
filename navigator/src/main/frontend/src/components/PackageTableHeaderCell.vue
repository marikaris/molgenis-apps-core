<template>
  <th>
    {{ label }}
    <span v-if="sortable"
          :class="sortDirection ? (sortDirection === 'ascending' ? 'glyphicon glyphicon-sort-by-alphabet' : 'glyphicon glyphicon-sort-by-alphabet-alt') : 'glyphicon glyphicon-sort'"
          aria-hidden="true" @click="handleSort"></span>
  </th>
</template>

<script>
  export default {
    name: 'package-table-header-cell',
    props: {
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      sortable: {
        type: Boolean,
        'default': false
      },
      sortDirection: {
        type: String,
        default: 'ascending'
      }
    },
    methods: {
      handleSort: function () {
        const sortDirection = this.sortDirection ? (this.sortDirection === 'ascending' ? 'descending' : 'ascending') : 'ascending'
        this.$emit('sort', this.id, sortDirection)
      }
    }
  }
</script>

<style scoped>
</style>
