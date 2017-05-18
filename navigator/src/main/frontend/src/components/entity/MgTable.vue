<template>
  <div class="table-container">
    <table class="table table-hover table-sm">
      <thead class="thead-default">
      <th class="controls">
        <div class="dropdown">
          <button class="btn btn-secondary btn-sm col-select-btn" data-toggle="dropdown"><i class="fa fa-bars"></i></button>
          <div class="dropdown-menu">
            <h6 class="dropdown-header">Select columns</h6>
            <a v-for="header in headers" :key="header.id" class="dropdown-item" href="#">
              <checkbox :value="header.id" :label="header.label" :checked="isChecked(header)" @toggle="onToggle"></checkbox>
            </a>
          </div>
        </div>
      </th>
      <th v-for="header in selectedHeaders" :key="header.id">{{ header.label}}</th>
      </thead>
      <tbody>
      <mg-table-row v-for="row in rows" :key="row.id" :row="row" :headers="selectedHeaders"></mg-table-row>
      </tbody>
    </table>
  </div>
</template>

<script>
  import MgTableRow from './MgTableRow.vue'
  import Checkbox from '../form/Checkbox.vue'

  export default {
    name: 'mg-table',
    components: {MgTableRow, Checkbox},
    props: {
      headers: {
        type: Array,
        required: true
      },
      rows: {
        type: Array,
        required: true
      }
    },
    data: function () {
      return {
        selectedHeaders: this.headers.slice(0, 10)
      }
    },
    methods: {
      isChecked: function (header) {
        return this.selectedHeaders.some(aHeader => aHeader.id === header.id)
      },
      onToggle: function (e) {
        if (e.checked) {
          this.selectedHeaders = this.headers.filter(header => header.id === e.value || this.isChecked(header))
        } else {
          this.selectedHeaders = this.selectedHeaders.filter(header => header.id !== e.value)
        }
      }
    }
  }
</script>

<style scoped>
  .table-container {
    overflow-x: auto;
    padding-bottom: 100rem; /* workaround because overflow-y: visible doesn't work in combination with overflow-x: auto */
  }

  .col-select-btn {
    padding: .125rem .5rem;
    cursor: pointer;
  }

  tr:hover {
    cursor: pointer;
  }

  th {
    white-space: nowrap;
  }

  th.controls {
    width: 1px;
  }

</style>
