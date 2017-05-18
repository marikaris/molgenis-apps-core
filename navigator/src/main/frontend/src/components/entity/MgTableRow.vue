<template>
  <tr :class="selected ? 'selected' : null" @mouseenter="active = true" @mouseleave="active = false">
    <td class="control"><input v-if="active || selected" type="checkbox" @click="selected = $event.target.checked"></td>
    <td v-for="header in headers" :key="header.id">{{ toValue(header) }}</td>
  </tr>
</template>

<script>
  export default {
    name: 'mg-table-row',
    props: {
      row: {
        type: Object,
        required: true
      },
      headers: {
        type: Array,
        required: true
      }
    },
    data: function () {
      return {
        active: false,
        selected: false
      }
    },
    methods: {
      toValue: function (header) {
        switch (header.type) {
          case 'STRING':
          case 'INT':
          case 'BOOL':
          case 'DATE':
          case 'DATE_TIME':
          case 'DECIMAL':
          case 'EMAIL':
          case 'ENUM':
          case 'HTML':
          case 'HYPERLINK':
          case 'LONG':
          case 'TEXT':
          case 'SCRIPT':
            return this.row[header.id]
          case 'CATEGORICAL':
          case 'XREF':
          case 'FILE':
            return this.row[header.id] ? this.row[header.id].label : null
          case 'CATEGORICAL_MREF':
          case 'MREF':
          case 'ONE_TO_MANY':
            return this.row[header.id] ? this.row[header.id].map(value => value.label).join(',') : null
          default:
            return 'unknown type: ' + header.type
        }
      }
    }
  }
</script>

<style scoped>
  tr.selected {
    background-color: #FFFFD5;
  }
  td.control {
    text-align: center;
  }
  td {
    white-space: nowrap;
  }
</style>
