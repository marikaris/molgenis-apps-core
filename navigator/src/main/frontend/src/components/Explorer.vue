<template>
  <h1>Explorer: {{ $route.params.entityTypeId ? $route.params.entityTypeId : 'No entity selected'}}</h1>
</template>

<script>
  export default {
    name: 'explorer'
  }
</script>

<style scoped>
</style>
