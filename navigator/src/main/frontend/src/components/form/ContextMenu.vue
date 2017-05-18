<template>
  <div class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu"
       :style="x && y ? 'display:block;left:' + x +'px;top:' + y + 'px'  : 'display:none'">
    <router-link class="dropdown-item" :to="{ name: 'explorer', params: { entityTypeId: entityTypeId } }">
      <i class="fa fa-eye"></i>&nbsp; View Data
    </router-link>
    <router-link class="dropdown-item" :to="{ name: 'explorer', params: { entityTypeId: 'sys_md_EntityType' } }">
      <i class="fa fa-pencil"></i>&nbsp; Edit Attributes
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'context-menu',
    props: {
      entityTypeId: {
        type: String,
        required: true
      },
      x: {
        type: Number,
        required: true
      },
      y: {
        type: Number,
        required: true
      }
    }
  }
</script>

<style scoped>
  .dropdown-menu {
    position: absolute;
    margin-bottom: 5px;
  }
</style>
