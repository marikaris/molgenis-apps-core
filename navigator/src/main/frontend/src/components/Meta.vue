<template>
  <h1>Meta: {{ $route.params.entityTypeId ? $route.params.entityTypeId : 'No entity selected'}}</h1>
</template>

<script>
  export default {
    name: 'meta'
  }
</script>

<style scoped>
</style>
