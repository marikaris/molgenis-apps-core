<template>
  <div v-if="entities">
    <div class="row">
      <div class="col-6">
        <p><small>{{ entities.items.length }} results</small></p>
      </div>
      <div class="col-1 offset-4">
        <button class="btn btn-secondary pull-right" @click="onDeleteSelection"><i class="fa fa-trash"></i></button>
      </div>
      <div class="col-1">
        <div class="dropdown pull-right">
          <button class="btn btn-secondary pull-right" data-toggle="dropdown"><i class="fa fa-ellipsis-v"></i></button>
          <div class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button"><i class="fa fa-download"></i> Download</button>
            <button class="dropdown-item" type="button"><i class="fa fa-arrow-right"></i> Export</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <mg-table v-if="entities.items.length > 0" :headers="toTableHeaders()" :rows="toTableData()"></mg-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import MgTable from '../entity/MgTable.vue'

  export default {
    name: 'mg-data-view',
    components: {MgTable},
    props: {
      entityType: {
        type: Object,
        required: true
      },
      query: {
        type: Object,
        'default': null
      }
    },
    computed: {
      ...mapGetters({
        entities: 'entities'
      })
    },
    created () {
      this.updateEntityCollection()
    },
    watch: {
      entityType: function () {
        this.updateEntityCollection()
      },
      query: function () {
        this.updateEntityCollection()
      }
    },
    methods: {
      updateEntityCollection: function () {
        this.$store.dispatch('getEntities', {
          entityTypeId: this.entityType.name,
          query: this.query
        })
      },
      onDeleteSelection: function () {
        alert('TODO delete selected rows')
      },
      toTableHeaders: function () {
        let headers = []
        const attributes = this.entityType.attributes
        Object.keys(attributes).forEach(function (id) {
          if (attributes[id].fieldType !== 'COMPOUND' && attributes[id].visible === true) {
            headers.push({id: id, label: attributes[id].label, type: attributes[id].fieldType})
          }
        })
        return headers
      },
      toTableData: function () {
        const attributes = this.entityType.attributes
        return this.entities.items.map(item => {
          let tableRow = Object.assign({}, item)

          Object.keys(attributes).forEach(function (id) {
            if (attributes[id].fieldType === 'COMPOUND' || attributes[id].visible === false) {
              delete tableRow[id]
            } else if (attributes[id].fieldType === 'CATEGORICAL' || attributes[id].fieldType === 'XREF' || attributes[id].fieldType === 'FILE') {
              tableRow[id] = tableRow[id] ? {
                id: tableRow[id][attributes[id].refEntity.idAttribute],
                label: tableRow[id][attributes[id].refEntity.labelAttribute]
              } : null
            } else if (attributes[id].fieldType === 'CATEGORICAL_MREF' || attributes[id].fieldType === 'MREF' || attributes[id].fieldType === 'ONE_TO_MANY') {
              tableRow[id] = tableRow[id] ? tableRow[id].map(item => ({
                id: item[attributes[id].refEntity.idAttribute],
                label: item[attributes[id].refEntity.labelAttribute]
              })) : null
            }
          })
          return tableRow
        })
      }
    }
  }
</script>
