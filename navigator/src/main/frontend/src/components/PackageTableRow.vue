<template>
  <tr :class="selected ? 'active' : ''">
    <td v-if="type === 'package'" class="package-label-col" @click="handleSelectPackage"
        @dblclick.stop="handleOpenPackage">
      <span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span>&nbsp; <span class="no-selection">{{label}}</span>
    </td>
    <td v-else class="package-label-col" @click="handleSelectEntityType" @dblclick.stop="handleOpenEntityType"
        @contextmenu.prevent="handleShowEntityTypeContextMenu">
      <span class="glyphicon glyphicon-file" aria-hidden="true"></span>&nbsp; <span
      class="no-selection">{{label}}</span>
    </td>
    <td class="hidden-xs">
      <i>{{description}}</i>
    </td>
  </tr>
</template>

<script>
  export default {
    name: 'package-table-row',
    props: {
      type: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      selected: {
        type: Boolean
      }
    },
    methods: {
      handleSelectPackage: function (e) {
        this.$emit('selectPackage', this.id)
      },
      handleOpenPackage: function (e) {
        this.$emit('openPackage', this.id)
      },
      handleSelectEntityType: function (e) {
        this.$emit('selectEntityType', this.id)
      },
      handleOpenEntityType: function (e) {
        this.$emit('openEntityType', this.id)
      },
      handleShowEntityTypeContextMenu: function (e) {
        this.$emit('showEntityTypeContextMenu', this.id, {x: e.pageX, y: e.pageY})
      }
    }
  }
</script>

<style scoped>
  td.package-label-col:hover {
    cursor: pointer;
  }

  .no-selection {
    -webkit-user-select: none; /* webkit (safari, chrome) browsers */
    -moz-user-select: none; /* mozilla browsers */
    -khtml-user-select: none; /* webkit (konqueror) browsers */
    -ms-user-select: none; /* IE10+ */
  }
</style>
